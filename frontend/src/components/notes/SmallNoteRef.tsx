import { Image, Pressable, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { NoteProps } from "./Note";

export default function SmallNoteRef({ title, image, style, onPress }: NoteProps & { style?: string, onPress: () => any }) {
    const tw = useTailwind()
    return (
        <Pressable onPress={onPress} style={style ? tw(style) : {}}>
            <Image style={tw('w-28 h-28 mb-2 rounded')} source={{
                uri: image
            }} />
            <Text style={{fontFamily: 'Bold', ...tw('text-lg w-28')}}>{title}</Text>
        </Pressable>
    )
}