import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
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

type N = Omit<NoteProps, 'image' | 'likes' | 'id' | 'category'>

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
        let { title, desc } = newNote
        if(title.length > 16) return setStatus('Zbyt długi tytuł notatki!')
        if(desc.length > 48) return setStatus('Zbyt długi opis!')
        const form = new FormData()

        form.append('user', String(id))
        form.append('title', newNote.title)
        form.append('desc', newNote.desc)
        // @ts-ignore
        form.append('image', newNote.image)
        form.append('category_id', String(newNote.category.id))

        try {
            const response = await axios.postForm(`${BASE_URL}/api/notes/create`, form)
            if(response.status === (201 || 200)) return setStatus(true)
        } catch(err: any) {
            return setStatus("Nie ma takiej kategorii!")
        }
    }

    const handleReset = () => {
        setNewNote(initialNote)
        setStatus('')
    }

    if(status === 'loading') return <Loader />
    if(status && typeof status === 'string') alert(status)

    return (
        <View style={tw('p-6 flex-1 relative')}>
            <TouchableOpacity onPress={pickImage}><Text style={{fontFamily: 'SemiBold', ...tw('text-blue-400 text-lg mb-4 mx-auto')}}>Wybierz zdjęcie</Text></TouchableOpacity>
            {newNote.image.uri && <Image style={{...styles.imageContain, ...tw('w-full h-[10rem]')}} source={{
                uri: newNote.image.uri
            }} />}
            <PrimaryInput field="title" value={newNote.title} setState={setNewNote} label='Tytuł' />
            <PrimaryInput field="desc" value={newNote.desc} setState={setNewNote} label='Opis' />
            <PrimaryInput field="category" value={newNote.category.name} setState={setNewNote} label='Kategoria' />
            {categories.length > 0 ? <SelectDropdown 
                data={categories.map(item => item.name)}
                renderCustomizedButtonChild={(sel: CategoryProps) => <View style={tw('items-center')}>
                    <Text style={{fontFamily: 'Bold', ...tw('text-lg')}}>Kategoria pytania</Text>
                    {sel && <Text style={{ fontFamily: 'Bold', ...tw('text-primary')}}>{sel.name}</Text>}
                </View>}
                buttonStyle={tw(`w-full px-6 items-center mb-6 border-stroke border-[2px] rounded-2xl bg-white`)}
                dropdownStyle={tw('rounded-2xl bg-white')}
                onSelect={item => setNewNote(prev => ({ ...prev, category: item}))}
                buttonTextAfterSelection={text => text}
                rowTextForSelection={text => text}
            /> : <Loader />}
            <PrimaryButton onPress={handleSubmit} style={'my-8'} text='Zatwierdź' />
            <Modal style={tw('mx-auto')} visible={status === true} animationType='fade'>
                <View style={tw('px-6 py-4 flex-1 bg-white rounded-xl items-center justify-center ')}>
                    <Image style={{...styles.imageContain, height: 160}} source={require('../../../assets/card_created.png')} />
                    <Text style={{ fontFamily: 'Bold', ...tw('text-2xl mt-6 mb-4')}}>Notatka została utworzona</Text>
                    <Text style={{ fontFamily: 'Medium', fontSize: 18, ...tw('text-center mb-4')}}>Masz do niej dostęp z panelu swoich notatek, zbieraj polubienia i dodawaj kolejne notatki. <Text style={{ fontFamily: 'SemiBold'}}>Życzymy owocnej nauki!</Text></Text>
                    <TouchableOpacity onPress={handleReset}><Text style={{fontFamily: 'Bold', ...tw('text-primary mt-4 text-lg')}}>Dodaj kolejną notatkę</Text></TouchableOpacity>
                </View>
            </Modal>
        </View>
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