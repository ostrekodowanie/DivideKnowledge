import { RouteProp } from "@react-navigation/native";
import axios from "axios";
import { Image, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { BASE_URL } from "../../constants/baseUrl";
import styles from "../../constants/styles";
import { useAppSelector } from "../../hooks/useAppSelector";
import { NoteStackParams } from "../../screens/NotesScreen";
import PrimaryButton from "../PrimaryButton";
import { useState, useEffect } from 'react'
import Loader from "../Loader";

export interface NoteProps {
    id: number,
    title: string,
    desc: string,
    image: string,
    category?: string,
    likes?: number,
    is_liked?: boolean
}

type NoteRouteProp = RouteProp<NoteStackParams, 'Note'>

export default function Note({ route }: { route: NoteRouteProp}) {
    const tw = useTailwind()
    const { title, desc, image, is_liked, likes } = route.params
    const { id } = useAppSelector(state => state.login.user)
    const note = route.params.id
    const [loading, setLoading] = useState(true)
    const [details, setDetails] = useState({
        image,
        likes,
        is_liked
    })
 
    const handleAdd = async () => {
        console.log(note, title)
        const resp = await axios.post(`${BASE_URL}/api/notes/like/add`, JSON.stringify({ user: id, note }), {
            headers: { 'Content-Type': 'application/json' }
        })
        if(resp.status === 201) return setDetails(prev => ({ ...prev, is_liked: true}))
    }

    const handleRemove = async () => {
        const resp = await axios.delete(`${BASE_URL}/api/notes/like/remove/${id}/${note}`)
        if(resp.status === 204) return setDetails(prev => ({ ...prev, is_liked: true}))
    }

    useEffect(() => {
        axios.get(`${BASE_URL}/api/notes/${note}?u=${id}`)
            .then(res => res.data)
            .then(data => setDetails(data))
            .finally(() => setLoading(false))
    }, [])

    if(loading) return <View style={tw('flex-1 bg-white justify-center items-center')}><Loader /></View>

    return (
        <View style={tw('p-6 flex-1 bg-white')}>
            <Image style={{...styles.imageContain, ...tw('w-full h-36')}} source={{
                uri: image
            }} />
            <Text style={{fontFamily: 'Bold', ...tw('text-xl')}}>{title}</Text>
            <Text style={{fontFamily:'Medium', ...tw('text-fontLight')}}>{desc}</Text>
            {!details.is_liked ? <PrimaryButton style="mt-auto w-full" text="Polub" onPress={handleAdd} /> : <PrimaryButton style="mt-auto w-full" onPress={handleRemove} text='Polubiono' />}
        </View>
    )
}