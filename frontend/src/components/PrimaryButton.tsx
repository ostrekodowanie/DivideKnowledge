import { Pressable, Text, View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"

export default function PrimaryButton({ onPress }: { onPress: () => any }) {
    const tw = useTailwind()
    return (
        <View style={tw('relative w-full max-w-[70%]')}>
            <Pressable onPress={onPress} style={tw('bg-primary relative z-10 rounded-2xl w-full mx-auto py-4 px-12')}>
                <Text style={{ fontFamily: 'ExtraBold', ...tw('font-medium text-[1.1rem] mx-auto text-white')}}>Zaczynajmy!</Text>
            </Pressable>
            <View style={tw('absolute left-0 right-0 h-[2rem] bg-darkPrimary -bottom-[0.4rem] rounded-b-2xl')} />
        </View>
    )
}