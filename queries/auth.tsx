import { useMutation } from "react-query";
import axiosInstance from "../api/axios";
import {
  CheckEmailFormData,
  CheckUpdateEmailData,
  CheckUpdatePassData,
  LoginFormData,
  RegisterFormData,
  ReVerfFormData,
  UpdatePasswordForm,
  VerfFormData,
} from "../types/auth";

export const useCheckUserByEmail = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  return useMutation(
    async (email: string) => {
      const response = await axiosInstance.post(
        `/users/checkByGoogleEmail?email=${email}`
      );
      return response.data;
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useCheckUsernameValid = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  return useMutation(
    async (username: string) => {
      const response = await axiosInstance.post(
        `/users/checkUsername?username=${username}`
      );
      return response.data;
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useRegisterMutation = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  return useMutation(
    async (registerData: RegisterFormData) => {
      const response = await axiosInstance.post(
        "/auths/registerByEmail",
        registerData
      );
      return response.data;
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useRegisterByAdminMutation = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  return useMutation(
    async (registerData: RegisterFormData) => {
      const response = await axiosInstance.post(
        "/auths/registerByAdmin",
        registerData
      );
      return response.data;
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useLoginMutation = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  return useMutation(
    async (loginData: LoginFormData) => {
      const response = await axiosInstance.post(
        "/auths/loginByEmail",
        loginData
      );
      return response.data;
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useVerfMutation = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  return useMutation(
    async (verfData: VerfFormData) => {
      const response = await axiosInstance.post("/auths/verify", verfData);
      return response.data;
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useCheckCodeMutation = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  return useMutation(
    async (verfData: CheckEmailFormData) => {
      const { email, code, deviceId } = verfData;
      const response = await axiosInstance.post(
        `/auths/checkCodeByEmail?email=${email}&code=${code}&deviceId=${deviceId}`,
        verfData
      );
      return response.data;
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useReVerfMutation = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  return useMutation(
    async (verfData: ReVerfFormData) => {
      const { email, deviceId } = verfData;
      const response = await axiosInstance.post(
        `/auths/resendCodeToEmail?email=${email}&deviceId=${deviceId}`
      );
      return response.data;
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useUpdatePassword = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  return useMutation(
    async (updatePass: UpdatePasswordForm) => {
      const { email, newPassword } = updatePass;
      const response = await axiosInstance.put(
        `/users/updatePassword?email=${email}&newPassword=${newPassword}`
      );
      return response.data;
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useCheckUpdatePassMutation = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  return useMutation(
    async (verfData: CheckUpdatePassData) => {
      const { email, code, password } = verfData;
      const response = await axiosInstance.post(
        `/users/checkUpdatedPassword?email=${email}&code=${code}&password=${password}`
      );
      return response.data;
    },
    {
      onSuccess,
      onError,
    }
  );
};


export const useCheckUpdateEmailMutation = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  return useMutation(
    async (verfData: CheckUpdateEmailData) => {
      const { oldEmail, code, newEmail } = verfData;
      const response = await axiosInstance.post(
        `/users/checkUpdatedEmail`, {}, {
        params: { oldEmail, code, newEmail },
      }
      );
      return response.data;
    },
    {
      onSuccess,
      onError,
    }
  );
};