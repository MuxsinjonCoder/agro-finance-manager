import axiosInstance from "../axios";


export default {
    checkUserByEmail: (email: string | undefined) => axiosInstance.post(`/users/checkByGoogleEmail?email=${email}`, ),
};