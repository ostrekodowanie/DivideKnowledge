import { NavigationProp } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { RootTabParams } from "../../App";

type HomeNavigationProp = NavigationProp<RootTabParams, 'Home'>

export default function HomeScreen({ navigation }: { navigation: HomeNavigationProp }) {
    const tw = useTailwind()
    return (
        <View style={tw('p-4 flex-1 ')}>
            <View style={tw('mb-8')}>
                <Text style={tw('font-bold mb-2 text-xl')}>Fiszki</Text>
                <Pressable onPress={() => navigation.navigate('FlashCards')}><Text style={tw('font-medium text-primary')}>Sprawdź teraz</Text></Pressable>
            </View>
            <View style={tw('mb-8')}>
                <Text style={tw('font-bold mb-2 text-xl')}>Notatki</Text>
                <Pressable onPress={() => navigation.navigate('Notes')}><Text style={tw('font-medium text-primary')}>Sprawdź teraz</Text></Pressable>
            </View>
        </View>
    )
}