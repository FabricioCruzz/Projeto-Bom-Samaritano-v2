import React from "react";
import { useParams } from "react-router-dom";
import service from "../../../services/storage.service";

const key = "cadastros";

const CadastroUnico = () => {
  const { id } = useParams();
  const item = service.getById(key, id);
    console.log(`item`, item)
    
  return (
    <>
      <h1>CadastroUnico {id}</h1>
    </>
  );
};

export default CadastroUnico;

/* TODO:
        1. Exibir as informações
        2. Colocar botão pra levar pra edição???
*/
