import axios from 'axios'
import { useState, useEffect } from 'react'
import { BASE_URL } from '../constants/baseUrl'
import { AnswerContext } from '../context/AnswerProvider'
import FlashCard, { FlashCardProps } from './FlashCard'

export default function FlashCardsGenerator() {
    const [activeCard, setActiveCard] = useState<FlashCardProps | null>(null)
    const [answer, setAnswer] = useState('')

    useEffect(() => {
        axios.get(`${BASE_URL}/api/flashcards`)
            .then(res => res.data)
            .then(data => setActiveCard(data[0]))
            .catch(err => alert(err))
    }, [answer])

    if(!activeCard) return <></>
    return <AnswerContext.Provider value={{ answer, setAnswer }}>
        <FlashCard {...activeCard} />
    </AnswerContext.Provider>
}
