import React, { useState } from 'react'
import './CadastroAlimentos.scss'
import service from '../../../services/storage.service'
import Form from 'react-bootstrap/Form'
import CustomButton from '../../buttons/CustomButton'


const initialValues = {
    id: undefined,
    product: '',
    type: '',
    amount: 0
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
let storage = service.loadData(key)
let itens = storage ? JSON.parse(storage) : []


const CadastroAlimentos = () => {
    const [values, setValues] = useState(initialValues)
    
    
    const handleChange = e => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }
    
    const handleSubmit = e => {
        e.preventDefault()

        let item = {
            id: (new Date().getTime()).toString(10),
            product: values.product,
            type: values.type,
            amount: values.amount
        }
        itens.push(item)
        service.saveData(key, itens)
        // TODO: Enviar dados para o backend
        console.log(values)
    }

    return (
        <div itemID="register-foods">

            <h1 className="t-estoque">Cadastrar Alimento</h1>

            <Form className="d-flex" onSubmit={ handleSubmit }>
                <Form.Group>
                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                        name="product"
                        onChange={ handleChange }
                        type="text"
                        placeholder="Nome do produto..."
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formTypeOptions">
                        <Form.Select
                        aria-label="Selecionar tipo"
                        name="type"
                        onChange={ handleChange }
                        >
                            {/* TODO: Colocar validação para o usuário não enviar um valor vazio (Tipo do Produto:) */}
                            <option value={ datalistValues[0] }>Tipo do Produto:</option>
                            <option value={ datalistValues[1] }>KG</option>
                            <option value={ datalistValues[2] }>UN</option>
                            <option value={ datalistValues[3] }>PCT</option>
                            <option value={ datalistValues[4] }>Litro</option>
                            <option value={ datalistValues[5] }>CX12</option>
                            <option value={ datalistValues[6] }>CX30</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAmount">
                        <Form.Label>Quantidade</Form.Label>
                        <Form.Control
                        name="amount"
                        onChange={ handleChange }
                        type="number"
                        placeholder="Quantidade do produto..."
                        />
                    </Form.Group>
            
                </Form.Group>
                
                <CustomButton value="Cadastrar" type="submit"/>
                
            </Form>
        </div>
    )
}

export default CadastroAlimentos