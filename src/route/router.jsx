import { RouterProvider,createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import App from "../App";
import HTML from '../components/HTML'
import CSS from '../components/CSS'
import JavaScript from "../components/JavaScript";
import Accessibility from "../components/Accessibility";

const route=createBrowserRouter([
    {
        element:<Layout/>,
        children:[
            {
                path:'/',
                element:<App/>
            },
            {
                path:'/HTML',
                element:<HTML />
            },
            {
                path:'/CSS',
                element:<CSS />
            },
            {
                path:'/JavaScript',
                element:<JavaScript/>
            },
            {
                path:'/accessibility',
                element:<Accessibility />                
            }
        ]
    }
])
const Routers = () => {
    return <RouterProvider router={route} />;
  };
  
  export default Routers;