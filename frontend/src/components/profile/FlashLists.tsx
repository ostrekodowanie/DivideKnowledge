import axios from "axios";
import { Pressable, Text, View } from "react-native";
import { useState, useEffect } from 'react'
import { BASE_URL } from "../../constants/baseUrl";
import { useAppSelector } from "../../hooks/useAppSelector";
import { FlashCardProps } from "../flashcards/FlashCard";

export interface FlashListProps {
    name: string,
    flashcards: FlashCardProps[]
}

export default function FlashLists() {
    const [flashLists, setFlashLists] = useState<FlashListProps[]>([])
    const { id } = useAppSelector(state => state.login.user)

    useEffect(() => {
        axios.get(`${BASE_URL}/api/flashlists/user/${id}`, { headers: { 'Content-Type': 'application/json' }})
            .then(res => res.data)
            .then(data => setFlashLists(data))
    }, [])

    return (
        <View style={{ paddingHorizontal: 4 }}>
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