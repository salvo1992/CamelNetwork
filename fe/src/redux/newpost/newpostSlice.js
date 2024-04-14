import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import AxiosClient from "../../component/client/client";
const client = new AxiosClient()

const initialState = {
    newpost: [],
    isLoading: false,
    error: null,
    totalBooks: 0
}

export const getAllnewpost = createAsyncThunk(
    'newpost/GETnewpost',
    async () => {
        return await client.get('/newpost')
    }
)

const newpostSlice = createSlice({
    name: 'newpost',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(getAllnewpost.pending, state =>  {
                state.isLoading = true
            })
            .addCase(getAllnewpost.fulfilled, (state, action) => {
                state.isLoading = false
                state.totalnewpost = action.payload.length
                state.newpost = action.payload
            })
            .addCase(getAllnewpost.rejected, state => {
                state.isLoading = false
                state.error = 'Oops, an error has occurred. BAD DEV!'
            })
    }
})

export const allnewpost = (state) => state.newpostData.newpost
export const isnewpostLoading = state => state.newpostData.isLoading
export const newpostError = state => state.newpostData.error
export default newpostSlice.reducer