import Home from './pages/home/home';
import Dashboard from "./pages/dashboard/dashboard";
const routers=[
  {
    path:"/",
    component:Home,
    children:[
      {
        path:"/dashboard",
        component:Dashboard,
      }
    ]
  }
]
export default routers