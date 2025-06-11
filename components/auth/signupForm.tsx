import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterFormData } from "@/types/auth";
import { useRouter } from "next/router";
import { useUser } from "@/pages/_app";
import {
  useCheckUserByEmail,
  useRegisterMutation,
  useReVerfMutation,
  useVerfMutation,
} from "@/queries/auth";
import { toast } from "sonner";
import Cookies from "js-cookie";
import CommonModal from "../CommonModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { maskEmail } from "@/helpers/maskEmail";
import Loading from "../loading";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { loadState, saveState } from "@/config/storage";
import i18n from "i18next";
import { useContext } from "react";
import { LangContext } from "@/components/layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "@/utils/toastUtils";
import { Eye, EyeOff } from "lucide-react";

type ExtendedRegisterFormData = RegisterFormData & {
  reEnteredPassword?: string;
};

const MAX_ATTEMPTS = 3;
const COUNTDOWN_TIME = 120;

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { setUser } = useUser();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ExtendedRegisterFormData>();
  const [id, setId] = useState<number>();
  const [visible, setVisible] = useState(false);
  const [verfCode, setVerfCode] = useState("");
  const [timer, setTimer] = useState(COUNTDOWN_TIME);
  const [canResend, setCanResend] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);
  const password = watch("password");
  const reEnteredPassword = watch("reEnteredPassword");
  const { t } = useTranslation();
  const { changeLangHandler } = useContext(LangContext);
  const selectedLanguage = loadState("lang");
  const [selectedLang, setSelectedLang] = useState(selectedLanguage || "uz");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

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

  const checkUser = useCheckUserByEmail(
    (data) => {
      if (data.message === "USER EMAIL IS NOT FOUND") {
        reset({
          fullName: session?.user.name || "",
          email: session?.user.email || "",
        });
      } else if (data.message === "AUTHORISED BY GOOGLE EMAIL") {
        Cookies.set("token", data.data);
        // setSelectedRole(data.meta.user.role[0])
        setUser({
          data: {
            id: data.meta.user.id,
            role: data.meta.user.role,
            email: data.meta.user.email,
            name: data.meta.user.fullName,
            usernames: data.meta.user.usernames,
          },
        });
        router.push("/");
      }
      console.log("User found", data);
    },
    (error) => {
      console.log("Verification failed:", error);
    }
  );

  useEffect(() => {
    if (session?.user?.email) {
      checkUser.mutate(session.user.email);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    if (password && reEnteredPassword) {
      setPasswordsMatch(password === reEnteredPassword);
    }
  }, [password, reEnteredPassword]);

  useEffect(() => {
    if (password && reEnteredPassword) {
      setPasswordsMatch(password === reEnteredPassword); // Set passwordsMatch to true if they are equal
    }
  }, [password, reEnteredPassword]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    if (visible) {
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
  }, [visible]);

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

  const registerMutation = useRegisterMutation(
    (data) => {
      if (data.status === "OK") {
        showInfoToast(data.message);
        setId(data.meta.userId);
        setVisible(true);
        const loginedUserData = {
          id: data?.meta?.user?.id,
          email: data?.meta?.user?.email,
          role: data?.meta?.user?.role,
          fullName: data?.meta?.user?.fullName,
          phoneNumber: data?.meta?.user?.phoneNumber,
        };
        saveState("user", loginedUserData);
      } else if (data.status === "BAD_REQUEST") {
        showErrorToast(data.message);
      }
    },
    (error) => {
      showErrorToast(error);
    }
  );

  const onSubmit: SubmitHandler<ExtendedRegisterFormData> = (data) => {
    if (deviceId) {
      const { reEnteredPassword, ...dataWithoutReEnteredPassword } = data;
      const updatedData = { ...dataWithoutReEnteredPassword, deviceId };
      registerMutation.mutate(updatedData);
    } else {
      console.error("Device ID is not available");
    }
  };

  const verfMutation = useVerfMutation(
    (data) => {
      if (data.message === "SUCCESS") {
        showSuccessToast("Verification successful");
        Cookies.set("token", data.data.token, { expires: 10 });
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
      } else if (data.status === "BAD_REQUEST") {
        showErrorToast(data.message);
      }
    },
    (error) => {
      showErrorToast(error);
    }
  );

  const onVerfSubmit = (data: RegisterFormData) => {
    if (id) {
      const verifyData = {
        id,
        email: data.email,
        code: verfCode,
        password: data.password,
        deviceId,
      };
      verfMutation.mutate(verifyData);
    }
  };

  const ReVerfMutation = useReVerfMutation(
    (data) => {
      showInfoToast("Password resend initiated");
      setAttempts(0);
      setIsBlocked(false);
    },
    (error) => {
      showErrorToast(error);
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
        noValidate
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 text-center lg:text-left w-full">
          <div>
            <h1 className="text-lg font-bold">{t("sup.title")}</h1>
            <p className="text-balance text-[12px] text-muted-foreground">
              {" "}
              {t("sup.desc")}
            </p>
          </div>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">{t("sup.fullName")}</Label>
            <Input
              {...register("fullName", { required: t("sup.fullNameMsg") })}
              id="name"
              type="text"
              placeholder={t("sup.fullNamePlc")}
              required
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">{t("sup.email")}</Label>
            <Input
              {...register("email", {
                required: t("messages.emailMsg"),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t("messages.emailMsg"),
                },
              })}
              id="email"
              type="email"
              placeholder={t("sup.emailPlc")}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">{t("sup.passw")}</Label>
            </div>
            <div className="relative">
              <Input
                {...register("password", { required: t("sup.passWMsg") })}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={t("sup.enterPassword")}
                required
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
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="reEnteredPassword">{t("sup.rePassw")}</Label>
            </div>
            <div className="relative">
              <Input
                {...register("reEnteredPassword", {
                  required: t("sup.rePassWMsg"),
                  validate: (value) =>
                    value === getValues("password") || t("messages.passWDM"),
                })}
                id="reEnteredPassword"
                type={showRePassword ? "text" : "password"}
                placeholder={t("sup.reEnterPassword")}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowRePassword(!showRePassword)}
              >
                {showRePassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
              {errors.reEnteredPassword && (
                <p className="text-red-500 text-sm">
                  {errors.reEnteredPassword.message}
                </p>
              )}
              {passwordsMatch && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="absolute right-10 top-1/2 transform -translate-y-1/2 text-green-500"
                  width="24"
                  height="24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
          </div>
          <Button
            disabled={registerMutation.isLoading}
            type="submit"
            className="w-full"
          >
            {registerMutation.isLoading ? <Loading /> : t("sup.sup")}
          </Button>
          <div className="flex items-center text-sm text-muted-foreground">
            <div className="flex-1 border-t border-border"></div>
            <span className="px-2">{t("sup.orc")}</span>
            <div className="flex-1 border-t border-border"></div>
          </div>
          {!session ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => signIn("google")}
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
              Sign out from Google
            </Button>
          )}
        </div>
        <div className="text-center text-sm">
          {t("sup.aha")}{" "}
          <Link
            href="/auth/signin"
            className="underline underline-offset-4 text-[#3BB5DC]"
          >
            {t("sup.sin")}
          </Link>
        </div>
      </form>

      <CommonModal
        width="350px"
        visible={visible}
        isRequired={true}
        title={t("sup.evc")}
        onClose={() => setVisible(false)}
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
          >
            {t("sup.whs")} <br /> {maskEmail(watch("email"))}
          </p>

          <div style={{ margin: "10px 0", textAlign: "center" }}>
            {ReVerfMutation.isLoading ? (
              t("sup.ldg")
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
            disabled={verfMutation.isLoading || isBlocked}
            className="w-full"
            type="submit"
          >
            {verfMutation.isLoading ? t("sup.ldg") : t("sup.vrf")}
          </Button>
        </form>
      </CommonModal>
    </>
  );
}
