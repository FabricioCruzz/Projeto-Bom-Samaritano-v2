import React, { useState } from 'react'
import './Estoque.scss'
import Menu from '../../components/menu/Menu'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'

import CustomButton from '../../components/buttons/CustomButton'

const initialValues = {
    product: '',
    select: ''
}

const datalistValues = [
    '',
    'KG',
    'UN',
    'PCT',
    'L',
    'CX12',
    'CX30'
]

let key = 'itens'
let itens = []

const Estoque = () => {

    const [values, setValues] = useState(initialValues)
    
    
    const handleChange = e => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }
    
    const handleSubmit = e => {
        itens.push(values)
        localStorage.setItem(key, JSON.stringify(itens))       
        // TODO: Enviar dados para o backend
        console.log(values)
        e.preventDefault()
    }

    // const data = () => {
    //     let dados = localStorage.getItem(key)
    //     itens = JSON.parse(dados)
    //     console.log(itens)
        
    // }

    return (
        <>
            <Menu/>

            {/* TODO: SEPARAR EM COMPONENTE O CÓDIGO ABAIXO */}
            <h1>Estoque!!!</h1>
            <div>
                <h1 className="t-estoque">Cadastrar Alimento</h1>

                <Form className="d-flex" onSubmit={ handleSubmit }>
                    <Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control name="product" onChange={ handleChange } type="text" placeholder="Nome do produto" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formTypeOptions">
                            <Form.Select aria-label="Selecionar tipo" name="select" onChange={ handleChange }>
                                {/* TODO: Colocar validação para o usuário não enviar um valor vazio (Tipo do Produto:) */}
                                <option value={ datalistValues[0] } disabled>Tipo do Produto:</option>
                                <option value={ datalistValues[1] }>KG</option>
                                <option value={ datalistValues[2] }>UN</option>
                                <option value={ datalistValues[3] }>PCT</option>
                                <option value={ datalistValues[4] }>Litro</option>
                                <option value={ datalistValues[5] }>CX12</option>
                                <option value={ datalistValues[6] }>CX30</option>
                            </Form.Select>
                        </Form.Group>
            
                    </Form.Group>
                    <CustomButton value="Cadastrar" type="submit"/>
                </Form>
            </div>

            {/* TODO: SEPARAR EM COMPONENTE O CÓDIGO ABAIXO */}
            <div>
                <h1>Listar Alimentos</h1>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Descrição</th>
                        <th>Tipo</th>
                        <th>Quantidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>Descrição do Produto</td>
                        <td>Tipo - kg, L e etc. </td>
                        <td>10</td>
                        </tr>

                    </tbody>
                </Table>

            </div>
        </>
    )
}

export default Estoque