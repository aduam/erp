import { useState } from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { Typography, Button, Modal, TextField } from '@material-ui/core'
import Swal from 'sweetalert2'
import { makeStyles } from '@material-ui/core/styles';
import { Container, ContainerHeader, LoaderPage, ErrorPage, Loading } from '../../../components'
import TableProducts from './table'
import { UPDATE_ADD_PRODUCT } from '../../../mutations/product'
import { graphError } from '../../../lib/graphError'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '100%',
    minWidth: '400px',
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const InnerModal = styled.div`
  background-color: white;
  display: flex;
  width: 100%;
  max-width: 400px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  outline: none;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
  width: 100%;

  button {
    margin-top: 25px;
  }
`

const ProductsProviderView = ({ me, isLoading, isError, products, provider }) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm()
  const [modal, setModal] = useState({
    open: false,
    data: null,
  });

  const handleOpen = (data) => setModal({ ...modal, open: true, data })
  const handleClose = () => setModal({ ...modal, open: false, data: null })

  const [updateStock, { loading }] = useMutation(UPDATE_ADD_PRODUCT, {
    onCompleted: () => {
      handleClose()
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Se ha actualizado el stock del producto!',
        showConfirmButton: false,
        timer: 2000
      })
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
    return (
      <LoaderPage>
        <Loading />
      </LoaderPage>
    )
  }

  if (isError) {
    return (
      <ErrorPage>
        <Typography variant="h2" color="error">Hubo un error!</Typography>
      </ErrorPage>
    )
  }

  const onSubmit = ({ amount }) => {
    const variables = {
      amount: parseInt(amount, 10),
      id_product: modal.data.id,
      id_provider: provider.id,
      id_organization: me.id_organization,
      id_market: me.id_market
    }

    updateStock({ variables })
  }

  return (
    <Container>
      <ContainerHeader>
        <Typography variant="h1" color="secondary">{`Productos de ${provider.name}`}</Typography>
        <Button onClick={() => Router.push('/proveedor/comprar/[id]', `/proveedor/comprar/${provider.id}`)} variant="contained" color="secondary">
          <Typography variant="button">Agregar producto</Typography>
        </Button>
      </ContainerHeader>
      <TableProducts products={products} id_organization={me.id_organization} modal={handleOpen} />
      <Modal
        open={modal.open}
        onClose={handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <InnerModal>
          <Typography variant="h4" color="secondary">{`Agregar a la bodega de ${modal.data && modal.data.title ? modal.data.title : ''}`}</Typography>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              type="number"
              label="Cantidad"
              id="amount"
              name="amount"
              inputRef={register}
              fullWidth
              required
            />
            <Button variant="contained" color="secondary" type="submit" fullWidth>
              <Typography variant="button">
                {loading ? 'Agregando' : 'Agregar'}
              </Typography>
            </Button>
          </Form>
        </InnerModal>
      </Modal>
    </Container>
  )
}

export default ProductsProviderView