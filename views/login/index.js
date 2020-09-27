import { useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { setCookie } from 'nookies'
import Router from 'next/router'
import { TextField, Button, Typography, CircularProgress, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { LOGIN } from '../../mutations/me'

const Container = styled.main`
  width: 100%;
  height: 100vh;
  background-image: url('/img/login.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
`

const Section = styled.section`
  width: 100%;
  height: 100vh;
  max-width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`

const Form = styled.form`
  width: 400px;
  padding: 30px 15px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
`

const LoginView = () => {
  const { register, handleSubmit } = useForm()
  const [notification, setNotification] = useState({
    type: 'error',
    open: false,
    description: '',
  })

  const handleOpenNotification = (type, description) => setNotification({ type, open: true, description })
  const handleCloseNotification = (_, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setNotification({
      ...notification,
      open: false,
    })
  }
  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: ({ login }) => {
      setCookie(null, 'authorization', login.token)
      setCookie(null, "refresh_token", login.refresh_token)
      Router.push('/')
    },
    onError: (err) => {
      console.log(err)
      handleOpenNotification('error', 'el usuario o contraseña están incorrectos')
    }
  })

  const onSubmit = (data) => {
    const keys = Object.keys(data)
    const variables = {
      ...keys.reduce((acc, cur) => {
        acc[cur] = data[cur].trim()
        return acc
      }, {})
    }
    login({ variables })
  }

  return (
    <Container>
      <Section>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="username"
            name="username"
            label="Usuario"
            type="text"
            inputRef={register}
            margin="dense"
            required
          />
          <TextField
            id="password"
            name="password"
            label="Contraseña"
            type="password"
            inputRef={register}
            margin="dense"
            required
          />
          <Button variant="contained" type="submit" color="primary">
            <Typography variant="button">
              {loading ? <Typography variant="button">Cargando <CircularProgress color="inherit" size={20} /></Typography> : 'Ingresar'}
            </Typography>
          </Button>
        </Form>
      </Section>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={notification.open} autoHideDuration={5000} onClose={handleCloseNotification}>
        <Alert severity={notification.type}>{notification.description}</Alert>
      </Snackbar>
    </Container>
  )
}

export default LoginView