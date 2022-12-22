type AuthContextData = {
    authData?: AuthData;
    loading: boolean;
    logInAsync(email: string, password: string): Promise<void>;
    logOutAsync(): Promise<void>;
};
      
type AuthData = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string,
    jwt: string
};

export { AuthContextData, AuthData };