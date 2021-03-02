import React from "react"
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native"


interface PropsGlobals {
    children: React.ReactNode | string;
    onPress: () => void;
    container: boolean;
    isLoad: boolean
}

const Button = ({ children, onPress, container, isLoad }: PropsGlobals) => {
    return (
        <TouchableOpacity
            style={{ ...styles.container, backgroundColor: container ? isLoad ? "darkgray": "darkgreen" : undefined }}
            activeOpacity={0.8}
            onPress={onPress}
        >
            {isLoad ? <ActivityIndicator color="white" /> : <Text style={styles.textStyle}>{children}</Text>}
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
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