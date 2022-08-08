import React from 'react';
import 'reset-css';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import routers  from './routers';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Routes>
      {
        routers.map((item,index)=>{
          return <Route path={item.path} element={<item.component></item.component>} key={item.path}></Route>
        })
      }
     
    </Routes>
  </BrowserRouter>
);
reportWebVitals();
