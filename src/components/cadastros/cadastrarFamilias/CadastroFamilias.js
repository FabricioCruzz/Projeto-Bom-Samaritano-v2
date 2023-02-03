import React from 'react'
import './CadastroFamilias.scss'
import { Container } from 'react-bootstrap'
import { Formik, Field, Form, ErrorMessage } from 'formik'
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
    optionsChurchActivity
 } from '../../../utils/formInputOptions'
 import { errorMessages } from '../../../utils/formErrorMessages'
import CustomSelect from '../../customSelect/CustomSelect'
import CustomRadioButton from '../../customRadioButton/CustomRadioButtons'
import CustomCheckbox from '../../customCheckbox/CustomCheckbox'
import AdditionalInput from '../../inputs/AdditionalInput'
import CustomButton from '../../buttons/CustomButton'
import * as Yup from 'yup'
import { phoneNumber } from '../../../utils/validations'


const getFormatedDate = currentDate => currentDate.split('/').reverse().join('-')

const minDate = '01/01/1900'
const currentDate = new Date().toLocaleDateString('pt-BR')

const validationSchema = Yup.object().shape({

    completeName: Yup.string()
        .required(errorMessages.fieldReq),
    
    street: Yup.string()
        .required(errorMessages.fieldReq),
    
    houseNumber: Yup.number()
        .required(errorMessages.fieldReq)
        .positive(errorMessages.positiveNumber)
        .integer(errorMessages.integerNumber),
    
    district: Yup.string()
        .required(errorMessages.fieldReq),
    
    city: Yup.string()
        .required(errorMessages.fieldReq),
    
    phone1: Yup
        .string().matches(phoneNumber, errorMessages.phoneInvalid)
        .required(errorMessages.fieldReq),
    
    phone2: Yup.string()
        .matches(phoneNumber, errorMessages.phoneInvalid)
        .optional(),
    
    birthDate: Yup.date()
        .required(errorMessages.fieldReq)
        .min(getFormatedDate(minDate), errorMessages.tooOldDate)
        .max(getFormatedDate(currentDate), errorMessages.currentDateInvalid),
    
    maritalStatus: Yup.string()
        .ensure()
        .required(errorMessages.fieldReq),
    
    schoolLevel: Yup.string()
        .ensure()
        .required(errorMessages.fieldReq),
    
    occupation: Yup.string()
        .required(errorMessages.fieldReq),
    
    isWorking: Yup.string()
        .required(errorMessages.fieldReq),
    
    srcIncome: Yup.string()
        .required(errorMessages.fieldReq),
    
    numberOfResidents: Yup.number()
        .required(errorMessages.fieldReq)
        .positive(errorMessages.positiveNumber)
        .integer(errorMessages.integerNumber),
    
    familyIncome: Yup.number()
        .required(errorMessages.fieldReq)
        .positive(errorMessages.positiveNumber),
    
    housingSituation: Yup.string()
        .required(errorMessages.fieldReq),
    
    appliances: Yup.array()
        .min(1, errorMessages.minOneReq),
    
    needBlankets: Yup.string()
        .required(errorMessages.fieldReq),
    
    needShoes: Yup.object().shape({
        answer: Yup.string()
            .required(errorMessages.fieldReq),
        number: Yup.number()
            .required(errorMessages.fieldReq)
            .positive(errorMessages.positiveNumber)
            .integer(errorMessages.integerNumber),
    }),
    
    needClothes: Yup.object().shape({
        answer: Yup.string()
            
            .required(errorMessages.fieldReq),
        pantsNumber: Yup.number()
            .optional()
            .positive(errorMessages.positiveNumber)
            .integer(errorMessages.integerNumber),
        tShirtCoatSize: Yup.string()
            .optional()
    }),
    
    needDiapers: Yup.object().shape({
        answer: Yup.string()
            .required(errorMessages.fieldReq),
        size: Yup.string()
            .required(errorMessages.fieldReq),
    }),
    
    workshop: Yup.array()
        .min(1, errorMessages.minOneReq),
    
    religion: Yup.string()
        .required(errorMessages.fieldReq),
    
    receivedSacraments: Yup.array()
        .min(1, errorMessages.minOneReq),
    
    wishReceiveSacraments: Yup.array()
        .min(1, errorMessages.minOneReq),
    
    attendanceMass: Yup.string()
        .required(errorMessages.fieldReq),
    
    churchActivity: Yup.array()
        .min(1, errorMessages.minOneReq),

    memberPastoralsMovements: Yup.object().shape({
        answer: Yup.string()
            .required(errorMessages.fieldReq),
        which: Yup.string()
            .required(errorMessages.fieldReq)
    }),
})



