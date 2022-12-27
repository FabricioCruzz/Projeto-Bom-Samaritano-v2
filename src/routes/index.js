import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Dashboard from '../pages/dashboard/Dashboard'
import Login from '../pages/login/Login'
import Estoque from '../pages/estoque/Estoque'

export default function AppRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Login/> }/>
                <Route path="/dashboard" element={ <Dashboard/> }/>
                <Route path="/estoque" element={ <Estoque/> }/>
                <Route path="*" element={ <h1>Not Found!!!</h1> }/>
            </Routes>
        </BrowserRouter>
    )
}