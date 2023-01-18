import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Dashboard from '../pages/dashboard/Dashboard'
import Login from '../pages/login/Login'
import Estoque from '../pages/estoque/Estoque'
import CadastroAlimentos from '../components/estoque/cadastrarAlimentos/CadastroAlimentos'
import TabelaAlimentos from '../components/estoque/listarAlimentos/TabelaAlimentos'
import Menu from '../components/menu/Menu'

export default function AppRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Login/> }/>
                <Route path="dashboard" element={ <Dashboard/> }/>
                <Route path="estoque" element={ <Estoque/> }/>
                <Route path="estoque/cadastrar" element={ <div> <Menu/> <CadastroAlimentos/> </div> }/>
                <Route path="estoque/tabela" element={ <div> <Menu/> <TabelaAlimentos/> </div> }/>
                <Route path="*" element={ <h1>Not Found!!!</h1> }/>
            </Routes>
        </BrowserRouter>
    )
}