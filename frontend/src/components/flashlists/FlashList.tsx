import { RouteProp } from "@react-navigation/native";
import axios from "axios";
import { useState, useEffect } from 'react'
import { Text, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { BASE_URL } from "../../constants/baseUrl";

import Loader from "../Loader";
import { FlashListCard, FlashListStackParams } from "../profile/FlashLists";
import CardChooser from "./CardChooser";

export default function FlashList({ route }: { route: RouteProp<FlashListStackParams, 'FlashList'> }) {
    const tw = useTailwind()
    const { flashcards } = route.params
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState<boolean | undefined>(undefined)
    const [selected, setSelected] = useState<number[]>([])
    
    const removeCards = () => {
        setLoading(true)
        axios.delete(`${BASE_URL}/api/flashlists/remove?ids=${selected.join(",")}`)
            .then(() => setStatus(true))
            .catch(() => setStatus(false))
            .finally(() => setLoading(false))
    }
    
    return (
        <View style={tw('flex-1 bg-white p-6')}>
            <CardChooser />
            <View style={tw('justify-between flex-row my-6')}>
                <Text style={{fontFamily: 'ExtraBold', ...tw('text-xl')}}>Fiszki w tej FiszkoLiście</Text>
                <TouchableOpacity onPress={removeCards}><Text style={{ fontFamily: 'SemiBold', ...tw('text-lg text-red-400')}}>Usuń zaznaczone</Text></TouchableOpacity>
            </View>
            {loading ? <Loader /> : flashcards.length > 0 ? flashcards.map((card, i) => <FlashCardRef setSelected={setSelected} {...card} index={i + 1} key={card.question} />) : <Text style={{fontFamily: 'SemiBold', ...tw('text-xl text-red-400')}}>Brak fiszek w tej liście!</Text>}
        </View>
    )
}

const FlashCardRef = ({ question, type, index, topic, id, setSelected }: FlashListCard & { index: number, setSelected: any, topic: string }) => {
    const tw = useTailwind()
    const [isSelected, setIsSelected] = useState(false)
    useEffect(() => {
        if(isSelected) setSelected((prev: number[]) => {
            if(prev.includes(id)) return prev
            return [...prev, id]
        })
        if(!isSelected) setSelected((prev: number[]) => {
            if(prev.includes(id)) return prev.filter(val => val !== id)
            return prev
        })
    }, [isSelected])
    return (
        <View style={tw('w-full border-stroke flex-row rounded-xl mb-4')}>
            <Text style={{ fontFamily: 'Bold', ...tw('text-lg')}}>{index}. </Text>
            <View>
                <Text style={{fontFamily: 'Bold', ...tw('text-lg')}}>{question.split('[input]').join(" . . . . ")}</Text>
                <Text style={{ fontFamily: 'Medium', ...tw('text-fontLight')}}>Typ fiszki: {type === 'radio' ? 'Wybór odpowiedzi' : 'Wprowadzanie odpowiedzi'}</Text>
                <Text style={{ fontFamily: 'Medium', ...tw('text-fontLight')}}>Temat fiszki: {topic}</Text>
                {/* {answers.length > 0 && answers.map(answ => <Text style={{fontFamily: 'Medium', ...tw(answ.correct ? 'text-primary' : 'text-red-400')}}>{answ.content}</Text>)}       */}
            </View>
            <TouchableOpacity onPress={() => setIsSelected(prev => !prev)} style={tw('my-auto ml-auto')}><Text style={{fontFamily: 'Bold', ...tw('text-green-400 text-3xl')}}>{isSelected ? '✔' : '❌'}</Text></TouchableOpacity>
        </View>
    )
}