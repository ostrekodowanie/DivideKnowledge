import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AddCard from '../components/flashcards/AddCard'
import CategoryList, { CategoryProps } from '../components/flashcards/CategoryList'
import FlashCardsGenerator from '../components/FlashCardsGenerator'

export type CategoryStackParams = {
    CategoryList: undefined,
    AddCard: undefined,
    FlashCardsGenerator: CategoryProps
}

const CategoryStack = createNativeStackNavigator<CategoryStackParams>()

export default function FlashCardsScreen() {
    return (
        <CategoryStack.Navigator initialRouteName='CategoryList' screenOptions={{ headerBackButtonMenuEnabled: true, headerBackTitle: 'Cofnij' }}>
            <CategoryStack.Screen name='CategoryList' component={CategoryList} options={{ title: 'Wybierz kategorię' }} />
            <CategoryStack.Screen name='AddCard' component={AddCard} options={{ title: 'Dodaj fiszkę' }} />
            <CategoryStack.Screen name='FlashCardsGenerator' component={FlashCardsGenerator} options={{ title: 'Fiszki'}} />
        </CategoryStack.Navigator>
    )
}