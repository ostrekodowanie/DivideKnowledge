import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTailwind } from 'tailwind-rn';
import Loader from '../components/Loader';
import AddNote from '../components/notes/AddNote';
import Note, { NoteProps } from '../components/notes/Note';
import { BASE_URL } from '../constants/baseUrl';

export type NoteStackParams = {
    NoteList: undefined,
    Note: NoteProps,
    AddNote: undefined
}

const NoteStack = createNativeStackNavigator<NoteStackParams>()

export default function NotesScreen() {
    return (
        <NoteStack.Navigator initialRouteName='NoteList' screenOptions={{
            headerTitleStyle: { fontFamily: 'Bold' }
        }}>
            <NoteStack.Screen name='NoteList' component={NoteList} options={{ title: 'Popularne notatki' }} />
            <NoteStack.Screen name='Note' component={Note} options={{ title: 'Notatka' }} />
            <NoteStack.Screen name='AddNote' component={AddNote} options={{ title: 'Dodaj notatkę' }} />
        </NoteStack.Navigator>
    )
}

type NoteRefNavigationProp = NavigationProp<NoteStackParams, 'NoteList'>

const NoteList = () => {
    const navigation = useNavigation<NoteRefNavigationProp>()
    const tw = useTailwind()
    const [notes, setNotes] = useState<NoteProps[]>([])

    useEffect(() => {
        axios.get(`${BASE_URL}/api/notes`)
            .then(res => res.data)
            .then(data => setNotes(data))
    }, [])

    if(notes.length === 0) return <Loader />

    return (
        <ScrollView style={tw('p-6')}>
            <Pressable onPress={() => navigation.navigate('AddNote')}><Text style={tw('text-blue-400 mb-4')}>Dodaj notatkę</Text></Pressable>
            {notes.map(note => <NoteRef {...note} key={note.title + note.image} />)}
        </ScrollView>
    )
}

const NoteRef = (props: NoteProps) => {
    const tw = useTailwind()
    const navigation = useNavigation<NoteRefNavigationProp>()
    const { title, desc, likes } = props
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Note', {...props})} style={tw('w-full overflow-hidden rounded-xl bg-white mb-6')}>
            <Image style={tw('h-36 w-full')} source={{
                uri: props.image
            }} />
            <View style={tw('flex-row justify-between items-center p-4')}>
                <View>
                    <Text style={{fontFamily: 'Bold', ...tw('text-xl')}}>{title}</Text>
                    <Text style={{fontFamily:'Medium', ...tw('text-fontLight')}}>{desc}</Text>
                </View>
                <Text style={{fontFamily:'Bold'}}>❤{likes}</Text>
            </View>
        </TouchableOpacity>
    )
}