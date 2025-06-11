import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useUser } from "@/pages/_app";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { LoginFormData } from "@/types/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useCheckCodeMutation,
  useCheckUserByEmail,
  useLoginMutation,
  useReVerfMutation,
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
import { signIn, signOut, useSession } from "next-auth/react";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "@/utils/toastUtils";
import { Eye, EyeOff } from "lucide-react";

const MAX_ATTEMPTS = 3;
const COUNTDOWN_TIME = 120;

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { changeLangHandler } = useContext(LangContext);
  const { data: session, status } = useSession();
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

  const [timer, setTimer] = useState(COUNTDOWN_TIME);
  const [canResend, setCanResend] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
  } = useForm<LoginFormData>();

  const checkUser = useCheckUserByEmail(
    (data) => {
      if (data.message === "USER EMAIL IS NOT FOUND") {
        router.push("/auth/signup");
      } else if (data.message === "AUTHORISED BY GOOGLE EMAIL") {
        Cookies.set("token", data.data);
        // setSelectedRole(data.meta.user.role[0])
        setUser({
          data: {
            id: data.meta.user.id,
            role: data.meta.user.role,
            email: data.meta.user.email,
            name: data.meta.user.fullName,
            // driverId: data.meta.user.driverId,
            usernames: data.meta.user.usernames,
          },
        });
        console.log("data in login form", data);
        router.push("/");
      } else {
        showErrorToast(data);
      }
    },
    (error) => {
      showErrorToast(
        `Verification failed: ${error.message || "Something went wrong"}`
      );
    }
  );

  useEffect(() => {
    if (session?.user?.email) {
      checkUser.mutate(session.user.email);
    }
  }, [session?.user?.email]);

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

  const loginMutation = useLoginMutation(
    (data) => {
      if (data.status === "BAD_REQUEST") {
        showErrorToast(t("messages.epe"));
      }
      if (data.status === "NOT_FOUND") {
        showInfoToast(t("messages.userNotFound"));
      }
      if (data.code === 0) {
        showInfoToast(t("messages.css"));
        setOpen(true);
        setId(data.data);
        // console.log(data);
      } else if (data.code === 1) {
        showSuccessToast(t("messages.vs"));
        // localStorage.setItem('token', data.message)
        // localStorage.setItem('userId', data.data)
        // localStorage.setItem('role', JSON.stringify(data.meta.user.roles))
        Cookies.set("token", data.message, { expires: 10 });
        setUser({
          data: {
            id: data.data,
            role: data.meta.user.role,
            email: data.meta.user.email,
            name: data.meta.user.fullName,
            usernames: data.meta.user.usernames,
          },
        });
        const loginedUserData = {
          id: data?.meta?.user?.id,
          email: data?.meta?.user?.email,
          role: data?.meta?.user?.role,
          fullName: data?.meta?.user?.fullName,
          phoneNumber: data?.meta?.user?.phoneNumber,
        };
        saveState("user", loginedUserData);
        router.push("/");
      }
    },
    (error) => {
      showErrorToast(
        `${t("messages.vf")} ${error.message || t("messages.smtErr")}`
      );
    }
  );

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    if (deviceId) {
      loginMutation.mutate({ ...data, deviceId });
    } else {
      console.error("Device ID is not available");
    }
  };

  const verfMutation = useCheckCodeMutation(
    (data) => {
      if (data.message === "SUCCESS") {
        showSuccessToast("Verification successful");
        Cookies.set("token", data.data.token, { expires: 10 });
        console.log(data.data.user, "Successfully verified");
        setUser({
          data: {
            id: data.userId,
            role: data.data.user.role,
            email: data.data.user.email,
            name: data.data.user.fullName,
            usernames: data.data.user.usernames,
          },
        });
        router.push("/");
        saveState("user", data.data.user);
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
        showErrorToast(data.message);
      }
    },
    (error) => {
      showErrorToast(
        `${t("messages.vf")} ${error.message || t("messages.smtErr")}`
      );
    }
  );

  const onVerfSubmit = (data: LoginFormData) => {
    if (id) {
      const verifyData = {
        email: data.email,
        code: verfCode,
        deviceId,
      };
      verfMutation.mutate(verifyData);
    }
  };

  const ReVerfMutation = useReVerfMutation(
    (data) => {
      showInfoToast(t("messages.pri"));
      setAttempts(0);
      setIsBlocked(false);
      setCanResend(false);
      setTimer(COUNTDOWN_TIME);
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
    },
    (error) => {
      showErrorToast(`${t("messages.vf")} ${error}`);
    }
  );

  const handleResend = () => {
    setCanResend(true);
    setTimer(COUNTDOWN_TIME);
    const email = getValues("email");
    if (deviceId) {
      ReVerfMutation.mutate({ email, deviceId });
    }
  };

  return (
    <>
      <div className="absolute top-5 right-10">
        <Select
          value={selectedLang}
          defaultValue="uz"
          onValueChange={handleLangChange}
        >
          <SelectTrigger className="w-[150px] mx-auto">
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
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 text-center lg:text-left w-full">
          <div>
            <h1 className="text-xl font-bold">{t("sin.lg")}</h1>
            <p className="text-balance text-xs text-muted-foreground">
              {t("sin.eeb")}
            </p>
          </div>
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
              <Label htmlFor="password">{t("sup.passw")}</Label>
              <Link
                href="/auth/update-password"
                className="ml-auto text-sm underline-offset-4 hover:underline text-[#3BB5DC]"
              >
                {t("sin.fgp")}
              </Link>
            </div>
            <div className="relative">
              <Input
                {...register("password", {
                  required: t("sup.passWMsg"),
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
                placeholder={t("sup.enterPassword")}
                className={errors.password ? "border-red-500" : ""}
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
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <Button
            disabled={loginMutation.isLoading}
            type="submit"
            className="w-full"
          >
            {loginMutation.isLoading ? <Loading /> : t("sup.sin")}
          </Button>

          <div className="flex items-center text-sm text-muted-foreground">
            <div className="flex-1 border-t border-border"></div>
            <span className="px-2">{t("sin.olw")}</span>
            <div className="flex-1 border-t border-border"></div>
          </div>

          {!session ? (
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/",
                })
              }
              className="w-full"
            >
              <svg
                style={{ marginRight: "7px" }}
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20px"
                height="20px"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              {t("sup.lwg")}
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={() => signOut({ redirect: true })}
              className="w-full"
            >
              <svg
                style={{ marginRight: "7px" }}
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20px"
                height="20px"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              {t("buttons.sofg")}
            </Button>
          )}
        </div>

        <div className="text-center text-sm">
          {t("sin.dha")}{" "}
          <Link
            href={"/auth/signup"}
            className="underline underline-offset-4 text-[#3BB5DC]"
          >
            {t("sup.sup")}
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
              <InputOTP
                value={verfCode}
                onChange={setVerfCode}
                maxLength={6}
                autoFocus
              >
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
            We sent a code to your email: <br /> {maskEmail(watch("email"))}
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
            disabled={
              verfMutation.isLoading || isBlocked || verfCode.length < 6
            }
            type="submit"
          >
            {verfMutation.isLoading ? t("sup.ldg") : t("sup.vrf")}
          </Button>
        </form>
      </CommonModal>
    </>
  );
}
