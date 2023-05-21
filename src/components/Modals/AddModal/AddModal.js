import React, { useState } from "react";
import "./AddModal.scss";
import api from "../../../services/api.service";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const AddModal = ({ item = {}, onClose = () => {} }) => {
  const [values, setValues] = useState(item);

  const navigate = useNavigate();

  const oldValueQtd = Number(item.amount);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let item = {
      id: values.id_product,
      product: values.product,
      type: values.type,
      amount: oldValueQtd + Number(values.amount),
    };
    api.put(`products/${item.id}`, item);
    onClose();
    navigate(0);
  };

  return (
    <Modal show="true" onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Quantidade</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <h3 className="mb-3">{values.product}</h3>

            <Form.Group controlId="formAddQTD">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                className="pbs-txt-appeareance"
                name="amount"
                onChange={handleChange}
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
        <Button
          className="pbs-btn-modal"
          variant="primary"
          onClick={handleSubmit}
        >
          Adicionar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModal;
