import { SafeAreaView, Text, TouchableOpacity } from "react-native";

export interface AnswerType {
    content: string,
    type: 'correct' | 'wrong'
}

export interface FlashCardProps {
    question: string,
    answers: AnswerType[]
}

export default function FlashCard(props: FlashCardProps) {
    return (
        <SafeAreaView>
            <Text>{props.question}</Text>
            {props.answers && props.answers.map(answer => <TouchableOpacity key={answer.content}><Text>{answer.content}</Text></TouchableOpacity>)}
        </SafeAreaView>
    )
}