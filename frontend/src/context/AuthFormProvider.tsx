import { createContext } from 'react'

export const AuthFormContext = createContext<{authFormIndex: 0 | 1, setAuthFormIndex: any}>({
    authFormIndex: 0,
    setAuthFormIndex: undefined
})