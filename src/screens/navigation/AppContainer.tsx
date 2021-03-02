import React, { useEffect, useState } from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import LoginScreen from "../main/login/LoginScreens";
import ConfirmloginScreen from "../main/confirm_login/ConfirmloginScreen";
import { RegisterFunctionContext, RegisterTodoContext, useRegisterTodoContext } from "./context/TodoContext";
import TodoForm from "../main/todo_list";
import { useLoginState } from "./context/LoginContext";


const Stack = createStackNavigator()

const AppContainer = () => {

    return (
        <NavigationContainer>
            <RootStack />
        </NavigationContainer>
    )
}
const TodoStack = () => {
    const { currentState, onActionTodo } = useRegisterTodoContext()
    return (
        <RegisterTodoContext.Provider value={currentState}>
            <RegisterFunctionContext.Provider value={onActionTodo}>
                <TodoForm />
            </RegisterFunctionContext.Provider>

        </RegisterTodoContext.Provider>
    )
}

const RootStack = () => {
    const { token } = useLoginState()
    return (
        <Stack.Navigator initialRouteName="login">
            {!token ?
                <>
                    <Stack.Screen
                        name="login"
                        component={LoginScreen}
                        options={{ title: "Đăng nhập" }}
                    />
                    <Stack.Screen
                        name="confirmlogin"
                        component={ConfirmloginScreen}
                        options={{ title: "Xác thực" }}
                    />
                </> :
                <Stack.Screen
                    name="list"
                    component={TodoStack}
                    options={{ title: "Công việc" }}
                />
            }



        </Stack.Navigator>
    )
}
export default AppContainer