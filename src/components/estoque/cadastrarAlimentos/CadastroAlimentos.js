import React, { useState } from 'react'
import './CadastroAlimentos.scss'
import service from '../../../services/storage.service'
import Form from 'react-bootstrap/Form'
import CustomButton from '../../buttons/CustomButton'
import { Container } from 'react-bootstrap'


const defaultValues = {
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

    const [values, setValues] = useState(defaultValues)
    
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
        <Container id="cds-ali-container">
            <Container className="container-form">

                <h2 className="pbs-title-h2">Cadastrar Alimento</h2>

                <Form className="pbs-flex pbs-col pbs-form" onSubmit={ handleSubmit }>
                    <Form.Group className="form-box">
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
                            <Form.Label>Tipo</Form.Label>
                            <Form.Select
                            className="pbs-custom-select"
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
                            placeholder="Quantidade..."
                            />
                        </Form.Group>
                
                    </Form.Group>

                    <CustomButton className="btn-margin" value="Cadastrar" type="submit"/>

                </Form>
            </Container>
    </Container>
    )
}

export default CadastroAlimentos