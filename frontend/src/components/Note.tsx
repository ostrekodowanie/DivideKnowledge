import { RouteProp } from "@react-navigation/native";
import { Text, View } from "react-native";
import { NoteStackParams } from "../screens/NotesScreen";
import { FlashCardProps } from "./FlashCard";

export interface NoteProps {
    title: string,
    desc: string
}

type NoteRouteProp = RouteProp<NoteStackParams, 'Note'>

export default function Note({ route }: { route: NoteRouteProp}) {
    return (
        <View>
        </View>
    )
}