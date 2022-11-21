import { SafeAreaView, Text } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

export default function HomeScreen() {
    const tw = useTailwind()
    return (
        <SafeAreaView>
            <Text style={tw('font-bold text-5xl')}>Home</Text>
        </SafeAreaView>
    )
}