import { useState } from 'react'
import styled from 'styled-components'
import { Typography, Modal, Button } from '@material-ui/core'
import { useMutation } from '@apollo/client'
import Swal from 'sweetalert2'
import { makeStyles } from '@material-ui/core/styles';
import { Container, ContainerHeader, LoaderPage, ErrorPage, Loading } from '../../../components'
import { SHOPPING_CANCEL } from '../../../mutations/product'
import Table from './table'
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
}))

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

  button {
    margin-top: 35px;
  }
`

const ShoppingHistory = ({ me, isError, isLoading, shoppings }) => {
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

  const classes = useStyles();
  const [modal, setModal] = useState({
    open: false,
    data: null,
  });

  const handleOpen = (data) => setModal({ ...modal, open: true, data })
  const handleClose = () => setModal({ ...modal, open: false, data: null })

  const [shopingCancel, { loading }] = useMutation(SHOPPING_CANCEL, {
    onCompleted: () => {
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Se ha anulado la factura!',
        showConfirmButton: false,
        timer: 2000
      })
      handleClose()
    },
    onError: (err) => {
      const error = graphError(err)
      Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: error,
        showConfirmButton: false,
        timer: 4000
      })
    },
  })

  const handleCancelRecipe = () => {
    const variables = { id_shopping: modal.data.id, id_market: me.id_market }
    shopingCancel({ variables })
  }

  return (
    <Container>
      <ContainerHeader>
        <Typography variant="h1" color="secondary">Historial de compras</Typography>
      </ContainerHeader>
      <Table
        shoppings={shoppings}
        handleOpen={handleOpen}
      />
      <Modal
        open={modal.open}
        onClose={handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <InnerModal>
          <Typography variant="h4" >¿Estás seguro que quieres anular la factura <strong style={{ color: 'red' }}>{modal.data && modal.data.recipe ? modal.data.recipe : ''}</strong>?</Typography>
          <Button variant="contained" color="secondary" type="submit" fullWidth onClick={handleCancelRecipe}>
            <Typography variant="button">
              {loading ? 'Anulando' : 'Si, anular'}
            </Typography>
          </Button>
        </InnerModal>
      </Modal>
    </Container>
  )
}

export default ShoppingHistory