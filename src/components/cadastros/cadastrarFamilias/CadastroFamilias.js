import React from 'react'
import './CadastroFamilias.scss'
import { Container } from 'react-bootstrap'
import { Formik, Field, Form } from 'formik'
import CustomSelect from '../../customSelect/CustomSelect'
import CustomRadioButton from '../../customRadioButton/CustomRadioButtons'

// Exportar de um arquivo separado???
const optionsMaritalStatus = [
    {value: 'solteiro(a)', label: 'Solteiro(a)'},
    {value: 'casado(a)', label: 'Casado(a)'},
    {value: 'divorciado(a)', label: 'Divorciado(a)'},
    {value: 'viúvo(a)', label: 'Viúvo(a)'}
]

const optionsSchoolLevel = [
    { value: 'fundamental incompleto', label: 'Fundamental Incompleto' },
    { value: 'fundamental completo', label: 'Fundamental Completo' },
    { value: 'ensino médio incompleto', label: 'Ensino Médio Incompleto' },
    { value: 'ensino médio completo', label: 'Ensino Médio Completo' },
    { value: 'ensino superior incompleto', label: 'Ensino Superior Incompleto' },
    { value: 'ensino superior completo', label: 'Ensino Superior Completo' },
]

const optionsIsWorking = [
    { value: 'sim', label: 'Sim' },
    { value: 'nao', label: 'Não' },
]

const CadastroFamilias = () =>{

    return (
        <Container id="cds-fam-container">
            <h2 className="pbs-title-h2">Cadastrar Família</h2>
            <Container className="container-form">
                <Formik
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
                    income: '',

                }}
                onSubmit={values => {
                    console.log(values)
                    
                }}
                >
                    {
                        ({values}) => (
                            <Form>
                                <fieldset>
                                    <legend>Dados Pessoais</legend>
                                    
                                    <label htmlFor="completeName">Nome</label>
                                    <Field
                                    type="text"
                                    id="completeName"
                                    name="completeName"
                                    placeholder="Digite o nome completo..."
                                    />
                                    
                                    <label htmlFor="street">Rua</label>
                                    <Field
                                    type="text"
                                    id="street"
                                    name="street"
                                    placeholder="Digite a rua, avenida..."
                                    />
                                    
                                    <label htmlFor="houseNumber">Número</label>
                                    <Field
                                    type="text"
                                    id="houseNumber"
                                    name="houseNumber"
                                    placeholder="XXX"
                                    />

                                    <label htmlFor="district">Bairro</label>
                                    <Field
                                    type="text"
                                    id="district"
                                    name="district"
                                    placeholder="Digite o bairro..."
                                    />
                                            
                                    <label htmlFor="addressComplement">Complemento - Ponto de Referência</label>
                                    <Field
                                    type="text"
                                    id="addressComplement"
                                    name="addressComplement"
                                    placeholder="Informe um complemento ou ponto de referência..."
                                    />
                                            
                                    <label htmlFor="city">Cidade</label>
                                    <Field
                                    type="text"
                                    id="city"
                                    name="city"
                                    placeholder="Digite a cidade..."
                                    />

                                    <label htmlFor="phone1">Telefone 1</label>
                                    <Field
                                    type="text"
                                    id="phone1"
                                    name="phone1"
                                    placeholder="(XX) XXXXX-XXXX"
                                    />
                                            
                                    <label htmlFor="phone2">Telefone 2</label>
                                    <Field
                                    type="text"
                                    id="phone2"
                                    name="phone2"
                                    placeholder="(XX) XXXXX-XXXX"
                                    />

                                    <label htmlFor="birthDate">Data de Nascimento</label>
                                    <Field
                                    type="date"
                                    id="birthDate"
                                    name="birthDate"
                                    />

                                    <label htmlFor="maritalStatus">Estado Civil</label>
                                    <Field
                                    name="maritalStatus"
                                    id="maritalStatus"
                                    component={ CustomSelect }
                                    options={ optionsMaritalStatus }
                                    />

                                    <label htmlFor="schoolLevel">Escolaridade</label>
                                    <Field
                                    name="schoolLevel"
                                    id="schoolLevel"
                                    component={ CustomSelect }
                                    options={ optionsSchoolLevel }
                                    />
                                    
                                    <label htmlFor="occupation">Profissão</label>
                                    <Field
                                    type="text"
                                    id="occupation"
                                    name="occupation"
                                    placeholder="Digite a profissão..."
                                    />

                                    <label htmlFor="isWorking">Está trabalhando?</label>
                                    <Field
                                    component={ CustomRadioButton }
                                    name="isWorking"
                                    options={ optionsIsWorking }
                                    />

                                    <div id="income-radio-group">Fonte de Renda</div>
                                    <div role="group" aria-labelledby="income-radio-group">
                                        <label>
                                            <Field type="radio" name="income" value="trabalho-fixo" />
                                        Trabalho Fixo
                                        </label>

                                        <label>
                                            <Field type="radio" name="income" value="bicos" />
                                            Bicos
                                        </label>

                                        
                                        <label>
                                            <Field type="radio" name="income" value="aposentadoria" />
                                            Aposentadoria
                                        </label>

                                        <label>
                                            <Field type="radio" name="income" value="aposentadoria_pensaoinss" />
                                            Aposentadoria/Pensão INSS
                                        </label>

                                        <label>
                                            <Field type="radio" name="income" value="bolsa-familia" />
                                            Bolsa Família
                                        </label>
                                    </div>
                                        
                                    {/* <Field
                                    component={ CustomRadioButton }
                                    name="isWorking"
                                    options={ optionsIsWorking }
                                    /> */}

                                    {/* TODO: Continuar implementando o fomulário */}

                                </fieldset>
                                <button type="submit">Cadastrar</button>
                            </Form>
                        )
                    }
                </Formik>
            </Container>
        </Container>
    )
}

export default CadastroFamilias