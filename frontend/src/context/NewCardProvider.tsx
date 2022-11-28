import { createContext } from 'react'
import { AddedFlashCardProps } from '../components/flashcards/AddCard'

export const initialNewCard: AddedFlashCardProps = {
    category: '',
    topic: '',
    question: '',
    type: null,
    answers: []
}

export const NewCardContext = createContext<{newCard: AddedFlashCardProps, setNewCard: any}>({
    newCard: initialNewCard,
    setNewCard: undefined
})