import { useState } from 'react'
import Router from 'next/router'
import { Typography, Button, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useForm, Controller } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import Swal from 'sweetalert2'
import { Container, Form, InnerForm, WrapInput, ErrorPage, LoaderPage, Loading } from '../../../components'
import { UPDATE_PRODUCT } from '../../../mutations/product'

const ProductEditView = ({ me, type_products, product, isLoading, isError, isLoadingType, isErrorType }) => {
  if (isLoading || isLoadingType) {
    return <LoaderPage><Loading /></LoaderPage>
  }

  if (isError || isErrorType) {
    return <LoaderPage>Error cargando la página...</LoaderPage>
  }
  const { control, handleSubmit } = useForm()
  const [getType, setType] = useState(product.type_product.id)

  const [updateProduct, { loading }] = useMutation(UPDATE_PRODUCT, {
    onCompleted: () => {
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Se ha actualizado la compra! redireccionando...',
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(() => {
        Router.push('/producto')
      }, 2000)
    },
    onError: (err) => {
      console.log(err)
      Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: 'Hubo un error al realizar actualizar el producto!',
        showConfirmButton: false,
        timer: 2000
      })
    },
  })

  const defaultProps = {
    options: type_products,
    getOptionLabel: (option) => option.title,
  };

  const onSubmit = (data) => {
    const variables = {
      product: {
        ...data,
        min_stock: parseInt(data.min_stock),
      },
      id_organization: me.id_organization,
      id_type_product: getType,
      id_market: me.id_market,
      id_product: product.id,
    }
    updateProduct({ variables })
  }

  return (
    <Container>
      <Typography variant="h1" color="secondary">{`Editar producto`}</Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InnerForm>
          <WrapInput>
            <Controller
              as={TextField}
              id="title"
              name="title"
              defaultValue={product.title}
              label="Title"
              fullWidth
              control={control}
              required
            />
          </WrapInput>
          <WrapInput>
            <Controller
              as={TextField}
              id="description"
              name="description"
              label="Descripción"
              defaultValue={product.description}
              fullWidth
              control={control}
            />
          </WrapInput>
          <WrapInput>
            <Controller
              as={TextField}
              control={control}
              id="min_stock"
              name="min_stock"
              label="Mínimo en bodega"
              fullWidth
              defaultValue={product.min_stock}
              required
              type="number"
            />
          </WrapInput>
          <WrapInput>
            <Controller
              as={TextField}
              id="code"
              name="code"
              label="Código"
              control={control}
              defaultValue={product.code}
              fullWidth
            />
          </WrapInput>
          <WrapInput>
            <Autocomplete
              {...defaultProps}
              id="id_provider"
              defaultValue={{ ...product.type_product }}
              renderInput={(params) => <TextField {...params} name="id_type_product" label="Typo de producto" margin="normal" required />}
              onChange={(e, value) => value && value.id ? setType(value.id) : setType(null)}
            />
          </WrapInput>
        </InnerForm>
        <Button type="submit" variant="contained" color="secondary">{loading ? 'Editando' : 'Editar'}</Button>
      </Form>
    </Container>
  )
}

export default ProductEditView