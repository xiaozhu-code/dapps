import React from 'react';
import 'reset-css';
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import routers  from './routers'
import store from "./store/index"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import StarMaskOnboarding from "@starcoin/starmask-onboarding"
import Home from './pages/home/home'
import { Provider } from 'react-redux'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const EmployeeWindow = window as any
EmployeeWindow.onboarding = new StarMaskOnboarding()

root.render(
  <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {
            routers.map((item,index)=>{
              return <Route path={item.path} element={<item.component></item.component>} key={item.path}></Route>
            })
          }
          <Route path="*" element={<Home/>} />
        
        </Routes>
      </BrowserRouter>
  </Provider>

);
reportWebVitals()
