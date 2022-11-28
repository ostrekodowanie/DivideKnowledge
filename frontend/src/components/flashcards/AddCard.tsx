import { Pressable, Text, TextInput, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { useEffect, useState, useContext } from 'react'
import axios from "axios";
import { AnswerType, FlashCardProps } from "./FlashCard";
import SelectDropdown from "react-native-select-dropdown";
import { BASE_URL } from "../../constants/baseUrl";
import { CategoryProps } from "./CategoryList";
import { useAppSelector } from "../../hooks/useAppSelector";
import Loader from "../Loader";
import { TopicProps } from "./TopicList";
import PrimaryButton from "../PrimaryButton";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initialNewCard, NewCardContext } from "../../context/NewCardProvider";
import { NavigationProp } from "@react-navigation/native";

export interface AddedFlashCardProps extends FlashCardProps {
    category: string,
    topic: string
}

type AddCardStackParams = {
    CardForm: undefined,
    QuestionsForm: undefined
}

const AddCardStack = createNativeStackNavigator<AddCardStackParams>()

export default function AddCard() {
    const [newCard, setNewCard] = useState<AddedFlashCardProps>(initialNewCard)

    return (
        <NewCardContext.Provider value={{ newCard, setNewCard }}>
            <AddCardStack.Navigator initialRouteName='CardForm' screenOptions={{
                headerTitleStyle: { fontFamily: 'Bold'}
            }}>
                <AddCardStack.Screen name='CardForm' component={CardForm} options={{
                    headerTitle: 'Dodaj fiszkę'
                }} />
                <AddCardStack.Screen name='QuestionsForm' component={QuestionsForm} options={{
                    title: 'Konstruuj pytanie'
                }} />
            </AddCardStack.Navigator>
        </NewCardContext.Provider>
    )
}

type CardFormNavigationProp = NavigationProp<AddCardStackParams, 'CardForm'>

const CardForm = ({ navigation }: { navigation: CardFormNavigationProp }) => {
    const tw = useTailwind()
    const { id } = useAppSelector(state => state.login.user)
    const [status, setStatus] = useState('')
    const [categories, setCategories] = useState<CategoryProps[]>([])
    const [topics, setTopics] = useState<TopicProps[]>([])
    const { newCard, setNewCard } = useContext(NewCardContext)
    
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
    if(status) return (
        <View style={tw('p-6')}>
            <Text style={{ fontFamily: 'SemiBold', ...tw('text-xl')}}>{(status)}</Text>
        </View>
    )

    return (
        <View style={tw('p-6 flex-1 bg-[#FCFCFC] items-center')}>
            <SelectDropdown 
                data={categories.map(item => item.name)}
                renderCustomizedButtonChild={sel => <View style={tw('items-center')}>
                    <Text style={{fontFamily: 'Bold', ...tw('text-lg')}}>Kategoria pytania</Text>
                    {sel && <Text style={{ fontFamily: 'Bold', ...tw('text-primary')}}>{sel}</Text>}
                </View>}
                buttonStyle={tw(`w-full px-6 ${newCard.category ? 'h-20' : 'h-16'} items-center mb-6 border-stroke border-[2px] rounded-2xl bg-white`)}
                dropdownStyle={tw('rounded-2xl bg-white')}
                onSelect={item => setNewCard((prev: AddedFlashCardProps) => ({ ...prev, category: item }))}
                buttonTextAfterSelection={text => text}
                rowTextForSelection={text => text}

            />
            <SelectDropdown 
                data={topics.map(item => item)}
                renderCustomizedButtonChild={sel => <View style={tw('items-center')}>
                    <Text style={{fontFamily: 'Bold', ...tw(`text-lg ${!newCard.category ? 'text-[#B6C3B9]' : 'text-black'}`)}}>Temat pytania</Text>
                    {sel && <Text style={{ fontFamily: 'Bold', ...tw('text-primary')}}>{sel}</Text>}
                </View>}
                buttonStyle={tw(`w-full px-6 ${newCard?.topic ? 'h-20' : 'h-16'} items-center mb-6 border-stroke border-[2px] rounded-2xl bg-white`)}
                dropdownStyle={tw('rounded-2xl bg-white')}
                disabled={!newCard.category}
                onSelect={item => setNewCard((prev: AddedFlashCardProps) => ({ ...prev, topic: item }))}
                buttonTextAfterSelection={text => text}
                rowTextForSelection={text => text}
                search={true}
            />
            <SelectDropdown 
                data={['Zamknięte odpowiedzi', 'Wprowadzanie odpowiedzi']}
                renderCustomizedButtonChild={sel => <View style={tw(`items-center`)}>
                    <Text style={{fontFamily: 'Bold', ...tw('text-lg')}}>Typ pytania</Text>
                    {sel && <Text style={{ fontFamily: 'Bold', ...tw('text-primary mt-1')}}>{sel}</Text>}
                </View>}
                buttonStyle={tw(`w-full ${newCard.type ? 'h-20' : 'h-16'} px-6 items-center mb-6 border-stroke border-[2px] rounded-2xl bg-white`)}
                dropdownStyle={tw('rounded-2xl bg-white')}
                onSelect={item => setNewCard((prev: AddedFlashCardProps) => ({ ...prev, type: item === 'Zamknięte odpowiedzi' ? 'radio' : 'input'}))}
                buttonTextAfterSelection={text => text}
                rowTextForSelection={text => text}
            />
            <Pressable onPress={() => newCard.type && navigation.navigate('QuestionsForm')} style={tw(`items-center w-full justify-center px-6 ${newCard.question ? 'h-20' : 'h-16'} mb-6 border-stroke border-[2px] rounded-2xl bg-white`)}>
                <Text style={{ fontFamily: 'Bold', ...tw(`text-lg ${!newCard.type ? 'text-[#B6C3B9]' : 'text-black'}`) }}>Konstruuj pytanie</Text>
                {newCard.question && <Text style={{ fontFamily: 'Bold', ...tw('text-primary')}}>{newCard.question}</Text>}
                </Pressable>
            <PrimaryButton style="mt-auto w-full" onPress={handleAdd} active={Object.values(newCard).every(prop => prop) && newCard.answers[0].content !== ''} text="Dodaj fiszkę" />
        </View>
    )
}

