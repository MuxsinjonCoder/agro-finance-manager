import { SignUpForm } from "@/components/auth/signupForm"

export default function LoginPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2 w-full">
            <div className="relative hidden bg-muted lg:block">
                <img
                    src="/authbg.jpg"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.5] dark:grayscale"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            </div>
            <div className="flex flex-col gap-4 p-6 md:px-10  ">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-[400px]">
                        <SignUpForm />
                    </div>
                </div>
            </div>

        </div>
    )
}
