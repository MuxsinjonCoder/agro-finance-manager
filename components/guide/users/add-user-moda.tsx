import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterFormData } from "@/types/auth";
import {
  useRegisterByAdminMutation,
  useRegisterMutation,
} from "@/queries/auth";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { Eye, EyeOff } from "lucide-react";
import AddroleToUser from "./add-role-to-user";
import CommonModal from "@/components/CommonModal";

type ExtendedRegisterFormData = RegisterFormData & {
  reEnteredPassword?: string;
};

export default function AddUserForm({
  setAddModal,
  refetch,
  setAddRoleModal,
  setNewCreatedUser,
}: any) {
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ExtendedRegisterFormData>();
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);
  const password = watch("password");
  const reEnteredPassword = watch("reEnteredPassword");
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  useEffect(() => {
    if (password && reEnteredPassword) {
      setPasswordsMatch(password === reEnteredPassword);
    }
  }, [password, reEnteredPassword]);

  useEffect(() => {
    if (typeof window != undefined) {
      const newDeviceId = "device-" + Math.random().toString(36).substr(2, 9);
      setDeviceId(newDeviceId);
    }
  }, []);

  const registerMutation = useRegisterByAdminMutation(
    (data) => {
      setNewCreatedUser(data);
      if (data.status === "OK") {
        showSuccessToast(t("messages.created"));
        setAddModal(false);
        setAddRoleModal(true);
        refetch();
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

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={cn("flex flex-col gap-6")}
      >
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">{t("sup.fullName")}</Label>
            <Input
              {...register("fullName", { required: t("sup.fullNameMsg") })}
              id="name"
              type="text"
              placeholder={t("sup.fullNamePlc")}
              required
              maxLength={50}
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
              maxLength={50}
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
                maxLength={50}
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
                maxLength={50}
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
            {registerMutation.isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {t("buttons.save")}
              </span>
            ) : (
              t("buttons.save")
            )}
          </Button>
        </div>
      </form>
    </>
  );
}
