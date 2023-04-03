import React, { useState } from "react";
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
import service from "../../../services/storage.service";
import { useParams } from "react-router-dom";

const key = "cadastros";
const storage = service.loadData(key);
const registrations = storage ? JSON.parse(storage) : [];

const getFormatedDate = (currentDate) =>
  currentDate.split("/").reverse().join("-");

const minDate = "01/01/1900";

const emptyResident = {
  completeName: "",
  birthDate: "",
  relationship: "",
  schoolLevel: "",
  occupation: "",
  isWorking: "",
  needShoes: { answer: "", number: "" },
  needClothes: {
    answer: "",
    pantsNumber: "",
    tShirtCoatSize: "",
  },
  workshop: [],
  religion: "",
  receivedSacraments: [],
  wishReceiveSacraments: [],
  attendanceMass: "",
  churchActivity: [],
  memberPastoralsMovements: { answer: "", which: "" },
};

const initialValues = {
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
  needShoes: { answer: "", number: "" },
  needClothes: { answer: "", pantsNumber: "", tShirtCoatSize: "" },
  needDiapers: { answer: "", size: "" },
  specialNeed: "",
  workshop: [],
  religion: "",
  receivedSacraments: [],
  wishReceiveSacraments: [],
  attendanceMass: "",
  churchActivity: [],
  memberPastoralsMovements: { answer: "", which: "" },
  residents: [emptyResident],
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
  const { id } = useParams();

  const bdValues = id ? service.getById(key, id) : initialValues;

  return (
    <Container id="cds-fam-container">
      <h1 className="pbs-title-h1">Cadastrar Família</h1>
      <Container>
        <Formik
          validationSchema={validationSchema}
          initialValues={bdValues}
          onSubmit={async (values) => {
            await new Promise((res) => setTimeout(res, 500));

            let cadastroFamilia = {
              id: values.id ? values.id : new Date().getTime().toString(10),
              ...values,
            };
            const index = registrations.findIndex(el => el.id === values.id)
            if(index !== -1){
              registrations[index] = values              
            }
            else{
              registrations.push(cadastroFamilia);
            }
            service.saveData(key, registrations);

            console.log(cadastroFamilia);
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
                  <label htmlFor="needShoes.answer">Precisa de Calçados*</label>
                  <Field
                    component={CustomRadioButton}
                    id="needShoes.answer"
                    name="needShoes.answer"
                    options={optionsYesOrNo}
                  />

                  {values.needShoes.answer === "sim" && (
                    <Container className="additionalFields">
                      <label htmlFor="needShoes.number">
                        Precisa de Calçados*
                      </label>
                      <Field
                        component={CustomSelect}
                        id="needShoes.number"
                        name="needShoes.number"
                        options={optionsShoesSize}
                      />
                      <ErrorMessage
                        component="div"
                        className="formErrorMsg"
                        name="needShoes.number"
                      />
                    </Container>
                  )}
                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="needShoes.answer"
                  />
                </Container>

                <Container>
                  <label htmlFor="needClothes.answer">Precisa de Roupas*</label>
                  <Field
                    component={CustomRadioButton}
                    id="needClothes.answer"
                    name="needClothes.answer"
                    options={optionsYesOrNo}
                  />
                  {values.needClothes.answer === "sim" && (
                    <Container className="additionalFields">
                      <label htmlFor="needClothes.pantsNumber">
                        Tamanho das Calças*
                      </label>
                      <Field
                        component={CustomSelect}
                        id="needClothes.pantsNumber"
                        name="needClothes.pantsNumber"
                        options={optionsPantsNumber}
                      />

                      <ErrorMessage
                        component="div"
                        className="formErrorMsg"
                        name="needClothes.pantsNumber"
                      />

                      <label htmlFor="needClothes.tShirtCoatSize">
                        Tamanho Casaco/Camiseta*
                      </label>
                      <Field
                        component={CustomSelect}
                        id="needClothes.tShirtCoatSize"
                        name="needClothes.tShirtCoatSize"
                        options={optionsClothesSize}
                      />
                      <ErrorMessage
                        component="div"
                        className="formErrorMsg"
                        name="needClothes.tShirtCoatSize"
                      />
                    </Container>
                  )}
                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="needClothes.answer"
                  />
                </Container>

                <Container>
                  <label htmlFor="needDiapers.answer">
                    Precisa de Fraldas*
                  </label>
                  <Field
                    component={CustomRadioButton}
                    id="needDiapers.answer"
                    name="needDiapers.answer"
                    options={optionsYesOrNo}
                  />
                  {values.needDiapers.answer === "sim" && (
                    <Container className="additionalFields">
                      <label htmlFor="needDiapers.size">Tamanho*</label>
                      <Field
                        component={CustomSelect}
                        id="needDiapers.size"
                        name="needDiapers.size"
                        options={optionsDiappers}
                      />
                      <ErrorMessage
                        component="div"
                        className="formErrorMsg"
                        name="needDiapers.size"
                      />
                    </Container>
                  )}
                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="needDiapers.answer"
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
                  <label htmlFor="memberPastoralsMovements.answer">
                    Participa de Pastoral/Movimento na Igreja*
                  </label>
                  <Field
                    component={CustomRadioButton}
                    id="memberPastoralsMovements.answer"
                    name="memberPastoralsMovements.answer"
                    options={optionsYesOrNo}
                  />
                  {values.memberPastoralsMovements.answer === "sim" && (
                    <Container className="additionalFields">
                      <Field
                        component={AdditionalInput}
                        id="memberPastoralsMovements.which"
                        name="memberPastoralsMovements.which"
                        placeholder="Pastoral/movimento..."
                        label="Qual?"
                      />
                      <ErrorMessage
                        component="div"
                        className="formErrorMsg"
                        name="memberPastoralsMovements.which"
                      />
                    </Container>
                  )}
                  <ErrorMessage
                    component="div"
                    className="formErrorMsg"
                    name="memberPastoralsMovements.answer"
                  />
                </Container>

                {/* TODO: Continuar implementando o fomulário
                                        Incluir botão para adicionar mais moradores
                                     ----->   Usar FieldArray pra gerar os campos?     <----
                                        Ver o video nos favoritos do navegador de novo
                                    */}
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

                  <FieldArray name="residents">
                    {(fieldArrayProps) => {
                      const { push, remove, form } = fieldArrayProps;
                      const { values } = form;
                      const { residents } = values;

                      return (
                        <div>
                          {residents.map((_, index) => (
                            <div className="new-resident" key={index}>
                              <fieldset>
                                <legend>Morador {index + 1}</legend>
                                <Container>
                                  <label
                                    htmlFor={`residents[${index}].completeName`}
                                  >
                                    Nome*
                                  </label>
                                  <Field
                                    type="text"
                                    id={`residents[${index}].completeName`}
                                    name={`residents[${index}].completeName`}
                                    placeholder="Digite o nome completo..."
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`residents[${index}].completeName`}
                                  />
                                </Container>

                                <Container>
                                  <label
                                    htmlFor={`residents[${index}].birthDate`}
                                  >
                                    Data de Nascimento*
                                  </label>
                                  <Field
                                    type="date"
                                    id={`residents[${index}].birthDate`}
                                    name={`residents[${index}].birthDate`}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`residents[${index}].birthDate`}
                                  />
                                </Container>

                                <Container>
                                  <label
                                    htmlFor={`residents[${index}].relationship`}
                                  >
                                    Parentesco*
                                  </label>
                                  <Field
                                    type="text"
                                    id={`residents[${index}].relationship`}
                                    name={`residents[${index}].relationship`}
                                    placeholder="Filho, irmão, tio, sobrinho..."
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`residents[${index}].relationship`}
                                  />
                                </Container>

                                <Container>
                                  <label
                                    htmlFor={`residents[${index}].schoolLevel`}
                                  >
                                    Escolaridade*
                                  </label>
                                  <Field
                                    name={`residents[${index}].schoolLevel`}
                                    id={`residents[${index}].schoolLevel`}
                                    component={CustomSelect}
                                    options={optionsSchoolLevel}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`residents[${index}].schoolLevel`}
                                  />
                                </Container>

                                <Container>
                                  <label
                                    htmlFor={`residents[${index}].occupation`}
                                  >
                                    Profissão*
                                  </label>
                                  <Field
                                    type="text"
                                    id={`residents[${index}].occupation`}
                                    name={`residents[${index}].occupation`}
                                    placeholder="Digite a profissão..."
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`residents[${index}].occupation`}
                                  />
                                </Container>

                                <Container>
                                  <label
                                    htmlFor={`residents[${index}].isWorking`}
                                  >
                                    Está trabalhando?*
                                  </label>
                                  <Field
                                    component={CustomRadioButton}
                                    id={`residents[${index}].isWorking`}
                                    name={`residents[${index}].isWorking`}
                                    options={optionsYesOrNo}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`residents[${index}].isWorking`}
                                  />
                                </Container>

                                <Container>
                                  <label
                                    htmlFor={`residents[${index}].needClothes.answer`}
                                  >
                                    Precisa de Roupas*
                                  </label>
                                  <Field
                                    component={CustomRadioButton}
                                    id={`residents[${index}].needClothes.answer`}
                                    name={`residents[${index}].needClothes.answer`}
                                    options={optionsYesOrNo}
                                  />

                                  {values.residents[index].needClothes
                                    .answer === "sim" && (
                                    <Container className="additionalFields">
                                      <label
                                        htmlFor={`residents[${index}].needClothes.pantsNumber`}
                                      >
                                        Tamanho das Calças*
                                      </label>
                                      <Field
                                        component={CustomSelect}
                                        id={`residents[${index}].needClothes.pantsNumber`}
                                        name={`residents[${index}].needClothes.pantsNumber`}
                                        options={optionsPantsNumber}
                                      />

                                      <ErrorMessage
                                        component="div"
                                        className="formErrorMsg"
                                        name={`residents[${index}].needClothes.pantsNumber`}
                                      />

                                      <label
                                        htmlFor={`residents[${index}].needClothes.tShirtCoatSize`}
                                      >
                                        Tamanho Casaco/Camiseta*
                                      </label>
                                      <Field
                                        component={CustomSelect}
                                        id={`residents[${index}].needClothes.tShirtCoatSize`}
                                        name={`residents[${index}].needClothes.tShirtCoatSize`}
                                        options={optionsClothesSize}
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="formErrorMsg"
                                        name={`residents[${index}].needClothes.tShirtCoatSize`}
                                      />
                                    </Container>
                                  )}
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`residents[${index}].needClothes.answer`}
                                  />
                                </Container>

                                <Container>
                                  <label
                                    htmlFor={`residents[${index}].needShoes.answer`}
                                  >
                                    Precisa de Calçados*
                                  </label>
                                  <Field
                                    component={CustomRadioButton}
                                    id={`residents[${index}].needShoes.answer`}
                                    name={`residents[${index}].needShoes.answer`}
                                    options={optionsYesOrNo}
                                  />

                                  {values.residents[index].needShoes.answer ===
                                    "sim" && (
                                    <Container className="additionalFields">
                                      <label
                                        htmlFor={`residents[${index}].needShoes.number`}
                                      >
                                        Número do Calçado*
                                      </label>
                                      <Field
                                        component={CustomSelect}
                                        id={`residents[${index}].needShoes.number`}
                                        name={`residents[${index}].needShoes.number`}
                                        options={optionsShoesSize}
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="formErrorMsg"
                                        name={`residents[${index}].needShoes.number`}
                                      />
                                    </Container>
                                  )}
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`residents[${index}].needShoes.answer`}
                                  />
                                </Container>

                                <Container>
                                  <label
                                    htmlFor={`residents[${index}].workshop`}
                                  >
                                    Tem Interesse de Participar de Alguma
                                    Oficina*
                                  </label>
                                  <Field
                                    component={CustomCheckbox}
                                    id={`residents[${index}].workshop`}
                                    name={`residents[${index}].workshop`}
                                    options={optionsWorkshop}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`residents[${index}].workshop`}
                                  />
                                </Container>
                              </fieldset>

                              <fieldset>
                                <legend>
                                  Vida Religiosa do Morador {index + 1}
                                </legend>
                                <Container>
                                  <label
                                    htmlFor={`residents[${index}].religion`}
                                  >
                                    Religião*
                                  </label>
                                  <Field
                                    component={CustomRadioButton}
                                    id={`residents[${index}].religion`}
                                    name={`residents[${index}].religion`}
                                    options={optionsReligion}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`residents[${index}].religion`}
                                  />
                                </Container>

                                <Container>
                                  <label
                                    htmlFor={`residents[${index}].receivedSacraments`}
                                  >
                                    Sacramentos Recebidos*
                                  </label>
                                  <Field
                                    component={CustomCheckbox}
                                    id={`residents[${index}].receivedSacraments`}
                                    name={`residents[${index}].receivedSacraments`}
                                    options={optionsSacraments}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`residents[${index}].receivedSacraments`}
                                  />
                                </Container>

                                <Container>
                                  <label
                                    htmlFor={`residents[${index}].wishReceiveSacraments`}
                                  >
                                    Sacramentos que Deseja Receber*
                                  </label>
                                  <Field
                                    component={CustomCheckbox}
                                    id={`residents[${index}].wishReceiveSacraments`}
                                    name={`residents[${index}].wishReceiveSacraments`}
                                    options={optionsSacraments}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`residents[${index}].wishReceiveSacraments`}
                                  />
                                </Container>

                                <Container>
                                  <label
                                    htmlFor={`residents[${index}].attendanceMass`}
                                  >
                                    Qual a frequência nas Missas*
                                  </label>
                                  <Field
                                    component={CustomRadioButton}
                                    id={`residents[${index}].attendanceMass`}
                                    name={`residents[${index}].attendanceMass`}
                                    options={optionsAttendanceMass}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`residents[${index}].attendanceMass`}
                                  />
                                </Container>

                                <Container>
                                  <label
                                    htmlFor={`residents[${index}].churchActivity`}
                                  >
                                    Participação na Igreja*
                                  </label>
                                  <Field
                                    component={CustomCheckbox}
                                    id={`residents[${index}].churchActivity`}
                                    name={`residents[${index}].churchActivity`}
                                    options={optionsChurchActivity}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`residents[${index}].churchActivity`}
                                  />
                                </Container>

                                <Container>
                                  <label
                                    htmlFor={`residents[${index}].memberPastoralsMovements.answer`}
                                  >
                                    Participa de Pastoral/Movimento na Igreja*
                                  </label>
                                  <Field
                                    component={CustomRadioButton}
                                    id={`residents[${index}].memberPastoralsMovements.answer`}
                                    name={`residents[${index}].memberPastoralsMovements.answer`}
                                    options={optionsYesOrNo}
                                  />
                                  {values.residents[index]
                                    .memberPastoralsMovements.answer ===
                                    "sim" && (
                                    <Container className="additionalFields">
                                      <Field
                                        component={AdditionalInput}
                                        id={`residents[${index}].memberPastoralsMovements.which`}
                                        name={`residents[${index}].memberPastoralsMovements.which`}
                                        placeholder="Pastoral/movimento..."
                                        label="Qual?"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="formErrorMsg"
                                        name={`residents[${index}].memberPastoralsMovements.which`}
                                      />
                                    </Container>
                                  )}
                                  <ErrorMessage
                                    component="div"
                                    className="formErrorMsg"
                                    name={`residents[${index}].memberPastoralsMovements.answer`}
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
                                  onClick={() => push(emptyResident)}
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
