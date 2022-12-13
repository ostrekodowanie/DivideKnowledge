import { RouteProp } from "@react-navigation/native";
import axios from "axios";
import { Image, Pressable, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { BASE_URL } from "../../constants/baseUrl";
import { useAppSelector } from "../../hooks/useAppSelector";
import { NoteStackParams } from "../../screens/NotesScreen";
import { useState, useEffect } from 'react'
import Loader from "../Loader";
import LikeIcon from '../../../assets/icons/note_like.svg'

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
    const { title, desc, image, is_liked, likes, category } = route.params
    const { id } = useAppSelector(state => state.login.user)
    const note = route.params.id
    const [loading, setLoading] = useState(true)
    const [details, setDetails] = useState({
        image,
        likes,
        is_liked
    })
 
    const handleAdd = async () => {
        console.log(note)
        const resp = await axios.post(`${BASE_URL}/api/notes/like/add`, JSON.stringify({ user: id, note }), {
            headers: { 'Content-Type': 'application/json' }
        })
        if(resp.status === 201) return setDetails(prev => ({ ...prev, is_liked: true}))
    }

    const handleRemove = async () => {
        const resp = await axios.delete(`${BASE_URL}/api/notes/like/remove/${id}/${note}`)
        if(resp.status === 204) return setDetails(prev => ({ ...prev, is_liked: false}))
    }

    useEffect(() => {
        axios.get(`${BASE_URL}/api/notes/${note}?u=${id}`)
            .then(res => res.data)
            .then(data => setDetails(data))
            .finally(() => setLoading(false))
    }, [])

    if(loading) return <View style={tw('flex-1 bg-white justify-center items-center')}><Loader /></View>

    return (
        <View style={tw('flex-1 bg-white')}>
            <Image style={tw('w-full h-[20rem]')} source={{
                uri: image
            }} />
            <View style={tw('px-6 py-8')}>
                <View style={tw('justify-between items-center flex-row')}>
                    <View style={tw('items-start flex-col flex-1')}>
                        <Text style={{fontFamily: 'Bold', ...tw('text-2xl mb-2')}}>{title}</Text>
                        <Text style={{ fontFamily: 'SemiBold', ...tw('text-xl text-primary')}}>{category}</Text>
                    </View>
                    <Pressable style={tw('h-14 w-14 rounded-2xl border-stroke border-[2px] items-center justify-center')} onPress={!details.is_liked ? handleAdd : handleRemove}>
                        <LikeIcon stroke={details.is_liked ? '#FF0000' : '#212C24'} strokeWidth={2} fill={details.is_liked ? '#FF0000' : 'none'} />
                    </Pressable>
                </View>
                <Text style={{fontFamily:'Medium', ...tw('text-desc text-lg my-4')}}>{desc}</Text>
            </View>
        </View>
    )
}