import {Link} from "react-router";
import './Navigation.css'

export function Navigation() {
    return (
        <>
            <header className="bg-blue-600 text-white shadow=lg " >
                <nav className="px-4 py-3">
                    <ul className="flex space-x-4">
                        <Link to="" className='custom-link'>Home</Link>
                        <Link to="/patient" className='custom-link'>Patient</Link>
                        <Link to="/doctor" className='custom-link'>Doctor</Link>
                        <Link to="/appointment" className='custom-link'>Appointment</Link>
                        <Link to="/payment" className='custom-link'>Billing & Payment</Link>

                    </ul>
                </nav>
            </header>
        </>
    )
}


