import React, { useCallback } from "react"
import { FlatList, StyleSheet, TextInput, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

import Button from "../../../../components/common/Button";
import { ListItem, useTodoFunction, useTodoState } from "../../../../navigation/context/TodoContext";


const TodoList = () => {
    const {list} = useTodoState();
    const {onDeleteItem}= useTodoFunction()
    const onDelete = useCallback((value: ListItem)=>{
        onDeleteItem(value);
    },[onDeleteItem])
    
    const renderItem = ({ item, index}: {item:ListItem, index: number}) => {
        return (
            <View style={{...styles.itemContainer,backgroundColor:index%2===0? "sandybrown": "darkseagreen" }}>
                <TextInput style={{ flex: 1 }} defaultValue={item.title} multiline/>
                <Button onPress={()=>onDelete(item)}>
                    <Icon name="delete-forever" style={styles.iconStyle} />
                </Button>

            </View>
        )
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={list}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        marginBottom: 20
    },
    itemContainer: {
        flexDirection: "row",
        marginBottom: 10,
        width: "100%",
        alignItems:"center",
        padding:10,
        borderRadius:10

    },
    iconStyle:{ fontSize: 24 ,color:"brown"}
})
export default TodoList