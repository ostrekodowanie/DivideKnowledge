import { useEffect, useState } from 'react'
import { TouchableOpacity, Text, Image, Pressable, ScrollView } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import axios from 'axios'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { BASE_URL } from '../../constants/baseUrl'
import Loader from '../Loader'
import { CategoryStackParams } from '../../screens/FlashCardsScreen'

type CategoryNavigationProps = NavigationProp<CategoryStackParams, 'CategoryList'>

export interface CategoryProps {
    name: string,
    image: string
}

export default function CategoryList({ navigation }: { navigation: CategoryNavigationProps}) {
    const tw = useTailwind()
    const [categories, setCategories] = useState<CategoryProps[]>([])

    useEffect(() => {
        axios.get(`${BASE_URL}/api/categories`)
            .then(res => res.data)
            .then(data => setCategories(data))
            .catch(err => alert(err))
    }, [])

    return <ScrollView style={tw('p-4')}>
        <Pressable onPress={() => navigation.navigate('AddCard')}><Text style={tw('text-blue-400 font-medium mb-4 text-[1rem]')}>Dodaj fiszkę</Text></Pressable>
        {categories.length > 0 ? categories.map(category => <Category {...category} key={category.name} />): <Loader />}
    </ScrollView>
}

const Category = (props: CategoryProps) => {
    const navigation = useNavigation<CategoryNavigationProps>()
    const tw = useTailwind()
    return (
        <TouchableOpacity style={tw('bg-white mb-8 rounded overflow-hidden')} onPress={() => navigation.navigate('FlashCardsGenerator', {...props})}>
            <Image style={tw('w-full h-16')} source={{
                uri: props.image
            }} />
            <Text style={tw('my-2 ml-4 font-medium text-xl')}>{props.name}</Text>
        </TouchableOpacity>
    )
}