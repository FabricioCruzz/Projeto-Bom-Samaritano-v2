import React, { useEffect, useState } from "react";
import "./TabelaFamilias.scss";
import { Button, Table } from "react-bootstrap";
import api from "../../../services/api.service";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import usePagination from "../../../hooks/usePagination";

const TabelaFamilias = () => {
  const navigate = useNavigate();
  const [registers, setRegisters] = useState(null);
  const { actualPage, setActualPage } = usePagination();

  const fetchRegister = async () => {
    await api.get("registers").then((res) => setRegisters(res.data));
  };

  const deleteRegister = async (register) => {
    await api.delete(`registers/${register.id_person}`);
  };

  useEffect(() => {
    fetchRegister();
  }, [registers]);

  const renderRow = (register) => {
    const {
      id_person,
      completeName,
      birthDate,
      street,
      houseNumber,
      district,
      city,
      phone1,
      phone2,
      maritalStatus,
    } = register;

    const brazilianDateFormat = (date) => {
      const dateParts = date.split("T")[0].split("-");
      const year = dateParts[0];
      const month = dateParts[1];
      const day = dateParts[2];
      return day + "/" + month + "/" + year;
    };

    const address = `${street}, ${houseNumber} - Bairro ${district} - ${city}`;
    const contact1 = `Telefone 1: ${phone1}`;
    const contact2 = `Telefone 2: ${phone2}`;

    return (
      <tr key={id_person}>
        <td>{id_person}</td>
        <td>{completeName}</td>
        <td>{brazilianDateFormat(birthDate)}</td>
        <td>{address}</td>
        <td>
          {contact1} <br /> {phone2 && contact2}
        </td>
        <td>{maritalStatus}</td>
        <td className="pbs-flex pbs-row pbs-actions-td">
          <div>
            <Button
              className="btn-actions"
              onClick={() => navigate(`${id_person}`)}
            >
              <IoEyeOutline className="icon-actions" />
              Visualizar
            </Button>

            <Button
              className="btn-actions"
              onClick={() => navigate(`/cadastros/editar/${id_person}`)}
            >
              <BiEdit className="icon-actions" />
              Editar
            </Button>

            <Button className="btn-actions" onClick={() => onDelete(register)}>
              <MdDelete className="icon-actions" />
              Remover
            </Button>
          </div>
        </td>
      </tr>
    );
  };

  const onDelete = (rowContent) => {
    deleteRegister(rowContent);
  };

  return (
    <div>
      <h1 className="pbs-title-h1">Famílias Cadastradas</h1>
      <Table id="tbf-table" striped bordered hover responsive>
        <thead>
          <tr>
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
          {registers == null || registers.length === 0 ? (
            <tr></tr>
          ) : (
            registers.map(renderRow)
          )}
        </tbody>
      </Table>

      <div id="pagination-area">
        {Array(5)
          .fill("")
          .map((_, index) => {
            return (
              <Button
                key={index}
                onClick={() => setActualPage(index + 1)}
                disabled={index === actualPage - 1}
              >
                {index + 1}
              </Button>
            );
          })}
      </div>
    </div>
  );
};

export default TabelaFamilias;

/*
    TODO:
    1. Listar neste componente somente os dados mais importantes sobre a família - OK
    2. Colocar opção de selecionar um cadastro e abrir mais informações (Colocar no novo componente) - OK
    3. Colocar a edição dos cadastros em modal ou jogar pra outra página - OK
    4. Organizar layout (principalmente botões) - OK +/-
    5. Fazer paginação da tabela
      5.1 - Condicionar a a atualização da página com a chamada da API dos cadastros (useEffect)
      5.2 - Estilizar botões da paginação
*/
