import { useTailwind } from "tailwind-rn/dist"
import { Text, View } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context"

type Props = {
    name: string
}

export default function Header({ name }: Props) {
    const tw = useTailwind()

    return (
        <SafeAreaView style={tw('bg-white py-6 flex flex-row justify-between items-center px-8')}>
            <Text style={{...tw('text-lg'), fontFamily: 'bold'}}>{name}</Text>
            {/* <View style={tw('flex flex-col h-5 justify-between w-7')}>
                <View style={tw('rounded-xl bg-black h-[3px] ml-auto w-[60%]')} />
                <View style={tw('rounded-xl bg-black h-[3px] w-full')} />
                <View style={tw('rounded-xl bg-black h-[3px] w-[60%]')} />
            </View> */}
        </SafeAreaView>
    )
}