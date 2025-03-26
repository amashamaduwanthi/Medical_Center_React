
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
import AuthLayout from "./components/AuthLayOut.tsx";
import SignIn from "./pages/SignIn.tsx";
import {Signup} from "./pages/SignUp.tsx";

function App() {
    const routes=createBrowserRouter([//define routes of the app
        {
            path: "",
            element: <AuthLayout />,
            children: [
                { path: "/SignIn", element: <SignIn /> },
                { path: "", element: <Signup /> },
            ],
        },

        {
            path:'',
            element:<RootLayout/>,
            children:[
                {path:'/dashboard',element:<Dashboard/>},
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