import React, { useState } from 'react'
import './TabelaAlimentos.scss'
import service from '../../../services/storage.service'
import Table from 'react-bootstrap/Table'
import EditModal from '../../Modals/EditModal/EditModal'
import AddModal from '../../Modals/AddModal/AddModal'
import { RiAddBoxFill } from 'react-icons/ri'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { Button } from 'react-bootstrap'

const initialValues = {
    id: undefined,
    product: '',
    type: '',
    amount: 0
}

const key = 'itens'
let storage = service.loadData(key)
let itens = storage ? JSON.parse(storage) : []


// TODO:   COLOCAR BOTÕES PARA EDITAR PRODUTOS E PARA ADICIONAR QUANTIDADES ====================================================

const TabelaAlimentos = () => {    

    const [showModalUpdate, setShowModalUpdate] = useState(false)
    const [showModalAdd, setShowModalAdd] = useState(false)
    const [values, setValues] = useState(initialValues)

    // TODO: Trazer dados do backend para popular tabela
    const renderRow = item => {

        return (
            // TODO: Quando tiver um id para cada item, colocar a key no <tr>
            <tr key={ item.id } >
                <td>{ item.id }</td>
                <td>{ item.product}</td>
                <td>{ item.type }</td>
                <td>{ item.amount }</td>
                <td className="pbs-flex pbs-row pbs-actions-td">
                    <Button
                    className="btn-actions"
                    onClick={ () => {
                        setShowModalAdd(true);
                        setValues(item);}
                    }
                    >
                        <RiAddBoxFill className="icon-actions"/>
                        Adicionar
                    </Button>            

                    <Button
                    className="btn-actions btn-bkg"
                    onClick={ () => { 
                        setShowModalUpdate(true);
                        setValues(item);}
                    }
                    >
                        <BiEdit className="icon-actions"/>
                        Editar
                    </Button>
                    
                    <Button
                    className="btn-actions btn-bkg"
                    onClick={ () =>  onDelete(item) }
                    >
                        <MdDelete className="icon-actions"/>
                        Remover
                    </Button>
                </td>
            </tr>
        )
    }

    const onDelete = rowContent => {
       const index = itens.findIndex(element => element.product === rowContent)
       itens.splice(index, 1)
       service.saveData(key, itens)
       document.location.reload(true)
    }
    return (
        <div itemID="table-foods">
            <h2 className="pbs-title-h2">Estoque de Alimentos</h2>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr className="pbs-tr">
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
        { showModalUpdate ? <EditModal item={ values } onClose={ () => setShowModalUpdate(false) }/> : null }
        { showModalAdd ? <AddModal item={ values } onClose={ () => setShowModalAdd(false) }/> : null }

        </div>
    )
}

export default TabelaAlimentos