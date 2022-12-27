import React, { useState } from "react"
import Logo from '../../assets/logos/Logo.png'
import './Login.scss'
import { FaUser } from 'react-icons/fa'
import { RiLockPasswordFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

import Input from "../inputs/Input"

const Login = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    const handleSubmit = e => {
        // console.log(e.target[0].value)

        // TODO: Melhorar as validações
        if(!user || !password){
            alert('Por favor, preencha todos os campos!')
            return
        }

        else{
            navigate('/dashboard')
        }

        // TODO: Adicionar Auth e Guard
        e.preventDefault()
    }

    return (
        <div className="login-container">
                <img className="logo" src={ Logo } alt="Imagem Logo" />
                <form onSubmit={ handleSubmit }>
                    <div className="input-icons">
                        <FaUser className="user-icon"/>

                        <Input
                        name="user"
                        type="text"
                        placeholder="Usuário"
                        onChange={ setUser }
                        />
                        {/* <input
                        name="user"
                        type="text"
                        placeholder="Usuário" 
                        onChange={ setUser }
                        /> */}
                    </div>

                    <div className="input-icons">
                        <RiLockPasswordFill className="user-icon" />
                        
                        <Input
                        name="password"
                        type="password"
                        placeholder="Senha"
                        onChange={ setPassword }
                        />

                        {/* <input
                        name="password"
                        type="password"
                        placeholder="Senha"
                        onChange={ setPassword }
                        /> */}
                    </div>

                    <button
                    className="btnSubmit"
                    type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
    )
}

export default Login