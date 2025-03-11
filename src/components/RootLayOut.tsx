import {Outlet} from "react-router";
import {Navigation} from "./Navigation.tsx";
export function RootLayout() {
    return (
        <>
            <Navigation></Navigation>
            <Outlet></Outlet>
        </>
    )
}