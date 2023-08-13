import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IChannel } from './types'


export interface ChannelState {
  channelList: IChannel[]
  value: number
  loading: boolean
}

const initialState: ChannelState = {
  channelList: [],
  value: 10,
  loading: false
}

const channelSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        setChannelList: (state, action:PayloadAction<IChannel[]>) => {
            state.channelList = action.payload
        },
        addChannel: (state, action:PayloadAction<IChannel>) => {
            state.channelList.push(action.payload)
        },
    },
})

export const fetchChannels = createAsyncThunk('users/getAllUsers', async (thunkApi) => {
  const response = await fetch('http://localhost:5000/api/channels')
  const data = await response.json()
  return data
})


// export actions
export const { setChannelList, addChannel } = channelSlice.actions

export const getChannelList = (state:any) => state.channels.channelList

export default channelSlice.reducer