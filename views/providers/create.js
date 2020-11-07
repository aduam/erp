import Router from 'next/router'
import { Typography, Button, TextField } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import Swal from 'sweetalert2'
import { Container, Form, InnerForm, WrapInput } from '../../components'
import { CREATE_PROVIDER } from '../../mutations/provider'
import { graphError } from '../../lib/graphError'

const CreateProviderView = ({ me }) => {
  const { register, handleSubmit } = useForm()

  const [createProvider, { loading }] = useMutation(CREATE_PROVIDER, {
    onCompleted: () => {
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Se ha creado el proveedor! redireccionando...',
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(() => {
        Router.push('/proveedor')
      }, 2000)
    },
    onError: (err) => {
      const error = graphError(err)
      Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: error,
        showConfirmButton: false,
        timer: 2000
      })
    },
  })

  const onSubmit = (data) => {
    const variables = {
      provider: { ...data },
      id_organization: me.id_organization,
      id_market: me.id_market,
    }
    createProvider({ variables })
  }

  return (
    <Container>
      <Typography variant="h1" color="secondary">Crear proveedor</Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InnerForm>
          <WrapInput>
            <TextField
              id="name"
              name="name"
              label="Nombre"
              fullWidth
              inputRef={register}
              required
            />
          </WrapInput>
          <WrapInput>
            <TextField
              id="description"
              name="description"
              label="Descripción"
              fullWidth
              inputRef={register}
            />
          </WrapInput>
          <WrapInput>
            <TextField
              id="business_name"
              name="business_name"
              label="Nombre del negocio"
              fullWidth
              inputRef={register}
            />
          </WrapInput>
          <WrapInput>
            <TextField
              id="social_reason"
              name="social_reason"
              label="Razón social"
              fullWidth
              inputRef={register}
            />
          </WrapInput>
          <WrapInput>
            <TextField
              id="nit"
              name="nit"
              label="Nit"
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
              id="mobile"
              name="mobile"
              label="Teléfono móvil"
              fullWidth
              inputRef={register}
            />
          </WrapInput>
        </InnerForm>
        <Button type="submit" variant="contained" color="secondary">{loading ? 'Creando' : 'Crear'}</Button>
      </Form>
    </Container>
  )
}

export default CreateProviderView