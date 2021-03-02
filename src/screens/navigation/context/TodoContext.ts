import React, { createContext, useCallback, useContext, useReducer } from "react"

export interface ListItem {
    id: number;
    title: string
}
export interface RegisterState {
    list: Array<ListItem>
}
interface RegisterAction {
    type: string,
    value: ListItem
}
interface RegisterFunction {
    onSaveItem: (value: ListItem) => void,
    onDeleteItem: (value: ListItem) => void
}

const initialState: RegisterState = { list: [] }
const initialFunctions = {
    onSaveItem: () => { },
    onDeleteItem: () => { }
}
function registerListReducer(state: RegisterState, action: RegisterAction) {
    switch (action.type) {
        case "save":
            return { list: state.list.concat(action.value) }
            break;
        case "delete":
            return { list: state.list.filter(item => item != action.value) }
            break;
        default:
            return state;
            break;
    }

}
export function useRegisterTodoContext() {
    const [state, dispatch] = useReducer(registerListReducer, initialState);
    const onSave = useCallback((value: ListItem) => {
        dispatch({ type: "save", value })
    }, [dispatch])
    const onDelete = useCallback((value: ListItem) => {
        dispatch({ type: "delete", value })
    }, [dispatch])
    const onActionTodo={onSaveItem: onSave, onDeleteItem:onDelete}
    return {
        currentState: state,
        onActionTodo
    }

}
export const RegisterTodoContext= createContext<RegisterState>(initialState)
export const RegisterFunctionContext= createContext<RegisterFunction>(initialFunctions)
export const useTodoState=()=>useContext(RegisterTodoContext)
export const useTodoFunction=()=>useContext(RegisterFunctionContext)