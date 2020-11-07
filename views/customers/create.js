import Router from 'next/router'
import { Typography, Button, TextField } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import Swal from 'sweetalert2'
import { Container, Form, InnerForm, WrapInput } from '../../components'
import { CUSTOMER_CREATE } from '../../mutations/customer'
import { graphError } from '../../lib/graphError'

const CreateCustomerView = ({ me }) => {
  const { register, handleSubmit } = useForm()

  const [customerCreate, { loading }] = useMutation(CUSTOMER_CREATE, {
    onCompleted: () => {
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Se ha creado el cliente! redireccionando...',
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(() => {
        Router.push('/cliente')
      }, 2000)
    },
    onError: (err) => {
      const error = graphError(err)
      Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: err,
        showConfirmButton: false,
        timer: 2000
      })
    },
  })

  const onSubmit = (data) => {
    const variables = {
      customer: { ...data },
    }
    customerCreate({ variables })
  }

  return (
    <Container>
      <Typography variant="h1" color="secondary">Crear cliente</Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InnerForm>
          <WrapInput>
            <TextField
              id="names"
              name="names"
              label="Nombre"
              fullWidth
              inputRef={register}
              required
            />
          </WrapInput>
          <WrapInput>
            <TextField
              id="surnames"
              name="surnames"
              label="Apellido"
              fullWidth
              inputRef={register}
              required
            />
          </WrapInput>
          <WrapInput>
            <TextField
              id="nit"
              name="nit"
              label="Nit"
              fullWidth
              inputRef={register}
              required
            />
          </WrapInput>
          <WrapInput>
            <TextField
              id="phone"
              name="phone"
              label="Teléfono"
              fullWidth
              inputRef={register}
            />
          </WrapInput>
          <WrapInput>
            <TextField
              id="address"
              name="address"
              label="Dirección"
              fullWidth
              inputRef={register}
              required
            />
          </WrapInput>
        </InnerForm>
        <Button type="submit" variant="contained" color="secondary">{loading ? 'Creando' : 'Crear'}</Button>
      </Form>
    </Container>
  )
}

export default CreateCustomerView