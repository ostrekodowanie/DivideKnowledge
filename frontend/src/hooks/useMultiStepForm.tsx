import { useState } from 'react'

type Forms = JSX.Element[]

export default function useMultiStepForm(forms: Forms) {
    const [step, setStep] = useState(1)
    return {
        step,
        setStep,
        form: forms[step - 1]
    }
}