const CadastroFamilias = () =>{
    
    const generateResidentFields = () => {
        return (
            <React.Fragment>
                <div>
                    TESTE!!!
                </div>
            </React.Fragment>
        )
    }
    return (
        <Container id="cds-fam-container">
            <h2 className="pbs-title-h2">Cadastrar Família</h2>
            <Container className="container-form">
                <Formik
                validationSchema={ validationSchema }
                 initialValues= {{
                    completeName: '',
                    street: '',
                    houseNumber: '',
                    district: '',
                    addressComplement: '',
                    city: '',
                    phone1: '',
                    phone2: '',
                    birthDate: '',
                    maritalStatus: '',
                    schoolLevel: '',
                    occupation: '',
                    isWorking: '',
                    srcIncome: '',
                    numberOfResidents: '',
                    familyIncome: '',
                    housingSituation: '',
                    appliances: [],
                    needBlankets: '',
                    needShoes: { answer: '', number: '' },
                    needClothes: { answer: '', pantsNumber: '', tShirtCoatSize: '' },
                    needDiapers: { answer: '', size: '' },
                    specialNeed: '',
                    workshop: [],
                    religion: '',
                    receivedSacraments: [],
                    wishReceiveSacraments: [],
                    attendanceMass: '',
                    churchActivity: [],
                    memberPastoralsMovements: { answer: '', which: '' },
                }}
                onSubmit={values => {
                    console.log(values)
                    
                }}
                >
                    {
                        ({ values }) => (
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

                                        <ErrorMessage component="div" className="formErrorMsg" name="completeName"/>
                                    </Container>
                                    
                                    <Container>
                                        <label htmlFor="street">Rua*</label>
                                        <Field
                                        type="text"
                                        id="street"
                                        name="street"
                                        placeholder="Digite a rua, avenida..."
                                        />

                                        <ErrorMessage component="div" className="formErrorMsg" name="street"/>
                                    </Container>
                                    
                                    
                                    <Container>
                                        <label htmlFor="houseNumber">Número*</label>
                                        <Field
                                        type="number"
                                        id="houseNumber"
                                        name="houseNumber"
                                        placeholder="XXX"
                                        />

                                        <ErrorMessage component="div" className="formErrorMsg" name="houseNumber"/>
                                    </Container>

                                    <Container>
                                        <label htmlFor="district">Bairro*</label>
                                        <Field
                                        type="text"
                                        id="district"
                                        name="district"
                                        placeholder="Digite o bairro..."
                                        />
                                        
                                        <ErrorMessage component="div" className="formErrorMsg" name="district"/>                                     
                                    </Container>

                                    <Container>    
                                        <label htmlFor="addressComplement">Complemento - Ponto de Referência</label>
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
                                        <ErrorMessage component="div" className="formErrorMsg" name="city"/>                                     
                                    </Container>    
                                    
                                    <Container>
                                        <label htmlFor="phone1">Telefone 1*</label>
                                        <Field
                                        type="tel"
                                        id="phone1"
                                        name="phone1"
                                        placeholder="(XX) XXXXX-XXXX"
                                        />
                                        <ErrorMessage component="div" className="formErrorMsg" name="phone1"/>
                                    </Container>

                                    <Container>
                                        <label htmlFor="phone2">Telefone 2</label>
                                        <Field
                                        type="tel"
                                        id="phone2"
                                        name="phone2"
                                        placeholder="(XX) XXXXX-XXXX"
                                        />
                                        <ErrorMessage component="div" className="formErrorMsg" name="phone2"/>
                                    </Container>        

                                    <Container>
                                        <label htmlFor="birthDate">Data de Nascimento*</label>
                                        <Field
                                        type="date"
                                        id="birthDate"
                                        name="birthDate"
                                        />
                                        <ErrorMessage component="div" className="formErrorMsg" name="birthDate"/>
                                    </Container>

                                    <Container>
                                        <label htmlFor="maritalStatus">Estado Civil*</label>
                                        <Field
                                        name="maritalStatus"
                                        id="maritalStatus"
                                        component={ CustomSelect }
                                        options={ optionsMaritalStatus }
                                        />
                                        <ErrorMessage component="div" className="formErrorMsg" name="maritalStatus"/>
                                    </Container>

                                    <Container>
                                        <label htmlFor="schoolLevel">Escolaridade*</label>
                                        <Field
                                        name="schoolLevel"
                                        id="schoolLevel"
                                        component={ CustomSelect }
                                        options={ optionsSchoolLevel }
                                        />
                                        <ErrorMessage component="div" className="formErrorMsg" name="schoolLevel"/>
                                    </Container>
                                    
                                    <Container>
                                        <label htmlFor="occupation">Profissão*</label>
                                        <Field
                                        type="text"
                                        id="occupation"
                                        name="occupation"
                                        placeholder="Digite a profissão..."
                                        />
                                        <ErrorMessage component="div" className="formErrorMsg" name="occupation"/>
                                    </Container>

                                    <Container>
                                        <label htmlFor="isWorking">Está trabalhando?*</label>
                                        <Field
                                        component={ CustomRadioButton }
                                        id="isWorking"
                                        name="isWorking"
                                        options={ optionsYesOrNo }
                                        />
                                        <ErrorMessage component="div" className="formErrorMsg" name="isWorking"/>
                                    </Container>
                                    
                                    <Container>
                                        <label htmlFor="srcIncome">Fonte de Renda*</label>
                                        <Field
                                        component={ CustomRadioButton }
                                        id="srcIncome"
                                        name="srcIncome"
                                        options={ optionsSrcIncome }
                                        />
                                        <ErrorMessage component="div" className="formErrorMsg" name="srcIncome"/>
                                    </Container>

                                    <Container>
                                        <label htmlFor="numberOfResidents">Quantidade de Moradores na Casa*</label>
                                        <Field
                                        type="number"
                                        id="numberOfResidents"
                                        name="numberOfResidents"
                                        placeholder="Quantidade de moradores..."
                                        />
                                        <ErrorMessage component="div" className="formErrorMsg" name="numberOfResidents"/>
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
                                        <ErrorMessage component="div" className="formErrorMsg" name="familyIncome"/>
                                    </Container>

                                    <Container>
                                        <label htmlFor="housingSituation">Situação Habitacional*</label>
                                        <Field
                                        component={ CustomRadioButton }
                                        id="housingSituation"
                                        name="housingSituation"
                                        options={ optionsHousingSituation }
                                        />
                                        <ErrorMessage component="div" className="formErrorMsg" name="housingSituation"/>
                                    </Container>

                                    <Container>
                                        <label htmlFor="appliances">A Família Possui*</label>
                                        <Field
                                        component={ CustomCheckbox }
                                        id="appliances"
                                        name="appliances"
                                        options={ optionsAppliances }
                                        />
                                        <ErrorMessage component="div" className="formErrorMsg" name="appliances"/>
                                    </Container>

                                    <Container>
                                        <label htmlFor="needBlankets">Precisa de Cobertores*</label>
                                        <Field
                                        component={ CustomRadioButton }
                                        id="needBlankets"
                                        name="needBlankets"
                                        options={ optionsYesOrNo }
                                        />
                                        <ErrorMessage component="div" className="formErrorMsg" name="needBlankets"/>
                                    </Container>
                                    
                                    <Container>
                                        <label htmlFor="needShoes.answer">Precisa de Calçados*</label>
                                        <Field
                                        component={ CustomRadioButton }
                                        id="needShoes.answer"
                                        name="needShoes.answer"
                                        options={ optionsYesOrNo }
                                        />

                                    {
                                        values.needShoes.answer === 'sim' 
                                        &&
                                        <div>
                                            <Field
                                            component={ AdditionalInput }
                                            id="needShoes.number"
                                            name="needShoes.number"
                                            placeholder="Número do calçado..."
                                            label="Número do Calçado"
                                            />
                                            <ErrorMessage component="div" className="formErrorMsg" name="needShoes.number"/>
                                        </div>
                                        
                                    }
                                    <ErrorMessage component="div" className="formErrorMsg" name="needShoes.answer"/>
                                    </Container>
                                    
                                    <Container>
                                        <label htmlFor="needClothes.answer">Precisa de Roupas*</label>
                                        <Field
                                        component={ CustomRadioButton }
                                        id="needClothes.answer"
                                        name="needClothes.answer"
                                        options={ optionsYesOrNo }
                                        />
                                        {
                                            values.needClothes.answer === 'sim'
                                            &&
                                            <div>
                                            <Field
                                            component={ AdditionalInput }
                                            id="needClothes.pantsNumber"
                                            name="needClothes.pantsNumber"
                                            placeholder="Número da calça..."
                                            label="Número da Calça"
                                            />

                                            <ErrorMessage component="div" className="formErrorMsg" name="needClothes.pantsNumber"/>

                                            <Field
                                            component={ AdditionalInput }
                                            id="needClothes.tShirtCoatSize"
                                            name="needClothes.tShirtCoatSize"
                                            placeholder="Tamanho da camiseta/agasalho..."
                                            label="Tamanho da Camiseta/Agasalho"
                                            />
                                            <ErrorMessage component="div" className="formErrorMsg" name="needClothes.tShirtCoatSize"/>
                                            </div>
                                        }
                                        <ErrorMessage component="div" className="formErrorMsg" name="needClothes.answer"/>
                                    </Container>

                                    <Container>
                                        <label htmlFor="needDiapers.answer">Precisa de Fraldas*</label> 
                                        <Field
                                        component={ CustomRadioButton }
                                        id="needDiapers.answer"
                                        name="needDiapers.answer"
                                        options={ optionsYesOrNo }
                                        />
                                        {
                                        values.needDiapers.answer === 'sim'
                                        &&
                                        <div>
                                            <Field
                                            component={ AdditionalInput }
                                            id="needDiapers.size"
                                            name="needDiapers.size"
                                            placeholder="Tamanho das fraldas..."
                                            label="Tamanho"
                                            />
                                            <ErrorMessage component="div" className="formErrorMsg" name="needDiapers.size"/>
                                        </div>
                                        }
                                        <ErrorMessage component="div" className="formErrorMsg" name="needDiapers.answer"/>
                                    </Container>
                                    
                                    <Container>
                                        <label htmlFor="specialNeed">Alguma Necessidade Especial</label>
                                        <Field
                                        type="text-area"
                                        id="specialNeed"
                                        name="specialNeed"
                                        />
                                    </Container>
                                    
                                    <Container>
                                        <label htmlFor="workshop">Tem Interesse de Participar de Alguma Oficina*</label>
                                        <Field
                                        component={ CustomCheckbox }
                                        id="workshop"
                                        name="workshop"
                                        options={ optionsWorkshop }
                                        />
                                        <ErrorMessage component="div" className="formErrorMsg" name="workshop"/>
                                    </Container>

                                </fieldset>
                                    
                                <fieldset>
                                    <legend>Vida Religiosa</legend>
                                    
                                    <Container>
                                        <label htmlFor="religion">Religião*</label>
                                        <Field
                                        component={ CustomRadioButton }
                                        id="religion"
                                        name="religion"
                                        options={ optionsReligion }
                                        />
                                        <ErrorMessage component="div" className="formErrorMsg" name="religion"/>
                                    </Container>

                                    <Container>
                                        <label htmlFor="receivedSacraments">Sacramentos Recebidos*</label>
                                        <Field
                                        component={ CustomCheckbox }
                                        id="receivedSacraments"
                                        name="receivedSacraments"
                                        options={ optionsSacraments }
                                        />
                                        <ErrorMessage component="div" className="formErrorMsg" name="receivedSacraments"/>
                                    </Container>

                                    <Container>
                                        <label htmlFor="wishReceiveSacraments">Sacramentos que Deseja Receber*</label>
                                        <Field
                                        component={ CustomCheckbox }
                                        id="wishReceiveSacraments"
                                        name="wishReceiveSacraments"
                                        options={ optionsSacraments }
                                        />
                                        <ErrorMessage component="div" className="formErrorMsg" name="wishReceiveSacraments"/>
                                    </Container>

                                    <Container>
                                        <label htmlFor="attendanceMass">Qual a frequência nas Missas*</label>
                                        <Field
                                        component={ CustomRadioButton }
                                        id="attendanceMass"
                                        name="attendanceMass"
                                        options={ optionsAttendanceMass }
                                        />
                                        <ErrorMessage component="div" className="formErrorMsg" name="attendanceMass"/>
                                    </Container>

                                    <Container>
                                        <label htmlFor="churchActivity">Participação na Igreja*</label>
                                        <Field
                                        component={ CustomCheckbox }
                                        id="churchActivity"
                                        name="churchActivity"
                                        options={ optionsChurchActivity }
                                        />
                                        <ErrorMessage component="div" className="formErrorMsg" name="churchActivity"/>
                                    </Container>
                                    
                                    <Container>
                                        <label htmlFor="memberPastoralsMovements.answer">Participa de Pastoral/Movimento na Igreja*</label>
                                        <Field
                                        component={ CustomRadioButton }
                                        id="memberPastoralsMovements.answer"
                                        name="memberPastoralsMovements.answer"
                                        options={ optionsYesOrNo }
                                        />
                                        { 
                                        values.memberPastoralsMovements.answer === 'sim'
                                        &&
                                        <div>
                                            <Field
                                            component={ AdditionalInput }
                                            id="memberPastoralsMovements.which"
                                            name="memberPastoralsMovements.which"
                                            placeholder="Pastoral/movimento..."
                                            label="Qual?"
                                            />
                                            <ErrorMessage component="div" className="formErrorMsg" name="memberPastoralsMovements.which"/>
                                        </div> 
                                        }
                                        <ErrorMessage component="div" className="formErrorMsg" name="memberPastoralsMovements.answer"/>
                                    </Container>


                                    {/* TODO: Continuar implementando o fomulário */
                                    // Incluir botão para adicionar mais moradores
                                    }
                                </fieldset>
                                
                                <fieldset>
                                    <legend>Moradores</legend>
                                    

                                    <div id="morador-container">
                                    <button type='button' onClick={ generateResidentFields }>Adicionar Morador</button>
                                        
                                    </div>

                                </fieldset>
                                
                                <CustomButton className="btn-margin" value="Cadastrar" type="submit"/>
                            </Form>
                        )
                    }
                </Formik>
            </Container>
        </Container>
    )
}

export default CadastroFamilias