import { createContext, useReducer } from "react";

export const ReplysContext = createContext();

export const replysReducer = (state, action) => {
    switch (action.type) {
        case 'SET_REPLYS':
            return {
                replys: action.payload
            }
        case 'CREATE_REPLYS':
            return {
                replys: [action.payload,...state.replys]
            }
        default:
            return state
    }
}

export const ReplysContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(replysReducer,{
        replys: null
    })
    return(
        <ReplysContext.Provider value={{...state,dispatch}}>
            { children }
        </ReplysContext.Provider>
    )
}