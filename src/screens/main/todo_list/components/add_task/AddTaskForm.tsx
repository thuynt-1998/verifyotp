import { yupResolver } from "@hookform/resolvers/yup"
import React, { useCallback } from "react"
import { Controller, useForm } from "react-hook-form"
import { StyleSheet, View, Keyboard, Text } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

import Button from "../../../../components/common/Button"
import TextFull from "../../../../components/common/TextFull"
import { useTodoFunction, useTodoState } from "../../../../navigation/context/TodoContext"
import { valid } from "./ValidAddForm"

const AddTaskForm = () => {
    const { control, handleSubmit, reset, errors } = useForm({
        resolver: yupResolver(valid)
        , defaultValues: { task: "" }
    })
    const { onSaveItem } = useTodoFunction()
    const { list } = useTodoState();

    const AddTask = useCallback(({ task }: { task: string }) => {
        let id = list.length === 0 ? 0 : list[list.length - 1].id + 1
        Keyboard.dismiss();
        onSaveItem({ id: id, title: task })
        reset()
    }, [onSaveItem, list])
    return (
        <View style={styles.padding10}>
            <View style={styles.container}>
                <Controller
                    name="task"
                    control={control}
                    render={({ onChange, value }) =>
                        <TextFull
                            placeholderText="Thêm công việc"
                            onChange={onChange}
                            value={value}
                            isLine
                        />
                    }
                />
                <Button
                    onPress={handleSubmit(AddTask)}
                >
                    <Icon name="add-box" style={styles.iconStyle} />
                </Button>

            </View>
            {errors.task && <Text>{errors.task.message}</Text>}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        width: "100%",
        flexDirection: "row",

    },
    padding10: { paddingHorizontal: 10 },
    iconStyle: { fontSize: 24, color: "brown" },
})
export default AddTaskForm