import { Modal, Pressable, Text, TextInput, View } from "react-native";
import { useState, useContext } from 'react'
import axios from "axios";
import Loader from "../Loader";
import { BASE_URL } from "../../constants/baseUrl";
import { useTailwind } from "tailwind-rn/dist";
import { AuthFormContext } from "../../context/AuthFormProvider";

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
        <View>
            <Text style={tw('text-2xl text-center font-bold my-5')}>Zarejestruj się</Text>
            <TextInput
                style={tw('mb-2 text-[1rem]')}
                placeholder="Nazwa użytkownika"
                onChangeText={text => setUserData(prev => ({ ...prev, username: text }))}
            />
            <TextInput
                style={tw('mb-2 text-[1rem]')}
                placeholder="Email"
                onChangeText={text => setUserData(prev => ({ ...prev, email: text }))}
            />
            <TextInput
                style={tw('mb-2 text-[1rem]')}
                placeholder="Hasło"
                onChangeText={text => setUserData(prev => ({ ...prev, password: text }))}
                secureTextEntry={true}
            />
            <TextInput
                style={tw('mb-2 text-[1rem]')}
                placeholder="Powtórz hasło"
                onChangeText={text => setConfPassword(text)}
                secureTextEntry={true}
            />
            {status && status !== 'loading' && <Text style={tw('text-red-400')}>{status}</Text>}
            {status === 'loading' && <Loader />}
            <Text style={tw('my-4')}>Już posiadasz konto? <Pressable onPress={() => setAuthFormIndex(1)}><Text style={tw('text-blue-400 font-medium')}>Zaloguj się</Text></Pressable></Text>
            <Pressable style={tw('py-3 px-6 rounded bg-blue-400')} onPress={handleSubmit}><Text style={tw('font-medium text-white')}>Zarejestruj</Text></Pressable>
            <Modal visible={modal} animationType='slide'>
                <Text>Na podany email wysłaliśmy kod weryfikacyjny.</Text>
                <TextInput placeholder="Kod" onChangeText={text => setVerificationCode(text)} />
                <Pressable onPress={handleCodeSubmit} style={tw('bg-blue-400 py-3 px-6')}><Text style={tw('text-white font-medium')}>Wyślij</Text></Pressable>
            </Modal>
        </View>
    )
}