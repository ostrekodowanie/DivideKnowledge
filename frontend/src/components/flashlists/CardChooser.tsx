import { useTailwind } from "tailwind-rn/dist";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useState, useEffect } from 'react'
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { BASE_URL } from "../../constants/baseUrl";
import { FlashListCard, FlashListStackParams } from "../profile/FlashLists";
import { RouteProp, useRoute } from "@react-navigation/native";

export default function CardChooser() {
    const tw = useTailwind()
    const auth = useAppSelector(state => state.login)
    const { access } = auth.tokens
    const { id } = auth.user
    const [cardChooseActive, setCardChooseActive] = useState(false)
    const [userCards, setUserCards] = useState<FlashListCard[]>([])

    const loadCards = () => {
        setCardChooseActive(prev => !prev)
        if(cardChooseActive) return
        axios.get(`${BASE_URL}/api/flashcards/user/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + access
            }
        }).then(res => res.data)
        .then(data => setUserCards(data))
        .catch(err => alert(err))
    }

    useEffect(() => {
        console.log(userCards)
    }, [userCards])

    return (
        <View>
            <TouchableOpacity onPress={loadCards}><Text style={{fontFamily: 'Bold', ...tw('text-blue-400 text-lg')}}>Dodaj fiszki do listy</Text></TouchableOpacity>
            {cardChooseActive && <View style={tw('bg-white z-20 items-center justify-center border-stroke border-[2px] px-6 rounded-xl overflow-hidden min-h-[2rem] absolute w-full top-full')}>
                {userCards.length > 0 ? userCards.map(card => <ChosenCard {...card} key={card.id} />) : <Text>Nie znaleziono twoich fiszek.</Text>}    
            </View>}
        </View>
    )
}

const ChosenCard = ({ id, question }: FlashListCard) => {
    const tw = useTailwind()
    const [active, setActive] = useState(false)
    const route = useRoute<RouteProp<FlashListStackParams, 'FlashList'>>()
    
    const handleAdd = async () => {
        const resp = await axios.post(`${BASE_URL}/api/flashlists/add`, JSON.stringify({ flashcard: id, flashlist: route.params.id }), {
            headers: { 'Content-Type': 'application/json' }
        })
        if(resp.status === 200) return setActive(true)
  
    }

    return (
        <Pressable onPress={handleAdd} style={tw('py-3 px-6 flex-row justify-between w-full items-center')}>
            <Text>{question}</Text>
            <Text style={tw('text-primary')}>{active ? '✔' : '❌'}</Text>
        </Pressable>
    )
}