import { Pressable, Text, TextInput, View } from "react-native";
import { useState, useEffect, useContext } from 'react'
import { useTailwind } from "tailwind-rn/dist";
import { AnswerContext } from "../../context/AnswerProvider";
import PrimaryButton from "../PrimaryButton";

export interface AnswerType {
    id?: number,
    content: string,
    correct: boolean | undefined
}

export interface FlashCardProps {
    id: number,
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
        <View style={tw('flex-1 p-6 justify-center bg-white')}>
            <Text style={{fontFamily: 'Bold', ...tw('text-3xl text-center')}}>{question.split("[input]").join(".....")}</Text>
            {type === 'radio' && answers.map(answer => <RadioAnswer {...answer} key={answer.id} />)}
            {type === 'input' && <InputAnswer />}
            {status && <Text style={status === 'correct' ? tw('text-green-400') : tw('text-red-400')}>{status}</Text>}
        </View>
    )
}


const RadioAnswer = (props: AnswerType) => {
    const { correct, content } = props
    const { answer, setAnswer } = useContext(AnswerContext)
    const tw = useTailwind()
    const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined)

    useEffect(() => {
        if(!answer || (content !== answer && !correct)) return
        setIsCorrect(correct)
        return () => {
            setIsCorrect(undefined)
        }
    }, [answer])

    return (
        <View style={tw('relative mb-4')}>
            <Pressable style={tw(`py-3 px-6 border-[3px] mt-3 rounded-2xl relative z-10 w-full bg-white  ${isCorrect ? 'bg-[#C2FAD2] border-primary' : isCorrect === false ? 'border-wrong bg-[#FFB1BF]' : 'border-[#E3E8E4]'}`)} onPress={() => setAnswer(content)}><Text style={{ fontFamily: 'Medium', ...tw('text-lg')}}>{content}</Text></Pressable>
            <View style={tw(`absolute left-0 right-0 h-[2rem] bg-darkPrimary -bottom-[0.4rem] rounded-b-2xl ${isCorrect ? 'bg-primary' : isCorrect === false ? 'bg-wrong' : 'bg-[#E3E8E4]'}`)} />
        </View>
    )
}

const InputAnswer = () => {
    const tw = useTailwind()
    const [input, setInput] = useState('')
    const { answer, setAnswer } = useContext(AnswerContext)

    useEffect(() => {
        if(answer) setInput(answer)
        else setInput('')
    }, [answer])

    return (
        <>
            <TextInput style={{fontFamily: 'Medium', ...tw('text-lg my-4')}} placeholder="Odpowiedź" value={input} onChangeText={text => setInput(text.toLowerCase())} />
            <PrimaryButton onPress={() => setAnswer(input)} text="Zatwierdź" />
        </>
    )
}