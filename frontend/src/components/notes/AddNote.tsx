import { Image, Pressable, ScrollView, Text } from "react-native";
import { NoteProps } from "./Note";
import { useState } from 'react'
import { useTailwind } from "tailwind-rn/dist";
import PrimaryInput from "../PrimaryInput";
import * as ImagePicker from 'expo-image-picker'
import styles from "../../constants/styles";
import PrimaryButton from "../PrimaryButton";
import axios from "axios";
import { BASE_URL } from "../../constants/baseUrl";
import { useAppSelector } from "../../hooks/useAppSelector";

export default function AddNote() {
    const tw = useTailwind()
    const { id } = useAppSelector(state => state.login.user)
    const [newNote, setNewNote] = useState<NoteProps>({
        title: '',
        desc: '',
        image: {
            uri: '',
            name: '',
            type: ''
        },
        category: ''
    })

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })

        if(!result.canceled) {
            let imageUri = result.assets[0].uri
            let imageName = imageUri.split('/').pop()
            let match = /\.(\w+)$/.exec(imageName ? imageName : '');
            let type: string = match ? `image/${match[1]}` : `image`;
            let image = {
                uri: imageUri,
                name: imageName ? imageName : '',
                type
            }
            setNewNote(prev => ({ ...prev, image: image }))
        }
    }

    const handleSubmit = async () => {
        const form = new FormData()

        form.append('user', JSON.stringify({ id }))
        form.append('title', newNote.title)
        form.append('desc', newNote.desc)
        form.append('image', JSON.stringify(newNote.image))
        form.append('category', newNote.category)

        console.log(form)

        try {
            const response = await axios.post(`${BASE_URL}/api/notes/create`, JSON.stringify(newNote), {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(response.data)
        }
        catch(err) {
            console.log(err)
        }
    }

    return (
        <ScrollView style={tw('p-4 flex-1')}>
            <Pressable onPress={pickImage}><Text style={tw('text-blue-400 mb-4 mx-auto')}>Wybierz zdjęcie</Text></Pressable>
            {newNote.image.uri && <Image style={{...styles.imageContain, ...tw('w-full h-[10rem]')}} source={{
                uri: newNote.image.uri
            }} />}
            <PrimaryInput field="title" setState={setNewNote} label='Tytuł' />
            <PrimaryInput field="desc" setState={setNewNote} label='Opis' />
            <PrimaryInput field="category" setState={setNewNote} label='Kategoria' />
            <PrimaryButton onPress={handleSubmit} style={'mt-8'} text='Zatwierdź' />
        </ScrollView>
    )
}