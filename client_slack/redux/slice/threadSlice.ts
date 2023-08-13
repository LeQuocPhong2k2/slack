import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IThread } from "./types";

export interface ThreadState{
    threadList:IThread[]
    value:number
    loading:boolean
}

const initialState:ThreadState = {
    threadList:[],
    value:10,
    loading:false
}

const threadSlice = createSlice({
    name:'threads',
    initialState,
    reducers:{
        setThreadList:(state,action:PayloadAction<IThread[]>)=>{
            state.threadList = action.payload
        },
        addThread:(state,action:PayloadAction<IThread>)=>{
            state.threadList.push(action.payload)
        }
    }
})

export const {setThreadList,addThread} = threadSlice.actions

export const getThreadList = (state:any) => state.threads.threadList

export const getThreadById = (state:any,threadId:string) => state.threads.threadList.find((thread:IThread)=>thread.id === threadId)

export default threadSlice.reducer