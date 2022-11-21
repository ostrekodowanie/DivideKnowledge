import { RouteProp, useRoute } from '@react-navigation/native'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { BASE_URL } from '../constants/baseUrl'
import { AnswerContext } from '../context/AnswerProvider'
import { CategoryStackParams } from '../screens/FlashCardsScreen'
import FlashCard, { FlashCardProps } from './FlashCard'
import Loader from './Loader'

type GeneratorRouteProps = RouteProp<CategoryStackParams, 'FlashCardsGenerator'>

export default function FlashCardsGenerator() {
    const { params } = useRoute<GeneratorRouteProps>()
    const { name } = params
    const [activeCard, setActiveCard] = useState<FlashCardProps | null>(null)
    const [answer, setAnswer] = useState('')

    useEffect(() => {
        axios.get(`${BASE_URL}/api/flashcards/filter?c=${name}`)
            .then(res => res.data)
            .then(data => setActiveCard(data[0]))
            .catch(err => alert(err))
    }, [answer])

    if(!activeCard) return <Loader />
    return <AnswerContext.Provider value={{ answer, setAnswer }}>
        <FlashCard {...activeCard} />
    </AnswerContext.Provider>
}
