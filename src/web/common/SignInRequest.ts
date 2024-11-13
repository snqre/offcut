export type SignInRequest = {
    username: string;
    password: string;
};

export const SignInRequest = ({username, password}: SignInRequest) => ({username, password});