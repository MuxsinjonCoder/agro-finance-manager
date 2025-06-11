import { Edit, Eye, EyeOff, KeyRound, LockKeyhole, Mail, ShieldCheck, UserPen } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import CommonModal from "../../components/CommonModal"
import Loading from "../../components/loading"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../components/ui/input-otp"
import { maskEmail } from "../../helpers/maskEmail"
import { useCheckUpdateEmailMutation, useCheckUpdatePassMutation, useReVerfMutation, useUpdatePassword } from "../../queries/auth"
import { useUpdateUserData, useUpdateUserEmail } from "../../queries/users"
import { UpdatePasswordForm } from "../../types/auth"
import { useUser } from "../_app"

const MAX_ATTEMPTS = 3;
const COUNTDOWN_TIME = 120;

export default function ProfilePage() {
    const { t } = useTranslation()
    const { user } = useUser()
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const [verfCode, setVerfCode] = useState("");
    const [verfCodeError, setVerfCodeError] = useState({
        visible: false,
        err: "",
    });
    const [timer, setTimer] = useState(COUNTDOWN_TIME);
    const [canResend, setCanResend] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [isBlocked, setIsBlocked] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState<string>(user?.data.email || "");
    const [fullName, setFullName] = useState<string>(user?.data.fullName || "");
    const [deviceId, setDeviceId] = useState<string | null>(null);
    const [verifyTarget, setVerifyTarget] = useState<"email" | "password" | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        getValues,
        formState: { errors },
    } = useForm<UpdatePasswordForm>();

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
            2,
            "0"
        )}`;
    };

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

    const updateUserData = useUpdateUserData();
    const updateUserEmail = useUpdateUserEmail();

    const handleUpdateUser = (e: React.FormEvent) => {
        e.preventDefault();
        if (user?.data.id) {
            updateUserData.mutate(
                { id: user.data.id, data: { fullName } },
                {
                    onSuccess: () => {
                        toast.success(t("modals.editSuccess"));
                        setOpen(true);
                    },
                    onError: (error) => {
                        toast.error(`${t("messages.err")} ${error}`);
                    },
                }
            );
        } else {
            toast.error(t("messages.err"));
        }
    };

    const handleUpdateEmail = (e: React.FormEvent) => {
        e.preventDefault();
        if (user?.data.email) {
            updateUserEmail.mutate(
                { email: user.data.email, newEmail: email },
                {
                    onSuccess: () => {
                        toast.success(t("messages.css"));
                        setOpen(true);
                        setVerifyTarget("email");
                    },
                    onError: (error) => {
                        toast.error(`${t("messages.err")} ${error}`);
                    },
                }
            );
        } else {
            toast.error(t("messages.err"));
        }
    };

    const updatePassMutation = useUpdatePassword(
        (data) => {
            if (data.status === "BAD_REQUEST" || data.status === "NOT_FOUND") {
                console.log("XATO");

                toast.error(t("messages.epe"));
            }
            if (data.status === "OK") {
                toast.success(t("messages.css"));
                setOpen(true);
                setVerifyTarget("password");
            }
        },
        (error) => {
            toast.error(`${t("messages.vf")} ${error}`);
        }
    );

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const updatePass = (e: React.FormEvent) => {
        e.preventDefault();
        updatePassMutation.mutate({ newPassword: password, email: user?.data.email || "" });
    };

    const checkUpdPassMutation = useCheckUpdatePassMutation(
        (data) => {
            if (data.status === "OK") {
                toast.success(t("messages.pus"));
                setOpen(false);
                setAttempts(0);
                setIsBlocked(false);
                setCanResend(false);
                setTimer(COUNTDOWN_TIME);
                reset();
                setVerfCode("");
                setPassword("");
                setVerifyTarget(null);
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

    const checkUpdEmailMutation = useCheckUpdateEmailMutation(
        (data) => {
            if (data.status === "OK") {
                toast.success(t("modals.editSuccess"));
                setOpen(false);
                setAttempts(0);
                setIsBlocked(false);
                setCanResend(false);
                setTimer(COUNTDOWN_TIME);
                reset();
                setVerfCode("");
                setPassword("");
                setVerifyTarget(null);
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
        if (verifyTarget === "password") {
            checkUpdPassMutation.mutate({
                email: user?.data.email || "",
                code: verfCode,
                password: password,
            });

        } else if (verifyTarget === "email") {
            checkUpdEmailMutation.mutate({
                oldEmail: user?.data.email || "",
                newEmail: email,
                code: verfCode,
            });
        } else {
            toast.error("Unknown verification target");
        }
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
        <div className="w-full h-auto overflow-y-auto">
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="text-3xl font-bold tracking-tight">
                    {t('profile.title')}
                </div>
                <div className="flex my-4 items-center">
                    <Image
                        src="/images/profile.png"
                        alt="Profile"
                        width={100}
                        height={100}
                        className="rounded-md border-2 border-gray-300"
                    />
                    <div className="ml-4">
                        <div className="flex items-center gap-2">
                            <h3 className="text-2xl font-bold">{user?.data.fullName?.toUpperCase()}</h3>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <p className="text-gray-600">{user?.data.email}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 flex-wrap items-start">
                <div className="bg-gray-100 p-4 rounded-lg mb-4 flex-1">
                    <div className="text-2xl text-gray-600 font-bold tracking-tight">
                        {t('profile.security')}
                    </div>
                    <div className="my-4">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-gray-600 font-bold">
                                    <div className="flex items-center gap-2">
                                        <LockKeyhole />
                                        {t('profile.changePass')}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 border-t py-2">
                                    {t('upd.en')}
                                    <div className={`w-full md:w-[300px] relative mt-2`}>
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder={t('upd.npw')}
                                            required
                                            maxLength={20}
                                            className="w-full"
                                            minLength={8}
                                            value={password}
                                            onChange={handlePasswordChange}
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
                                    <div className="w-full md:w-[300px] relative mt-2">
                                        <Button
                                            disabled={updatePassMutation.isLoading || password.length < 8}
                                            type="submit"
                                            className="w-full"
                                            onClick={updatePass}
                                        >
                                            {updatePassMutation.isLoading ? <Loading /> : t("upd.updp")}
                                        </Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger className="text-gray-600 font-bold">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck />
                                        {t('profile.enableOTP')}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 border-t py-2">
                                    {t('profile.enableOTP')}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger className="text-gray-600 font-bold">
                                    <div className="flex items-center gap-2">
                                        <KeyRound />
                                        {t('profile.eimzo')}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 border-t py-2">
                                    {t('profile.eimzo')}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg flex-1">
                    <div className="text-2xl text-gray-600 font-bold tracking-tight">
                        {t('profile.personalData')}
                    </div>
                    <div className="my-4">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-gray-600 font-bold">
                                    <div className="flex items-center gap-2">
                                        <UserPen />
                                        {t('sup.fullName')}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 border-t py-2">
                                    {t('sup.fullNamePlc')}
                                    <div className={`w-full md:w-[300px] relative mt-2`}>
                                        <Input
                                            id="fullName"
                                            type="text"
                                            placeholder={t('sup.fullName')}
                                            required
                                            className="w-full"
                                            value={fullName}
                                            onChange={handleFullNameChange}
                                        />
                                    </div>
                                    <div className="w-full md:w-[300px] relative mt-2">
                                        <Button
                                            disabled={updateUserData.isLoading || !fullName}
                                            type="submit"
                                            className="w-full"
                                            onClick={handleUpdateUser}
                                        >
                                            {updateUserData.isLoading ? <Loading /> : t("profile.update")}
                                        </Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger className="text-gray-600 font-bold">
                                    <div className="flex items-center gap-2">
                                        <Mail />
                                        {t('forms.email')}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 border-t py-2">
                                    {t('profile.enterEmail')}
                                    <div className={`w-full md:w-[300px] relative mt-2`}>
                                        <Input
                                            id="email"
                                            type="text"
                                            placeholder={t('forms.email')}
                                            required
                                            className="w-full"
                                            value={email}
                                            onChange={handleEmailChange}
                                        />
                                    </div>
                                    <div className="w-full md:w-[300px] relative mt-2">
                                        <Button
                                            disabled={updateUserEmail.isLoading || !email}
                                            type="submit"
                                            className="w-full"
                                            onClick={handleUpdateEmail}
                                        >
                                            {updateUserEmail.isLoading ? <Loading /> : t("profile.update")}
                                        </Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
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
        </div>
    )
}