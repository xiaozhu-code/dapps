import {createSlice} from "@reduxjs/toolkit"

interface systemStateType {
  isStarMaskInstalled:boolean,
  account:string,
  network:string
}

const systemSlice = createSlice({
  name:"system",
  initialState:{
    isStarMaskInstalled:true,
    account:"",
    network:''
  },
  reducers:{
    setIsStarMaskInstalled(state:systemStateType,{payload}:{payload:any}){
      state.isStarMaskInstalled = payload
    },
    setStarcoinAccount(state:systemStateType,{payload}:{payload:string}){
      state.account = payload
    },
    setNetwork(state:systemStateType,{payload}:{payload:string}){
      state.network = payload
    }
  }
})

export const {setIsStarMaskInstalled,setStarcoinAccount,setNetwork} = systemSlice.actions
export type {systemStateType};
export default systemSlice.reducer