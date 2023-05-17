import { createContext, useReducer } from "react";

export const PostsContext = createContext();

export const postsReducer = (state, action) => {
    switch (action.type){
        case 'SET_POSTS':
            return {
                posts: action.payload
            }

        case 'CREATE_POSTS':
            return{
                posts: [action.payload,...state.posts]
            }

        case 'DELETE_POSTS':
            return {
                posts:state.posts.filter(data => data._id !== action.payload._id)
            }
        default:
            return state
    }
}


export const PostsContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(postsReducer,{
        posts:null
    })
    return(
        <PostsContext.Provider value={{...state, dispatch}}>
            {children}
        </PostsContext.Provider>
    )
}