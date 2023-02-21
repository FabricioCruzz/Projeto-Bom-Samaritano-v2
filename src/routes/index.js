import { Route, Routes, Navigate } from 'react-router-dom'
import Dashboard from '../pages/dashboard/Dashboard'
import Login from '../pages/login/Login'
import Estoque from '../pages/estoque/Estoque'
import CadastroAlimentos from '../components/estoque/cadastrarAlimentos/CadastroAlimentos'
import TabelaAlimentos from '../components/estoque/listarAlimentos/TabelaAlimentos'
import Menu from '../components/menu/Menu'
import Cadastros from '../pages/cadastros/Cadastros'
import CadastroFamilias from '../components/cadastros/cadastrarFamilias/CadastroFamilias'
import TabelaFamilias from '../components/cadastros/listarFamilias/TabelaFamilias'
import CadastroUnico from '../components/cadastros/listarFamilias/CadastroUnico'

export default function AppRoutes(){
    return (
            <Routes>
                <Route path="/" element={ <Navigate to="/login"/> }/>
                <Route path="/login" element={ <Login/> }/>
                <Route path="dashboard" element={ <Dashboard/> }/>
                <Route path="estoque" element={ <Estoque/> }/>
                <Route path="estoque/cadastrar" element={ <div> <Menu/> <CadastroAlimentos/> </div> }/>
                <Route path="estoque/tabela" element={ <div> <Menu/> <TabelaAlimentos/> </div> }/>
                <Route path="cadastros" element={ <Cadastros/> }/>
                <Route path="cadastros/cadastrar" element={ <div> <Menu/> <CadastroFamilias/> </div> }/>
                <Route path="cadastros/tabela" element={ <div> <Menu/> <TabelaFamilias/> </div> }/>
                <Route path="cadastros/tabela/:id" element={ <div> <Menu/> <CadastroUnico/> </div> }/>
                <Route path="*" element={ <h1>Not Found!!!</h1> }/>
            </Routes>
    )
}