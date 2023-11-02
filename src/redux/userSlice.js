import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  current: {},
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state,action) => {
        state.current= action.payload
    },
    clearUser:(state,action)=>{
      state.current={}
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser,clearUser } = userSlice.actions

export default userSlice.reducer