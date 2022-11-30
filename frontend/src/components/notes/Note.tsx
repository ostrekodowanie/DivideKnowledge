import { RouteProp } from "@react-navigation/native";
import axios from "axios";
import { Image, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { BASE_URL } from "../../constants/baseUrl";
import styles from "../../constants/styles";
import { useAppSelector } from "../../hooks/useAppSelector";
import { NoteStackParams } from "../../screens/NotesScreen";
import PrimaryButton from "../PrimaryButton";
import { useState } from 'react'

export interface NoteProps {
    id: number,
    title: string,
    desc: string,
    image: string,
    category: string,
    likes: number,
    is_liked: boolean
}

type NoteRouteProp = RouteProp<NoteStackParams, 'Note'>

export default function Note({ route }: { route: NoteRouteProp}) {
    const tw = useTailwind()
    const { title, desc, image, is_liked } = route.params
    const [liked, setLiked] = useState(is_liked)
    const { id } = useAppSelector(state => state.login.user)
    const note = route.params.id
 
    const handleAdd = async () => {
        const resp = await axios.post(`${BASE_URL}/api/notes/like/add`, JSON.stringify({ user: id, note }), {
            headers: { 'Content-Type': 'application/json' }
        })
        if(resp.status === 201) return setLiked(true)
    }

    const handleRemove = async () => {
        const resp = await axios.delete(`${BASE_URL}/api/notes/like/remove/${id}/${note}`)
        if(resp.status === 204) return setLiked(false)
    }

    return (
        <View style={tw('p-6 flex-1 bg-white')}>
            <Image style={{...styles.imageContain, ...tw('w-full h-36')}} source={{
                uri: image
            }} />
            <Text style={{fontFamily: 'Bold', ...tw('text-xl')}}>{title}</Text>
            <Text style={{fontFamily:'Medium', ...tw('text-fontLight')}}>{desc}</Text>
            {!liked ? <PrimaryButton style="mt-auto w-full" text="Polub" onPress={handleAdd} /> : <PrimaryButton style="mt-auto w-full" onPress={handleRemove} text='Polubiono' />}
        </View>
    )
}