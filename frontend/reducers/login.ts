import { createSlice } from '@reduxjs/toolkit'

export interface User {
    id: number,
    username: string,
    is_staff: boolean
}

interface Login {
    logged: boolean,
    user: User,
    tokens: {
        access: string,
        refresh: string
    }
}

const initialState: Login = {
    logged: false,
    user: {
        id: -1,
        username: '',
        is_staff: false
    },
    tokens: {
        access: '',
        refresh: ''
    }
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: (state, action) => {
            state.logged = true
            state.user = action.payload.user
            state.tokens = action.payload.tokens
        },
        logout: (state) => {
            state.logged = false
            state.user = initialState.user
            state.tokens = initialState.tokens
        }
    }
})

export default loginSlice.reducer

export const { login, logout } = loginSlice.actions