import { ScrollView, Text, View } from "react-native"
import { useState, useEffect } from 'react'
import { NoteProps } from "./Note"
import SmallNoteRef from "./SmallNoteRef"
import { useTailwind } from "tailwind-rn/dist"
import { useNavigationState } from "@react-navigation/native"
import axios from "axios"
import { BASE_URL } from "../../constants/baseUrl"

export default function usePopularNotes() {
    const tw = useTailwind()
    const location = useNavigationState(state => state)
    const [popularNotes, setPopularNotes] = useState<NoteProps[]>([])

    useEffect(() => {
        axios.get(`${BASE_URL}/api/notes/popular`)
            .then(res => res.data)
            .then(data => setPopularNotes(data))
    }, [location])

    const PopularNotes = () => {
        return (
            <View style={tw('mb-6')}>
                <Text style={{fontFamily: 'Bold', ...tw('mb-2 text-lg')}}>Popularne notatki</Text>
                <ScrollView horizontal={true}>
                    {popularNotes.map(note => <SmallNoteRef style='mr-4' {...note} key={note.id}/>)}
                </ScrollView>
            </View>
        )
    }

    return {
        PopularNotes,
        isLoaded: popularNotes.length > 0
    }
}