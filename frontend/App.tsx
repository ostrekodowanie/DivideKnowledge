import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './src/screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlashCardsScreen from './src/screens/FlashCardsScreen';
import NotesScreen from './src/screens/NotesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EntryScreen from './src/components/EntryScreen';
import { useAppSelector } from './src/hooks/useAppSelector';
import { useTailwind } from 'tailwind-rn/dist';
import { FlashCardsIcon, HomeIcon, NotesIcon, ProfileIcon } from './assets/home';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from 'jwt-decode'
import { login, logout } from './reducers/login';
import { useDispatch } from 'react-redux';
import Loader from './src/components/Loader';
import { useState, useEffect } from 'react'

export type RootTabParams = {
  Home: undefined,
  FlashCards: undefined,
  Notes: undefined,
  Profile: undefined
}

const RootTab = createBottomTabNavigator<RootTabParams>()

export default function App() {
  const tw = useTailwind()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const { logged } = useAppSelector(state => state.login)

  const getUser = async () => {
    const fromStorage = await AsyncStorage.getItem('user')
    
    if(fromStorage) {
      let tokens = JSON.parse(fromStorage)
      let user = jwtDecode(tokens.access)
      return {
        user,
        tokens
      }
    }
    return null
  }

  useEffect(() => {
    const user = getUser()
    if(user) dispatch(login(user))
    if(!user) dispatch(logout())
    setLoading(false)
  }, [])

  if(loading) return <Loader />
  if(!logged) return <EntryScreen />
  return (
      <NavigationContainer>
        <RootTab.Navigator screenOptions={{ 
          tabBarActiveTintColor: '#8A2BE2', 
          tabBarInactiveTintColor: '#3A234E', 
          tabBarLabelStyle: tw('font-semibold text-[0.8rem]'),
          tabBarStyle: tw('h-20 px-4 py-[0.9rem]')
        }}>
          <RootTab.Screen name='Home' component={HomeScreen} options={{
            title: 'Eksploruj',
            tabBarIcon: ({ focused }) => <HomeIcon fill={focused ? '#8A2BE2' : '#3A234E'} height={25} width={21} />
          }} />
          <RootTab.Screen name='FlashCards' component={FlashCardsScreen} options={{
            title: 'Fiszki',
            headerShown: false,
            tabBarIcon: ({ focused }) => <FlashCardsIcon fill={focused ? '#8A2BE2' : '#3A234E'} height={22} width={20} />
          }} />
          <RootTab.Screen name='Notes' component={NotesScreen} options={{
            title: 'Notatki',
            headerShown: false,
            tabBarIcon: ({ focused }) => <NotesIcon fill={focused ? '#8A2BE2' : '#3A234E'} height={22} width={20} />
          }} />
          <RootTab.Screen name='Profile' component={ProfileScreen} options={{
            title: 'Profil',
            tabBarIcon: ({ focused }) => <ProfileIcon fill={focused ? '#8A2BE2' : '#3A234E'} height={22} width={20} />
          }} />
        </RootTab.Navigator>
      </NavigationContainer>
  );
}