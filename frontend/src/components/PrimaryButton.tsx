import { useState } from "react"
import { Pressable, Text, View } from "react-native"
import { Style, useTailwind } from "tailwind-rn/dist"

type Button = {
    onPress: () => any,
    text: string,
    style?: string
}

export default function PrimaryButton({ onPress, text, style }: Button) {
    const [isPressed, setIsPressed] = useState(false)
    const tw = useTailwind()

    return (
        <View style={tw(`relative mb-4 ${style ? style : ''}`)}>
            <Pressable onPress={onPress} onPressIn={() => setIsPressed(true)} onPressOut={() => setIsPressed(false)} style={{ transform: isPressed ? [{ translateY: 8 }] : [], ...tw(`bg-primary relative z-10 rounded-2xl w-full mx-auto py-4 px-12`)}}>
                <Text style={{ fontFamily: 'ExtraBold', ...tw('font-medium text-[1.1rem] mx-auto text-white')}}>{text}</Text>
            </Pressable>
            <View style={tw('absolute left-0 right-0 h-[2rem] bg-darkPrimary -bottom-[0.4rem] rounded-b-2xl')} />
        </View>
    )
}