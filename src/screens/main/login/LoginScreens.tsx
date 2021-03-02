import React, { useCallback, useEffect, useState, } from "react"
import { Controller, useForm } from "react-hook-form"
import {  View } from "react-native"
import auth from '@react-native-firebase/auth';
import { showMessage } from "react-native-flash-message";
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigation } from "@react-navigation/native"

import Button from "../../components/common/Button"
import TextField from "../../components/common/TextField"
import { valid } from "./ValidLogin"

const LoginScreen = (props: any) => {
    const navigation = useNavigation()
    const { reset, control, handleSubmit, errors } = useForm({
        resolver: yupResolver(valid),
        defaultValues: { username: "" }
    })
    const [isLoad, setLoad] = useState(false)
    const onLogin = useCallback(({ username }: { username: string }) => {
        setLoad(true)
        var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,12})$/
        const phoneCheck = regexp.test(username)
        if (phoneCheck) {
            auth()
                .signInWithPhoneNumber(username)
                .then(confirmResult => {                                        
                    if (confirmResult) {
                       
                        navigation.navigate("confirmlogin", { confirm: confirmResult, phone: username })
                        reset()
                        setLoad(false)
                    }
                })
                .catch(error => {
                    if (error.code === "auth/invalid-phone-number") {
                        showMessage({message:"Số điện thoại không đúng.", type:"danger"})
                    }
                    else if (error.code === "auth/popup-closed-by-user") {

                    }
                    setLoad(false)
                })
                
        }
        else {
            showMessage({message:"Số điện thoại không hợp lệ", type:"danger"})
            setLoad(false)
        }
    }, [])
    return (
        <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}>
            <View>
                <Controller
                    control={control}
                    name="username"
                    render={({ onChange, value }) =>
                        <TextField
                            labels="Số điện thoại"
                            placeholder="Nhập số điện thoại. VD:+84..."
                            onChange={onChange}
                            value={value}
                            error={errors.username}
                        />

                    }
                />
                <Button onPress={handleSubmit(onLogin)} container isLoad={isLoad}>
                    Đăng nhập
                </Button>
            </View>
        </View>
    )
}
export default LoginScreen