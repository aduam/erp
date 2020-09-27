import { Typography, Button, TextField } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { Container, Form, InnerForm, WrapInput } from '../../components'

const CreateProviderView = () => {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <Container>
      <Typography variant="h1" color="secondary">Comprar</Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InnerForm>
          <WrapInput>
            <TextField
              id="title"
              name="title"
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
        <Button type="submit" variant="contained" color="secondary">Comprar</Button>
      </Form>
    </Container>
  )
}

export default CreateProviderView