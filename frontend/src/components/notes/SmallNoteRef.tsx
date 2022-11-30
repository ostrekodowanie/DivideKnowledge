import { Image, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { NoteProps } from "./Note";

export default function SmallNoteRef({ title, image, style }: NoteProps & { style?: string }) {
    const tw = useTailwind()
    return (
        <View style={style ? tw(style) : {}}>
            <Image style={tw('w-12')} source={{
                uri: image
            }} />
            <Text style={{fontFamily: 'Bold', ...tw('text-lg')}}>{title}</Text>
        </View>
    )
}