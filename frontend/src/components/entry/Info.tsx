import { Text } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

export default function Info() {
    const tw = useTailwind()
    return <Text style={tw('font-bold my-6 text-xl')}>Witaj w DivideKnowledge!</Text>
}