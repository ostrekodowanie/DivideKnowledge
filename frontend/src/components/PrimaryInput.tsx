import { Text, TextInput, View } from "react-native"
import { useState, useEffect } from 'react'
import { useTailwind } from "tailwind-rn/dist"

type Input = {
    field: string,
    label?: string,
    secured?: boolean,
    setState: any
}

export default function PrimaryInput({ field, label, secured, setState }: Input) {
    const tw = useTailwind()
    const [input, setInput] = useState('')
    const [isFocused, setIsFocused] = useState(false)

    useEffect(() => {
        setState((prev: string | {}) => {
            if(typeof prev === 'string') return input
            return {
                ...prev,
                [field]: input
            }
        })
    }, [input])

    return (
        <View style={tw('relative mb-4')}>
            {label && <Text style={{ fontFamily: 'SemiBold', ...tw('text-[1rem]')}}>{label}</Text>}
            <TextInput secureTextEntry={secured} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} style={tw(`py-3 px-6 border-[3px] mt-3 rounded-2xl relative z-10 w-full ${isFocused ? 'bg-[#C2FAD2] border-primary' : 'bg-white border-[#E3E8E4]'}`)} onChangeText={text => setInput(text)} />
            <View style={tw(`absolute left-0 right-0 h-[2rem] bg-darkPrimary -bottom-[0.4rem] rounded-b-2xl ${isFocused ? 'bg-primary' : 'bg-[#E3E8E4]'}`)} />
        </View>
    )
}