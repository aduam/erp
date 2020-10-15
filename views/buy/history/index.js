import styled from 'styled-components'
import {
  TextField,
  Typography,
  Button,
  Paper,
  Modal,
  CircularProgress,
  FormControl,
  InputLabel,
  Input,
} from '@material-ui/core'
import { Container, ContainerHeader, LoaderPage, ErrorPage, Loading } from '../../../components'
import Table from './table'

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

  return (
    <Container>
      <ContainerHeader>
        <Typography variant="h1" color="secondary">Historial de compras</Typography>
      </ContainerHeader>
      <Table
        shoppings={shoppings}
      />
      {/* <Modal
        open={modal}
        onClose={handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <InnerModal>
          <Typography variant="h4" color="secondary">Agregar producto</Typography>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Autocomplete
              id="search-product"
              freeSolo
              disableClearable
              fullWidth
              noOptionsText="No hay opciones"
              options={data && data.products ? data.products : []}
              onChange={handleChange}
              getOptionLabel={(option) => {
                if (typeof option === 'string') {
                  return option;
                }
                if (option.inputValue) {
                  return option.inputValue;
                }
                // Regular option
                return option.title;
              }}
              renderOption={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Buscar producto"
                  margin="normal"
                  InputProps={{ ...params.InputProps, type: 'buscar..' }}
                  inputRef={register}
                  required
                  name="search"
                  required
                />
              )}
            />
            {tempBill && (
              <>
                <TextField
                  id="cant"
                  name="amount"
                  label="cantidad"
                  type="number"
                  fullWidth
                  required
                  inputRef={register}
                  type="number"
                />
                <FormControl fullWidth>
                  <InputLabel htmlFor="price">*Precio por unidad</InputLabel>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={tempBill.price}
                    onChange={(e) => {
                      const price = Number(e.target.value)
                      setTempBill({ ...tempBill, price })
                    }}
                  />
                </FormControl>
                <Button variant="contained" color="secondary" type="submit" fullWidth>
                  <Typography variant="button">
                    Agregar
                  </Typography>
                </Button>
              </>
            )}
          </Form>
        </InnerModal>
      </Modal> */}
    </Container>
  )
}

export default ShoppingHistory