import React, { useCallback, useEffect, useState } from "react"
import {  StyleSheet, Text, View } from "react-native"
import OTPInputView from '@twotalltotems/react-native-otp-input'
import auth from '@react-native-firebase/auth';
import { useRoute } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";

import Button from "../../components/common/Button";
import { useLoginFunction } from "../../navigation/context/LoginContext";

const ConfirmloginScreen = () => {
    const [counter, setCounter] = useState(90);
    const route: any = useRoute()
    const [confirm, setConfirm] = useState<any>()
    const { onSaveToken } = useLoginFunction()

    useEffect(() => {
        const timer: any = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        setConfirm(route.params?.confirm)
        return () => clearInterval(timer)
    }, [counter,route]);

    const onSendAgain = useCallback(() => {
        auth()
            .signInWithPhoneNumber(route.params?.phone)
            .then(confirmResult => {
                if (confirmResult) {
                    setConfirm(confirmResult)
                    setCounter(90)
                }
            })
            .catch(error => {
                console.log("---" + error.message);
            })
    }, [])
    const onCodeFilled = useCallback((code) => {
        if (confirm) {
            confirm
                .confirm(code)
                .then((user: any) => {                    
                    if (user) {
                        onSaveToken(user.user.uid)
                    }
                })
                .catch((error: any) => {
                    if (error.code === "auth/invalid-verification-code") {
                        showMessage({ message: "Mã xác minh không đúng.", type: "danger" })
                    }
                    else if (error.code === "auth/code-expired") {
                        showMessage({ message: "Mã xác minh đã hết hạn", type: "info" })
                    }
                })
        }
    }, [confirm])
    return (
        <View style={styles.container}>
            <Text style={{ ...styles.textStyle, textTransform: "uppercase" }}>Nhập mã OTP</Text>
            <OTPInputView
                style={{ width: '100%', height: 100 }}
                pinCount={6}
                codeInputFieldStyle={styles.inputField}
                codeInputHighlightStyle={styles.borderInput}
                onCodeFilled={onCodeFilled}
                placeholderCharacter="0"
                placeholderTextColor="grey"
            />
            {counter > 0 ?
                <Text style={styles.textStyle} >
                    Gửi lại mã otp sau <Text
                        style={styles.textBold}
                    >
                        {counter}s
                    </Text>
                </Text> :
                <Button onPress={onSendAgain} container>Gửi lại </Button>

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