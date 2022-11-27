import { View } from "react-native"
import useMultiStepForm from "../../hooks/useMultiStepForm"
import Info from "./Info"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTailwind } from "tailwind-rn/dist"
import Auth from "./Auth"
import PrimaryButton from "../PrimaryButton"

export default function EntryScreen() {
    const tw = useTailwind()
    const { step, setStep, form } = useMultiStepForm([<Info />, <Auth />])

    return (
        <SafeAreaView style={tw('flex-1 items-center justify-start')}>
            <StepDisplayer step={step} />
            {step !== 1 ? form :
                <View style={tw('px-4 w-full mb-8 items-center justify-center')}>
                    {form}
                    <PrimaryButton text="Zaczynajmy!" onPress={() => setStep(2)} />
                </View>
            }
        </SafeAreaView>
    )
}

const StepDisplayer = ({ step }: { step: number }) => {
    const tw = useTailwind()
    return (
        <View style={tw('bg-[#E0E4E1] mt-8 rounded-xl h-[0.4rem] overflow-hidden w-[40%] flex-row')}>
            <View style={step === 1 ? tw('bg-primary rounded-xl w-[50%]') : tw('w-[50%]')} />
            <View style={step === 2 ? tw('bg-primary rounded-xl w-[50%]') : tw('w-[50%]')} />
        </View>
    )
}