type QuestionsFormNavigationProp = NavigationProp<AddCardStackParams, 'QuestionsForm'>

const QuestionsForm = ({ navigation }: { navigation: QuestionsFormNavigationProp }) => {
    const tw = useTailwind()
    const { newCard, setNewCard } = useContext(NewCardContext)
    const [question, setQuestion] = useState(newCard.question)
    const [wrongAnswers, setWrongAnswers] = useState<AnswerType[]>([])
    const [correctAnswer, setCorrectAnswer] = useState<AnswerType>(newCard.answers.find(ans => ans.correct) || {
        content: '',
        correct: true
    })

    const handleSave = () => {
        setNewCard((prev: AddedFlashCardProps) => {
            return {
                ...prev,
                question,
                answers: [
                    correctAnswer,
                    ...wrongAnswers
                ]
            }
        })
        navigation.goBack()
    }

    return (
        <View style={tw('p-6 flex-1')}>
            <View style={tw('w-full px-10 items-center mb-6 py-4 border-stroke border-[2px] items-center rounded-2xl bg-white')}>
                <Text style={{fontFamily:'Bold', ...tw('text-lg mb-2')}}>Wprowadź treść pytania</Text>
                <View style={tw('border-b-[#E3E8E4] border-b-[3px] py-1')}>
                    <TextInput style={{fontFamily: 'Bold', ...tw('text-lg text-primary')}} placeholderTextColor='#B6C3B9' placeholder="W któym roku Polska przyjęła chrzest?" value={question} onChangeText={text => setQuestion(text)} />
                </View>
            </View>
            <View style={tw('relative mb-4')}>
                <TextInput value={correctAnswer.content} placeholder='Prawidłowa odpowiedź' placeholderTextColor='#B6C3B9' style={{fontFamily: 'SemiBold', ...tw('py-3 px-6 border-[3px] text-lg mt-3 rounded-2xl relative z-10 w-full bg-white border-[#E3E8E4]')}} onChangeText={text => setCorrectAnswer({
                    content: text,
                    correct: true
                })} />
                <View style={tw('absolute left-0 right-0 h-[2rem] bg-[#E3E8E4] -bottom-[0.4rem] rounded-b-2xl')} />
            </View>
            {newCard.type === 'radio' && wrongAnswers.map((answer, i) => <TextInput placeholder="Zła odpowiedź" key={i} onChangeText={text => setWrongAnswers(prev => {
                if(prev.length === 0) return prev
                let newArr = prev
                newArr[i].content = text
                return newArr
            })} />)}
            {newCard.type === 'radio' && wrongAnswers.length < 3 && <View style={tw('relative mb-4')}>
                <Pressable 
                    onPress={() => setWrongAnswers((prev: AnswerType[]) => [...prev, { content: '', correct: false }])}
                    style={tw('bg-white relative border-[3px] border-[#E3E8E4] z-10 rounded-2xl w-full mx-auto py-4 px-12')}
                >
                    <Text style={{fontFamily: 'Bold', ...tw('text-[1.1rem] mx-auto')}}>Dodaj złą odpowiedź</Text>
                </Pressable>
            <View style={tw(`absolute left-0 right-0 h-[2rem] bg-[#E3E8E4] -bottom-[0.4rem] rounded-b-2xl`)} />
            </View>}
            <PrimaryButton style="mt-auto w-full" onPress={handleSave} active={newCard.type === 'radio' ? question !== '' && correctAnswer.content !== '' && wrongAnswers.length > 0 : question !== '' && correctAnswer.content !== ''} text="Zapisz" />
        </View>
    )
}