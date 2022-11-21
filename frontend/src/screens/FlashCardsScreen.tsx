import { NavigationProp, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { TouchableOpacity, Text, Image, View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import FlashCardsGenerator from '../components/FlashCardsGenerator'
import Loader from '../components/Loader'
import { BASE_URL } from '../constants/baseUrl'

export interface CategoryProps {
    name: string,
    image: string
}

export type CategoryStackParams = {
    CategoryList: undefined,
    FlashCardsGenerator: CategoryProps
}

const CategoryStack = createNativeStackNavigator<CategoryStackParams>()

export default function FlashCardsScreen() {
    return (
        <CategoryStack.Navigator initialRouteName='CategoryList' screenOptions={{ headerBackButtonMenuEnabled: true, headerBackTitle: 'Cofnij' }}>
            <CategoryStack.Screen name='CategoryList' component={CategoryList} options={{ title: 'Wybierz kategorię' }} />
            <CategoryStack.Screen name='FlashCardsGenerator' component={FlashCardsGenerator} options={{ title: 'Fiszki'}} />
        </CategoryStack.Navigator>
    )
}

const CategoryList = () => {
    const [categories, setCategories] = useState<CategoryProps[]>([])

    useEffect(() => {
        axios.get(`${BASE_URL}/api/categories`)
            .then(res => res.data)
            .then(data => setCategories(data))
            .catch(err => alert(err))
    }, [])

    if(categories.length === 0) return <Loader />
    return <View>
        {categories.map(category => <Category {...category} key={category.name} />)}
    </View>
}

type CategoryNavigationProps = NavigationProp<CategoryStackParams, 'CategoryList'>

const Category = (props: CategoryProps) => {
    const navigation = useNavigation<CategoryNavigationProps>()
    const tw = useTailwind()
    return (
        <TouchableOpacity onPress={() => navigation.navigate('FlashCardsGenerator', {...props})}>
            <Image style={tw('w-full h-6')} source={{
                uri: props.image
            }} />
            <Text>{props.name}</Text>
        </TouchableOpacity>
    )
}