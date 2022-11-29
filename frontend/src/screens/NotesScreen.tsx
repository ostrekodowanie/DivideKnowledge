import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTailwind } from 'tailwind-rn';
import { CategoryProps } from '../components/flashcards/CategoryList';
import Loader from '../components/Loader';
import AddNote from '../components/notes/AddNote';
import Note, { NoteProps } from '../components/notes/Note';
import { BASE_URL } from '../constants/baseUrl';
import { useAppSelector } from '../hooks/useAppSelector';

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
            <NoteStack.Screen name='NoteList' component={NoteList} options={{ 
                title: 'Popularne notatki'
            }} />
            <NoteStack.Screen name='Note' component={Note} options={{ title: 'Notatka' }} />
            <NoteStack.Screen name='AddNote' component={AddNote} options={{ title: 'Dodaj notatkę' }} />
        </NoteStack.Navigator>
    )
}

type NoteRefNavigationProp = NavigationProp<NoteStackParams, 'NoteList'>

interface Filter {
    category: string
}

const NoteList = () => {
    const navigation = useNavigation<NoteRefNavigationProp>()
    const route = useRoute()
    const tw = useTailwind()
    const auth = useAppSelector(state => state.login)
    const { access } = auth.tokens
    const { id } = auth.user
    const [loading, setLoading] = useState(true)
    const [notes, setNotes] = useState<NoteProps[]>([])
    const [filter, setFilter] = useState<Filter>({
        category: 'Wszystkie'
    })

    useEffect(() => {
        setLoading(true)
        let categoryStr: string = filter.category !== 'Wszystkie' ? '&?c=' + filter.category : ''
        axios.get(`${BASE_URL}/api/notes?u=${id + categoryStr}`, {
            headers: {
                'Authorization': 'Bearer ' + access
            }
        }).then(res => res.data)
        .then(data => setNotes(data))
        .finally(() => setLoading(false))
    }, [filter, route])

    return (
        <View style={tw('p-6 flex-1 bg-white')}>
            <Pressable onPress={() => navigation.navigate('AddNote')}><Text style={{ fontFamily: 'Bold', ...tw('text-lg')}}>Dodaj notatkę</Text></Pressable>
            <NoteFilter filter={filter} setFilter={setFilter} />
            <ScrollView>
                {!loading ? notes.map(note => <NoteRef {...note} key={note.id} />) : <Loader />}
            </ScrollView>
        </View>
    )
}

const NoteFilter = ({ filter, setFilter }: { filter: Filter, setFilter: any }) => {
    const [categories, setCategories] = useState<CategoryProps[]>([])
    const tw = useTailwind()
    
    useEffect(() => {
        axios.get(`${BASE_URL}/api/notes/categories`)
            .then(res => res.data)
            .then(data => setCategories(data))
    }, [])

    if(categories.length === 0) return <Loader />

    const CategoryButton = ({ category }: { category: CategoryProps }) => (
        <Pressable style={tw(`py-1 px-4 rounded-xl mr-1 ${category.name === filter.category ? 'bg-primary' : 'bg-white'}`)} onPress={() => setFilter((prev: Filter) => ({ ...prev, category: category.name}))}>
            <Text style={{ fontFamily: 'Bold', ...tw(`text-lg ${category.name === filter.category ? 'text-white' : 'text-fontLight'}`) }}>{category.name}</Text>
        </Pressable>
    )

    return (
        <View style={tw('my-6')}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={tw('flex-row')}>
                <Pressable style={tw(`py-1 px-4 rounded-xl mr-2 ${filter.category === 'Wszystkie' ? 'bg-primary' : 'bg-white'}`)} onPress={() => setFilter((prev: Filter) => ({ ...prev, category: 'Wszystkie'}))}>
                    <Text style={{ fontFamily: 'Bold', ...tw(`text-lg ${filter.category === 'Wszystkie' ? 'text-white' : 'text-fontLight'}`) }}>Wszystkie</Text>
                </Pressable>
                {categories.map(category => <CategoryButton category={category} key={category.name} /> )}
            </ScrollView>
        </View>
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