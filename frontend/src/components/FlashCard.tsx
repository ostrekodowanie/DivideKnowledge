import { Pressable, SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native";
import { useState, useEffect, useContext } from 'react'
import { useTailwind } from "tailwind-rn/dist";
import { AnswerContext } from "../context/AnswerProvider";

export interface AnswerType {
    id?: number,
    content: string,
    correct: boolean,
}

export interface FlashCardProps {
    question: string,
    type: 'radio' | 'input' | null,
    answers: AnswerType[]
}

export default function FlashCard(props: FlashCardProps) {
    const tw = useTailwind()
    const [status, setStatus] = useState<'correct' | 'wrong' | undefined>(undefined)
    const { answers, type, question } = props
    const { answer } = useContext(AnswerContext)

    useEffect(() => {
        if(!answer) return
        let correct = props.answers.find(ans => ans.correct)
        if(correct?.content === answer) setStatus('correct')
        else setStatus('wrong')
    }, [answer])

    useEffect(() => {
        return () => setStatus(undefined)
    }, [props])

    return (
        <SafeAreaView style={tw('flex-1 items-center justify-center')}>
            <Text style={tw('font-bold text-3xl text-center')}>{question.split("[input]").join(".....")}</Text>
            {type === 'radio' && answers.map(answer => <RadioAnswer {...answer} key={answer.id} />)}
            {type === 'input' && <InputAnswer />}
            {status && <Text style={status === 'correct' ? tw('text-green-400') : tw('text-red-400')}>{status}</Text>}
        </SafeAreaView>
    )
}


const RadioAnswer = (props: AnswerType) => {
    const { setAnswer } = useContext(AnswerContext)
    return <TouchableOpacity onPress={() => setAnswer(props.content)}><Text>{props.content}</Text></TouchableOpacity>
}

const InputAnswer = () => {
    const [input, setInput] = useState('')
    const { setAnswer } = useContext(AnswerContext)
    return (
        <>
            <TextInput placeholder="Odpowiedź" onChangeText={text => setInput(text.toLowerCase())} />
            <Pressable onPress={() => setAnswer(input)}><Text>Zatwierdź</Text></Pressable>
        </>
    )
}