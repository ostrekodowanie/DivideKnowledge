import { NavigationProp, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import FlashCard, { FlashCardProps } from '../components/FlashCard'
import FlashCardsGenerator from './FlashCardsGenerator'


export type CategoryStackParams = {
    CategoryList: {
        categories: CategoryProps[];
    };
    FlashCardsGenerator: {
        category: string | undefined
    };
}

const CategoryStack = createNativeStackNavigator<CategoryStackParams>()

export default function FlashCardsScreen() {
    const tw = useTailwind()
    const [categories, setCategories] = useState<CategoryProps[]>([])

    useEffect(() => {
        // axios.get('http://192.168.1.104:8000/api/categories')
        //     .then(res => res.data)
        //     .then(data => setCategories(data))
        }, [])
        
    return (
        <CategoryStack.Navigator initialRouteName='CategoryList' screenOptions={{ headerBackButtonMenuEnabled: true, headerBackTitle: 'Cofnij' }}>
            <CategoryStack.Screen name='CategoryList' component={CategoryList} initialParams={{ categories }} />
            <CategoryStack.Screen name='FlashCardsGenerator' component={FlashCardsGenerator} />
        </CategoryStack.Navigator>
    )
}

export interface CategoryProps {
    navigation: NavigationProp<any, any>,
    name: string,
    desc: string
}

type Props = NativeStackScreenProps<CategoryStackParams, 'CategoryList'>

const CategoryList = ({ route, navigation }: Props) => {
    return (
        <>
            <Text>Wybierz kategorię</Text>
            <Category navigation={navigation} name='Example' desc="Przykładowa kategoria" />
            {/* {route.params.categories.map(category => <Category {...category} navigation={navigation} key={category.name} />)} */}
        </>
    )
}

const Category = (props: CategoryProps) => {
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('FlashCardsGenerator', { category: props.name })}>
            <Text>{props.name}</Text>
            <Text>{props.desc}</Text>
        </TouchableOpacity>
    )
}