import Router from 'next/router'
import { Typography, Button, TextField } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import Swal from 'sweetalert2'
import { Container, Form, InnerForm, WrapInput, LoaderPage, ErrorPage, Loading } from '../../components'
import { CUSTOMER_UPDATE } from '../../mutations/customer'

const EditarProviderView = ({ me, isLoading, isError, customer, id_customer }) => {
  if (isLoading) {
    return <LoaderPage><Loading /></LoaderPage>
  }

  if (isError) {
    return <ErrorPage>Hubo un error</ErrorPage>
  }

  const { control, handleSubmit } = useForm()

  const [customerUpdate, { loading }] = useMutation(CUSTOMER_UPDATE, {
    onCompleted: () => {
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Se ha actualizado el cliente! redireccionando...',
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(() => {
        Router.push('/cliente')
      }, 2000)
    },
    onError: () => {
      Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: 'Hubo un error al actualizar el cliente!',
        showConfirmButton: false,
        timer: 2000
      })
    },
  })

  const onSubmit = (data) => {
    const variables = {
      customer: { ...data },
      id_customer: id_customer,
    }
    customerUpdate({ variables })
  }

  return (
    <Container>
      <Typography variant="h1" color="secondary">Actualizar cliente</Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InnerForm>
          <WrapInput>
            <Controller
              id="names"
              name="names"
              label="Nombre"
              fullWidth
              control={control}
              as={TextField}
              defaultValue={customer.names}
              required
            />
          </WrapInput>
          <WrapInput>
            <Controller
              as={TextField}
              id="surnames"
              name="surnames"
              label="Apellido"
              defaultValue={customer.surnames}
              control={control}
              fullWidth
              required
            />
          </WrapInput>
          <WrapInput>
            <Controller
              as={TextField}
              control={control}
              id="nit"
              defaultValue={customer.nit}
              name="nit"
              label="Nit"
              fullWidth
              required
            />
          </WrapInput>
          <WrapInput>
            <Controller
              as={TextField}
              control={control}
              id="phone"
              defaultValue={customer.phone}
              name="phone"
              label="Teléfono"
              fullWidth
              required
            />
          </WrapInput>
          <WrapInput>
            <Controller
              as={TextField}
              control={control}
              id="address"
              defaultValue={customer.address}
              name="address"
              label="Dirección"
              fullWidth
              required
            />
          </WrapInput>
        </InnerForm>
        <Button type="submit" variant="contained" color="secondary">{loading ? 'Editando' : 'Editar'}</Button>
      </Form>
    </Container>
  )
}

export default EditarProviderView