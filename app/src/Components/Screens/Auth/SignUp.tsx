import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Button, Form } from 'semantic-ui-react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import MyInput from '../../Util/Resuable/MyInput'
import { useDispatch } from 'react-redux'
import { Register } from '../../../Redux/Auth/Actions'

interface FormValues {
  firstName: string
  lastName: string
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const RegisterForm = useForm<FormValues>()
  const { handleSubmit } = RegisterForm
  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    console.log(formData)
    dispatch(Register(formData))
  }
  return (
    <>
      <Container fluid>
        <FormProvider {...RegisterForm}>
          <Row className='justify-content-center'>
            <Col md='8'>
              <h2>Sign Up</h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <MyInput
                  id='firstName'
                  label='First name'
                  placeholder='Enter First name'
                  input_type='input'
                  name='firstName'
                />
                <MyInput
                  id='lastName'
                  label='Last name'
                  placeholder='Enter Last name'
                  input_type='input'
                  name='lastName'
                />
                <MyInput id='email' label='Email' placeholder='Enter Emial' input_type='input' name='email' />
                <MyInput
                  id='password'
                  label='Password'
                  placeholder='Enter Password'
                  input_type='password'
                  name='password'
                />
                <Button type='submit'>Sign Up</Button>
              </Form>
            </Col>
          </Row>
        </FormProvider>
      </Container>
    </>
  )
}

export default SignUp
