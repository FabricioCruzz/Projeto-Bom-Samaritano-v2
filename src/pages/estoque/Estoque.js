import React from "react";
import Options from "../../components/options/Options";

const Estoque = () => {
  return (
    <div id="estoque-container">
      <h1 className="pbs-title-h1">Bem-vindo ao Estoque!</h1>
      <Options variant="estoque" />
    </div>
  );
};

export default Estoque;
