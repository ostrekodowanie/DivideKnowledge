import { RouteProp, useRoute } from '@react-navigation/native'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { BASE_URL } from '../../constants/baseUrl'
import { AnswerContext } from '../../context/AnswerProvider'
import { CategoryStackParams } from '../../screens/FlashCardsScreen'
import FlashCard, { FlashCardProps } from './FlashCard'
import Loader from '../Loader'

type GeneratorRouteProps = RouteProp<CategoryStackParams, 'FlashCardsGenerator'>

export default function FlashCardsGenerator() {
    const { params } = useRoute<GeneratorRouteProps>()
    const { category, topic } = params
    const [activeCard, setActiveCard] = useState<FlashCardProps | null>(null)
    const [answer, setAnswer] = useState<string | undefined>(undefined)

    useEffect(() => {
        if(answer === '') return
        axios.get(`${BASE_URL}/api/flashcards/filter?c=${category.name}${topic.name && 't=' + topic.name}`)
            .then(res => res.data)
            .then(data => setActiveCard(data[0]))
            .catch(err => alert(err))
    }, [answer])

    useEffect(() => {
        setAnswer('')
    }, [activeCard])

    if(!activeCard) return <Loader />
    return <AnswerContext.Provider value={{ answer, setAnswer }}>
        <FlashCard {...activeCard} />
    </AnswerContext.Provider>
}
