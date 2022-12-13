import { ScrollView, Text, View } from "react-native"
import { useState, useEffect } from 'react'
import { NoteProps } from "./Note"
import SmallNoteRef from "./SmallNoteRef"
import { useTailwind } from "tailwind-rn/dist"
import { NavigationProp, useNavigation, useNavigationState } from "@react-navigation/native"
import axios from "axios"
import { BASE_URL } from "../../constants/baseUrl"
import { NoteStackParams } from "../../screens/NotesScreen"

export default function usePopularNotes() {
    const tw = useTailwind()
    const navigation = useNavigation<NavigationProp<NoteStackParams, 'NoteList'>>()
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
                <Text style={{fontFamily: 'Bold', ...tw('mb-4 text-lg')}}>Popularne notatki</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {popularNotes.map(note => <SmallNoteRef onPress={() => navigation.navigate('Note', {...note})} style='mr-6' {...note} key={note.id + note.title}/>)}
                </ScrollView>
            </View>
        )
    }

    return {
        PopularNotes,
        didRecentLoad: popularNotes.length > 0
    }
}