
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import {RootLayout} from "./components/RootLayOut.tsx";
import Appointment from "./pages/Appointment.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Patient from "./pages/Patient.tsx";
import Doctor from "./pages/Doctor.tsx";
import Billing from "./pages/Billing.tsx";
import {store} from "./redux/store.ts";
import {Provider} from "react-redux";

function App() {
    const routes=createBrowserRouter([//define routes of the app


        {
            path:'',
            element:<RootLayout/>,
            children:[
                {path:'',element:<Dashboard/>},
                {path:'/patient',element:<Patient/>},
                {path:'/doctor',element:<Doctor/>},
                {path:'/appointment',element:<Appointment/>},
                {path:'/payment',element:<Billing/>},

            ]
        }
    ])

    return (
        <>
            <Provider store={store}>
                <RouterProvider router={routes}/>
            </Provider></>
    )
}
export default App;