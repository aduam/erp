import { Typography, Button, TextField } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { Container, Form, InnerForm, WrapInput } from '../../components'

const BuyNow = () => {
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
              label="Ingresar nombre"
              fullWidth
              inputRef={register}
              required
            />
          </WrapInput>
        </InnerForm>
        <Button type="submit" variant="contained" color="secondary">Comprar</Button>
      </Form>
    </Container>
  )
}

export default BuyNow