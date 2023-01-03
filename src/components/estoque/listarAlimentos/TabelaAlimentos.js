import React, { useState } from 'react'
import './TabelaAlimentos.scss'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import CadastroAlimentos from '../cadastrarAlimentos/CadastroAlimentos'

const key = 'itens'
let alimentos = []


// TODO:   COLOCAR BOTÕES PARA EDITAR PRODUTOS E PARA ADICIONAR QUANTIDADES ====================================================

const TabelaAlimentos = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    
    let dados = localStorage.getItem(key)
    alimentos = JSON.parse(dados)

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
                    <button className="btn btn-primary" name='edit-btn' onClick={ () =>  onUpdate(content) }>EDITAR</button>
                    <button className="btn btn-primary" name='remove-btn' onClick={ () =>  onDelete(content) }>APAGAR</button>
                </td>
            </tr>
        )
    }

    const addQtd = value => {
        // Adicionar quantidade ao item já existente
    }

    const onUpdate = rowContent => {
        // Atualizar produto e mandar atualizado o banco de dados
        handleShow()
    }

    const onDelete = rowContent => {
       const index = alimentos.findIndex(element => element.product === rowContent)
       alimentos.splice(index, 1)
       localStorage.setItem(key, JSON.stringify(alimentos))
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
                        { (alimentos == null || alimentos.length === 0) ? <tr></tr> : alimentos.map(renderRow) }
                    </tbody>
                </Table>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>Editar Produto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Colocar os inputs com os valores da tabela. Trazer eles usando o id da linha da tabela.
                        Reusar o componente de Cadastro de Alimentos??? */}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="primary">Atualizar</Button>
                    </Modal.Footer>
                </Modal>
        </div>
    )
}

export default TabelaAlimentos