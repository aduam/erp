import { useState } from 'react'
import Router from 'next/router'
import { Typography, Button, TextField, FormControl, InputLabel, Input } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import Swal from 'sweetalert2'
import { Container, Form, InnerForm, WrapInput } from '../../components'
import { CREATE_PRODUCT } from '../../mutations/product'

const ProviderBuyView = ({ me, type_products, id_provider }) => {
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
        Router.push('/proveedor')
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

  const defaultProps = {
    options: type_products,
    getOptionLabel: (option) => option.title,
  };

  const onSubmit = (data) => {
    const variables = {
      product: {
        ...data,
        base_price: parseFloat(data.base_price),
        price: data.price ? parseFloat(data.price) : null,
        stock: parseInt(data.stock, 10),
        min_stock: parseInt(data.min_stock),
        gain: data.gain ? parseFloat(data.gain) : null,
      },
      id_organization: me.id_organization,
      id_provider,
      id_type_product: getType,
      id_market: me.id_market,
    }
    console.log(variables)
    createProduct({ variables })
  }

  return (
    <Container>
      <Typography variant="h1" color="secondary">Crear producto</Typography>
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
              id="stock"
              name="stock"
              label="Cantidad a ingresar"
              fullWidth
              required
              type="number"
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
            <FormControl fullWidth>
              <InputLabel htmlFor="base_price">Precio compra por unidad sin iva*</InputLabel>
              <Input
                id="base-price"
                name="base_price"
                inputRef={register}
                required
              />
            </FormControl>
          </WrapInput>
          <WrapInput>
            <FormControl fullWidth>
              <InputLabel htmlFor="price">Precio ideal por unidad de venta</InputLabel>
              <Input
                id="price"
                name="price"
                inputRef={register}
              />
            </FormControl>
          </WrapInput>
          <WrapInput>
            <FormControl fullWidth>
              <InputLabel htmlFor="gain">Ganancía</InputLabel>
              <Input
                id="gain"
                name="gain"
                inputRef={register}
              />
            </FormControl>
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