import { Text } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

export default function Loader() {
    const tw = useTailwind()
    return <Text style={tw('font-bold mx-auto text-xl my-6')}>Ładowanie...</Text>
}