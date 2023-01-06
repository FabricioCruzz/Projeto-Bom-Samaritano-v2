import React, { useState } from 'react'
import service from '../../../services/storage.service'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const key = 'itens'
let storage = service.loadData(key)
let itens = storage ? JSON.parse(storage) : []

const AddModal = ({item = {}, onClose = ()=>{}}) => {

    const [values, setValues] = useState(item)
    
    const oldValueQtd = item.amount
    
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
            amount: oldValueQtd + Number(values.amount)
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
            <Modal.Title>Adicionar Quantidade</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form>
                    <Form.Group>
                        
                        <h2 className="mb-3">{ values.product }</h2>

                        <Form.Group controlId="formAddQTD">
                            <Form.Label>Quantidade</Form.Label>
                            <Form.Control
                            name="amount"
                            onChange={ handleChange }
                            type="number"
                            placeholder="Quantidade a ser adicionada..."
                            />
                        </Form.Group>
                    </Form.Group>
                </Form>

            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
                Fechar
            </Button>
            <Button variant="primary" onClick={ handleSubmit }>Adicionar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddModal