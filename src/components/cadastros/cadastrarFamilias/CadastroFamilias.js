import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CadastroFamilias.scss";
import { Container } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import {
  optionsMaritalStatus,
  optionsSchoolLevel,
  optionsYesOrNo,
  optionsSrcIncome,
  optionsHousingSituation,
  optionsAppliances,
  optionsWorkshop,
  optionsReligion,
  optionsSacraments,
  optionsAttendanceMass,
  optionsChurchActivity,
  optionsShoesSize,
  optionsDiappers,
  optionsPantsNumber,
  optionsClothesSize,
} from "../../../utils/formInputOptions";
import { errorMessages } from "../../../utils/formErrorMessages";
import CustomSelect from "../../customSelect/CustomSelect";
import CustomRadioButton from "../../customRadioButton/CustomRadioButtons";
import CustomCheckbox from "../../customCheckbox/CustomCheckbox";
import AdditionalInput from "../../inputs/AdditionalInput";
import CustomButton from "../../buttons/CustomButton";
import { RiAddBoxFill, RiCloseFill } from "react-icons/ri";
import * as Yup from "yup";
import { phoneNumber } from "../../../utils/validations";
import api from "../../../services/api.service";

const getFormatedDate = (currentDate) =>
  currentDate.split("/").reverse().join("-");

const formatToLocaleDate = (dateToFormat) => {
  const date = new Date(dateToFormat);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return date.toLocaleDateString("pt-BR", options);
};

const minDate = "01/01/1900";

const emptyDependents = {
  completeName: "",
  birthDate: "",
  relationship: "",
  schoolLevel: "",
  occupation: "",
  isWorking: "",
  needShoes_answer: "",
  needShoes_number: "",
  needClothes_answer: "",
  needClothes_pantsNumber: "",
  needClothes_tShirtCoatSize: "",
  workshop: [],
  religion: "",
  receivedSacraments: [],
  wishReceiveSacraments: [],
  attendanceMass: "",
  churchActivity: [],
  memberPastoralsMovements_answer: "",
  memberPastoralsMovements_which: "",
};

let initialValues = {
  completeName: "",
  street: "",
  houseNumber: "",
  district: "",
  addressComplement: "",
  city: "",
  phone1: "",
  phone2: "",
  birthDate: "",
  maritalStatus: "",
  schoolLevel: "",
  occupation: "",
  isWorking: "",
  srcIncome: "",
  numberOfResidents: "",
  familyIncome: "",
  housingSituation: "",
  appliances: [],
  needBlankets: "",
  needShoes_answer: "",
  needShoes_number: "",
  needClothes_answer: "",
  needClothes_pantsNumber: "",
  needClothes_tShirtCoatSize: "",
  needDiapers_answer: "",
  needDiapers_size: "",
  specialNeed: "",
  workshop: [],
  religion: "",
  receivedSacraments: [],
  wishReceiveSacraments: [],
  attendanceMass: "",
  churchActivity: [],
  memberPastoralsMovements_answer: "",
  memberPastoralsMovements_which: "",
  dependents: [emptyDependents],
};

