import { React } from 'react'
import './Estoque.scss'
import Menu from '../../components/menu/Menu'
import Form from 'react-bootstrap/Form'

import CustomButton from '../../components/buttons/CustomButton'

const Estoque = () => {
    
    const datalistValues = [
        '',
        'KG',
        'UN',
        'PCT',
        'L',
        'CX12',
        'CX30'
    ]

    return (
        <>
        <Menu/>
        <h1>Estoque!!!</h1>
        <div>
            <h1>Cadastrar Alimento</h1>

            <Form className="d-flex">
                <Form.Group>
                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control type="text" placeholder="Nome do produto" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formTypeOptions">
                        <Form.Select aria-label="Selecionar tipo" name="select">
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
        </>
    )
}

export default Estoque