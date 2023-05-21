import React, { useState } from "react";
import "./CadastroAlimentos.scss";
import api from "../../../services/api.service";
import Form from "react-bootstrap/Form";
import CustomButton from "../../buttons/CustomButton";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const defaultValues = {
  id: undefined,
  product: "",
  type: "",
  amount: 0,
};

const datalistValues = ["", "KG", "UN", "PCT", "L", "CX12", "CX30"];

const CadastroAlimentos = () => {
  const [values, setValues] = useState(defaultValues);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let item = {
      product: values.product,
      productType: values.productType,
      amount: Number(values.amount),
    };
    api.post("products", item);
    alert("Produto cadastrado com sucesso!");
    navigate(0);
  };

  return (
    <Container id="cds-ali-container">
      <Container className="container-form">
        <h1 className="pbs-title-h1">Cadastrar Alimento</h1>

        <Form className="pbs-flex pbs-col pbs-form" onSubmit={handleSubmit}>
          <Form.Group className="form-box">
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                name="product"
                onChange={handleChange}
                type="text"
                placeholder="Nome do produto..."
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTypeOptions">
              <Form.Label>Tipo</Form.Label>
              <Form.Select
                className="pbs-custom-select"
                aria-label="Selecionar tipo"
                name="productType"
                onChange={handleChange}
              >
                {/* TODO: Colocar validação para o usuário não enviar um valor vazio (Tipo do Produto:) */}
                <option value={datalistValues[0]}>Tipo do Produto:</option>
                <option value={datalistValues[1]}>KG</option>
                <option value={datalistValues[2]}>UN</option>
                <option value={datalistValues[3]}>PCT</option>
                <option value={datalistValues[4]}>Litro</option>
                <option value={datalistValues[5]}>CX12</option>
                <option value={datalistValues[6]}>CX30</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAmount">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                name="amount"
                onChange={handleChange}
                type="number"
                placeholder="Quantidade..."
              />
            </Form.Group>
          </Form.Group>

          <CustomButton
            className="btn-margin"
            value="Cadastrar"
            type="submit"
          />
        </Form>
      </Container>
    </Container>
  );
};

export default CadastroAlimentos;
