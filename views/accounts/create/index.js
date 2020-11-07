import { useForm } from 'react-hook-form'
import Router from 'next/router'
import { Typography, Button, TextField } from '@material-ui/core'
import { useMutation } from '@apollo/client'
import Swal from 'sweetalert2'
import { Container, Form, InnerForm, WrapInput, LoaderPage, ErrorPage, Loading } from '../../../components'
import { ACCOUNT_CREATE } from '../../../mutations/accounts'
import { graphError } from '../../../lib/graphError'

const CreateAccountView = ({ isLoading, isError, me, id_customer, customer }) => {
  if (isLoading) {
    return <LoaderPage><Loading /></LoaderPage>
  }

  if (isError) {
    return <ErrorPage>Hubo un error</ErrorPage>
  }
  const { register, handleSubmit } = useForm()

  const [accountCreate, { loading }] = useMutation(ACCOUNT_CREATE, {
    onCompleted: () => {
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Crédito creado, redirigiendo a cuentas!',
        showConfirmButton: false,
        timer: 3000
      })
      setTimeout(() => {
        Router.push('/cuentas')
      }, 3000)
    },
    onError: (err) => {
      const error = graphError(err);
      console.log(err);
      Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: error,
        showConfirmButton: false,
        timer: 4000
      })
    },
  })

  const onSubmit = (data) => {
    const variables = {
      account_info: { term: Number(data.term), interest: 25, amount: parseFloat(data.amount) },
      id_customer: id_customer,
    }
    accountCreate({ variables })
  }

  return (
    <Container>
      <Typography variant="h1" color="secondary">Crear un crédito al cliente</Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InnerForm>
          <WrapInput>
            <TextField
              id="full_name"
              name="full_name"
              label="Nombre"
              defaultValue={`${customer.names} ${customer.surnames}`}
              fullWidth
              disabled
            />
          </WrapInput>
          <WrapInput>
            <TextField
              id="nit"
              name="nit"
              label="Nit"
              defaultValue={`${customer.nit}`}
              fullWidth
              disabled
            />
          </WrapInput>
          <WrapInput>
            <TextField
              id="phone"
              name="phone"
              label="Phone"
              defaultValue={`${customer.phone}`}
              fullWidth
              disabled
            />
          </WrapInput>
          <WrapInput>
            <TextField
              id="interest"
              name="interest"
              label="Interest"
              defaultValue="25%"
              fullWidth
              disabled
            />
          </WrapInput>
          <WrapInput>
            <TextField
              id="term"
              name="term"
              label="Plazo"
              fullWidth
              type="number"
              inputRef={register}
              required
            />
          </WrapInput>
          <WrapInput>
            <TextField
              id="amount"
              name="amount"
              label="Valor del crédito"
              inputRef={register}
              fullWidth
              required
            />
          </WrapInput>
        </InnerForm>
        <Button type="submit" variant="contained" color="secondary">{false ? 'Creando' : 'Crear'}</Button>
      </Form>
    </Container>
  )
}

export default CreateAccountView