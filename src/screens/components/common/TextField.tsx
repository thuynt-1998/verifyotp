import React from "react"
import { FieldErrors } from "react-hook-form"
import { StyleSheet, Text, TextInput, View } from "react-native"

interface PropsGlobal {
    labels: string;
    placeholder: string;
    value: string;
    onChange: () => void;
    isSecurity: boolean;
    error: FieldErrors | undefined
}
const TextField = ({ labels, placeholder, value, onChange, isSecurity, error }: PropsGlobal) => {
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.label}>{labels}</Text>
                <View
                    style={styles.inputStyle}
                >
                    <Text>+84</Text>
                    <TextInput
                        placeholder={placeholder}
                        placeholderTextColor="grey"
                        value={value}
                        onChangeText={onChange}
                        secureTextEntry={isSecurity ?? false}
                        style={[{ marginLeft: 10 }]}
                    />
                </View>




            </View>
            {error && <Text style={{ color: "red", fontSize: 12, textAlign: "right" }}>{error.message}</Text>}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        marginVertical: 10,
        alignItems: "center"
    },
    label: {
        flex: 1
    },
    inputStyle: {
        flex: 2,
        marginLeft: 20,
        flexDirection: "row",
        alignItems: "center"
    }

})
export default TextField