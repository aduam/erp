import Router from 'next/router'
import { Typography, Button, TextField } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import Swal from 'sweetalert2'
import { Container, Form, InnerForm, WrapInput, LoaderPage, ErrorPage, Loading } from '../../components'
import { EDIT_PROVIDER } from '../../mutations/provider'
import { graphError } from '../../lib/graphError'

const EditarProviderView = ({ me, isLoading, isError, provider, id_provider }) => {
  const { control, handleSubmit } = useForm()

  const [editProvider, { loading }] = useMutation(EDIT_PROVIDER, {
    onCompleted: () => {
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Se ha actualizado el proveedor! redireccionando...',
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

  if (isLoading) {
    return <LoaderPage><Loading /></LoaderPage>
  }

  if (isError) {
    return <ErrorPage>Hubo un error</ErrorPage>
  }

  const onSubmit = (data) => {
    const variables = {
      provider: { ...data },
      id_organization: me.id_organization,
      id_provider,
    }
    editProvider({ variables })
  }

  return (
    <Container>
      <Typography variant="h1" color="secondary">Actualizar proveedor</Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InnerForm>
          <WrapInput>
            <Controller
              id="name"
              name="name"
              label="Nombre"
              fullWidth
              control={control}
              as={TextField}
              defaultValue={provider.name}
              required
            />
          </WrapInput>
          <WrapInput>
            <Controller
              as={TextField}
              id="description"
              name="description"
              label="Descripción"
              defaultValue={provider.description}
              control={control}
              fullWidth
            />
          </WrapInput>
          <WrapInput>
            <Controller
              as={TextField}
              control={control}
              id="business_name"
              defaultValue={provider.business_name}
              name="business_name"
              label="Nombre del negocio"
              fullWidth
            />
          </WrapInput>
          <WrapInput>
          <Controller
            as={TextField}
            control={control}
            id="social_reason"
            defaultValue={provider.social_reason}
            name="social_reason"
            label="Razón social"
            fullWidth
          />
          </WrapInput>
          <WrapInput>
          <Controller
            as={TextField}
            control={control}
            id="nit"
            name="nit"
            label="Nit"
            defaultValue={provider.nit}
            fullWidth
          />
          </WrapInput>
          <WrapInput>
          <Controller
            as={TextField}
            control={control}
            id="address"
            name="address"
            defaultValue={provider.address}
            label="Dirección"
            fullWidth
          />
          </WrapInput>
          <WrapInput>
          <Controller
            as={TextField}
            control={control}
            defaultValue={provider.phone}
            id="phone"
            name="phone"
            label="Teléfono"
            fullWidth
          />
          </WrapInput>
          <WrapInput>
          <Controller
            as={TextField}
            control={control}
            defaultValue={provider.mobile}
            id="mobile"
            name="mobile"
            label="Teléfono móvil"
            fullWidth
          />
          </WrapInput>
        </InnerForm>
        <Button type="submit" variant="contained" color="secondary">{loading ? 'Editando' : 'Editar'}</Button>
      </Form>
    </Container>
  )
}

export default EditarProviderView