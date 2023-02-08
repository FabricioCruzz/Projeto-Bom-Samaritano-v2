import React from 'react'
import './Cadastros.scss'
import Menu from '../../components/menu/Menu'
import Options from '../../components/options/Options'

const Cadastros = () => {
    
    return (
        <div id="cadastros-container">
            <Menu/>
            <h1 className="pbs-title-h1">Bem-vindo aos Cadastros!</h1>

            <Options variant="cadastros"/>
        </div>
    )
}

export default Cadastros