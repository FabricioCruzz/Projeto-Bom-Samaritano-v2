import React from 'react'
import './Options.scss'
import Card from 'react-bootstrap/Card'
import imagemCard1 from '../../assets/images/agenda/agenda-2.jpg'
import imagemCard2 from '../../assets/images/estoque/estoque-img-3.jpg'
import imagemCard3 from '../../assets/images/familia/familia-1.jpg'
import { Link } from 'react-router-dom'


const Options = props => {

    let tituloCard = ''
    let isEstoque = false
    let urlCadastrar = 'cadastrar'
    let urlTabela = 'tabela'

    if(props.variant === 'estoque'){
        tituloCard = 'estoque'
        isEstoque = true
    }
    else{
        tituloCard = 'cadastros'
    }


    return (
        <div className="pbs-flex pbs-row options-container">
            <Link to={ urlCadastrar } className="options-link">
                <Card>
                    <div className="mascara">
                        <Card.Img variant="top" src={ imagemCard1 } alt="Imagem Agenda" />
                    </div>
                    <Card.Body className="pbs-flex pbs-col">
                        <Card.Title>Cadastrar novo</Card.Title>
                    </Card.Body>
                </Card>

            </Link>

            <Link to={ urlTabela } className="options-link">
                <Card>
                    <div className="mascara">
                        <Card.Img variant="top" src={isEstoque ? imagemCard2 : imagemCard3} alt={ 'Imagem ' + tituloCard } />
                    </div>
                    <Card.Body className="pbs-flex pbs-col">
                        <Card.Title>Visualizar { tituloCard }</Card.Title>
                    </Card.Body>
                </Card>
            </Link>

        </div>
    )
}

export default Options