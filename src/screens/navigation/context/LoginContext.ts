import React, { createContext, useCallback, useContext, useReducer } from "react"


interface RegisterState {
    token: string | undefined
}
interface RegisterFunction {
    onSaveToken: (value:string) => void;
    onDeleteToken: () => void
}

const initialState = { token: undefined }
const initialFunctions = {
    onSaveToken: () => { },
    onDeleteToken: () => { }
}
const registerLoginReducer = (state: RegisterState, action: any) => {
    switch (action.type) {
        case "save":
            return { token: action.value }
        case "delete":
            return { token: undefined }
        default:
            return state
    }
}
export const useRegisterLoginReducer = () => {
    const [state, dispatch] = useReducer(registerLoginReducer, initialState);
    const onSave= useCallback((value: string) => {
        dispatch({ type: "save", value })
    }, [dispatch])
    const onDelete = useCallback(() => {
        dispatch({ type: "delete" })
    }, [dispatch])
    const onActionToken =  {
         onSaveToken:onSave,onDeleteToken: onDelete
    }
    return {
        currentState:state,
        onLoginAction:onActionToken
    }
}

export const RegisterLoginContext= createContext<RegisterState>(initialState)
export const RegisterFunctionLoginContext= createContext<RegisterFunction>(initialFunctions)
export const useLoginState=()=>useContext(RegisterLoginContext)
export const useLoginFunction=()=>useContext(RegisterFunctionLoginContext)