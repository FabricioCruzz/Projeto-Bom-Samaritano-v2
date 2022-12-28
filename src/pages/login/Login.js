import React, { useState } from "react"
import logo from '../../assets/logos/Logo.png'
import './Login.scss'
import { FaUser } from 'react-icons/fa'
import { RiLockPasswordFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

import Input from "../../components/inputs/Input"
import CustomButton from "../../components/buttons/CustomButton"

const Login = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const pathDashboard = '/dashboard'

    const handleSubmit = e => {
        // console.log(e.target[0].value)

        let data = {
            user: user,
            password: password
        }

        // TODO: Melhorar as validações
        // TODO: Verificar como enviar dados para o backend
        if(!data.user || !data.password){
            alert('Por favor, preencha todos os campos!')
            return
        }

        else{
            navigate(pathDashboard)
        }

        // TODO: Adicionar Auth e Guard
        e.preventDefault()
    }

    return (
        <div className="login-container">
                <img className="logo" src={ logo } alt="Imagem Logo" />
                <form className="formLogin" onSubmit={ handleSubmit }>
                    <div className="input-icons">
                        <FaUser className="user-icon"/>

                        <Input
                        name="user"
                        type="text"
                        placeholder="Usuário"
                        onChange={ setUser }
                        />
                    </div>

                    <div className="input-icons">
                        <RiLockPasswordFill className="user-icon" />
                        
                        <Input
                        name="password"
                        type="password"
                        placeholder="Senha"
                        onChange={ setPassword }
                        />
                    </div>

                    <CustomButton value="Login" type="submit"/>
                </form> 
            </div>
    )
}

export default Login