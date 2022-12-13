import { useTailwind } from "tailwind-rn/dist"
import { useState, useEffect } from 'react'
import { useAppSelector } from "../../hooks/useAppSelector"
import { Pressable, Text, TouchableOpacity, View } from "react-native"
import Loader from "../Loader"
import { FlashListProps, FlashListStackParams } from "../profile/FlashLists"
import axios from "axios"
import { BASE_URL } from "../../constants/baseUrl"
import { NavigationProp, useNavigation, useNavigationState } from "@react-navigation/native"

type ListOfFlashCardListsNavigation = NavigationProp<FlashListStackParams, 'ListOfLists'>

export default function ListOfLists({ navigation }: { navigation: ListOfFlashCardListsNavigation }) {
    const tw = useTailwind()
    const [loading, setLoading] = useState(true)
    const [removed, setRemoved] = useState<number[]>([])
    const [flashLists, setFlashLists] = useState<FlashListProps[]>([])
    const location = useNavigationState(state => state)
    const auth = useAppSelector(state => state.login)
    const { id } = auth.user
    const { access } = auth.tokens

    useEffect(() => {
        setLoading(true)
        axios.get(`${BASE_URL}/api/flashlists/user/${id}`, { headers: { 'Authorization': 'Bearer ' + access }})
            .then(res => res.data)
            .then(data => setFlashLists(data))
            .finally(() => setLoading(false))
    }, [location, removed])

    if(loading) return <Loader />
    if(flashLists.length === 0) return (
        <View style={tw('p-6 flex-1 bg-white justify-center items-center')}>
            <TouchableOpacity onPress={() => navigation.navigate('AddFlashList')}><Text style={{ fontFamily: 'Bold' }}>Dodaj FiszkoListę</Text></TouchableOpacity>
        </View>
    )

    return (
        <View style={tw('p-6 flex-1 bg-white')}>
            {flashLists.map(list => <FlashListRef setRemoved={setRemoved} {...list} key={list.name} />)}
            <Pressable style={tw('absolute right-6 bottom-6')} onPress={() => navigation.navigate('AddFlashList')}>
                <View style={tw('rounded-full w-16 h-16 bg-primary items-center justify-center z-10')}>
                    <Text style={{fontFamily: 'Bold', ...tw('text-4xl text-white')}}>+</Text>
                </View>
                <View style={tw(`absolute left-0 right-0 h-[2.5rem] bg-darkPrimary -bottom-[0.4rem] rounded-b-full`)} />
            </Pressable>
        </View>
    )
}

const FlashListRef = (props: FlashListProps & { setRemoved: any }) => {
    const tw = useTailwind()
    const navigation = useNavigation<ListOfFlashCardListsNavigation>()
    const { setRemoved, ...rest } = props

    const handleRemove = async () => {
        const resp = await axios.delete(`${BASE_URL}/api/flashlists/delete/${props.id}`)
        if(resp.status === 204) setRemoved((prev: number[]) => [...prev, props.id])
    }

    return (
        <View style={tw('mb-4 flex-row justify-between items-center')}>
            <TouchableOpacity onPress={() => navigation.navigate('FlashList', rest)}><Text style={{ fontFamily: 'Bold', ...tw('text-lg') }}>{props.name}</Text></TouchableOpacity>
            <TouchableOpacity onPress={handleRemove} style={tw('my-auto ml-auto')}><Text style={{fontFamily: 'Bold', ...tw('text-green-400 text-xl')}}>❌</Text></TouchableOpacity>
        </View>
    )
}