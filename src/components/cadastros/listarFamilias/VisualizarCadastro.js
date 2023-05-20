import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./VisualizarCadastro.scss";
import CustomButton from "../../buttons/CustomButton";
import service from "../../../services/storage.service";

const key = "cadastros";

const VisualizarCadastro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = service.getById(key, id);

  const brazilianDateFormat = (date) => {
    return date.toString().split("-").reverse().join("/");
  };

  return (
    <Container id="cds-vc-component">
      <h1 className="pbs-title-h1">Visualizando Família</h1>
      <Container className="pbs-flex pbs-col">
        <h2>
          <span>Dados Pessoais</span>
        </h2>
        <Container className="cdsv-container-group">
          <Container>
            <h3>Nome</h3>
            <p>{item.completeName}</p>
          </Container>

          <Container>
            <h3>Endereço</h3>
            <div>
              <p>
                Rua {item.street}, {item.houseNumber}
              </p>
              {item.addressComplement && (
                <p>Ponto de Referência: {item.addressComplement}</p>
              )}
              <p>
                {item.district} - {item.city}
              </p>
            </div>
          </Container>

          <Container>
            <h3>Data de Nascimento</h3>
            <p>{brazilianDateFormat(item.birthDate)}</p>
          </Container>

          <Container>
            <h3>Contato</h3>
            <div>
              <h4>Telefone 1:</h4>
              <p>{item.phone1}</p>
            </div>
            {item.phone2 && (
              <div>
                <h4>Telefone 2:</h4>
                <p>{item.phone2}</p>
              </div>
            )}
          </Container>

          <Container>
            <h3>Estado Civil</h3>
            <p>{item.maritalStatus}</p>
          </Container>

          <Container>
            <h3>Escolaridade</h3>
            <p>{item.schoolLevel}</p>
          </Container>

          <Container>
            <h3>Interesses em Oficinas</h3>
            <ul>
              {item.workshop.map((element) => {
                return <li key={element}>{element.replace("-", " ")}</li>;
              })}
            </ul>
          </Container>
        </Container>

        <h2>
          <span>Situação Financeira</span>
        </h2>
        <Container className="cdsv-container-group">
          <Container>
            <div>
              <h3>Profissão</h3>
              <p>{item.occupation}</p>
              <h3>Está trabalhando?</h3>
              <p>{item.isWorking}</p>
            </div>
          </Container>

          <Container>
            <h3>Fonte de Renda</h3>
            <p>{item.srcIncome}</p>
          </Container>

          <Container>
            <h3>Moram na casa</h3>
            <p>{item.numberOfResidents} pessoas</p>
          </Container>

          <Container>
            <h3>Renda Familiar</h3>
            <p>R$ {item.familyIncome}</p>
          </Container>
          <Container>
            <h3>Situação Habitacional</h3>
            <p>Moram em {item.housingSituation.replace("-", " ")}</p>
          </Container>
        </Container>

        <h2>
          <span>Bens e Necessidades</span>
        </h2>
        <Container className="cdsv-container-group">
          <Container>
            <h3>Eletrodomésticos que Possuem</h3>
            <ul>
              {item.appliances.map((appliance) => {
                return (
                  <li key={appliance}>{appliance.split("-").join(" ")}</li>
                );
              })}
            </ul>
          </Container>

          <Container>
            <h3>Necessita de Cobertores</h3>
            <p>{item.needBlankets}</p>
          </Container>

          <Container>
            <h3>Necessita de Calçados</h3>
            {item.needShoes.answer === "sim" ? (
              <div>
                <p>Número: {item.needShoes.number}</p>
              </div>
            ) : (
              <p className="text-default">Não há necessidade</p>
            )}
          </Container>

          <Container>
            <h3>Necessita de Roupas</h3>
            {item.needClothes.answer === "sim" ? (
              <div>
                <p>Tamanho Calças: {item.needClothes.pantsNumber}</p>
                <p>
                  Tamanho Casaco/Camisetas: {item.needClothes.tShirtCoatSize}
                </p>
              </div>
            ) : (
              <p className="text-default">Não há necessidade</p>
            )}
          </Container>

          <Container>
            <h3>Necessita de Fraldas</h3>
            {item.needDiapers.answer === "sim" ? (
              <div>
                <p>Tamanho: {item.needDiapers.size}</p>
              </div>
            ) : (
              <p className="text-default">Não há necessidade</p>
            )}
          </Container>

          {item.specialNeed.length > 1 && (
            <Container>
              <h3>Necessidade Especial</h3>
              <p className="text-default">{item.specialNeed}</p>
            </Container>
          )}
        </Container>

        <h2>
          <span>Religião do Morador</span>
        </h2>
        <Container className="cdsv-container-group">
          <Container>
            <h3>Religião</h3>
            <p>{item.religion.split("-").join(" ")}</p>
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
            <h3>Participação nas Missas</h3>
            <p>{item.attendanceMass.split("-").join(" ")}</p>
          </Container>

          <Container>
            <h3>Participação na Igreja</h3>
            <ul>
              {item.churchActivity.map((activity) => {
                return <li key={activity}>{activity.split("-").join(" ")}</li>;
              })}
            </ul>
          </Container>

          <Container>
            <h3>Participa de Pastorais/Movimentos</h3>
            {item.memberPastoralsMovements.answer === "sim" ? (
              <div>
                <p>{item.memberPastoralsMovements.which}</p>
              </div>
            ) : (
              <p>Não participa de nenhuma pastoral/movimento</p>
            )}
          </Container>
        </Container>

        {item.residents &&
          item.residents.map((resident, index) => {
            return (
              <Container key={index} className="pbs-flex pbs-col">
                <h2>
                  <span>Familiares e Moradores</span>
                </h2>
                <h3 className="mt-3">Dados Pessoais - Morador {index + 1}</h3>
                <Container key={index} className="cdsv-container-group">
                  <Container>
                    <h4>Nome</h4>
                    <p>{resident.completeName}</p>
                  </Container>

                  <Container>
                    <h4>Data de Nascimento</h4>
                    <p>{brazilianDateFormat(resident.birthDate)}</p>
                  </Container>

                  <Container>
                    <h4>Parentesco</h4>
                    <p>{resident.relationship}</p>
                  </Container>

                  <Container>
                    <h4>Escolaridade</h4>
                    <p>{resident.schoolLevel}</p>
                  </Container>

                  <Container>
                    <div>
                      <h4>Profissão</h4>
                      <p>{resident.occupation}</p>
                      <h4>Está trabalhando?</h4>
                      <p>{resident.isWorking}</p>
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

                  <Container className="cdsv-container-group">
                    <h3 className="flex-basis-100">Necessidades</h3>
                    <Container>
                      <h4>Necessita de Calçados</h4>
                      {resident.needShoes.answer === "sim" ? (
                        <div>
                          <p>Número: {resident.needShoes.number}</p>
                        </div>
                      ) : (
                        <p className="text-default">Não há necessidade</p>
                      )}
                    </Container>

                    <Container>
                      <h4>Necessita de Roupas</h4>
                      {resident.needClothes.answer === "sim" ? (
                        <div>
                          <p>
                            Tamanho Calças: {resident.needClothes.pantsNumber}
                          </p>
                          <p>
                            Tamanho Casaco/Camisetas:{" "}
                            {resident.needClothes.tShirtCoatSize}
                          </p>
                        </div>
                      ) : (
                        <p className="text-default">Não há necessidade</p>
                      )}
                    </Container>
                  </Container>

                  <h2 className="flex-basis-100">
                    <span>Religião do Morador {index + 1}</span>
                  </h2>
                  <Container className="cdsv-container-group">
                    <Container>
                      <h4>Religião</h4>
                      <p>{resident.religion.split("-").join(" ")}</p>
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
                      <p>{resident.attendanceMass.split("-").join(" ")}</p>
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
                          <p>{resident.memberPastoralsMovements.which}</p>
                        </div>
                      ) : (
                        <p className="text-default">
                          Não participa de nenhuma pastoral/movimento
                        </p>
                      )}
                    </Container>
                  </Container>
                </Container>
              </Container>
            );
          })}
        <CustomButton
          className="m-auto"
          value="Editar"
          type="button"
          onClick={() => navigate(`/cadastros/editar/${id}`)}
        />
      </Container>
    </Container>
  );
};

export default VisualizarCadastro;
