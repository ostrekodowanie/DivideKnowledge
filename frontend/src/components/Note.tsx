import { RouteProp } from "@react-navigation/native";
import { Text, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { NoteStackParams } from "../screens/NotesScreen";

export interface NoteProps {
    title: string,
    desc: string
}

type NoteRouteProp = RouteProp<NoteStackParams, 'Note'>

export default function Note({ route }: { route: NoteRouteProp}) {
    const tw = useTailwind()
    const { title, desc } = route.params
    return (
        <View>
            <Text style={tw('font-bold text-xl')}>{title}</Text>
            <Text>{desc}</Text>
        </View>
    )
}