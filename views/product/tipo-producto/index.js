import Router from 'next/router'
import { Typography, Button, TextField } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import Swal from 'sweetalert2'
import { Container, Form, InnerForm, WrapInput } from '../../../components'
import { CREATE_TYPE_PRODUCT } from '../../../mutations/product'

const CreateTypeProviderView = ({ me }) => {
  const { register, handleSubmit } = useForm()

  const [createTypeProduct, { loading }] = useMutation(CREATE_TYPE_PRODUCT, {
    onCompleted: () => {
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Se ha creado el tipo de producto! redireccionando...',
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(() => {
        Router.push('/producto')
      }, 2000)
    },
    onError: () => {
      Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: 'Hubo un error al crear el tipo de producto!',
        showConfirmButton: false,
        timer: 2000
      })
    },
  })

  const onSubmit = (data) => {
    const variables = {
      ...data,
      id_organization: me.id_organization
    }
    createTypeProduct({ variables })
  }

  return (
    <Container>
      <Typography variant="h1" color="secondary">Crear tipo de producto</Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InnerForm>
          <WrapInput>
            <TextField
              id="title"
              name="title"
              label="Título"
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
        </InnerForm>
        <Button type="submit" variant="contained" color="secondary">{loading ? 'Creando' : 'Crear'}</Button>
      </Form>
    </Container>
  )
}

export default CreateTypeProviderView