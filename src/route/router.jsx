import { RouterProvider,createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import App from "../App";
import HTML from '../components/Quizz'

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
            
        ]
    }
])
const Routers = () => {
    return <RouterProvider router={route} />;
  };
  
  export default Routers;