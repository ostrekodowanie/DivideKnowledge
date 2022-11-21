import { NavigationProp } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { TouchableOpacity, Text, Image } from 'react-native'
import FlashCardsGenerator from '../components/FlashCardsGenerator'

export interface CategoryProps {
    name: string,
    image: string
}

export type CategoryStackParams = {
    CategoryList: {
        categories: CategoryProps[];
    };
    FlashCardsGenerator: {
        category: CategoryProps
    };
}

const CategoryStack = createNativeStackNavigator<CategoryStackParams>()

export default function FlashCardsScreen() {
    const [categories, setCategories] = useState<CategoryProps[]>([])

    useEffect(() => {
        axios.get('http://192.168.1.104:8000/api/categories')
            .then(res => res.data)
            .then(data => setCategories(data))
            .catch(err => alert(err))
    }, [])
        
    return (
        <CategoryStack.Navigator initialRouteName='CategoryList' screenOptions={{ headerBackButtonMenuEnabled: true, headerBackTitle: 'Cofnij' }}>
            <CategoryStack.Screen name='CategoryList' component={CategoryList} initialParams={{ categories }} />
            <CategoryStack.Screen name='FlashCardsGenerator' component={FlashCardsGenerator} />
        </CategoryStack.Navigator>
    )
}

type Props = NativeStackScreenProps<CategoryStackParams, 'CategoryList'>

const CategoryList = ({ route, navigation }: Props) => {
    return (
        <>
            <Text>Wybierz kategorię</Text>
            {route.params.categories.map(category => <Category {...category} navigation={navigation} key={category.name} />)}
        </>
    )
}

type CategoryRefProps = CategoryProps & { navigation: NavigationProp<any, any> }

const Category = (props: CategoryRefProps) => {
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('FlashCardsGenerator', { category: props.name })}>
            <Image source={{
                uri: props.image
            }} />
            <Text>{props.name}</Text>
        </TouchableOpacity>
    )
}