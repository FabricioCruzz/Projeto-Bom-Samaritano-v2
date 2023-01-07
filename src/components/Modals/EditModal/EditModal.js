import React, { useState } from 'react'
import service from '../../../services/storage.service'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const datalistValues = [
    '',
    'KG',
    'UN',
    'PCT',
    'L',
    'CX12',
    'CX30'
]

const key = 'itens'
let storage = service.loadData(key)
let itens = storage ? JSON.parse(storage) : []


const EditModal = ({item = {}, onClose = ()=>{}, children}) => {
    console.log(item)

    const [values, setValues] = useState(item)


    const handleChange = e => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        let item = {
            id: values.id,
            product: values.product,
            type: values.type,
            amount: values.amount
        }
        const index = itens.findIndex(el => el.id === item.id)
        itens[index] = item
        service.saveData(key, itens)
        onClose()
        
    }

    return (
        <Modal
            show="true"
            onHide={onClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
            <Modal.Title>Editar Produto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* { children } */}
                {/* Colocar os inputs com os valores da tabela. Trazer eles usando o id da linha da tabela.
                Reusar o componente de Cadastro de Alimentos??? */}
                
                <Form>
                         <Form.Group>
                             <Form.Group className="mb-3" controlId="formEditDescription">
                                 <Form.Label>Descrição</Form.Label>
                                 <Form.Control
                                 name="product"
                                 onChange={ handleChange }
                                 type="text"
                                 placeholder="Nome do produto..."
                                 value={ values.product }
                                 />
                             </Form.Group>
 
                             <Form.Group className="mb-3" controlId="formTypeOptions">
                                 <Form.Select
                                 aria-label="Selecionar tipo"
                                 name="type"
                                 onChange={ handleChange }
                                 value={ values.type }
                                 >
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
                                 className="pbs-txt-appeareance"
                                 name="amount"
                                 onChange={ handleChange }
                                 type="number"
                                 placeholder="Quantidade do produto..."
                                 value={ values.amount }
                                 />
                             </Form.Group>
 
                         </Form.Group>
                     </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
                Fechar
            </Button>
            <Button className="pbs-btn-modal" variant="primary" onClick={ handleSubmit }>Atualizar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditModal