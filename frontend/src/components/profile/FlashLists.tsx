import { FlashCardProps } from "../flashcards/FlashCard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListOfLists from "../flashlists/ListOfLists";
import AddFlashList from "../flashlists/AddFlashList";
import FlashList from "../flashlists/FlashList";

export type FlashListCard = FlashCardProps & {
    topic: string
}

export interface FlashListProps {
    id: number,
    name: string,
    flashcards: FlashListCard[] 
}

export type FlashListStackParams = {
    ListOfLists: undefined,
    AddFlashList: undefined,
    FlashList: FlashListProps
}

const FlashListStack = createNativeStackNavigator<FlashListStackParams>()

export default function FlashLists() {
    return (
        <FlashListStack.Navigator initialRouteName="ListOfLists" screenOptions={{
            headerTitleStyle: { fontFamily: 'Bold' }
        }}>
            <FlashListStack.Screen name="ListOfLists" component={ListOfLists} options={{
                title: 'FiszkoListy'
            }} />
            <FlashListStack.Screen name="AddFlashList" component={AddFlashList} options={{
                title: 'Dodaj fiszkolistę'
            }} />
            <FlashListStack.Screen name="FlashList" component={FlashList} options={({ route }) => {
                return { title: route.params.name }
            }}  />
        </FlashListStack.Navigator>
    )
}

