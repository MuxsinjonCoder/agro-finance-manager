import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useUser } from "@/pages/_app";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { LoginFormData, UpdatePasswordForm } from "@/types/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useCheckCodeMutation,
  useCheckUpdatePassMutation,
  useLoginMutation,
  useReVerfMutation,
  useUpdatePassword,
} from "@/queries/auth";
import { toast } from "sonner";
import Cookies from "js-cookie";
import CommonModal from "../CommonModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { maskEmail } from "@/helpers/maskEmail";
import Loading from "../loading";
import { useTranslation } from "react-i18next";
import { loadState, saveState } from "@/config/storage";
import i18n from "i18next";
import { LangContext } from "@/components/layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";

const MAX_ATTEMPTS = 3;
const COUNTDOWN_TIME = 120;

export function UpdatePassForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { changeLangHandler } = useContext(LangContext);

  const { setUser } = useUser();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<number>();
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [verfCode, setVerfCode] = useState("");
  const [verfCodeError, setVerfCodeError] = useState({
    visible: false,
    err: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [timer, setTimer] = useState(COUNTDOWN_TIME);
  const [canResend, setCanResend] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  const { t } = useTranslation();

  const selectedLanguage = loadState("lang");

  const [selectedLang, setSelectedLang] = useState(selectedLanguage || "uz");

  useEffect(() => {
    const savedLang = loadState("lang");
    if (savedLang) {
      setSelectedLang(savedLang);
      i18n.changeLanguage(savedLang);
    }
  }, []);

  const handleLangChange = (lang: string) => {
    setSelectedLang(lang);
    saveState("lang", lang);
    i18n.changeLanguage(lang);
    changeLangHandler(lang);
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<UpdatePasswordForm>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedDeviceId = localStorage.getItem("deviceId");

      if (!storedDeviceId) {
        // If deviceId doesn't exist in localStorage, create one
        const newDeviceId = "device-" + Math.random().toString(36).substr(2, 9);
        localStorage.setItem("deviceId", newDeviceId);
        setDeviceId(newDeviceId); // Store the newly generated deviceId
      } else {
        setDeviceId(storedDeviceId); // Store the existing deviceId
      }
    }
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    if (open) {
      setAttempts(0);
      setIsBlocked(false);
      setTimer(COUNTDOWN_TIME);
      setCanResend(false);
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [open]);

  const updatePassMutation = useUpdatePassword(
    (data) => {
      if (data.status === "BAD_REQUEST" || data.status === "NOT_FOUND") {
        console.log("XATO");

        toast.error(t("messages.epe"));
        const loginedUserData = {
          id: data?.meta?.user?.id,
          email: data?.meta?.user?.email,
          role: data?.meta?.user?.role,
          fullName: data?.meta?.user?.fullName,
          phoneNumber: data?.meta?.user?.phoneNumber,
        };
        saveState("user", loginedUserData);
      }
      if (data.status === "OK") {
        toast.success(t("messages.css"));
        setOpen(true);
      }
    },
    (error) => {
      toast.error(`${t("messages.vf")} ${error}`);
    }
  );

  const onSubmit: SubmitHandler<UpdatePasswordForm> = (data) => {
    updatePassMutation.mutate(data);
  };

  const checkUpdPassMutation = useCheckUpdatePassMutation(
    (data) => {
      if (data.status === "OK") {
        toast.success(t("messages.pus"));
        router.push("/auth/signin");
      } else if (data.status === "BAD_REQUEST") {
        setVerfCodeError({
          visible: true,
          err: data.message,
        });

        setAttempts((prev) => {
          const newAttempts = prev + 1;
          if (newAttempts >= MAX_ATTEMPTS) {
            setIsBlocked(true);
          }
          return newAttempts;
        });
        toast.error(data.message);
      }
    },
    (error) => {
      toast.error(`${t("messages.vf")} ${error}`);
    }
  );

  const onVerfSubmit: SubmitHandler<UpdatePasswordForm> = (data) => {
    const verifyData = {
      email: data.email,
      code: verfCode,
      password: data.newPassword,
    };
    checkUpdPassMutation.mutate(verifyData);
  };

  const ReVerfMutation = useReVerfMutation(
    (data) => {
      toast.info(t("messages.pri"));
      setAttempts(0);
      setIsBlocked(false);
    },
    (error) => {
      toast.error(`${t("messages.vf")} ${error}`);
    }
  );

  const handleResend = () => {
    setCanResend(true);
    setTimer(COUNTDOWN_TIME);
    const email = getValues("email");
    if (deviceId) {
      ReVerfMutation.mutate({ email, deviceId });
    }
    // resendCode(); // Call the backend to resend the code
  };

  return (
    <>
      <div className="absolute top-7 right-16">
        <Select value={selectedLang} onValueChange={handleLangChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder={t("layout.selectLang")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="uz">O'zbekcha</SelectItem>
            <SelectItem value="ru">Русский</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{t("upd.title")}</h1>
          <p className="text-balance text-sm text-muted-foreground">
            {t("upd.en")}
          </p>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">{t("sup.email")}</Label>
            <Input
              {...register("email", {
                required: t("sup.emailMsg"),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t("messages.invEmail"),
                },
              })}
              id="email"
              type="email"
              placeholder={t("sup.emailPlc")}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">{t("upd.npw")}</Label>
            </div>
            <div className="relative">
              <Input
                {...register("newPassword", {
                  required: t("upd.npwMsg"),
                  minLength: {
                    value: 8,
                    message: t("messages.passWMinL"),
                  },
                  maxLength: {
                    value: 20,
                    message: t("messages.passMaxLength"),
                  },
                })}
                id="password"
                type={showPassword ? "text" : "password"}
                className={errors.newPassword ? "border-red-500" : ""}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <Button
            disabled={updatePassMutation.isLoading}
            type="submit"
            className="w-full"
          >
            {updatePassMutation.isLoading ? <Loading /> : t("upd.updp")}
          </Button>
        </div>

        <div className="text-center text-sm">
          {t("upd.dwc")}{" "}
          <Link
            href={"/auth/signup"}
            className="underline underline-offset-4 text-[#3BB5DC]"
          >
            {t("sup.sin")}
          </Link>
        </div>
      </form>

      <CommonModal
        width="350px"
        visible={open}
        isRequired={true}
        title={"Please confirm your email!"}
        onClose={() => setOpen(false)}
      >
        <form onSubmit={handleSubmit(onVerfSubmit)}>
          <div className="mb-3">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <label>{t("sup.evc")}</label>
            </div>
            <div className="flex justify-center">
              <InputOTP value={verfCode} onChange={setVerfCode} maxLength={6}>
                <InputOTPGroup>
                  {[...Array(6)].map((_, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
          <p
            style={{
              fontSize: "13px",
              textAlign: "center",
              marginBottom: "20px",
            }}
            className="mt-3"
          >
            {t("sup.whs")}
            <br /> {maskEmail(watch("email"))}
          </p>
          <div style={{ margin: "10px 0", textAlign: "center" }}>
            {ReVerfMutation.isLoading ? (
              "Loading..."
            ) : canResend ? (
              <div
                style={{
                  color: "#0360CB",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={handleResend}
              >
                {t("sup.rsc")}
              </div>
            ) : (
              <span>
                {t("sup.rsin")} {formatTime(timer)}
              </span>
            )}
          </div>

          <Button
            disabled={checkUpdPassMutation.isLoading || isBlocked}
            type="submit"
          >
            {checkUpdPassMutation.isLoading ? t("sup.ldg") : t("sup.vrf")}
          </Button>
        </form>
      </CommonModal>
    </>
  );
}