const validationSchema = Yup.object().shape({
  completeName: Yup.string().required(errorMessages.fieldReq),

  street: Yup.string().required(errorMessages.fieldReq),

  houseNumber: Yup.number()
    .required(errorMessages.fieldReq)
    .positive(errorMessages.positiveNumber)
    .integer(errorMessages.integerNumber),

  district: Yup.string().required(errorMessages.fieldReq),

  city: Yup.string().required(errorMessages.fieldReq),

  phone1: Yup.string()
    .matches(phoneNumber, errorMessages.phoneInvalid)
    .required(errorMessages.fieldReq),

  phone2: Yup.string()
    .matches(phoneNumber, errorMessages.phoneInvalid)
    .optional(),

  birthDate: Yup.date()
    .required(errorMessages.fieldReq)
    .min(getFormatedDate(minDate), errorMessages.tooOldDate)
    .max(new Date().getFullYear() - 18, errorMessages.needToBeEighteen),

  maritalStatus: Yup.string().ensure().required(errorMessages.fieldReq),

  schoolLevel: Yup.string().ensure().required(errorMessages.fieldReq),

  occupation: Yup.string().required(errorMessages.fieldReq),

  isWorking: Yup.string().required(errorMessages.fieldReq),

  srcIncome: Yup.string().required(errorMessages.fieldReq),

  numberOfResidents: Yup.number()
    .required(errorMessages.fieldReq)
    .positive(errorMessages.positiveNumber)
    .integer(errorMessages.integerNumber),

  familyIncome: Yup.number()
    .required(errorMessages.fieldReq)
    .positive(errorMessages.positiveNumber),

  housingSituation: Yup.string().required(errorMessages.fieldReq),

  appliances: Yup.array().min(1, errorMessages.minOneReq),

  needBlankets: Yup.string().required(errorMessages.fieldReq),

  needShoes: Yup.object().shape({
    answer: Yup.string().required(errorMessages.fieldReq),
    number: Yup.number().when("answer", {
      is: "sim",
      then: Yup.number()
        .required(errorMessages.fieldReq)
        .positive(errorMessages.positiveNumber)
        .integer(errorMessages.integerNumber),
    }),
  }),

  needClothes: Yup.object().shape({
    answer: Yup.string().required(errorMessages.fieldReq),
    pantsNumber: Yup.string().when("answer", {
      is: "sim",
      then: Yup.string().ensure().required(errorMessages.fieldReq),
    }),
    tShirtCoatSize: Yup.string().when("answer", {
      is: "sim",
      then: Yup.string().ensure().required(errorMessages.fieldReq),
    }),
  }),

  needDiapers: Yup.object().shape({
    answer: Yup.string().required(errorMessages.fieldReq),
    size: Yup.string().when("answer", {
      is: "sim",
      then: Yup.string().ensure().required(errorMessages.fieldReq),
    }),
  }),

  workshop: Yup.array().min(1, errorMessages.minOneReq),

  religion: Yup.string().required(errorMessages.fieldReq),

  receivedSacraments: Yup.array().min(1, errorMessages.minOneReq),

  wishReceiveSacraments: Yup.array().min(1, errorMessages.minOneReq),

  attendanceMass: Yup.string().required(errorMessages.fieldReq),

  churchActivity: Yup.array().min(1, errorMessages.minOneReq),

  memberPastoralsMovements: Yup.object().shape({
    answer: Yup.string().required(errorMessages.fieldReq),
    which: Yup.string().when("answer", {
      is: "sim",
      then: Yup.string().required(errorMessages.fieldReq),
    }),
  }),

  residents: Yup.array().of(
    Yup.object().shape({
      completeName: Yup.string().required(errorMessages.fieldReq),

      birthDate: Yup.date()
        .required(errorMessages.fieldReq)
        .min(getFormatedDate(minDate), errorMessages.tooOldDate)
        .max(new Date().getFullYear() - 18, errorMessages.needToBeEighteen),

      relationship: Yup.string().required(errorMessages.fieldReq),

      schoolLevel: Yup.string().ensure().required(errorMessages.fieldReq),

      occupation: Yup.string().required(errorMessages.fieldReq),

      isWorking: Yup.string().required(errorMessages.fieldReq),

      needShoes: Yup.object().shape({
        answer: Yup.string().required(errorMessages.fieldReq),
        number: Yup.number().when("answer", {
          is: "sim",
          then: Yup.number()
            .required(errorMessages.fieldReq)
            .positive(errorMessages.positiveNumber)
            .integer(errorMessages.integerNumber),
        }),
      }),

      needClothes: Yup.object().shape({
        answer: Yup.string().required(errorMessages.fieldReq),
        pantsNumber: Yup.string().when("answer", {
          is: "sim",
          then: Yup.string().ensure().required(errorMessages.fieldReq),
        }),
        tShirtCoatSize: Yup.string().when("answer", {
          is: "sim",
          then: Yup.string().ensure().required(errorMessages.fieldReq),
        }),
      }),

      workshop: Yup.array().min(1, errorMessages.minOneReq),

      religion: Yup.string().required(errorMessages.fieldReq),

      receivedSacraments: Yup.array().min(1, errorMessages.minOneReq),

      wishReceiveSacraments: Yup.array().min(1, errorMessages.minOneReq),

      attendanceMass: Yup.string().required(errorMessages.fieldReq),

      churchActivity: Yup.array().min(1, errorMessages.minOneReq),

      memberPastoralsMovements: Yup.object().shape({
        answer: Yup.string().required(errorMessages.fieldReq),
        which: Yup.string().when("answer", {
          is: "sim",
          then: Yup.string().required(errorMessages.fieldReq),
        }),
      }),
    })
  ),
});

