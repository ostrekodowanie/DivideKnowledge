import { StyleSheet, Text } from 'react-native'

type Children = {
    children: string,
    weight?: string,
    style?: {}
}

export default function PoppinsText({ children, weight, style }: Children) {
    return <Text style={weight ? { fontFamily: weight, ...style } : { ...styles.font, ...style }}>{ children }</Text>
}

const styles = StyleSheet.create({
    font: {
        fontFamily: 'afeefaf'
    }
})