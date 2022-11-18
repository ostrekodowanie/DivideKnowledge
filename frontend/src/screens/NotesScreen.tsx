import axios from 'axios';
import { useEffect, useState } from 'react'
import { SafeAreaView, Text } from "react-native";
import { useTailwind } from 'tailwind-rn';
import Note, { NoteProps } from '../components/Note';

const initialNotes = [
    {
        title: 'note1'
    },
    {
        title: 'note2'
    }
]

export default function NotesScreen() {
    const tw = useTailwind()
    const [notes, setNotes] = useState<NoteProps[]>(initialNotes)

    useEffect(() => {
        axios.get('http://192.168.1.104:8000/api/flashcards')
            .then(res => res.data)
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }, [])

    return (
        <SafeAreaView>
            <Text style={tw('mb-8 font-bold text-4xl')}>Notatki</Text>
            {notes.map(note => <Note {...note} key={note.title} />)}
        </SafeAreaView>
    )
}