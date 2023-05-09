import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userEndpoint = {
    signIn:"user/signin",
    signUp:"user/signup",
    getInfo:"user/info",
    passwordUpdate:"user/update-password",
};

const userApi = {
    signIn: async ({username,password}) =>{
        try {
            const response = await publicClient.post(
                userEndpoint.signIn,
                {username,password}
            )
            return {response}
        } catch (err) {return {err}}
    },
    signUp: async ({username,password,confirmPassword,displayName}) =>{
        try {
            const response = await publicClient.post(userEndpoint.signUp, {
              username,
              password,
              confirmPassword,
              displayName,
            });
            return { response };
        } catch (err) {return {err}}
    },
    getInfo: async () =>{
        try {
            const res = await privateClient.get(userEndpoint.getInfo);
            return { res };
        } catch (error) {return {error}}
    },
    passwordUpdate: async ({password,newPassword,confirmNewPassword}) =>{
        try {
            const res = await privateClient.put(userEndpoint.passwordUpdate, {
              password,
              newPassword,
              confirmNewPassword,
            });
            return { res };
        } catch (error) {return {error}}
    }
};

export default userApi;