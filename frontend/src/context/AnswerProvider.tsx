import { createContext } from 'react'

export const AnswerContext = createContext<{answer: string, setAnswer: any}>({
    answer: '',
    setAnswer: undefined
})