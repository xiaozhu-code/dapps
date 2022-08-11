import {createSlice} from "@reduxjs/toolkit"

interface systemStateType {
  isStarMaskInstalled:boolean,
}

const systemSlice = createSlice({
  name:"system",
  initialState:{
    isStarMaskInstalled:true
  },
  reducers:{
    setIsStarMaskInstalled(state:systemStateType,{payload}:{payload:any}){
      state.isStarMaskInstalled = payload
    }
  }
})

export const {setIsStarMaskInstalled} = systemSlice.actions
export type {systemStateType};
export default systemSlice.reducer