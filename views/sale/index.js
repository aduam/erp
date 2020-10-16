import { useState, useRef } from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import CurrencyFormat from 'react-currency-format'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery, useMutation } from '@apollo/client'
import { useForm, Controller } from 'react-hook-form'
import { useReactToPrint } from 'react-to-print'

import {
  TextField,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  FormControl,
  InputLabel,
  Input,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Swal from 'sweetalert2'
import { Container, ContainerHeader } from '../../components'
import { GET_ALL_PRODUCTS } from '../../queries/product'
import { SALE_CREATE } from '../../mutations/product'
import { calculateTotal, calculateIva, calculateSubtotal } from '../../lib/utils'

const TAX_RATE = 0.12;

function ccyFormat(num, cant = 1) {
  return `${num.toFixed(2) * cant}`
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  innerCard: {
    display: 'flex',
  },
  table: {
    minWidth: 700,
  },
  paper: {
    position: 'absolute',
    width: '100%',
    minWidth: '400px',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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

const WrapButtonInput = styled.div`
  display: flex;
  button {
    margin-left: 5px;
  }
`

const WrapButtonAddProduct = styled.div`
  width: 100%;
  margin: 20px 0;
`

const SaleView = ({ me }) => {
  const classes = useStyles()
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const { register, control, handleSubmit } = useForm()
  const [bill, setBill] = useState({
    totals: {
      subtotal: 0,
      iva: 0,
      total: 0,
    },
    data: [],
  })
  const [tempBill, setTempBill] = useState(null)
  const [modal, setModal] = useState(false)
  const { loading, data } = useQuery(GET_ALL_PRODUCTS, {
    variables: {
      id_organization: me.id_organization,
      id_market: me.id_market,
    }
  })
  const [saleCreate, { loading: loadingSale }] = useMutation(SALE_CREATE, {
    onCompleted: () => {
      handlePrint()
      Swal.fire('La compra se realizó con éxito!', '', 'success')
      setBill({
        ...bill,
        totals: {
          subtotal: 0,
          iva: 0,
          total: 0,
        },
        data: [],
      })
    },
    onError: (err) => {
      Swal.fire('Hubo un error al realizar la compra!', '', 'error')
    },
  })

  const handleOpen = () => setModal(true)
  const handleClose = () => {
    setModal(false)
    setTempBill('')
  }

  const handleChange = (_, value) => {
    setTempBill({ ...value, cant: 1, price: value.price || 1 })
  }

  const onSubmit = (e) => {
    if (e.price) {
      const data = [...bill.data, { ...tempBill, cant: Number(e.amount), price: Number(e.price) }]
      const total = calculateTotal(data)
      const iva = calculateIva(total, TAX_RATE)
      const subtotal = calculateSubtotal(total, iva)
      setBill({
        ...bill, data, totals: {
          subtotal,
          iva,
          total,
        }
      })
      setTempBill(null)
      handleClose()
    }
  }

  const handleSale = () => {
    const variables = {
      id_market: me.id_market,
      id_status: 1,
      products: bill.data.map(e => ({
        amount: e.cant,
        price: e.price,
        id_product: e.id,
      }))
    }
    saleCreate({ variables })
  }

  return (
    <Container>
      <ContainerHeader>
        <Typography variant="h1" color="secondary">Venta</Typography>
        <Button onClick={() => Router.push('/venta/historial')} variant="text" color="secondary">
          Ver historial de ventas
        </Button>
        <WrapButtonInput>
          <Button onClick={handleSale} variant="contained" color="secondary" disabled={bill.data.length < 1 || loadingSale}>
            {loadingSale ? 'Vendiendo' : 'Vender'}
          </Button>
        </WrapButtonInput>
      </ContainerHeader>
      <WrapButtonAddProduct>
        <Button fullWidth variant="outlined" color="secondary" onClick={handleOpen} disabled={!data}>
          {loading ? 'Cargando productos' : 'Agregar producto'}
        </Button>
      </WrapButtonAddProduct>
      <TableContainer component={Paper} ref={componentRef}>
        <Table className={classes.table} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>Descripción producto</TableCell>
              <TableCell align="right">Precio</TableCell>
              <TableCell align="right">Unidad</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bill.data.map((row, index) => (
              <TableRow key={`${row.id}-${index}`}>
                <TableCell>{row.title}</TableCell>
                <TableCell align="right">
                  <CurrencyFormat value={row.price} displayType={'text'} thousandSeparator={true} prefix={'Q'} />
                </TableCell>
                <TableCell align="right">{row.cant}</TableCell>
                <TableCell align="right">
                  <CurrencyFormat value={ccyFormat(row.price, row.cant)} displayType={'text'} thousandSeparator={true} prefix={'Q'} />
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right"><CurrencyFormat value={bill.data && bill.data.length > 0 ? ccyFormat(bill.totals.subtotal) : 0} displayType={'text'} thousandSeparator={true} prefix={'Q'} /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>IVA</TableCell>
              <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
              <TableCell align="right"><CurrencyFormat value={bill.data && bill.data.length > 0 ? ccyFormat(bill.totals.iva) : 0} displayType={'text'} thousandSeparator={true} prefix={'Q'} /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right"><CurrencyFormat value={bill.data && bill.data.length > 0 ? ccyFormat(bill.totals.total) : 0} displayType={'text'} thousandSeparator={true} prefix={'Q'} /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
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
                <Controller
                  as={TextField}
                  id="cant"
                  name="amount"
                  label="cantidad"
                  type="number"
                  fullWidth
                  required
                  defaultValue={tempBill.cant}
                  control={control}
                />
                <FormControl fullWidth>
                  <InputLabel htmlFor="price">*Precio por unidad</InputLabel>
                  <Controller
                    as={Input}
                    id="price"
                    name="price"
                    type="number"
                    defaultValue={tempBill.price}
                    onChange={(e) => {
                      const price = Number(e.target.value)
                      setTempBill({ ...tempBill, price })
                    }}
                    control={control}
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
      </Modal>
    </Container>
  )
}

export default SaleView