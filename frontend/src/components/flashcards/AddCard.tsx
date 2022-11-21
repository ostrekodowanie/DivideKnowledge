import { Pressable, Text, TextInput, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { useEffect, useState } from 'react'
import axios from "axios";
import { FlashCardProps } from "../FlashCard";
import SelectDropdown from "react-native-select-dropdown";
import { BASE_URL } from "../../constants/baseUrl";
import { CategoryProps } from "./CategoryList";
import { useAppSelector } from "../../hooks/useAppSelector";
import Loader from "../Loader";

interface AddedFlashCardProps extends FlashCardProps {
    category: string
}

export default function AddCard() {
    const tw = useTailwind()
    const { id } = useAppSelector(state => state.login.user)
    const [status, setStatus] = useState('')
    const [categories, setCategories] = useState<CategoryProps[]>([])
    const [newCard, setNewCard] = useState<AddedFlashCardProps>({
        category: '',
        question: '',
        type: null,
        answers: []
    })

    useEffect(() => {
        axios.get(`${BASE_URL}/api/categories`)
            .then(res => res.data)
            .then(data => setCategories(data))
            .catch(err => alert(err))
    }, [])

    const handleAdd = () => {
        setStatus('loading')
        let postedCard = {
            id,
            ...newCard
        }
        console.log(postedCard)
        axios.post(`${BASE_URL}/api/flashcards/create`, JSON.stringify(postedCard), {
            headers: { 'Content-Type': 'application/json' }
        }).then(() => setStatus('Wysłano do weryfikacji'))
        .catch(err => setStatus(err))
    }

    return (
        <View style={tw('p-4 flex-1 items-center')}>
            <SelectDropdown 
                data={categories.map(item => item.name)}
                defaultButtonText='Wybierz kategorię pytania'
                buttonStyle={tw('w-full')}
                onSelect={item => setNewCard(prev => ({ ...prev, category: item }))}
                buttonTextAfterSelection={text => text}
                rowTextForSelection={text => text}
            />
            <SelectDropdown 
                data={['Wybór', 'Wprowadzanie']}
                defaultButtonText='Wybierz typ pytania'
                buttonStyle={tw('w-full')}
                onSelect={item => setNewCard(prev => ({ ...prev, type: item === 'Wpisywanie' ? 'input' : 'radio'}))}
                buttonTextAfterSelection={text => text}
                rowTextForSelection={text => text}
            />
            <TextInput style={tw('text-lg mb-4')} placeholder="Pytanie" onChangeText={text => setNewCard(prev => ({ ...prev, question: text}))} />
            <TextInput placeholder="Odpowiedź" style={tw('text-lg')} onChangeText={text => setNewCard(prev => ({ ...prev, answers: [{ content: text, correct: true }]}))} />
            <Pressable style={tw('bg-primary py-3 px-6 mt-8')} onPress={handleAdd}><Text style={tw('text-white rounded font-medium')}>Dodaj</Text></Pressable>
            {status === 'loading' && <Loader />}
        </View>
    )
}