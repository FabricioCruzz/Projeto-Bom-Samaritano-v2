import React from 'react'
import './Estoque.scss'
import Menu from '../../components/menu/Menu'
import TabelaAlimentos from '../../components/estoque/listarAlimentos/TabelaAlimentos'
import CadastroAlimentos from '../../components/estoque/cadastrarAlimentos/CadastroAlimentos'

const Estoque = () => {

    return (
        <div>
            <Menu/>
            <h1>Estoque!!!</h1>
            {/* TODO: Permitir escolher entre cadastrar e listar alimentos (Usar condicional nos componentes?) */}

            <CadastroAlimentos/>

            {/* <TabelaAlimentos/> */}

        </div>
    )
}

export default Estoque