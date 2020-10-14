import { useState } from 'react'
import Router from 'next/router'
import { Typography, Button, TextField, FormControl, InputLabel, Input } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import Swal from 'sweetalert2'
import { Container, Form, InnerForm, WrapInput, ErrorPage, LoaderPage } from '../../../components'
import { CREATE_PRODUCT } from '../../../mutations/product'

const ProviderBuyView = ({ me, type_products, isLoading, isError }) => {
  const { register, handleSubmit } = useForm()
  const [getType, setType] = useState(null)

  const [createProduct, { loading }] = useMutation(CREATE_PRODUCT, {
    onCompleted: () => {
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Se ha agregado la compra! redireccionando...',
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
        title: 'Hubo un error al realizar la compra!',
        showConfirmButton: false,
        timer: 2000
      })
    },
  })

  if (isLoading) {
    return <LoaderPage>Cargando...</LoaderPage>
  }

  if (isError) {
    return <LoaderPage>Error cargando la página...</LoaderPage>
  }

  const defaultProps = {
    options: type_products,
    getOptionLabel: (option) => option.title,
  };

  const onSubmit = (data) => {
    const variables = {
      product: {
        ...data,
        stock: 0,
        min_stock: parseInt(data.min_stock),
      },
      id_organization: me.id_organization,
      id_type_product: getType,
      id_market: me.id_market,
    }
    createProduct({ variables })
  }

  return (
    <Container>
      <Typography variant="h1" color="secondary">{`Crear producto`}</Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InnerForm>
          <WrapInput>
            <TextField
              id="title"
              name="title"
              label="Title"
              fullWidth
              inputRef={register}
              required
            />
          </WrapInput>
          <WrapInput>
            <TextField
              inputRef={register}
              id="description"
              name="description"
              label="Descripción"
              fullWidth
            />
          </WrapInput>
          <WrapInput>
            <TextField
              inputRef={register}
              id="min_stock"
              name="min_stock"
              label="Mínimo en bodega"
              fullWidth
              required
              type="number"
            />
          </WrapInput>
          <WrapInput>
            <TextField
              id="code"
              name="code"
              label="Código"
              inputRef={register}
              fullWidth
            />
          </WrapInput>
          <WrapInput>
            <Autocomplete
              {...defaultProps}
              id="id_provider"
              renderInput={(params) => <TextField {...params} name="id_type_product" label="Typo de producto" margin="normal" required />}
              onChange={(e, value) => value && value.id ? setType(value.id) : setType(null)}
            />
          </WrapInput>
        </InnerForm>
        <Button type="submit" variant="contained" color="secondary">{loading ? 'Creando' : 'Crear'}</Button>
      </Form>
    </Container>
  )
}

export default ProviderBuyView