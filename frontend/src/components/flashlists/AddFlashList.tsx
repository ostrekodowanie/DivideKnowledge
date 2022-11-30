import { Pressable, Text, View } from "react-native";
import { FlashListProps } from "../profile/FlashLists";
import { useState } from 'react'
import { useTailwind } from "tailwind-rn/dist";
import PrimaryInput from "../PrimaryInput";
import PrimaryButton from "../PrimaryButton";
import axios from "axios";
import { BASE_URL } from "../../constants/baseUrl";
import { useAppSelector } from "../../hooks/useAppSelector";
import Loader from "../Loader";

export default function AddFlashList() {
    const tw = useTailwind()
    const { id } = useAppSelector(state => state.login.user)
    const [status, setStatus] = useState<boolean | undefined>(undefined)
    const [loading, setLoading] = useState(false)
    const [newFlashList, setNewFlashList] = useState<FlashListProps>({
        name: '',
        flashcards: []
    })

    const handleAdd = async () => {
        axios.post(`${BASE_URL}/api/flashlists/create`, JSON.stringify({ user: id, name: newFlashList.name}), { headers: {
            'Content-Type': 'application/json'
        }}).then(() => setStatus(true))
        .catch(() => setStatus(false))
        .finally(() => setLoading(false))
    }

    if(status !== undefined) return (
        <View style={tw('flex-1 p-6 bg-white items-center justify-center')}>
            {status ? <Text style={{fontFamily: 'Bold'}}>Gratulacje, dodano FiszkoListę!</Text> : <Text style={{fontFamily: 'Bold'}}>Wystąpił błąd</Text>}
        </View>
    )

    return (
        <View style={tw('flex-1 p-6 bg-white')}>
            <PrimaryInput field="name" setState={setNewFlashList} label='Nazwa' />
            {loading && <Loader />}
            <PrimaryButton style='mt-auto' active={newFlashList.name !== ''} onPress={handleAdd} text='Dodaj FiszkoListę' />
        </View>
    )
}