const CadastroFamilias = () => {
  const [show, setShow] = useState(false);
  const [register, setRegister] = useState(initialValues);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getRegisterById();
    }
  }, []);

  const createRegister = async (register) => {
    await api.post("registers", register);
  };

  const getRegisterById = async () => {
    await api.get(`registers/${id}`).then((res) => setRegister(res.data));
  };

  const updateRegister = async (register) => {
    await api.put(`registers/${id}`, register);
  };

  return (
    <Container id="cds-fam-container">
      <h1 className="pbs-title-h1">Cadastrar Família</h1>
      <Container>
        <Formik
          // validationSchema={validationSchema}
          initialValues={register}
          enableReinitialize
          onSubmit={async (values) => {
            await new Promise((res) => setTimeout(res, 500));

            values["houseNumber"] = String(values["houseNumber"]);
            values["needShoes_number"] = Number(values["needShoes_number"]);
            values["needClothes_pantsNumber"] = Number(
              values["needClothes_pantsNumber"]
            );
            values["birthDate"] = formatToLocaleDate(values.birthDate);
            values["dependents"] = values["dependents"].map((dep) => {
              dep.birthDate = formatToLocaleDate(dep.birthDate);
              dep.needShoes_number = Number(dep.needShoes_number);
              dep.needClothes_pantsNumber = Number(dep.needClothes_pantsNumber);
              return dep;
            });

            if (values.id_person) {
              updateRegister(values);
            } else {
              createRegister(values);
            }

            alert("Cadastro realizado com sucesso!");
            // navigate(0);

            console.log(values);
          }}
        >
          {({ values }) => (
            <Form className="pbs-flex pbs-col pbs-form">
              <fieldset>
                <legend>Dados Pessoais</legend>

                <Container>
                  <label htmlFor="completeName">Nome*</label>
                  <Field
                    type="text"
                    id="completeName"
                    name="completeName"
                    placeholder="Digite o nome completo..."
                  />

                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="completeName"
                  />
                </Container>

                <Container>
                  <label htmlFor="street">Rua*</label>
                  <Field
                    type="text"
                    id="street"
                    name="street"
                    placeholder="Digite a rua, avenida..."
                  />

                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="street"
                  />
                </Container>

                <Container>
                  <label htmlFor="houseNumber">Número*</label>
                  <Field
                    type="number"
                    id="houseNumber"
                    name="houseNumber"
                    placeholder="XXX"
                  />

                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="houseNumber"
                  />
                </Container>

                <Container>
                  <label htmlFor="district">Bairro*</label>
                  <Field
                    type="text"
                    id="district"
                    name="district"
                    placeholder="Digite o bairro..."
                  />

                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="district"
                  />
                </Container>

                <Container>
                  <label htmlFor="addressComplement">
                    Complemento - Ponto de Referência
                  </label>
                  <Field
                    type="text"
                    id="addressComplement"
                    name="addressComplement"
                    placeholder="Informe um complemento ou ponto de referência..."
                  />
                </Container>

                <Container>
                  <label htmlFor="city">Cidade*</label>
                  <Field
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Digite a cidade..."
                  />
                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="city"
                  />
                </Container>

                <Container>
                  <label htmlFor="phone1">Telefone 1*</label>
                  <Field
                    type="tel"
                    id="phone1"
                    name="phone1"
                    placeholder="(XX) XXXXX-XXXX"
                  />
                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="phone1"
                  />
                </Container>

                <Container>
                  <label htmlFor="phone2">Telefone 2</label>
                  <Field
                    type="tel"
                    id="phone2"
                    name="phone2"
                    placeholder="(XX) XXXXX-XXXX"
                  />
                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="phone2"
                  />
                </Container>

                <Container>
                  <label htmlFor="birthDate">Data de Nascimento*</label>
                  <Field type="date" id="birthDate" name="birthDate" />
                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="birthDate"
                  />
                </Container>

                <Container>
                  <label htmlFor="maritalStatus">Estado Civil*</label>
                  <Field
                    name="maritalStatus"
                    id="maritalStatus"
                    component={CustomSelect}
                    options={optionsMaritalStatus}
                  />
                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="maritalStatus"
                  />
                </Container>

                <Container>
                  <label htmlFor="schoolLevel">Escolaridade*</label>
                  <Field
                    name="schoolLevel"
                    id="schoolLevel"
                    component={CustomSelect}
                    options={optionsSchoolLevel}
                  />
                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="schoolLevel"
                  />
                </Container>

                <Container>
                  <label htmlFor="occupation">Profissão*</label>
                  <Field
                    type="text"
                    id="occupation"
                    name="occupation"
                    placeholder="Digite a profissão..."
                  />
                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="occupation"
                  />
                </Container>

                <Container>
                  <label htmlFor="isWorking">Está trabalhando?*</label>
                  <Field
                    component={CustomRadioButton}
                    id="isWorking"
                    name="isWorking"
                    options={optionsYesOrNo}
                  />
                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="isWorking"
                  />
                </Container>

                <Container>
                  <label htmlFor="srcIncome">Fonte de Renda*</label>
                  <Field
                    component={CustomRadioButton}
                    id="srcIncome"
                    name="srcIncome"
                    options={optionsSrcIncome}
                  />
                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="srcIncome"
                  />
                </Container>

                <Container>
                  <label htmlFor="numberOfResidents">
                    Quantidade de Moradores na Casa*
                  </label>
                  <Field
                    type="number"
                    id="numberOfResidents"
                    name="numberOfResidents"
                    placeholder="Quantidade de moradores..."
                  />
                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="numberOfResidents"
                  />
                </Container>

                <Container>
                  <label htmlFor="familyIncome">Renda Familiar*</label>
                  <label htmlFor="familyIncome">
                    R$
                    <Field
                      type="number"
                      id="familyIncome"
                      name="familyIncome"
                      placeholder="Valor da renda..."
                    />
                  </label>
                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="familyIncome"
                  />
                </Container>

                <Container>
                  <label htmlFor="housingSituation">
                    Situação Habitacional*
                  </label>
                  <Field
                    component={CustomRadioButton}
                    id="housingSituation"
                    name="housingSituation"
                    options={optionsHousingSituation}
                  />
                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="housingSituation"
                  />
                </Container>

                <Container>
                  <label htmlFor="appliances">A Família Possui*</label>
                  <Field
                    component={CustomCheckbox}
                    id="appliances"
                    name="appliances"
                    options={optionsAppliances}
                  />
                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="appliances"
                  />
                </Container>

                <Container>
                  <label htmlFor="needBlankets">Precisa de Cobertores*</label>
                  <Field
                    component={CustomRadioButton}
                    id="needBlankets"
                    name="needBlankets"
                    options={optionsYesOrNo}
                  />
                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="needBlankets"
                  />
                </Container>

                <Container>
                  <label htmlFor="needShoes_answer">Precisa de Calçados*</label>
                  <Field
                    component={CustomRadioButton}
                    id="needShoes_answer"
                    name="needShoes_answer"
                    options={optionsYesOrNo}
                  />

                  {values.needShoes_answer === "sim" && (
                    <Container className="additionalFields">
                      <label htmlFor="needShoes_number">
                        Número do calçado*
                      </label>
                      <Field
                        component={CustomSelect}
                        id="needShoes_number"
                        name="needShoes_number"
                        options={optionsShoesSize}
                      />
                      <ErrorMessage
                        component="div"
                        className="formErrorMsg"
                        name="needShoes_number"
                      />
                    </Container>
                  )}
                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="needShoes_answer"
                  />
                </Container>

                <Container>
                  <label htmlFor="needClothes_answer">Precisa de Roupas*</label>
                  <Field
                    component={CustomRadioButton}
                    id="needClothes_answer"
                    name="needClothes_answer"
                    options={optionsYesOrNo}
                  />
                  {values.needClothes_answer === "sim" && (
                    <Container className="additionalFields">
                      <label htmlFor="needClothes_pantsNumber">
                        Tamanho das Calças*
                      </label>
                      <Field
                        component={CustomSelect}
                        id="needClothes_pantsNumber"
                        name="needClothes_pantsNumber"
                        options={optionsPantsNumber}
                      />

                      <ErrorMessage
                        component="div"
                        className="formErrorMsg"
                        name="needClothes_pantsNumber"
                      />

                      <label htmlFor="needClothes_tShirtCoatSize">
                        Tamanho Casaco/Camiseta*
                      </label>
                      <Field
                        component={CustomSelect}
                        id="needClothes_tShirtCoatSize"
                        name="needClothes_tShirtCoatSize"
                        options={optionsClothesSize}
                      />
                      <ErrorMessage
                        component="div"
                        className="formErrorMsg"
                        name="needClothes_tShirtCoatSize"
                      />
                    </Container>
                  )}
                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="needClothes_answer"
                  />
                </Container>

                <Container>
                  <label htmlFor="needDiapers_answer">
                    Precisa de Fraldas*
                  </label>
                  <Field
                    component={CustomRadioButton}
                    id="needDiapers_answer"
                    name="needDiapers_answer"
                    options={optionsYesOrNo}
                  />
                  {values.needDiapers_answer === "sim" && (
                    <Container className="additionalFields">
                      <label htmlFor="needDiapers_size">Tamanho*</label>
                      <Field
                        component={CustomSelect}
                        id="needDiapers_size"
                        name="needDiapers_size"
                        options={optionsDiappers}
                      />
                      <ErrorMessage
                        component="div"
                        className="formErrorMsg"
                        name="needDiapers_size"
                      />
                    </Container>
                  )}
                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="needDiapers_answer"
                  />
                </Container>

                <Container>
                  <label htmlFor="specialNeed">
                    Alguma Necessidade Especial
                  </label>
                  <Field
                    as="textarea"
                    id="specialNeed"
                    name="specialNeed"
                    placeholder="Alguma informação adicional?"
                  />
                </Container>

                <Container>
                  <label htmlFor="workshop">
                    Tem Interesse de Participar de Alguma Oficina*
                  </label>
                  <Field
                    component={CustomCheckbox}
                    id="workshop"
                    name="workshop"
                    options={optionsWorkshop}
                  />
                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="workshop"
                  />
                </Container>
              </fieldset>

              <fieldset>
                <legend>Vida Religiosa</legend>

                <Container>
                  <label htmlFor="religion">Religião*</label>
                  <Field
                    component={CustomRadioButton}
                    id="religion"
                    name="religion"
                    options={optionsReligion}
                  />
                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="religion"
                  />
                </Container>

                <Container>
                  <label htmlFor="receivedSacraments">
                    Sacramentos Recebidos*
                  </label>
                  <Field
                    component={CustomCheckbox}
                    id="receivedSacraments"
                    name="receivedSacraments"
                    options={optionsSacraments}
                  />
                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="receivedSacraments"
                  />
                </Container>

                <Container>
                  <label htmlFor="wishReceiveSacraments">
                    Sacramentos que Deseja Receber*
                  </label>
                  <Field
                    component={CustomCheckbox}
                    id="wishReceiveSacraments"
                    name="wishReceiveSacraments"
                    options={optionsSacraments}
                  />
                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="wishReceiveSacraments"
                  />
                </Container>

                <Container>
                  <label htmlFor="attendanceMass">
                    Qual a frequência nas Missas*
                  </label>
                  <Field
                    component={CustomRadioButton}
                    id="attendanceMass"
                    name="attendanceMass"
                    options={optionsAttendanceMass}
                  />
                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="attendanceMass"
                  />
                </Container>

                <Container>
                  <label htmlFor="churchActivity">
                    Participação na Igreja*
                  </label>
                  <Field
                    component={CustomCheckbox}
                    id="churchActivity"
                    name="churchActivity"
                    options={optionsChurchActivity}
                  />
                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="churchActivity"
                  />
                </Container>

                <Container>
                  <label htmlFor="memberPastoralsMovements_answer">
                    Participa de Pastoral/Movimento na Igreja*
                  </label>
                  <Field
                    component={CustomRadioButton}
                    id="memberPastoralsMovements_answer"
                    name="memberPastoralsMovements_answer"
                    options={optionsYesOrNo}
                  />
                  {values.memberPastoralsMovements_answer === "sim" && (
                    <Container className="additionalFields">
                      <Field
                        component={AdditionalInput}
                        id="memberPastoralsMovements_which"
                        name="memberPastoralsMovements_which"
                        placeholder="Pastoral/movimento..."
                        label="Qual?"
                      />
                      <ErrorMessage
                        component="div"
                        className="formErrorMsg"
                        name="memberPastoralsMovements_which"
                      />
                    </Container>
                  )}
                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="memberPastoralsMovements_answer"
                  />
                </Container>
              </fieldset>

              <CustomButton
                className="btn-margin btn-actions btn-flex"
                type="button"
                value={show ? "Remover Morador" : "Incluir Morador"}
                onClick={() => setShow(!show)}
              >
                {show ? (
                  <RiCloseFill className="icon-actions" />
                ) : (
                  <RiAddBoxFill className="icon-actions" />
                )}
              </CustomButton>
              {show && (
                <fieldset>
                  <legend>Moradores</legend>

                  <FieldArray name="dependents">
                    {(fieldArrayProps) => {
                      const { push, remove, form } = fieldArrayProps;
                      const { values } = form;
                      const { dependents } = values;

                      return (
                        <div>
                          {dependents.map((_, index) => (
                            <div className="new-dependents" key={index}>
                              <fieldset>
                                <legend>Morador {index + 1}</legend>
                                <Container>
                                  <label
                                    htmlFor={`dependents[${index}].completeName`}
                                  >
                                    Nome*
                                  </label>
                                  <Field
                                    type="text"
                                    id={`dependents[${index}].completeName`}
                                    name={`dependents[${index}].completeName`}
                                    placeholder="Digite o nome completo..."
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`dependents[${index}].completeName`}
                                  />
                                </Container>

                                <Container>
                                  <label
                                    htmlFor={`dependents[${index}].birthDate`}
                                  >
                                    Data de Nascimento*
                                  </label>
                                  <Field
                                    type="date"
                                    id={`dependents[${index}].birthDate`}
                                    name={`dependents[${index}].birthDate`}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`dependents[${index}].birthDate`}
                                  />
                                </Container>

                                <Container>
                                  <label
                                    htmlFor={`dependents[${index}].relationship`}
                                  >
                                    Parentesco*
                                  </label>
                                  <Field
                                    type="text"
                                    id={`dependents[${index}].relationship`}
                                    name={`dependents[${index}].relationship`}
                                    placeholder="Filho, irmão, tio, sobrinho..."
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`dependents[${index}].relationship`}
                                  />
                                </Container>

                                <Container>
                                  <label
                                    htmlFor={`dependents[${index}].schoolLevel`}
                                  >
                                    Escolaridade*
                                  </label>
                                  <Field
                                    name={`dependents[${index}].schoolLevel`}
                                    id={`dependents[${index}].schoolLevel`}
                                    component={CustomSelect}
                                    options={optionsSchoolLevel}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`dependents[${index}].schoolLevel`}
                                  />
                                </Container>

                                <Container>
                                  <label
                                    htmlFor={`dependents[${index}].occupation`}
                                  >
                                    Profissão*
                                  </label>
                                  <Field
                                    type="text"
                                    id={`dependents[${index}].occupation`}
                                    name={`dependents[${index}].occupation`}
                                    placeholder="Digite a profissão..."
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`dependents[${index}].occupation`}
                                  />
                                </Container>

                                <Container>
                                  <label
                                    htmlFor={`dependents[${index}].isWorking`}
                                  >
                                    Está trabalhando?*
                                  </label>
                                  <Field
                                    component={CustomRadioButton}
                                    id={`dependents[${index}].isWorking`}
                                    name={`dependents[${index}].isWorking`}
                                    options={optionsYesOrNo}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`dependents[${index}].isWorking`}
                                  />
                                </Container>

                                <Container>
                                  <label
                                    htmlFor={`dependents[${index}].needClothes_answer`}
                                  >
                                    Precisa de Roupas*
                                  </label>
                                  <Field
                                    component={CustomRadioButton}
                                    id={`dependents[${index}].needClothes_answer`}
                                    name={`dependents[${index}].needClothes_answer`}
                                    options={optionsYesOrNo}
                                  />

                                  {values.dependents[index]
                                    .needClothes_answer === "sim" && (
                                    <Container className="additionalFields">
                                      <label
                                        htmlFor={`dependents[${index}].needClothes_pantsNumber`}
                                      >
                                        Tamanho das Calças*
                                      </label>
                                      <Field
                                        component={CustomSelect}
                                        id={`dependents[${index}].needClothes_pantsNumber`}
                                        name={`dependents[${index}].needClothes_pantsNumber`}
                                        options={optionsPantsNumber}
                                      />

                                      <ErrorMessage
                                        component="div"
                                        className="formErrorMsg"
                                        name={`dependents[${index}].needClothes_pantsNumber`}
                                      />

                                      <label
                                        htmlFor={`dependents[${index}].needClothes_tShirtCoatSize`}
                                      >
                                        Tamanho Casaco/Camiseta*
                                      </label>
                                      <Field
                                        component={CustomSelect}
                                        id={`dependents[${index}].needClothes_tShirtCoatSize`}
                                        name={`dependents[${index}].needClothes_tShirtCoatSize`}
                                        options={optionsClothesSize}
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="formErrorMsg"
                                        name={`dependents[${index}].needClothes_tShirtCoatSize`}
                                      />
                                    </Container>
                                  )}
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`dependents[${index}].needClothes_answer`}
                                  />
                                </Container>

                                <Container>
                                  <label
                                    htmlFor={`dependents[${index}].needShoes_answer`}
                                  >
                                    Precisa de Calçados*
                                  </label>
                                  <Field
                                    component={CustomRadioButton}
                                    id={`dependents[${index}].needShoes_answer`}
                                    name={`dependents[${index}].needShoes_answer`}
                                    options={optionsYesOrNo}
                                  />

                                  {values.dependents[index].needShoes_answer ===
                                    "sim" && (
                                    <Container className="additionalFields">
                                      <label
                                        htmlFor={`dependents[${index}].needShoes_number`}
                                      >
                                        Número do Calçado*
                                      </label>
                                      <Field
                                        component={CustomSelect}
                                        id={`dependents[${index}].needShoes_number`}
                                        name={`dependents[${index}].needShoes_number`}
                                        options={optionsShoesSize}
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="formErrorMsg"
                                        name={`dependents[${index}].needShoes_number`}
                                      />
                                    </Container>
                                  )}
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`dependents[${index}].needShoes_answer`}
                                  />
                                </Container>

                                <Container>
                                  <label
                                    htmlFor={`dependents[${index}].workshop`}
                                  >
                                    Tem Interesse de Participar de Alguma
                                    Oficina*
                                  </label>
                                  <Field
                                    component={CustomCheckbox}
                                    id={`dependents[${index}].workshop`}
                                    name={`dependents[${index}].workshop`}
                                    options={optionsWorkshop}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`dependents[${index}].workshop`}
                                  />
                                </Container>
                              </fieldset>

                              <fieldset>
                                <legend>
                                  Vida Religiosa do Morador {index + 1}
                                </legend>
                                <Container>
                                  <label
                                    htmlFor={`dependents[${index}].religion`}
                                  >
                                    Religião*
                                  </label>
                                  <Field
                                    component={CustomRadioButton}
                                    id={`dependents[${index}].religion`}
                                    name={`dependents[${index}].religion`}
                                    options={optionsReligion}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`dependents[${index}].religion`}
                                  />
                                </Container>

                                <Container>
                                  <label
                                    htmlFor={`dependents[${index}].receivedSacraments`}
                                  >
                                    Sacramentos Recebidos*
                                  </label>
                                  <Field
                                    component={CustomCheckbox}
                                    id={`dependents[${index}].receivedSacraments`}
                                    name={`dependents[${index}].receivedSacraments`}
                                    options={optionsSacraments}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`dependents[${index}].receivedSacraments`}
                                  />
                                </Container>

                                <Container>
                                  <label
                                    htmlFor={`dependents[${index}].wishReceiveSacraments`}
                                  >
                                    Sacramentos que Deseja Receber*
                                  </label>
                                  <Field
                                    component={CustomCheckbox}
                                    id={`dependents[${index}].wishReceiveSacraments`}
                                    name={`dependents[${index}].wishReceiveSacraments`}
                                    options={optionsSacraments}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`dependents[${index}].wishReceiveSacraments`}
                                  />
                                </Container>

                                <Container>
                                  <label
                                    htmlFor={`dependents[${index}].attendanceMass`}
                                  >
                                    Qual a frequência nas Missas*
                                  </label>
                                  <Field
                                    component={CustomRadioButton}
                                    id={`dependents[${index}].attendanceMass`}
                                    name={`dependents[${index}].attendanceMass`}
                                    options={optionsAttendanceMass}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`dependents[${index}].attendanceMass`}
                                  />
                                </Container>

                                <Container>
                                  <label
                                    htmlFor={`dependents[${index}].churchActivity`}
                                  >
                                    Participação na Igreja*
                                  </label>
                                  <Field
                                    component={CustomCheckbox}
                                    id={`dependents[${index}].churchActivity`}
                                    name={`dependents[${index}].churchActivity`}
                                    options={optionsChurchActivity}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`dependents[${index}].churchActivity`}
                                  />
                                </Container>

                                <Container>
                                  <label
                                    htmlFor={`dependents[${index}].memberPastoralsMovements_answer`}
                                  >
                                    Participa de Pastoral/Movimento na Igreja*
                                  </label>
                                  <Field
                                    component={CustomRadioButton}
                                    id={`dependents[${index}].memberPastoralsMovements_answer`}
                                    name={`dependents[${index}].memberPastoralsMovements_answer`}
                                    options={optionsYesOrNo}
                                  />
                                  {values.dependents[index]
                                    .memberPastoralsMovements_answer ===
                                    "sim" && (
                                    <Container className="additionalFields">
                                      <Field
                                        component={AdditionalInput}
                                        id={`dependents[${index}].memberPastoralsMovements_which`}
                                        name={`dependents[${index}].memberPastoralsMovements_which`}
                                        placeholder="Pastoral/movimento..."
                                        label="Qual?"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="formErrorMsg"
                                        name={`dependents[${index}].memberPastoralsMovements_which`}
                                      />
                                    </Container>
                                  )}
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`dependents[${index}].memberPastoralsMovements_answer`}
                                  />
                                </Container>
                              </fieldset>

                              <div id="btn-container">
                                {index > 0 && (
                                  <CustomButton
                                    className="btn-side-margin btn-actions btn-flex"
                                    value="Remover Morador"
                                    type="button"
                                    onClick={() => remove(index)}
                                  >
                                    <RiCloseFill className="icon-actions" />
                                  </CustomButton>
                                )}
                                <CustomButton
                                  className="btn-side-margin btn-actions btn-flex"
                                  value="Adicionar Morador"
                                  type="button"
                                  onClick={() => push(emptyDependents)}
                                >
                                  <RiAddBoxFill className="icon-actions" />
                                </CustomButton>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    }}
                  </FieldArray>
                </fieldset>
              )}

              <CustomButton
                className="btn-margin"
                value="Cadastrar"
                type="submit"
              />
            </Form>
          )}
        </Formik>
      </Container>
    </Container>
  );
};

export default CadastroFamilias;

/* TODO:
    1. Limpar inputs onde se responde "sim" e abrem novos inputs pra escrever
    2. Organizar layout - Precisa melhorar
    3. 
    4. Colocar validação no Yup pra caso não clicar no botão de add morador - Retirar o required dos campos? (Não é a melhor solução!)
    5. Quando form estiver pronto, separar validações YUP em arquivo separado
    6. MODO EDIÇÃO: Radio's e Checkboxes não vem marcados embora tenham value - CORRIGIR - Usar o hook do Formik?
*/
