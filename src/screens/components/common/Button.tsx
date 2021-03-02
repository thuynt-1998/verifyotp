import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"


interface PropsGlobals {
    children: React.ReactNode|string;
    onPress: () => void;
    container:boolean
}

const Button = ({ children, onPress , container}: PropsGlobals) => {
    return (
        <TouchableOpacity
            style={{...styles.container, backgroundColor:container? "darkgreen": undefined}}
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