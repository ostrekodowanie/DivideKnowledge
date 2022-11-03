import { SafeAreaView } from "react-native-safe-area-context";
import { useTailwind } from "tailwind-rn/dist";

export default function FlashCards() {
    const tw = useTailwind();
    
    return (
        <SafeAreaView style={tw('flex items-center justify-center h-full')}>
        </SafeAreaView>
    )
}