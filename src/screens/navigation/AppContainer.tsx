import React from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../main/login/LoginScreens";
import ConfirmloginScreen from "../main/confirm_login/ConfirmloginScreen";


const Stack = createStackNavigator()

const AppContainer = () => {

    return (
        <NavigationContainer>
            <RootStack />
        </NavigationContainer>
    )
}


const RootStack = () => {
    return (
        <Stack.Navigator initialRouteName="login">
            <Stack.Screen
                name="login"
                component={LoginScreen}
                options={{ title: "Đăng nhập" }}
            />
            <Stack.Screen
                name="confirmlogin"
                component={ConfirmloginScreen}
                options={{title:"Xác thực"}}
            />
        </Stack.Navigator>
    )
}
export default AppContainer