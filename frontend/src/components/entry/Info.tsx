import { Image, Text } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import styles from "../../constants/styles";

export default function Info() {
    const tw = useTailwind()
    return (
        <>
            <Image style={{...styles.imageContain, ...tw('w-[62%] -mb-[1rem] mx-auto')}} source={require('../../../assets/entry.png')} />
            <Text style={{fontFamily: 'ExtraBold', ...tw('mb-6 text-3xl')}}>Witaj w DivideKnowledge!</Text>
            <Text style={{fontFamily: 'Medium', ...tw('text-fontLight text-[1.15rem] leading-[1.7rem] max-w-[90%] mb-12 text-center')}}>Przygotuj się na opanowanie najważniejszych i najbardziej interesujących Cię informacji przy pomocy jednej aplikacji.</Text>
        </>
    )
}