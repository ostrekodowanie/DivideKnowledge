import { StatusBar } from 'expo-status-bar';
import TailwindProvider from 'tailwind-rn/dist/tailwind-provider';
import utilities from './tailwind.json';
import Nav from './components/Nav';
import { useFonts } from 'expo-font'
import 'react-native-gesture-handler';

export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require('./assets/fonts/Poppins-Regular.ttf'),
    medium: require('./assets/fonts/Poppins-Medium.ttf'),
    semibold: require('./assets/fonts/Poppins-SemiBold.ttf'),
    bold: require('./assets/fonts/Poppins-Bold.ttf'),
  })

  if(!fontsLoaded) {
    return null
  }

  return (
    // @ts-ignore
    <TailwindProvider utilities={utilities}>
      <StatusBar style="auto" />
      <Nav />
    </TailwindProvider>
  );
}