import React from 'react'
import './CadastroFamilias.scss'
import { Container } from 'react-bootstrap'
import { Formik, Field, Form, useFormik } from 'formik'
import CustomSelect from '../../customSelect/CustomSelect'

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

const CadastroFamilias = () =>{

    const formik = useFormik({
        initialValues: {
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

        },
        onSubmit: values => {
            console.log(formik.values.maritalStatus)
            
        }
    })

    const updateChanges = (value, key) => formik.setFieldValue(key, value.value)

    return (
        <Container id="cds-fam-container">
            <h2 className="pbs-title-h2">Cadastrar Família</h2>
            <Container className="container-form">
                <Formik>
                    <Form onSubmit={ formik.handleSubmit }>
                        <fieldset>
                            <legend>Dados Pessoais</legend>
                            
                            <label htmlFor="completeName">Nome</label>
                            <Field
                            type="text"
                            id="completeName"
                            name="completeName"
                            placeholder="Digite o nome completo..."
                            onChange={ formik.handleChange }
                            value={ formik.values.completeName }
                            />
                            
                            <label htmlFor="street">Rua</label>
                            <Field
                            type="text"
                            id="street"
                            name="street"
                            placeholder="Digite a rua, avenida..."
                            onChange={ formik.handleChange }
                            value={ formik.values.street }
                            />
                            
                            <label htmlFor="houseNumber">Número</label>
                            <Field
                            type="text"
                            id="houseNumber"
                            name="houseNumber"
                            placeholder="XXX"
                            onChange={ formik.handleChange }
                            value={ formik.values.houseNumber }
                            />

                            <label htmlFor="district">Bairro</label>
                            <Field
                            type="text"
                            id="district"
                            name="district"
                            placeholder="Digite o bairro..."
                            onChange={ formik.handleChange }
                            value={ formik.values.district }
                            />
                                    
                            <label htmlFor="addressComplement">Complemento - Ponto de Referência</label>
                            <Field
                            type="text"
                            id="addressComplement"
                            name="addressComplement"
                            placeholder="Informe um complemento ou ponto de referência..."
                            onChange={ formik.handleChange }
                            value={ formik.values.addressComplement }
                            />
                                    
                            <label htmlFor="city">Cidade</label>
                            <Field
                            type="text"
                            id="city"
                            name="city"
                            placeholder="Digite a cidade..."
                            onChange={ formik.handleChange }
                            value={ formik.values.city }
                            />

                            <label htmlFor="phone1">Telefone 1</label>
                            <Field
                            type="text"
                            id="phone1"
                            name="phone1"
                            placeholder="(XX) XXXXX-XXXX"
                            onChange={ formik.handleChange }
                            value={ formik.values.phone1 }
                            />
                                    
                            <label htmlFor="phone2">Telefone 2</label>
                            <Field
                            type="text"
                            id="phone2"
                            name="phone2"
                            placeholder="(XX) XXXXX-XXXX"
                            onChange={ formik.handleChange }
                            value={ formik.values.phone2 }
                            />

                            <label htmlFor="birthDate">Data de Nascimento</label>
                            <Field
                            type="date"
                            id="birthDate"
                            name="birthDate"
                            onChange={ formik.handleChange }
                            value={ formik.values.birthDate }
                            />

                            <label htmlFor="maritalStatus">Estado Civil</label>
                            <CustomSelect
                                className={ 'maritalStatus-select' }
                                options={ optionsMaritalStatus }
                                onChange={ value => updateChanges(value, 'maritalStatus') }
                                value={ formik.values.maritalStatus }
                            />

                            <label htmlFor="schoolLevel">Escolaridade</label>
                            <CustomSelect
                                className={ 'schoolLevel-select' }
                                options={ optionsSchoolLevel }
                                onChange={ value => updateChanges(value, 'schoolLevel') }
                                value = { formik.values.schoolLevel }
                            />
                            
                            {/* TODO: Continuar implementando o formulário */}

                        </fieldset>
                        <button type="submit">Cadastrar</button>
                    </Form>
                </Formik>
            </Container>
        </Container>
    )
}

export default CadastroFamilias