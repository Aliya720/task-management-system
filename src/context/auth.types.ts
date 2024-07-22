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
    signIn: (userData: User) => void;
    logOut: () => void;
    signUp: (userData: UserDataType) => void;
    setUserData: React.Dispatch<React.SetStateAction<UserDataType | null>>
    userCredential: User | undefined
    userList: string[]
} 