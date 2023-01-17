import React from 'react'
import './Estoque.scss'
import Menu from '../../components/menu/Menu'
import TabelaAlimentos from '../../components/estoque/listarAlimentos/TabelaAlimentos'
import CadastroAlimentos from '../../components/estoque/cadastrarAlimentos/CadastroAlimentos'
import Options from '../../components/options/Options'

const Estoque = () => {

    return (
        <div>
            <Menu/>
            <h1 className="pbs-title-h1">Bem-vindo ao Estoque!</h1>
            {/* TODO: Permitir escolher entre cadastrar e listar alimentos (Usar condicional nos componentes?) */}

            <Options/>

            {/* <CadastroAlimentos/>

            <TabelaAlimentos/> */}

        </div>
    )
}

export default Estoque