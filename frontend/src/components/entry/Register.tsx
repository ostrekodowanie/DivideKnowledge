import { Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useState, useContext } from 'react'
import axios from "axios";
import Loader from "../Loader";
import { BASE_URL } from "../../constants/baseUrl";
import { useTailwind } from "tailwind-rn/dist";
import { AuthFormContext } from "../../context/AuthFormProvider";
import PrimaryInput from "../PrimaryInput";
import PrimaryButton from "../PrimaryButton";

export default function Register() {
    const tw = useTailwind()
    const { setAuthFormIndex } = useContext(AuthFormContext)
    const [status, setStatus] = useState<string | boolean>('')
    const [confPassword, setConfPassword] = useState('')
    const [verificationCode, setVerificationCode] = useState('')
    const [modal, setModal] = useState(false)
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const handleSubmit = () => {
        setStatus('loading')
        if(userData.password !== confPassword) return setStatus('Hasła się nie zgadzają!')
        axios.post(`${BASE_URL}/api/signup`, JSON.stringify(userData), { headers: { 'Content-Type': 'application/json' }})
            .then(() => setModal(true))
            .catch(() => setStatus('Error')) 
    }

    const handleCodeSubmit = () => {
        axios.post(`${BASE_URL}/api/verify`, JSON.stringify({ email: userData.email, code: parseInt(verificationCode) }), {
            headers: { 'Content-Type': 'application/json' }
        }).then(() => setAuthFormIndex(1))
        .catch(err => alert(err))
    }

    if(status === 'Registered') return <Text>Zarejestrowano</Text>

    return (
        <View style={tw('flex-1 mt-8 items-stretch w-full px-12')}>
            <Text style={{ fontFamily: 'Bold', ...tw('text-4xl text-center my-5')}}>Załóż <Text style={tw('text-primary')}>bezpłatne</Text> konto</Text>
            <ScrollView style={tw('flex-1')}>
                <PrimaryInput
                    field='username'
                    label='Nazwa użytkownika'
                    setState={setUserData}
                />
                <PrimaryInput
                    field='email'
                    label='Email'
                    setState={setUserData}
                />
                <PrimaryInput
                    field='password'
                    label='Hasło'
                    secured={true}
                    setState={setUserData}
                />
                <PrimaryInput
                    field='confPassword'
                    label='Powtórz hasło'
                    secured={true}
                    setState={setConfPassword}
                />
            </ScrollView>
            {status && status !== 'loading' && <Text style={tw('text-red-400')}>{status}</Text>}
            {status === 'loading' && <Loader />}
            <View style={tw('my-10')}>
                <PrimaryButton text="Zarejestruj" onPress={handleSubmit} />
                <Pressable style={tw('w-full items-center py-4')} onPress={() => setAuthFormIndex(1)}><Text style={{ fontFamily: 'ExtraBold', ...tw('text-[1.1rem] mt-2')}}>Zaloguj się</Text></Pressable>
            </View>
            <Modal visible={modal} animationType='slide'>
                <Text>Na podany email wysłaliśmy kod weryfikacyjny.</Text>
                <TextInput placeholder="Kod" onChangeText={text => setVerificationCode(text)} />
                <Pressable onPress={handleCodeSubmit} style={tw('bg-blue-400 py-3 px-6')}><Text style={tw('text-white font-medium')}>Wyślij</Text></Pressable>
            </Modal>
        </View>
    )
}