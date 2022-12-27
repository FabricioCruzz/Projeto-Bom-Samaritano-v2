import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Dashboard from '../components/dashboard/Dashboard'
import Login from '../components/login/Login'

export default function AppRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Login/> }/>
                <Route path="/dashboard" element={ <Dashboard/> }/>
            </Routes>
        </BrowserRouter>
    )
}