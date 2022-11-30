import { useState } from "react"
import { Pressable, Text, View } from "react-native"
import { Style, useTailwind } from "tailwind-rn/dist"

type Button = {
    onPress: () => any,
    text: string,
    active?: boolean,
    style?: string | Style
}

export default function PrimaryButton({ onPress, text, style, active = true }: Button) {
    const [isPressed, setIsPressed] = useState(false)
    const tw = useTailwind()

    return (
        <View style={{...tw(`relative mb-4 ${style ? style : ''}`), ...(style && typeof style !== 'string' ? { ...style } : {})}}>
            <Pressable onPress={active ? onPress : () => {}} onPressIn={() => setIsPressed(true)} onPressOut={() => setIsPressed(false)} style={{ transform: isPressed ? [{ translateY: 8 }] : [], ...tw(`${active ? 'bg-primary' : 'bg-[#E0E4E1]'} relative z-10 rounded-2xl w-full mx-auto py-4 px-12`)}}>
                <Text style={{ fontFamily: 'ExtraBold', ...tw(`text-[1.1rem] mx-auto ${active ? 'text-white' : 'text-font'}`)}}>{text}</Text>
            </Pressable>
            <View style={tw(`absolute left-0 right-0 h-[2rem] ${active ? 'bg-darkPrimary' : 'bg-[#AAB5AD]'} -bottom-[0.4rem] rounded-b-2xl`)} />
        </View>
    )
}