export type UserDataType = {
    firstName: string,
    secondName: string,
    username: string,
    email: string,
    password: string,
    image: string,
    uid: string,
}

export type UserList = {
    users: UserDataType[]
}

export type AuthType = {
    user: UserDataType | null;
    isAuthenticated: boolean
    signIn: (userData: UserDataType) => void;
    signOut: () => void;
    signUp: (userData: UserDataType) => void;
} 