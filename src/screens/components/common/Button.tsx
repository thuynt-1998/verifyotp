import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"


interface PropsGlobals {
    children: React.ReactNode;
    onPress: () => void
}

const Button = ({ children, onPress }: PropsGlobals) => {
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.8}
            onPress={onPress}
        >
            <Text style={styles.textStyle}>{children}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "darkgreen",
        borderRadius: 10,
        marginVertical: 10
    },
    textStyle: {
        width: "100%",
        textAlign: 'center',
        color: "white"
    }
})
export default Button