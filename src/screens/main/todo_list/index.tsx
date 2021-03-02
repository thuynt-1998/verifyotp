import React from "react"
import {  Button, SafeAreaView} from "react-native"
import { useNavigation } from "@react-navigation/native"

import AddTaskForm from "./components/add_task/AddTaskForm"
import TodoList from "./components/task_list/TaskListForm"
import { useLoginFunction } from "../../navigation/context/LoginContext"

const TodoForm =()=>{
    const navigation= useNavigation()
    const {onDeleteToken} =useLoginFunction()
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Button onPress={onDeleteToken}   title="Thoát" color="darkgreen"/>
          ),
        });
      }, [navigation]);

    return (
        <SafeAreaView style={{flex:1, marginHorizontal: 20}}>
            <AddTaskForm/>
            <TodoList/>
        </SafeAreaView>
    )
}
export  default TodoForm