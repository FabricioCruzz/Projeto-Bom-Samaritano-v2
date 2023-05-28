import React, { useEffect, useState } from "react";
import "./TabelaAlimentos.scss";
import api from "../../../services/api.service";
import Table from "react-bootstrap/Table";
import EditModal from "../../Modals/EditModal/EditModal";
import AddModal from "../../Modals/AddModal/AddModal";
import { RiAddBoxFill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const initialValues = {
  id: undefined,
  product: "",
  type: "",
  amount: 0,
};

let itens;

const TabelaAlimentos = () => {
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [values, setValues] = useState(initialValues);
  const navigate = useNavigate();

  //TODO: Corrigir erro de reload na hora de trazer os dados (tem hora que não aparece - quando dá refresh os dados somem)
  useEffect(() => {
    api.get("products").then((res) => {
      console.log(res.data);
      itens = res.data;
    });
  }, []);

  const renderRow = (item) => {
    const { id_product, product, productType, amount } = item;
    return (
      <tr key={id_product}>
        <td>{id_product}</td>
        <td>{product}</td>
        <td>{productType}</td>
        <td>{amount}</td>
        <td className="pbs-flex pbs-row pbs-actions-td">
          <Button
            className="btn-actions"
            onClick={() => {
              setShowModalAdd(true);
              setValues(item);
            }}
          >
            <RiAddBoxFill className="icon-actions" />
            Adicionar
          </Button>

          <Button
            className="btn-actions"
            onClick={() => {
              setShowModalUpdate(true);
              setValues(item);
            }}
          >
            <BiEdit className="icon-actions" />
            Editar
          </Button>

          <Button className="btn-actions" onClick={() => onDelete(item)}>
            <MdDelete className="icon-actions" />
            Remover
          </Button>
        </td>
      </tr>
    );
  };

  const onDelete = (rowContent) => {
    api.delete(`products/${rowContent.id_product}`);
    navigate(0);
  };
  return (
    <div itemID="table-foods">
      <h1 className="pbs-title-h1">Estoque de Alimentos</h1>
      <Table id="tba-table" striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Descrição</th>
            <th>Tipo</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {itens == null || itens.length === 0 ? (
            <tr></tr>
          ) : (
            itens.map(renderRow)
          )}
        </tbody>
      </Table>
      {showModalUpdate ? (
        <EditModal item={values} onClose={() => setShowModalUpdate(false)} />
      ) : null}
      {showModalAdd ? (
        <AddModal item={values} onClose={() => setShowModalAdd(false)} />
      ) : null}
    </div>
  );
};

export default TabelaAlimentos;
