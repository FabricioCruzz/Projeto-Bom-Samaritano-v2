import React from 'react'
import './Estoque.scss'
import Menu from '../../components/menu/Menu'
import Options from '../../components/options/Options'

const Estoque = () => {

    return (
        <div id="estoque-container">
            <Menu/>
            <h1 className="pbs-title-h1">Bem-vindo ao Estoque!</h1>
            <Options variant="estoque"/>
        </div>
    )
}

export default Estoque