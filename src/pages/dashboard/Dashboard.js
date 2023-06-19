import React from "react";
import "./Dashboard.scss";
import bannerPBS from "../../assets/images/dashboard/pbs-banner-2.png";

const Dashboard = () => {
  return (
    <div>
      <h1 className="pbs-title-h1">
        Seja bem-vindo ao Projeto Bom Samaritano!
      </h1>

      <main className="dashboard-main">
        <img
          className="banner-img"
          src={bannerPBS}
          alt="Banner Projeto Bom Samaritano"
        />

        <h2 className="pbs-title-h2">Sobre</h2>

        <p>
          O Projeto Bom Samaritano é uma obra de caridade da Igreja Católica
          existente na Paróquia São José em Paraisópolis. Ele surgiu durante a
          pandemia de COVID-19 no ano de 2020 através da iniciativa do pároco.
          São recebidas doações em alimentos e roupas que são destinadas às
          famílias necessitadas da cidade mediante cadastro.
        </p>
        <p>
          O Projeto, como também é chamado pelo seus membros, funciona graças
          aos paroquianos que atuam como voluntários.
        </p>
      </main>
    </div>
  );
};

export default Dashboard;
