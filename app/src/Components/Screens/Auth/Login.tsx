import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Button, Form } from 'semantic-ui-react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { Link } from 'react-router-dom'
import MyInput from '../../Util/Resuable/MyInput'

interface FormValues {
  email: string
  password: string
}

const Login: React.FC = () => {
  const LoginForm = useForm<FormValues>()
  const { handleSubmit } = LoginForm
  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    console.log(formData)
  }
  return (
    <>
      <Container fluid>
        <FormProvider {...LoginForm}>
          <Row className='justify-content-center'>
            <Col md='8'>
              <h2>Login</h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <MyInput id='email' label='Email' placeholder='Enter Emial' input_type='input' name='email' />
                <MyInput
                  id='password'
                  label='Password'
                  placeholder='Enter Password'
                  input_type='password'
                  name='password'
                />
                <Button type='submit'>Login</Button>
                <Link to='signup'>Sign up</Link>
              </Form>
            </Col>
          </Row>
        </FormProvider>
      </Container>
    </>
  )
}

export default Login
