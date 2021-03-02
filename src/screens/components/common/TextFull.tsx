import React from "react"
import { StyleSheet, TextInput as TextInputMask} from "react-native"

const TextFull = (props: any) => {
    const { onChange, value, placeholderText, isLine}= props
    return (
           
            <TextInputMask
                style={[{...styles.inputStyles, },isLine? {borderBottomWidth:1}: {borderBottomWidth:0}]}
                placeholder={placeholderText}
                placeholderTextColor="darkgrey"
                onChangeText={onChange}
                value={value}
            />
            
    )
}
const styles = StyleSheet.create({
    
    inputStyles: {
        borderBottomColor: "black",
        flex:1,
        marginBottom:10
    },
    
})
export default TextFull