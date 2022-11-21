import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AddCard from '../components/flashcards/AddCard'
import CategoryList, { CategoryProps } from '../components/flashcards/CategoryList'
import FlashCardsGenerator from '../components/flashcards/FlashCardsGenerator'
import TopicList, { TopicProps } from '../components/flashcards/TopicList'


export type CategoryStackParams = {
    CategoryList: undefined,
    AddCard: undefined,
    TopicList: { category: CategoryProps },
    FlashCardsGenerator: { category: CategoryProps, topic: TopicProps }
}

const CategoryStack = createNativeStackNavigator<CategoryStackParams>()

export default function FlashCardsScreen() {
    return (
        <CategoryStack.Navigator initialRouteName='CategoryList' screenOptions={{ headerBackButtonMenuEnabled: true, headerBackTitle: 'Cofnij' }}>
            <CategoryStack.Screen name='CategoryList' component={CategoryList} options={{ title: 'Wybierz kategorię' }} />
            <CategoryStack.Screen name='AddCard' component={AddCard} options={{ title: 'Dodaj fiszkę' }} />
            <CategoryStack.Screen name='TopicList' component={TopicList} options={{ title: 'Wybierz temat'}} />
            <CategoryStack.Screen name='FlashCardsGenerator' component={FlashCardsGenerator} options={{ title: 'Fiszki'}} />
        </CategoryStack.Navigator>
    )
}