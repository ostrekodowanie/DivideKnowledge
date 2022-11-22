import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './src/screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlashCardsScreen from './src/screens/FlashCardsScreen';
import NotesScreen from './src/screens/NotesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EntryScreen from './src/components/entry/EntryScreen';
import { useAppSelector } from './src/hooks/useAppSelector';
import { useTailwind } from 'tailwind-rn/dist';
import { FlashCardsIcon, HomeIcon, NotesIcon, ProfileIcon } from './assets/home';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from 'jwt-decode'
import { login, logout } from './reducers/login';
import { useDispatch } from 'react-redux';
import Loader from './src/components/Loader';
import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { BASE_URL } from './src/constants/baseUrl';
import { useFonts, 
        Dosis_400Regular as Regular,
        Dosis_500Medium as Medium, 
        Dosis_600SemiBold as SemiBold, 
        Dosis_700Bold as Bold,
        Dosis_800ExtraBold as ExtraBold
} from '@expo-google-fonts/dosis';
import { View } from 'react-native';

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
  const timer = useRef<any>(null)
  const [loading, setLoading] = useState(true)
  const [isFontLoaded] = useFonts({
    Regular,
    Medium,
    SemiBold,
    Bold,
    ExtraBold
  })
  const auth = useAppSelector(state => state.login)
  const { logged } = auth
  const { refresh } = auth.tokens

  const getUser = async () => {
    const fromStorage = await AsyncStorage.getItem('user')
    let tokens = fromStorage && JSON.parse(fromStorage)
    if(tokens) {
      await updateToken(tokens.refresh)
      return setLoading(false)
    }
    setLoading(false)
    return dispatch(logout())
  }

  const updateToken = async (token: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/token/refresh`, JSON.stringify({ refresh: token }), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(response.status === 200) {
        let tokens = response.data
        let user = jwtDecode(tokens.access)
        await AsyncStorage.setItem('user', JSON.stringify(tokens))
        dispatch(login({
          user,
          tokens
        }))
      }
    } catch(err) {
      await AsyncStorage.removeItem('user')
      dispatch(logout())
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    if(!logged) return
    timer.current = setTimeout(() => {
      updateToken(refresh)
    }, 600000)
    return () => clearTimeout(timer.current)
  }, [refresh])

  if(loading || !isFontLoaded) return <Loader />
  if(!logged) return <EntryScreen />

  return (
    <NavigationContainer>
      <RootTab.Navigator screenOptions={{ 
        tabBarActiveTintColor: '#10DC49', 
        tabBarInactiveTintColor: '#3A234E', 
        tabBarLabelStyle: tw('font-semibold text-[0.8rem]'),
        tabBarStyle: tw('h-20 px-4 py-[0.9rem]')
      }}>
        <RootTab.Screen name='Home' component={HomeScreen} options={{
          title: 'Eksploruj',
          tabBarIcon: ({ focused }) => <HomeIcon fill={focused ? '#10DC49' : '#3A234E'} height={25} width={21} />
        }} />
        <RootTab.Screen name='FlashCards' component={FlashCardsScreen} options={{
          title: 'Fiszki',
          headerShown: false,
          tabBarIcon: ({ focused }) => <FlashCardsIcon fill={focused ? '#10DC49' : '#3A234E'} height={22} width={20} />
        }} />
        <RootTab.Screen name='Notes' component={NotesScreen} options={{
          title: 'Notatki',
          headerShown: false,
          tabBarIcon: ({ focused }) => <NotesIcon fill={focused ? '#10DC49' : '#3A234E'} height={22} width={20} />
        }} />
        <RootTab.Screen name='Profile' component={ProfileScreen} options={{
          title: 'Profil',
          headerShown: false,
          tabBarIcon: ({ focused }) => <ProfileIcon fill={focused ? '#10DC49' : '#3A234E'} height={22} width={20} />
        }} />
      </RootTab.Navigator>
    </NavigationContainer>
  );
}