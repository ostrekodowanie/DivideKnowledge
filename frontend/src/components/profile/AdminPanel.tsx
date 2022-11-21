import axios from "axios";
import { Text, View } from "react-native";
import { BASE_URL } from "../../constants/baseUrl";
import { useState, useEffect } from 'react'
import { useTailwind } from "tailwind-rn/dist";

export default function AdminPanel() {
    const tw = useTailwind()
    const [unVerified, setUnVerified] = useState([])

    useEffect(() => {
        axios.get(`${BASE_URL}/api/flashcards/verify`)
            .then(res => res.data)
            .then(data => setUnVerified(data))
    }, [])

    return (
        <View style={tw('p-4')}>
            <Text style={tw('font-semibold text-xl')}>Admin Panel</Text>
        </View>
    )
}