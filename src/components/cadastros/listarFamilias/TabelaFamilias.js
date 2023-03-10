import React from "react";
import './TabelaFamilias.scss';
import { Button, Table } from "react-bootstrap";
import service from "../../../services/storage.service";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import usePagination from "../../../hooks/usePagination";

const key = "cadastros";
const storage = service.loadData(key);
const registrations = storage ? JSON.parse(storage) : [];

const TabelaFamilias = () => {
  const navigate = useNavigate();
  const { actualPage, setActualPage } = usePagination();

  const renderRow = (item) => {
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
    const contact1 = `Telefone 1: ${phone1}`;
    const contact2 = `Telefone 2: ${phone2}`;

    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{completeName}</td>
        <td>{brazilianDateFormat}</td>
        <td>{address}</td>
        <td>
          {contact1} <br /> {phone2 && contact2}
        </td>
        <td>{maritalStatus}</td>
        <td className="pbs-flex pbs-row pbs-actions-td">
          <Button className="btn-actions" onClick={() => navigate(id)}>
            <IoEyeOutline className="icon-actions" />
            Visualizar
          </Button>

          <Button
            className="btn-actions"
            onClick={() => navigate(`/cadastros/editar/${id}`)}
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
    const index = registrations.findIndex(
      (element) => element.id === rowContent.id
    );
    registrations.splice(index, 1);
    service.saveData(key, registrations);
    navigate(0);
  };

  return (
    <div>
      <h1 className="pbs-title-h1">Fam??lias Cadastradas</h1>
      <Table id="tbf-table" striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Data de Nascimento</th>
            <th>Endere??o</th>
            <th>Contato</th>
            <th>Estado Civil</th>
            <th>A????es</th>
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

      <div style={{ display: "flex", justifyContent: "center" }}>
        {Array(5)
          .fill("")
          .map((_, index) => {
            return (
              <button
                style={{ margin: "5px 5px", padding: "2px 10px" }}
                key={index}
                onClick={() => setActualPage(index + 1)}
                disabled={index === actualPage - 1}
              >
                {index + 1}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default TabelaFamilias;

/*
    TODO:
    1. Listar neste componente somente os dados mais importantes sobre a fam??lia - OK
    2. Colocar op????o de selecionar um cadastro e abrir mais informa????es (Colocar no novo componente) - OK
    3. Colocar a edi????o dos cadastros em modal ou jogar pra outra p??gina - OK
    4. Organizar layout (principalmente bot??es) - OK +/-
    5. Fazer pagina????o da tabela
      5.1 - Condicionar a a atualiza????o da p??gina com a chamada da API dos cadastros (useEffect)
      5.2 - Estilizar bot??es da pagina????o
*/
