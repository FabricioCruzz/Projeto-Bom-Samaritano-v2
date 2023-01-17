import React from 'react'
import './Options.scss'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import imagemEstoque3 from '../../assets/images/estoque/estoque-img-3.jpg'
import imagemAgenda2 from '../../assets/images/agenda/agenda-2.jpg'

const Options = () => {

    return (
        <div className="pbs-flex pbs-row options-container">
            <button className="options-btn">
                <Card>
                    <div className="mascara">
                        <Card.Img variant="top" src={imagemAgenda2} alt="Imagem Agenda" />
                    </div>
                    <Card.Body className="pbs-flex pbs-col">
                        <Card.Title>Cadastrar novo</Card.Title>
                        <Button variant="primary">Cadastrar</Button>
                    </Card.Body>
                </Card>

            </button>

            <button className="options-btn">
                <Card>
                    <div className="mascara">
                        <Card.Img variant="top" src={imagemEstoque3} alt="Imagem Estoque" />
                    </div>
                    <Card.Body className="pbs-flex pbs-col">
                        <Card.Title>Visualizar registros</Card.Title>
                        <Button variant="primary">Listar</Button>
                    </Card.Body>
                </Card>
            </button>

        </div>
    )
}

export default Options