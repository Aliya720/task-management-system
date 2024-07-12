export type UserDataType = {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
    image: string
}

export type UserList = {
    users: UserDataType[]
}

export type AuthType = {
    user: UserDataType | null;
    isAuthenticated: boolean
    signIn: (userData: UserDataType) => void;
    signUp: (userData: UserDataType) => void;
    signOut: () => void;
} 