import React from 'react'
import './TabelaAlimentos.scss'
import Table from 'react-bootstrap/Table'

const key = 'itens'
let alimentos = []


// TODO:   COLOCAR BOTÕES PARA EDITAR PRODUTOS E PARA ADICIONAR QUANTIDADES ====================================================

const TabelaAlimentos = () => {
    
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
                    <button className="btn btn-primary" name='edit-btn' onClick={ () =>  onUpdate(content) }>EDITAR</button>
                    <button className="btn btn-primary" name='remove-btn' onClick={ () =>  onDelete(content) }>APAGAR</button>
                </td>
            </tr>
        )
    }

    const onUpdate = rowContent => {
        // Atualizar dados
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
        </div>
    )
}

export default TabelaAlimentos