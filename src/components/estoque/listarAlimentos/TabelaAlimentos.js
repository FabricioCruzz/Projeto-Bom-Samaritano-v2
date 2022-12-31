import React from "react"
import './TabelaAlimentos.scss'
import Table from 'react-bootstrap/Table'

const key = 'itens'
let alimentos = []


const TabelaAlimentos = () => {
    
    let dados = localStorage.getItem(key)
    alimentos = JSON.parse(dados)

    // TODO: Trazer dados do backend para popular tabela
    const renderRow = content => {
        return (
            <tr>
                <td>1</td>
                <td>{ content.product}</td>
                <td>{ content.select }</td>
                <td>0</td>
            </tr>
        )
    }
    
    return (
        <>
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
                        { (alimentos == null || alimentos.length === 0) ? <p>Nenhum item!</p> : alimentos.map(renderRow) }
                    </tbody>
                </Table>
        </>
    )
}

export default TabelaAlimentos