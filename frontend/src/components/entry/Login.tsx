import { Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
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
import PrimaryInput from "../PrimaryInput";
import PrimaryButton from "../PrimaryButton";

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
        <View style={tw('flex-1 mt-8 items-stretch w-full px-12')}>
            <Text style={{ fontFamily: 'Bold', ...tw('text-4xl text-center my-5')}}>Zaloguj się</Text>
            <ScrollView>
                <PrimaryInput
                    field="email"
                    setState={setUserData}
                    label='Email'
                />
                <PrimaryInput
                    field="password"
                    setState={setUserData}
                    label='Hasło'
                    secured={true}
                />
                <Text style={{fontFamily: 'SemiBold'}}>Zapomniałeś hasła? <TouchableOpacity><Text style={{ fontFamily: 'Bold'}}>Zresetuj hasło</Text></TouchableOpacity></Text>
            </ScrollView>
            {status && <Text style={tw('text-red-400')}>{status}</Text>}
            <View style={tw('my-10')}>
                <PrimaryButton text="Zaloguj" onPress={handleSubmit} />
                <Pressable style={tw('w-full items-center py-4')} onPress={() => setAuthFormIndex(0)}><Text style={{ fontFamily: 'ExtraBold', ...tw('text-[1.1rem] mt-2')}}>Zarejestruj się</Text></Pressable>
            </View>
        </View>
    )
}