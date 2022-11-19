import utilities from './tailwind.json'
import { TailwindProvider } from 'tailwind-rn';
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './src/screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlashCardsScreen from './src/screens/FlashCardsScreen';
import NotesScreen from './src/screens/NotesScreen';
import ProfileScreen from './src/screens/ProfileScreen';

export type RootTabParams = {
  Home: undefined,
  FlashCards: undefined,
  Notes: undefined,
  Profile: undefined
}

const RootTab = createBottomTabNavigator<RootTabParams>()

export default function App() {
  return (
    // @ts-ignore
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <RootTab.Navigator>
          <RootTab.Screen name='Home' component={HomeScreen} options={{
            title: 'Eksploruj'
          }} />
          <RootTab.Screen name='FlashCards' component={FlashCardsScreen} options={{
            title: 'Fiszki'
          }} />
          <RootTab.Screen name='Notes' component={NotesScreen} options={{
            title: 'Notatki'
          }} />
          <RootTab.Screen name='Profile' component={ProfileScreen} options={{
            title: 'Profil'
          }} />
        </RootTab.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}