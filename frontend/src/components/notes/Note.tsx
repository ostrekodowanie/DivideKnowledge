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
    likes: number
}

type NoteRouteProp = RouteProp<NoteStackParams, 'Note'>

export default function Note({ route }: { route: NoteRouteProp}) {
    const tw = useTailwind()
    const [saved, setSaved] = useState(false)
    const { id } = useAppSelector(state => state.login.user)
    const { title, desc, image } = route.params
    const note_id = route.params.id
 
    const handleAdd = async () => {
        const resp = await axios.post(`${BASE_URL}/api/notes/favourites/add`, JSON.stringify({ user_id: id, note_id }), {
            headers: { 'Content-Type': 'application/json' }
        })
        if(resp.status === 200) return setSaved(true)
    }

    return (
        <View style={tw('p-6 flex-1')}>
            <Image style={{...styles.imageContain, ...tw('w-full h-36')}} source={{
                uri: image
            }} />
            <Text style={{fontFamily: 'Bold', ...tw('text-xl')}}>{title}</Text>
            <Text style={{fontFamily:'Medium', ...tw('text-fontLight')}}>{desc}</Text>
            {saved ? <PrimaryButton style="mt-auto w-full" text="Zapisz" onPress={handleAdd} /> : <PrimaryButton style="mt-auto w-full" text="Zapisano" onPress={() => {}} />}
        </View>
    )
}