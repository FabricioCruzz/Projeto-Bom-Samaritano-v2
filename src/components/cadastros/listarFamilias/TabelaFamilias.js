import React from "react";
import { Button, Table } from "react-bootstrap";
import service from "../../../services/storage.service";
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md';

const key = "cadastros";
const storage = service.loadData(key);
const registrations = storage ? JSON.parse(storage) : [];

const TabelaFamilias = () => {
  console.log(`registros`, registrations);

  const renderRow = (item) => {
    // console.log(`item`, item)

    const {
      id,
      completeName,
      birthDate,
      street,
      houseNumber,
      district,
      city,
      phone1,
      phone2,
      maritalStatus,
    } = item;

    const brazilianDateFormat = birthDate
      .toString()
      .split("-")
      .reverse()
      .join("/");
    const address = `Rua ${street}, ${houseNumber} - Bairro ${district} - ${city}`;
    const contact = `Telefone 1: ${phone1}
                        ${
                          phone2
                            ? `Telefone 2:
                                ${phone2}`
                            : ""
                        }`;

    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{completeName}</td>
        <td>{brazilianDateFormat}</td>
        <td>{address}</td>
        <td>{contact}</td>
        <td>{maritalStatus}</td>
        <td className="pbs-flex pbs-row pbs-actions-td">
            <Button
            className="btn-actions"
            onClick={() => console.log(`Btn 1`)
            }>
                <BiEdit className="icon-actions btn-bkg"/>
                Editar
            </Button>

            <Button
            className="btn-actions btn-bkg"
            onClick={ () => onDelete(item) }
            >
                <MdDelete className="icon-actions"/>
                Remover
            </Button>
        </td>
      </tr>
    );
  };

  const onDelete = rowContent => {
    const index = registrations.findIndex(element => element.id === rowContent.id)
    registrations.splice(index, 1)
    service.saveData(key, registrations)
    document.location.reload(true)
  }

  return (
    <div>
      <h2 className="pbs-title-h2">Famílias Cadastradas</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr className="pbs-tr">
            <th>#</th>
            <th>Nome</th>
            <th>Data de Nascimento</th>
            <th>Endereço</th>
            <th>Contato</th>
            <th>Estado Civil</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {registrations == null || registrations.length === 0 ? (
            <tr></tr>
          ) : (
            registrations.map(renderRow)
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default TabelaFamilias;

/*
    TODO:
    1. Listar neste componente somente os dados mais importantes sobre a família
    2. Colocar opção de selecionar um cadastro e abrir mais informações (Colocar no novo componente)


*/
