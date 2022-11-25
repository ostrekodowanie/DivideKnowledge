import axios from "axios";
import { Pressable, Text, View } from "react-native";
import { useState, useEffect } from 'react'
import { BASE_URL } from "../../constants/baseUrl";
import { useAppSelector } from "../../hooks/useAppSelector";
import { FlashCardProps } from "../flashcards/FlashCard";
import Loader from "../Loader";
import { useTailwind } from "tailwind-rn/dist";

export interface FlashListProps {
    name: string,
    flashcards: FlashCardProps[]
}

export default function FlashLists() {
    const tw = useTailwind()
    const [loading, setLoading] = useState(true)
    const [flashLists, setFlashLists] = useState<FlashListProps[]>([])
    const auth = useAppSelector(state => state.login)
    const { id } = auth.user
    const { access } = auth.tokens

    useEffect(() => {
        axios.get(`${BASE_URL}/api/flashlists/user/${id}`, { headers: { 'Authorization': 'Bearer ' + access }})
            .then(res => res.data)
            .then(data => setFlashLists(data))
            .finally(() => setLoading(false))
    }, [])

    if(loading) return <Loader />
    if(flashLists.length === 0) return <Pressable><Text style={{ fontFamily: 'Bold' }}>Dodaj FiszkoListę</Text></Pressable>

    return (
        <View style={tw('p-4')}>
            {flashLists.map(list => <FlashListRef {...list} key={list.name} />)}
        </View>
    )
}

const FlashListRef = ({ name }: FlashListProps) => {
    return (
        <Pressable>
            <Text style={{ fontFamily: 'Bold' }}>{name}</Text>
        </Pressable>
    )
}