import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import { Image } from 'react-native'
import { RootStackParamList } from "../types";
import { useTailwind } from 'tailwind-rn'
import Header from "./Header";
import FlashCards from "../screens/FlashCards";
import Notes from "../screens/Notes";

const Tab = createBottomTabNavigator<RootStackParamList>()

export default function Nav() {
    const tw = useTailwind();
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => {
                return {
                    tabBarStyle: tw('flex items-center flex-row justify-between h-16 px-6 absolute bottom-6 left-6 right-6 rounded-xl'),
                    tabBarActiveTintColor: '#293241',
                    tabBarInActiveTintColor: '#222222',
                    tabBarLabelStyle: {
                        fontFamily: 'medium',
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
        </NavigationContainer>
    )
}