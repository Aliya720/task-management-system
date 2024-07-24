import { UserDataType } from "../../context/auth.types"

export type EditProfileFormType = {
    firstName?: string,
    secondName?: string,
    userName?: string,
    password?: string,
    confirmPassword?: string,
    image: string,
    email: string
}

export type UpdateUserProp =
    {
        user: UserDataType
    }