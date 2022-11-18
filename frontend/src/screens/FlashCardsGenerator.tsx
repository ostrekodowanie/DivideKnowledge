import axios from 'axios'
import { useState, useEffect } from 'react'
import { Text } from 'react-native' 
import { FlashCardProps } from '../components/FlashCard'

export default function FlashCardsGenerator() {
    const [activeCard, setActiveCard] = useState<FlashCardProps>()
    useEffect(() => {
        axios.get('http://192.168.1.104:8000/api/flashcards')
            .then(res => res.data)
            .then(data => setActiveCard(data))
    }, [])
    return (
        <>
            <Text>{activeCard?.question}</Text>
            {activeCard?.answers.map((answer: string) => <Text>{answer}</Text>)}
        </>
    )
}