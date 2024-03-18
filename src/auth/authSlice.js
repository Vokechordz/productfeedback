import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
         token: null,
         userId: JSON.parse(localStorage.getItem('userId'))
    },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken, userId } = action.payload
            state.token = accessToken
            state.userId= userId
            localStorage.setItem('userId', JSON.stringify(userId))
        },
        logOut: (state, action) => {
            state.token = null
            state.userId= null
            localStorage.removeItem('userId')
        },
        setUserId: (state, action) => {
            state.userId= action.payload
            localStorage.setItem('userId', JSON.stringify(action.payload))
        }
    }
})

export const { setCredentials, logOut, setUserId } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentUserId = (state) => state.auth.userId