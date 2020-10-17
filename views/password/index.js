import styled from 'styled-components'
import Router from 'next/router'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import Swal from 'sweetalert2'
import { Typography, TextField, Button } from '@material-ui/core'
import { RESET_ME_PASSWORD } from '../../mutations/collaborator'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin-top: 40px;
  button {
    margin-top: 35px;
  }
`

const PasswordView = () => {
  const { register, handleSubmit } = useForm()
  const [resetMePassword, { loading }] = useMutation(RESET_ME_PASSWORD, {
    onCompleted: () => {
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Se ha reiniciado la contraseña!',
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(() => {
        Router.push('/')
      }, 2000)
    },
    onError: () => {
      Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: 'No se reinició la contraseña!, hubo un error',
        showConfirmButton: false,
        timer: 4000
      })
    },
  })
  const onSubmit = (data) => {
    resetMePassword({ variables: { password: data.password } })
  }

  return (
    <>
      <Typography color="secondary" variant="h1">Reiniciar mi contraseña</Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="pass"
          name="password"
          label="Ingrese nueva contraseña"
          required
          inputRef={register}
        />
        <Button color="secondary" type="submit" variant="contained">{loading ? 'Reiniciando' : 'Reiniciar'}</Button>
      </Form>
    </>
  )
}

export default PasswordView