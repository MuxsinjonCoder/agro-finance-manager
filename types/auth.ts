export interface LoginFormData {
    email: string;
    password: string;
    deviceId?: string;
}

export interface RegisterFormData {
    fullName: string | undefined | null,
    username: string,
    email: string,
    password: string,
    deviceId?: string | undefined
    role: string
}

export interface VerfFormData {
    id: number | undefined;
    code: string | undefined;
    email: string;
    password?: string;
    deviceId?: string | null

}


export interface CheckEmailFormData {
    code: string | undefined;
    email: string;
    deviceId?: string | null
}

export interface ReVerfFormData {
    email: string;
    deviceId: string
}

export interface UpdatePasswordForm {
    email: string;
    newPassword: string;
}

export interface CheckUpdatePassData {
    email: string;
    password: string;
    code: string | undefined;
}

export interface CheckUpdateEmailData {
    oldEmail: string;
    newEmail: string;
    code: string | undefined;
}