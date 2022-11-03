import { SafeAreaView } from "react-native-safe-area-context";
import { useTailwind } from "tailwind-rn/dist";
import { useState, useEffect } from 'react'
import axios from "axios";
import { Image, Text } from "react-native";

export default function Notes() {
    const tw = useTailwind();
    const [notes, setNotes] = useState<Array<{ title: string, image: string }>>([])

    useEffect(() => {
        axios.get('http://192.168.2.106:8000/api/notes')
            .then(res => res.data)
            .then(data => setNotes(data))
            .catch(err => console.log(err))
    })
    
    return (
        <SafeAreaView style={tw('flex items-center justify-center h-full bg-blue-400')}>
            {notes.map(note => <Note {...note} key={note.title} />)}
        </SafeAreaView>
    )
}

interface NoteProps {
    title: string,
    image: string
}

const Note = (props: NoteProps) => {
    return (
        <Image source={{
            uri: props.image
        }} />
    )
}