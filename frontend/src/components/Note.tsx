import { Text, View } from "react-native";

export interface NoteProps {
    title: string,
    desc: string
}

export default function Note(props: NoteProps) {
    return (
        <View>
            <Text>{props.title}</Text>
        </View>
    )
}