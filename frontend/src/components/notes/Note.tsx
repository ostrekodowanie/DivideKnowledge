import { RouteProp } from "@react-navigation/native";
import { Image, StyleSheet, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import styles from "../../constants/styles";
import { NoteStackParams } from "../../screens/NotesScreen";

export interface NoteProps {
    title: string,
    desc: string,
    image: {
        uri: string,
        name: string,
        type: string
    },
    category: string
}

type NoteRouteProp = RouteProp<NoteStackParams, 'Note'>

export default function Note({ route }: { route: NoteRouteProp}) {
    const tw = useTailwind()
    const { title, desc, image } = route.params
    return (
        <View style={tw('p-4')}>
            <Image style={{...styles.imageCover}} source={{
                uri: image.uri
            }} />
            <Text style={tw('font-bold text-xl')}>{title}</Text>
            <Text>{desc}</Text>
        </View>
    )
}