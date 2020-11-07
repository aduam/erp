import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useForm, Controller } from 'react-hook-form'
import styled from 'styled-components'
import { TextField, Button, Typography, Modal, Fade } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Swal from 'sweetalert2'
import { Close } from '@material-ui/icons'
import { Container, ContainerHeader, LoaderPage, ErrorPage, Loading } from '../../components'
import TableProviders from './table'
import { DO_PAID } from '../../mutations/accounts'
import { GET_ACCOUNTS } from '../../queries/accounts'
import { graphError } from '../../lib/graphError'

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 8px 0 32px;
`

const ModalFooter = styled.div`
  padding: 0 32px 12px 32px;
`

const Divider = styled.div`
  width: 100px;
  height: 2px;
  background-color: black;
  margin: 5px auto 0 auto;
`

const ModalContainer = styled.div`
  padding: 40px 45px;
  width: 100%;
  max-width: 720px;
`

const WrappButton = styled.div`
  display: flex;
  justify-content: flex-end;

  button:first-child {
    margin-right: 8px;
  }
`

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '12px',
    height: '48px',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInner: {
    backgroundColor: '#fff',
    maxWidth: '350px',
    width: '100%',
    '&:focus': {
      outline: 'none',
    }
  },
}))

const AccountsView = ({ isLoading, isError, accounts, me }) => {
  if (isLoading) {
    return <LoaderPage><Loading /></LoaderPage>;
  }
  if (isError) {
    return (
      <ErrorPage>
        <Typography variant="h2" color="error">Hubo un error!</Typography>
      </ErrorPage>
    )
  }
  const classes = useStyles()
  const { control, handleSubmit } = useForm()
  const [modal, setModal] = useState(false)
  const [modalData, setModalData] = useState()
  const [paidAccount, { loading }] = useMutation(DO_PAID, {
    refetchQueries: [{ query: GET_ACCOUNTS }],
    onCompleted: () => {
      setModal(false);
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Pago hecho!',
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
        timer: 4000
      })
    },
  })

  const onSubmit = (data) => {
    const variables = {
      id_account: modalData.id,
      amount: parseFloat(data.paid),
    }
    paidAccount({ variables })
  }

  return (
    <Container>
      <ContainerHeader>
        <Typography variant="h1" color="secondary">Cuentas de clientes</Typography>
      </ContainerHeader>
      <TableProviders accounts={accounts} id_organization={me.id_organization} me={me} setModal={setModal} setModalData={setModalData} />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modal}
        onClose={() => setModal(false)}
        closeAfterTransition
      >
        <Fade in={modal}>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.modalInner}>
            <ModalHeader>
              <div />
              <Button onClick={() => setModal(false)}>
                <Close />
              </Button>
            </ModalHeader>
            <Typography variant="h4" align="center">Realizar el pago a {modalData?.customer?.names} {modalData?.customer?.surnames}</Typography>
            <Divider />
            <ModalContainer>
              <Controller
                as={TextField}
                id="paid"
                name="paid"
                label="Valor"
                type="number"
                fullWidth
                defaultValue={modalData?.projectionFees?.find((e) => e.paid !== e.amount).amount - modalData?.projectionFees?.find((e) => e.paid !== e.amount).paid}
                control={control}
                required
              />
            </ModalContainer>
            <ModalFooter>
              <WrappButton>
                <Button onClick={() => setModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="secondary" disableElevation>
                  <Typography variant="button">{loading ? 'Procesando' : 'Hacer Pago'}</Typography>
                </Button>
              </WrappButton>
            </ModalFooter>
          </form>
        </Fade>
      </Modal>
    </Container>
  );
};

export default AccountsView;