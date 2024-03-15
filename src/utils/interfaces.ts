export interface RegisterUser {
    email: string,
    name: string,
    password: string
}

export interface LoginCreds {
    email: string,
    password: string
}

export interface UpdatePassword {
    email: string,
    oldPassword: string,
    newPassword: string,
}


export interface UpdateUser {
    email: string,
    age: number,
    weight: number,
    height: number
}

interface Code {
    code: number
}

export interface RegisterResponse extends Code {
    message?: string,
    error?: string
}

export interface UpdateResponse extends Code {
    error?: string,
    message?: string
}

export interface PasswordResponse extends Code {
    message?: string,
    error?: string,
}

export interface ProfileResponse extends Code {
    details?: any
    error?: string
}