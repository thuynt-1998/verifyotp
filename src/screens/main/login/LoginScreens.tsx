import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigation } from "@react-navigation/native"
import React, { useCallback, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Alert, View } from "react-native"
import auth from '@react-native-firebase/auth';

import Button from "../../components/common/Button"
import TextField from "../../components/common/TextField"
import { valid } from "./ValidLogin"

const LoginScreen = (props: any) => {
    const navigation = useNavigation()
    const { reset, control, handleSubmit, errors } = useForm({
        resolver: yupResolver(valid),
        defaultValues: { username: "" }
    })
    const [phone, setPhone] = useState<string>()
    const onLogin = useCallback(({ username }: { username: string }) => {
        var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
        const phoneCheck = regexp.test("+84" + username)
        if (phoneCheck) {
            setPhone(username)
            auth()
                .signInWithPhoneNumber("+84" + username)
                .then(confirmResult => {
                    if (confirmResult) {
                        navigation.navigate("confirmlogin",{cofirm: confirmResult, phone:"+84" + username})
                    }
                })
                .catch(error => {
                    console.log(error.message);
                })
        }
        else{
            Alert.alert(
                "",
                "Số điện thoại không hợp lệ",
                [
                  
                  { text: "OK", onPress: () => {reset()} }
                ],
                { cancelable: false }
              );
        }
    }, [navigation])
    useEffect(() => {
        reset()
    }, [])
    return (
        <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 40 }}>
            <View>
                <Controller
                    control={control}
                    name="username"
                    render={({ onChange, value }) =>
                        <TextField
                            labels="Số điện thoại"
                            placeholder="Nhập số điện thoại"
                            onChange={onChange}
                            value={value}
                            error={errors.username}
                        />

                    }
                />
                <Button onPress={handleSubmit(onLogin)}>
                    Đăng nhập
                </Button>
            </View>



        </View>
    )
}
export default LoginScreen