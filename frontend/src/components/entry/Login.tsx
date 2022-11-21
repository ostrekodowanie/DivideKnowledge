import { Pressable, Text, TextInput, View } from "react-native";
import { useState, useContext } from 'react'
import axios from "axios";
import Loader from "../Loader";
import { BASE_URL } from "../../constants/baseUrl";
import { useTailwind } from "tailwind-rn/dist";
import { AuthFormContext } from "../../context/AuthFormProvider";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { login } from "../../../reducers/login";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
    const tw = useTailwind()
    const dispatch = useDispatch()
    const { setAuthFormIndex } = useContext(AuthFormContext)
    const [status, setStatus] = useState<string | boolean>('')
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = () => {
        setStatus('loading')
        axios.post(`${BASE_URL}/api/login`, JSON.stringify(userData), { headers: { 'Content-Type': 'application/json' }})
            .then(res => res.data)
            .then(tokens => {
                let user = jwtDecode(tokens.access)
                AsyncStorage.setItem('user', JSON.stringify(tokens))
                dispatch(login({
                    user,
                    tokens
                }))
            })
            .catch(err => console.log(err)) 
    }

    if(status === 'Logged') return <Text>Zarejestrowano</Text>
    if(status === 'loading') return <Loader />

    return (
        <View>
            <Text style={tw('text-2xl text-center font-bold my-5')}>Zaloguj się</Text>
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
            {status && <Text style={tw('text-red-400')}>{status}</Text>}
            <Text>Nie posiadasz konta? <Pressable onPress={() => setAuthFormIndex(0)}><Text style={tw('text-blue-400 font-medium')}>Zarejestruj się</Text></Pressable></Text>
            <Pressable style={tw('py-3 px-6 rounded bg-blue-400')} onPress={handleSubmit}><Text style={tw('font-medium text-white')}>Zaloguj</Text></Pressable>
        </View>
    )
}