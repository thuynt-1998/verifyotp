import React, { useEffect, useState } from "react"
import { Alert, StyleSheet, Text, View } from "react-native"
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Button from "../../components/common/Button";
import { useNavigation, useRoute } from "@react-navigation/native";

const ConfirmloginScreen = () => {
    const [counter, setCounter] = useState(60);
    const navigation= useNavigation()
    const route = useRoute()

    useEffect(() => {
        const timer: any = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer)
    }, [counter]);

    return (
        <View style={styles.container}>
            <Text style={{ ...styles.textStyle, textTransform: "uppercase" }}>Nhập mã OTP</Text>
            <OTPInputView
                style={{ width: '100%', height: 100 }}
                pinCount={6}
                //    code={"1234"} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                //    onCodeChanged = {code => { console.log(code);
                //    }}
                codeInputFieldStyle={styles.inputField}
                codeInputHighlightStyle={styles.borderInput}
                onCodeFilled={(code => {
                    console.log( route.params?.cofirm);
                    if(route.params?.cofirm)
                    {
                        route.params?.cofirm
                        .confirm(code)
                        .then(user => {

                        })
                        .catch(error => {

                            console.log(error)
                        })
                    }
                    
                })}
                placeholderCharacter="0"
                placeholderTextColor="grey"
            />
            {counter > 0 ?
                <Text
                    style={styles.textStyle}
                >
                    Gửi lại mã otp sau <Text
                        style={styles.textBold}
                    >
                        {counter}s
                    </Text>
                </Text> :
                <Button>Gửi lại </Button>

            }




        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 40,
    },
    textStyle: { textAlign: "center" },
    textBold: { fontWeight: "bold" },
    borderInput: {
        borderColor: "black",
    },
    inputField: {
        width: 45,
        height: 45,
        borderWidth: 1,
        color: "black"
    }
})
export default ConfirmloginScreen