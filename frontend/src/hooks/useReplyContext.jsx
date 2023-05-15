import { ReplysContext } from "../context/replyContext";
import { useContext } from "react";

export const useReplysContext = () => {
    const context = useContext(ReplysContext)

    if(!context){
        throw Error('useReplysContext must be used inside an ReplysContextProvider')
    }
    return context
}