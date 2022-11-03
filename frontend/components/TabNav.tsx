import { RootTabParamList } from "../types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import Header from "./Header";
import Home from "../screens/Home";
import FlashCards from "../screens/FlashCards";
import Notes from "../screens/Notes";
import Profile from "../screens/Profile";
import { useTailwind } from "tailwind-rn/dist";

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabNav() {
    const tw = useTailwind();

    return (
        <Tab.Navigator screenOptions={({ route }) => {
            return {
                tabBarStyle: tw('flex items-center flex-row justify-between h-16 px-6'),
                tabBarActiveTintColor: '#293241',
                tabBarInActiveTintColor: '#222222',
                tabBarLabelStyle: {
                    fontFamily: 'semibold',
                    fontSize: 12,
                }
            }
        }}>
            <Tab.Screen name="Home" component={Home} options={{ title: 'Dom', tabBarIcon: () => {
                return <Image source={{}} />
            }, header: () => <Header name={'DivideKnowledge'} /> }} />
            <Tab.Screen name="Flashcards" component={FlashCards} options={{ title: 'Fiszki', tabBarIcon: () => {
                return <Image source={{}} />
            }, header: () => <Header name={'Fiszki'} /> }} />
            <Tab.Screen name="Notes" component={Notes} options={{ title: 'Notatki', tabBarIcon: () => {
                return <Image source={{}} />
            }, header: () => <Header name={'Notatki'} /> }} />
            <Tab.Screen name="Profile" component={Profile} options={{ title: 'Profil', tabBarIcon: () => {
                return <Image source={{}} />
            }, header: () => <Header name='Profil' /> }} />
        </Tab.Navigator>
    )
}