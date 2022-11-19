import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useTailwind } from 'tailwind-rn';
import Note, { NoteProps } from '../components/Note';
import { BASE_URL } from '../constants/baseUrl';

export type NoteStackParams = {
    NoteList: undefined,
    Note: NoteProps
}

const NoteStack = createNativeStackNavigator<NoteStackParams>()

export default function NotesScreen() {
    return (
        <NoteStack.Navigator initialRouteName='NoteList'>
            <NoteStack.Screen name='NoteList' component={NoteList} />
            <NoteStack.Screen name='Note' component={Note} />
        </NoteStack.Navigator>
    )
}

const NoteList = () => {
    const tw = useTailwind()
    const [notes, setNotes] = useState<NoteProps[]>([])

    useEffect(() => {
        axios.get(`${BASE_URL}/api/notes`)
            .then(res => res.data)
            .then(data => setNotes(data))
    }, [])

    return (
        <SafeAreaView>
            <Text style={tw('mb-8 font-bold text-4xl')}>Notatki</Text>
            {notes.map(note => <NoteRef {...note} key={note.title} />)}
        </SafeAreaView>
    )
}


const NoteRef = (props: NoteProps) => {
    const tw = useTailwind()
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Note', {...props})} style={tw('w-full rounded-xl shadow bg-white py-2 px-4')}>
            <Text>{props.title}</Text>
            <Text>{props.desc}</Text>
        </TouchableOpacity>
    )
}