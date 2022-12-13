import { ScrollView, Text, View } from "react-native"
import { useState, useEffect } from 'react'
import { NoteProps } from "./Note"
import SmallNoteRef from "./SmallNoteRef"
import { useTailwind } from "tailwind-rn/dist"
import { NavigationProp, useNavigation, useNavigationState } from "@react-navigation/native"
import axios from "axios"
import { BASE_URL } from "../../constants/baseUrl"
import { NoteStackParams } from "../../screens/NotesScreen"

export default function useRecentNotes() {
    const tw = useTailwind()
    const navigation = useNavigation<NavigationProp<NoteStackParams, 'NoteList'>>()
    const location = useNavigationState(state => state)
    const [recentNotes, setRecentNotes] = useState<NoteProps[]>([])

    useEffect(() => {
        axios.get(`${BASE_URL}/api/notes/recent`)
            .then(res => res.data)
            .then(data => setRecentNotes(data))
    }, [location])

    const RecentNotes = () => {
        return (
            <View style={tw('mb-6')}>
                <Text style={{fontFamily: 'Bold', ...tw('mb-4 text-lg')}}>Ostatnio dodane notatki</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {recentNotes.map(note => <SmallNoteRef onPress={() => navigation.navigate('Note', {...note})} style='mr-6' {...note} key={note.id + note.title}/>)}
                </ScrollView>
            </View>
        )
    }

    return {
        RecentNotes,
        isLoaded: recentNotes.length > 0
    }
}