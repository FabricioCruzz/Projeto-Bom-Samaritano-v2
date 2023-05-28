import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./VisualizarCadastro.scss";
import CustomButton from "../../buttons/CustomButton";
import api from "../../../services/api.service";

const VisualizarCadastro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [register, setRegister] = useState(null);

  const fetchRegister = async () => {
    await api.get(`registers/${id}`).then((res) => setRegister(res.data));
  };

  useEffect(() => {
    fetchRegister();
  });

  const brazilianDateFormat = (date) => {
    const dateParts = date.split("T")[0].split("-");
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    return day + "/" + month + "/" + year;
  };

  return (
    <Container id="cds-vc-component">
      <h1 className="pbs-title-h1">Visualizando Família</h1>
      {register ? (
        <Container className="pbs-flex pbs-col">
          <h2>
            <span>Dados Pessoais</span>
          </h2>
          <Container className="cdsv-container-group">
            <Container>
              <h3>Nome</h3>
              <p>{register.completeName}</p>
            </Container>

            <Container>
              <h3>Endereço</h3>
              <div>
                <p>
                  {register.street}, {register.houseNumber}
                </p>
                {register.addressComplement && (
                  <p>Ponto de Referência: {register.addressComplement}</p>
                )}
                <p>
                  {register.district} - {register.city}
                </p>
              </div>
            </Container>

            <Container>
              <h3>Data de Nascimento</h3>
              <p>{brazilianDateFormat(register.birthDate)}</p>
            </Container>

            <Container>
              <h3>Contato</h3>
              <div>
                <h4>Telefone 1:</h4>
                <p>{register.phone1}</p>
              </div>
              {register.phone2 && (
                <div>
                  <h4>Telefone 2:</h4>
                  <p>{register.phone2}</p>
                </div>
              )}
            </Container>

            <Container>
              <h3>Estado Civil</h3>
              <p>{register.maritalStatus}</p>
            </Container>

            <Container>
              <h3>Escolaridade</h3>
              <p>{register.schoolLevel}</p>
            </Container>

            <Container>
              <h3>Interesses em Oficinas</h3>
              <ul>
                {register.workshop.map((element) => {
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
                <p>{register.occupation}</p>
                <h3>Está trabalhando?</h3>
                <p>{register.isWorking}</p>
              </div>
            </Container>

            <Container>
              <h3>Fonte de Renda</h3>
              <p>{register.srcIncome}</p>
            </Container>

            <Container>
              <h3>Moram na casa</h3>
              <p>{register.numberOfResidents} pessoas</p>
            </Container>

            <Container>
              <h3>Renda Familiar</h3>
              <p>R$ {register.familyIncome}</p>
            </Container>
            <Container>
              <h3>Situação Habitacional</h3>
              <p>
                Moram em
                {` ${register.housingSituation.replace("-", " ")}`}
              </p>
            </Container>
          </Container>

          <h2>
            <span>Bens e Necessidades</span>
          </h2>
          <Container className="cdsv-container-group">
            <Container>
              <h3>Eletrodomésticos que Possuem</h3>
              <ul>
                {register.appliances.map((appliance) => {
                  return (
                    <li key={appliance}>{appliance.split("-").join(" ")}</li>
                  );
                })}
              </ul>
            </Container>

            <Container>
              <h3>Necessita de Cobertores</h3>
              <p>{register.needBlankets}</p>
            </Container>

            <Container>
              <h3>Necessita de Calçados</h3>
              {register.needShoes_answer === "sim" ? (
                <div>
                  <p>Número: {register.needShoes_number}</p>
                </div>
              ) : (
                <p className="text-default">Não há necessidade</p>
              )}
            </Container>

            <Container>
              <h3>Necessita de Roupas</h3>
              {register.needClothes_answer === "sim" ? (
                <div>
                  <p>Tamanho Calças: {register.needClothes_pantsNumber}</p>
                  <p>
                    Tamanho Casaco/Camisetas:{" "}
                    {register.needClothes_tShirtCoatSize}
                  </p>
                </div>
              ) : (
                <p className="text-default">Não há necessidade</p>
              )}
            </Container>

            <Container>
              <h3>Necessita de Fraldas</h3>
              {register.needDiapers_answer === "sim" ? (
                <div>
                  <p>Tamanho: {register.needDiapers_size}</p>
                </div>
              ) : (
                <p className="text-default">Não há necessidade</p>
              )}
            </Container>

            {register.specialNeed && (
              <Container>
                <h3>Necessidade Especial</h3>
                <p className="text-default">{register.specialNeed}</p>
              </Container>
            )}
          </Container>

          <h2>
            <span>Religião do Morador</span>
          </h2>
          <Container className="cdsv-container-group">
            <Container>
              <h3>Religião</h3>
              <p>{register.religion.split("-").join(" ")}</p>
            </Container>

            <Container>
              <h3>Sacramentos</h3>
              <div>
                <h4>Já recebeu</h4>
                <ul>
                  {register.receivedSacraments.map((sacrament) => {
                    return (
                      <li key={sacrament}>{sacrament.replace("-", " ")}</li>
                    );
                  })}
                </ul>
              </div>

              <div>
                <h4>Deseja receber</h4>
                <ul>
                  {register.wishReceiveSacraments.map((sacrament) => {
                    return (
                      <li key={sacrament}>{sacrament.replace("-", " ")}</li>
                    );
                  })}
                </ul>
              </div>
            </Container>

            <Container>
              <h3>Participação nas Missas</h3>
              <p>{register.attendanceMass.split("-").join(" ")}</p>
            </Container>

            <Container>
              <h3>Participação na Igreja</h3>
              <ul>
                {register.churchActivity.map((activity) => {
                  return (
                    <li key={activity}>{activity.split("-").join(" ")}</li>
                  );
                })}
              </ul>
            </Container>

            <Container>
              <h3>Participa de Pastorais/Movimentos</h3>
              {register.memberPastoralsMovements_answer === "sim" ? (
                <div>
                  <p>{register.memberPastoralsMovements_which}</p>
                </div>
              ) : (
                <p>Não participa de nenhuma pastoral/movimento</p>
              )}
            </Container>
          </Container>

          {register.dependents &&
            register.dependents.map((resident, index) => {
              return (
                <Container key={resident.id_dep} className="pbs-flex pbs-col">
                  <h2>
                    <span>Familiares e Moradores</span>
                  </h2>
                  <h3 className="mt-3">Dados Pessoais - Morador {index + 1}</h3>
                  <Container
                    key={resident.id_dep}
                    className="cdsv-container-group"
                  >
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
                            <li key={element}>
                              {element.split("-").join(" ")}
                            </li>
                          );
                        })}
                      </ul>
                    </Container>

                    <Container className="cdsv-container-group">
                      <h3 className="flex-basis-100">Necessidades</h3>
                      <Container>
                        <h4>Necessita de Calçados</h4>
                        {resident.needShoes_answer === "sim" ? (
                          <div>
                            <p>Número: {resident.needShoes_number}</p>
                          </div>
                        ) : (
                          <p className="text-default">Não há necessidade</p>
                        )}
                      </Container>

                      <Container>
                        <h4>Necessita de Roupas</h4>
                        {resident.needClothes_answer === "sim" ? (
                          <div>
                            <p>
                              Tamanho Calças: {resident.needClothes_pantsNumber}
                            </p>
                            <p>
                              Tamanho Casaco/Camisetas:{" "}
                              {resident.needClothes_tShirtCoatSize}
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
                        {resident.memberPastoralsMovements_answer === "sim" ? (
                          <div>
                            <p>{resident.memberPastoralsMovements_which}</p>
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
      ) : (
        <div>Carregando...</div>
      )}
    </Container>
  );
};

export default VisualizarCadastro;
