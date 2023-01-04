import React, { useState } from 'react'
import './TabelaAlimentos.scss'
import service from '../../../services/storage.service'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import ModalFoods from '../../Modal/Modal'
import CadastroAlimentos from '../cadastrarAlimentos/CadastroAlimentos'

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

const key = 'itens'
let storage = service.loadData(key)
let itens = storage ? JSON.parse(storage) : []


// TODO:   COLOCAR BOTÕES PARA EDITAR PRODUTOS E PARA ADICIONAR QUANTIDADES ====================================================

const TabelaAlimentos = () => {    

    const [showModal, setShowModal] = useState(false)

    const [values, setValues] = useState(initialValues)

    let itemForModal = {}

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
    }

    // TODO: Trazer dados do backend para popular tabela
    const renderRow = content => {

        return (
            // TODO: Quando tiver um id para cada item, colocar a key no <tr>
            <tr key={ content.id } >
                <td>{ content.id }</td>
                <td>{ content.product}</td>
                <td>{ content.type }</td>
                <td>{ content.amount }</td>
                <td>
                    <button className="btn btn-primary" name='add-btn' onClick={ () =>  addQtd(10) }>ADD QTD</button>
                    <button className="btn btn-primary" name='edit-btn' onClick={ () => { 
                        setShowModal(true);
                        setValues(content);
                    }
                        }>EDITAR</button>
                    <button className="btn btn-primary" name='remove-btn' onClick={ () =>  onDelete(content) }>APAGAR</button>
                </td>
            </tr>
        )
    }

    const addQtd = value => {
        // Adicionar quantidade ao item já existente
    }

    const onDelete = rowContent => {
       const index = itens.findIndex(element => element.product === rowContent)
       itens.splice(index, 1)
       service.saveData(key, itens)
       document.location.reload(true)
    }
    return (
        <div itemID="table-foods">
            <h1>Listar Alimentos</h1>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Descrição</th>
                        <th>Tipo</th>
                        <th>Quantidade</th>
                        <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        { (itens == null || itens.length === 0) ? <tr></tr> : itens.map(renderRow) }
                    </tbody>
                </Table>
        { showModal ? <ModalFoods item={ values } onClose={ () => setShowModal(false) }/> : null }
       

{/* 
                <Modal
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Editar Produto</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={ handleSubmit }>
                        <Form.Group>
                            <Form.Group className="mb-3" controlId="formEditDescription">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control
                                name="product"
                                onChange={ handleChange }
                                type="text"
                                placeholder="Nome do produto..."
                                value=""
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formTypeOptions">
                                <Form.Select
                                aria-label="Selecionar tipo"
                                name="type"
                                onChange={ handleChange }
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
                                name="amount"
                                onChange={ handleChange }
                                type="number"
                                placeholder="Quantidade do produto..."
                                value=""
                                />
                            </Form.Group>

                        </Form.Group>
                    </Form>


                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fechar
                </Button>
                <Button variant="primary">Atualizar</Button>
                </Modal.Footer>
            </Modal>
                 */}
        </div>
    )
}

export default TabelaAlimentos