import { Pressable, Text } from "react-native"
import useMultiStepForm from "../hooks/useMultiStepForm"
import Info from "./entry/Info"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTailwind } from "tailwind-rn/dist"
import Auth from "./entry/Auth"

export default function EntryScreen() {
    const tw = useTailwind()
    const { step, setStep, form } = useMultiStepForm([<Info />, <Auth />])

    return (
        <SafeAreaView style={tw('h-full flex-1 items-center justify-center')}>
            <StepDisplayer step={step} />
            {form}
            {step === 1 &&  <Pressable style={tw('bg-blue-400 py-3 px-6')} onPress={() => setStep((prev: number) => prev + 1)}><Text style={tw('font-medium text-white')}>Dalej</Text></Pressable>}
        </SafeAreaView>
    )
}

const StepDisplayer = ({ step }: { step: number }) => {
    return <Text>{step} / 2</Text>
}