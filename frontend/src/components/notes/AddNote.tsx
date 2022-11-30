import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { NoteProps } from "./Note";
import { useEffect, useState } from 'react'
import { useTailwind } from "tailwind-rn/dist";
import PrimaryInput from "../PrimaryInput";
import * as ImagePicker from 'expo-image-picker'
import styles from "../../constants/styles";
import PrimaryButton from "../PrimaryButton";
import axios from "axios";
import { BASE_URL } from "../../constants/baseUrl";
import { useAppSelector } from "../../hooks/useAppSelector";
import Loader from "../Loader";
import { CategoryProps } from "../flashcards/CategoryList";
import SelectDropdown from "react-native-select-dropdown";

type N = Omit<NoteProps, 'image' | 'likes' | 'id' | 'category' | 'is_liked'>

type AddedNoteProps = N & {
    image: {
        uri: string,
        name: string,
        type: string
    },
    category: Omit<CategoryProps, 'image'>
}

export default function AddNote() {
    const tw = useTailwind()
    const { id } = useAppSelector(state => state.login.user)
    const [status, setStatus] = useState<string | boolean>('')
    const [newNote, setNewNote] = useState<AddedNoteProps>(initialNote)
    const [categories, setCategories] = useState<CategoryProps[]>([])

    useEffect(() => {
        axios.get(`${BASE_URL}/api/notes/categories`)
            .then(res => res.data)
            .then(data => setCategories(data))
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
            setNewNote(prev => ({ ...prev, image }))
        }
    }

    const handleSubmit = async () => {
        setStatus('loading')
        const form = new FormData()

        form.append('user', String(id))
        form.append('title', newNote.title)
        form.append('desc', newNote.desc)
        // @ts-ignore
        form.append('image', newNote.image)
        form.append('category', String(newNote.category.id))

        try {
            const response = await axios.postForm(`${BASE_URL}/api/notes/create`, form)
            if(response.status === (201 || 200)) return setStatus(true)
        } catch(err: any) {
            setStatus("Nie ma takiej kategorii!")
            return console.log(err.response)
        }
    }

    const handleReset = () => {
        setNewNote(initialNote)
        setStatus('')
    }

    if(status === 'loading') return <Loader />
    
    return (
        <ScrollView style={tw('p-6 relative bg-white')}>
            <TouchableOpacity onPress={pickImage}><Text style={{fontFamily: 'SemiBold', ...tw('text-blue-400 text-lg mb-4 mx-auto')}}>Wybierz zdjęcie</Text></TouchableOpacity>
            {newNote.image.uri && <Image style={{...styles.imageContain, ...tw('w-full h-[10rem]')}} source={{
                uri: newNote.image.uri
            }} />}
            <PrimaryInput field="title" value={newNote.title} setState={setNewNote} label='Tytuł' />
            {newNote.title.length > 16 && <Text style={{fontFamily: 'SemiBold', ...tw('text-red-400 mb-4')}}>Tytuł nie może przekraczać 16 znaków!</Text>}
            <PrimaryInput field="desc" value={newNote.desc} setState={setNewNote} label='Opis' />
            <Text style={{fontFamily: 'SemiBold', ...tw(`${newNote.desc.length < 50 ? 'text-fontLight' : 'text-red-400'} mb-4`)}}>{newNote.desc.length} / 50</Text>
            {categories.length > 0 ? <SelectDropdown 
                data={categories.map(item => item)}
                buttonStyle={tw(`w-full px-6 items-center mb-6 border-stroke border-[2px] rounded-2xl bg-white`)}
                dropdownStyle={tw('rounded-2xl bg-white')}
                defaultButtonText='Kategoria'
                onSelect={item => setNewNote(prev => ({ ...prev, category: item}))}
                buttonTextAfterSelection={item => item.name}
                rowTextForSelection={item => item.name}
            /> : <Loader />}
            {status && typeof status === 'string' && <Text style={{ fontFamily: 'SemiBold', ...tw('text-red-400')}}>{status}</Text>}
            <PrimaryButton onPress={handleSubmit} active={newNote.title !== '' && newNote.image.uri !== '' && newNote.category.name !== '' && newNote.title.length < 16 && newNote.title.length < 50} style={'my-8'} text='Zatwierdź' />
            <Modal style={tw('mx-auto')} visible={status === true} animationType='fade'>
                <View style={tw('px-6 py-4 flex-1 bg-white rounded-xl items-center justify-center ')}>
                    <Image style={{...styles.imageContain, height: 160}} source={require('../../../assets/card_created.png')} />
                    <Text style={{ fontFamily: 'Bold', ...tw('text-2xl mt-6 mb-4')}}>Notatka została utworzona</Text>
                    <Text style={{ fontFamily: 'Medium', fontSize: 18, ...tw('text-center mb-4')}}>Masz do niej dostęp z panelu swoich notatek, zbieraj polubienia i dodawaj kolejne notatki. <Text style={{ fontFamily: 'SemiBold'}}>Życzymy owocnej nauki!</Text></Text>
                    <TouchableOpacity onPress={handleReset}><Text style={{fontFamily: 'Bold', ...tw('text-primary mt-4 text-lg')}}>Dodaj kolejną notatkę</Text></TouchableOpacity>
                </View>
            </Modal>
        </ScrollView>
    )
}

const initialNote: AddedNoteProps = {
    title: '',
    desc: '',
    image: {
        uri: '',
        name: '',
        type: ''
    },
    category: {
        id: -1,
        name: '',
    }
}