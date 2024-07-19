import { User } from "firebase/auth"

export type UserDataType = {
    firstName: string,
    secondName: string,
    username: string,
    email: string,
    password: string,
    image: string,
    uid: string,
}



export type AuthType = {
    userData: UserDataType | null;
    isAuthenticated: boolean
    signIn: (userData: User) => void;
    signOut: () => void;
    signUp: (userData: User) => void;
    setUserData: React.Dispatch<React.SetStateAction<UserDataType | null>>
    userCredential: User | undefined
    userNameList: string[]
} 