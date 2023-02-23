import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./CadastroUnico.scss";
import service from "../../../services/storage.service";

const key = "cadastros";

const CadastroUnico = () => {
  const { id } = useParams();
  const item = service.getById(key, id);
  console.log(`item`, item);

  const brazilianDateFormat = (date) => {
    return date.toString().split("-").reverse().join("/");
  };

  return (
    <Container>
      <h1 className="pbs-title-h1">Visualizando Família</h1>
      <Container>
        <Container>
          <h2>Dados Pessoais</h2>
          <Container>
            <h4>Nome</h4>
            <span>{item.completeName}</span>
          </Container>

          <Container>
            <h3>Endereço</h3>
            <div>
              <span>
                Rua {item.street}, {item.houseNumber}
              </span>
              {item.addressComplement && (
                <span>Ponto de Referência: {item.addressComplement}</span>
              )}
              <span>
                {item.district} - {item.city}
              </span>
            </div>
          </Container>

          <Container>
            <h4>Data de Nascimento</h4>
            <span>{brazilianDateFormat(item.birthDate)}</span>
          </Container>

          <Container>
            <h3>Contato</h3>
            <div>
              <h4>Telefone 1:</h4>
              <span>{item.phone1}</span>
            </div>
            {item.phone2 && (
              <div>
                <h4>Telefone 2:</h4>
                <span>{item.phone2}</span>
              </div>
            )}
          </Container>

          <Container>
            <h4>Estado Civil</h4>
            <span>{item.maritalStatus}</span>
          </Container>

          <Container>
            <h4>Escolaridade</h4>
            <span>{item.schoolLevel}</span>
          </Container>

          <Container>
            <h4>Interesses em Oficinas</h4>
            <ul>
              {item.workshop.map((element) => {
                return <li key={element}>{element}</li>;
              })}
            </ul>
          </Container>
        </Container>

        <Container>
          <h2>Situação Financeira</h2>
          <Container>
            <div>
              <h4>Profissão</h4>
              <span>{item.occupation}</span>
              <h4>Está trabalhando?</h4>
              <span>{item.isWorking}</span>
            </div>
          </Container>

          <Container>
            <h4>Fonte de Renda</h4>
            <span>{item.srcIncome}</span>
          </Container>

          <Container>
            <h4>Moram na casa</h4>
            <span>{item.numberOfResidents} pessoas</span>
          </Container>

          <Container>
            <h4>Renda Familiar</h4>
            <span>R$ {item.familyIncome}</span>
          </Container>
          <Container>
            <h4>Situação Habitacional</h4>
            <span>Moram em {item.housingSituation.replace("-", " ")}</span>
          </Container>
        </Container>

        <Container>
          <h3>Bens e Necessidades</h3>

          <Container>
            <h4>Eletrodomésticos que Possuem</h4>
            <ul>
              {item.appliances.map((appliance) => {
                return <li key={appliance}>{appliance}</li>;
              })}
            </ul>
          </Container>

          <Container>
            <h4>Necessita de Cobertores</h4>
            <span>{item.needBlankets}</span>
          </Container>

          <Container>
            <h4>Necessita de Calçados</h4>
            {item.needShoes.answer === "sim" ? (
              <div>
                <span>Número: {item.needShoes.number}</span>
              </div>
            ) : (
              <span>Não há necessidade</span>
            )}
          </Container>

          <Container>
            <h4>Necessita de Roupas</h4>
            {item.needClothes.answer === "sim" ? (
              <div>
                <span>Tamanho Calças: {item.needClothes.pantsNumber}</span>
                <span>
                  Tamanho Casaco/Camisetas: {item.needClothes.tShirtCoatSize}
                </span>
              </div>
            ) : (
              <span>Não há necessidade</span>
            )}
          </Container>

          <Container>
            <h4>Necessita de Fraldas</h4>
            {item.needDiapers.answer === "sim" ? (
              <div>
                <span>Tamanho: {item.needDiapers.size}</span>
              </div>
            ) : (
              <span>Não há necessidade</span>
            )}
          </Container>

          {item.specialNeed.length > 1 && (
            <Container>
              <h4>Necessidade Especial</h4>
              <p>{item.specialNeed}</p>
            </Container>
          )}
        </Container>

        <Container>
          <h2>Religião do Morador</h2>
          <Container>
            <h4>Religião</h4>
            <span>{item.religion.split("-").join(" ")}</span>
          </Container>

          <Container>
            <h3>Sacramentos</h3>
            <div>
              <h4>Já recebeu</h4>
              <ul>
                {item.receivedSacraments.map((sacrament) => {
                  return <li key={sacrament}>{sacrament.replace("-", " ")}</li>;
                })}
              </ul>
            </div>

            <div>
              <h4>Deseja receber</h4>
              <ul>
                {item.wishReceiveSacraments.map((sacrament) => {
                  return <li key={sacrament}>{sacrament.replace("-", " ")}</li>;
                })}
              </ul>
            </div>
          </Container>

          <Container>
            <h4>Participação nas Missas</h4>
            <span>{item.attendanceMass.split("-").join(" ")}</span>
          </Container>

          <Container>
            <h4>Participação na Igreja</h4>
            <ul>
              {item.churchActivity.map((activity) => {
                return <li key={activity}>{activity.split("-").join(" ")}</li>;
              })}
            </ul>
          </Container>

          <Container>
            <h4>Participa de Pastorais/Movimentos</h4>
            {item.memberPastoralsMovements.answer === "sim" ? (
              <div>
                <span>{item.memberPastoralsMovements.which}</span>
              </div>
            ) : (
              <span>Não participa de nenhuma pastoral/movimento</span>
            )}
          </Container>
        </Container>

        {item.residents.length > -1 &&
          item.residents.map((resident, index) => {
            return (
              <Container key={index}>
                <Container>
                  <h2>Familiares e Moradores</h2>
                  <h3>Dados Pessoais - Morador { index + 1 }</h3>
                  <Container>
                    <h4>Nome</h4>
                    <span>{resident.completeName}</span>
                  </Container>

                  <Container>
                    <h4>Data de Nascimento</h4>
                    <span>{brazilianDateFormat(resident.birthDate)}</span>
                  </Container>

                  <Container>
                    <h4>Parentesco</h4>
                    <span>{resident.relationship}</span>
                  </Container>

                  <Container>
                    <h4>Escolaridade</h4>
                    <span>{resident.schoolLevel}</span>
                  </Container>

                  <Container>
                    <div>
                      <h4>Profissão</h4>
                      <span>{resident.occupation}</span>
                      <h4>Está trabalhando?</h4>
                      <span>{resident.isWorking}</span>
                    </div>
                  </Container>

                  <Container>
                    <h4>Interesses em Oficinas</h4>
                    <ul>
                      {resident.workshop.map((element) => {
                        return (
                          <li key={element}>{element.split("-").join(" ")}</li>
                        );
                      })}
                    </ul>
                  </Container>

                  <Container>
                    <h3>Necessidades</h3>
                    <Container>
                      <h4>Necessita de Calçados</h4>
                      {resident.needShoes.answer === "sim" ? (
                        <div>
                          <span>Número: {resident.needShoes.number}</span>
                        </div>
                      ) : (
                        <span>Não há necessidade</span>
                      )}
                    </Container>

                    <Container>
                      <h4>Necessita de Roupas</h4>
                      {resident.needClothes.answer === "sim" ? (
                        <div>
                          <span>
                            Tamanho Calças: {resident.needClothes.pantsNumber}
                          </span>
                          <span>
                            Tamanho Casaco/Camisetas:{" "}
                            {resident.needClothes.tShirtCoatSize}
                          </span>
                        </div>
                      ) : (
                        <span>Não há necessidade</span>
                      )}
                    </Container>
                  </Container>

                  <Container>
                    <h2>Religião do Morador { index + 1 }</h2>
                    <Container>
                      <h4>Religião</h4>
                      <span>{resident.religion.split("-").join(" ")}</span>
                    </Container>

                    <Container>
                      <h3>Sacramentos</h3>
                      <div>
                        <h4>Já recebeu</h4>
                        <ul>
                          {resident.receivedSacraments.map((sacrament) => {
                            return (
                              <li key={sacrament}>
                                {sacrament.replace("-", " ")}
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      <div>
                        <h4>Deseja receber</h4>
                        <ul>
                          {resident.wishReceiveSacraments.map((sacrament) => {
                            return (
                              <li key={sacrament}>
                                {sacrament.replace("-", " ")}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </Container>

                    <Container>
                      <h4>Participação nas Missas</h4>
                      <span>{resident.attendanceMass.split("-").join(" ")}</span>
                    </Container>

                    <Container>
                      <h4>Participação na Igreja</h4>
                      <ul>
                        {resident.churchActivity.map((activity) => {
                          return (
                            <li key={activity}>
                              {activity.split("-").join(" ")}
                            </li>
                          );
                        })}
                      </ul>
                    </Container>

                    <Container>
                      <h4>Participa de Pastorais/Movimentos</h4>
                      {resident.memberPastoralsMovements.answer === "sim" ? (
                        <div>
                          <span>{resident.memberPastoralsMovements.which}</span>
                        </div>
                      ) : (
                        <span>Não participa de nenhuma pastoral/movimento</span>
                      )}
                    </Container>
                  </Container>
                </Container>
              </Container>
            );
          })}
      </Container>
    </Container>
  );
};

export default CadastroUnico;

/* TODO:
        1. Exibir as informações - OK
        2. Colocar botão pra levar pra edição
        3. Organizar Layout
*/
