import { Pressable, Text, TextInput, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { useEffect, useState } from 'react'
import axios from "axios";
import { FlashCardProps } from "./FlashCard";
import SelectDropdown from "react-native-select-dropdown";
import { BASE_URL } from "../../constants/baseUrl";
import { CategoryProps } from "./CategoryList";
import { useAppSelector } from "../../hooks/useAppSelector";
import Loader from "../Loader";
import { TopicProps } from "./TopicList";

interface AddedFlashCardProps extends FlashCardProps {
    category: string,
    topic: string
}

export default function AddCard() {
    const tw = useTailwind()
    const { id } = useAppSelector(state => state.login.user)
    const [status, setStatus] = useState('')
    const [categories, setCategories] = useState<CategoryProps[]>([])
    const [topics, setTopics] = useState<TopicProps[]>([])
    const [newCard, setNewCard] = useState<AddedFlashCardProps>({
        category: '',
        topic: '',
        question: '',
        type: null,
        answers: [
            { content: '', correct: true }
        ]
    })

    useEffect(() => {
        axios.get(`${BASE_URL}/api/flashcards/categories`)
            .then(res => res.data)
            .then(data => setCategories(data))
            .catch(err => alert(err))
    }, [])

    useEffect(() => {
        setTopics([])
        if(newCard.category) axios.get(`${BASE_URL}/api/flashcards/topics/search?c=${newCard.category}`)
            .then(res => res.data)
            .then(data => setTopics(data))
            .catch(() => setStatus('Error'))
    }, [newCard.category])

    const handleAdd = () => {
        setStatus('loading')
        let postedCard = {
            id,
            ...newCard
        }
        axios.post(`${BASE_URL}/api/flashcards/create`, JSON.stringify(postedCard), {
            headers: { 'Content-Type': 'application/json' }
        }).then(() => setStatus('Twoja fiszka została wysłana do weryfikacji!'))
        .catch(err => setStatus(err))
    }

    if(status === 'loading') return <Loader />
    
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
                data={topics.map(item => item)}
                defaultButtonText='Wybierz temat pytania'
                buttonStyle={tw('w-full')}
                disabled={topics.length === 0}
                onSelect={item => setNewCard(prev => ({ ...prev, topic: item }))}
                buttonTextAfterSelection={text => text}
                rowTextForSelection={text => text}
                search={true}
            />
            <SelectDropdown 
                data={['Wybór', 'Wprowadzanie']}
                defaultButtonText='Wybierz typ pytania'
                buttonStyle={tw('w-full')}
                onSelect={item => setNewCard(prev => ({ ...prev, type: item === 'Wprowadzanie' ? 'input' : 'radio'}))}
                buttonTextAfterSelection={text => text}
                rowTextForSelection={text => text}
            />
            <TextInput style={tw('text-lg mb-4')} placeholder="Pytanie" onChangeText={text => setNewCard(prev => ({ ...prev, question: text}))} />
            {newCard.type && <TextInput placeholder="Prawidłowa odpowiedź" style={tw('text-lg')} onChangeText={text => setNewCard(prev => {
                let indexOfCorrect = prev.answers.findIndex(item => item.correct)
                let newArr = prev.answers
                newArr[indexOfCorrect].content = text
                return { ...prev, answers: newArr }
            })} />}
            {newCard.type && newCard.type === 'radio' &&
                <>
                    {newCard.answers.map((answer, i) => <TextInput placeholder="Zła odpowiedź" key={i} onChangeText={text => setNewCard(prev => {
                        let newArr = prev.answers
                        newArr[i].content = text
                        newArr[i].correct = false
                        return { ...prev, answers: newArr}
                    })} />)}
                    <Pressable 
                        onPress={() => {
                            if(newCard.answers.length > 3) return
                            setNewCard(prev => {
                            let newArr = [...prev.answers, { content: '', correct: false }]
                            return { ...prev, answers: newArr }
                        })}} 
                        style={tw('bg-blue-400 py-3 px-6')}
                    >
                        <Text style={tw('font-medium text-white')}>Dodaj złą odpowiedź</Text>
                    </Pressable>
                </>
            }
            <Pressable style={tw('bg-primary py-3 px-6 mt-8')} onPress={handleAdd}><Text style={tw('text-white rounded font-medium')}>Dodaj</Text></Pressable>
        </View>
    )
}