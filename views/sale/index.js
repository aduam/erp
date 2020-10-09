import { useState } from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client'
import { useForm } from 'react-hook-form'
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
  CircularProgress,
  FormControl,
  InputLabel,
  Input,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Container, ContainerHeader, LoaderPage, ErrorPage } from '../../components'
import { GET_ALL_PRODUCTS } from '../../queries/product'
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

const SaleView = ({ me }) => {
  const classes = useStyles()
  const { register, handleSubmit } = useForm()
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

  const handleOpen = () => setModal(true)
  const handleClose = () => {
    setModal(false)
    setTempBill(null)
  }

  const handleChange = (_, value) => {
    setTempBill({ ...value, cant: 1 })
  }

  const onSubmit = (e) => {
    const data = [...bill.data, tempBill]
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

  return (
    <Container>
      <ContainerHeader>
        <Typography variant="h1" color="secondary">Venta</Typography>
      </ContainerHeader>
      <TableContainer component={Paper}>
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
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.cant}</TableCell>
                <TableCell align="right">{ccyFormat(row.price, row.cant)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4}>
                <Button fullWidth variant="contained" color="secondary" onClick={handleOpen} disabled={!data}>
                  {loading ? 'Cargando productos' : 'Agregar producto'}
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{bill.data && bill.data.length > 0 ? ccyFormat(bill.totals.subtotal) : 0}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>IVA</TableCell>
              <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
              <TableCell align="right">{bill.data && bill.data.length > 0 ? ccyFormat(bill.totals.iva) : 0}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{bill.data && bill.data.length > 0 ? ccyFormat(bill.totals.total) : 0}</TableCell>
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
              options={data && data.products ? data.products : []}
              onChange={handleChange}
              getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                  return option;
                }
                // Add "xxx" option created dynamically
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
                />
              )}
            />
            {tempBill && (
              <>
                <TextField
                  id="cant"
                  name="cant"
                  value={tempBill.cant}
                  onChange={(e) => setTempBill({ ...tempBill, cant: Number(e.target.value) })}
                  fullWidth
                  required
                  type="number"
                />
                <FormControl fullWidth>
                  <InputLabel htmlFor="price">Precio x unidad</InputLabel>
                  <Input
                    id="price"
                    name="price"
                    value={tempBill.price}
                    type="number"
                    step="any"
                    onChange={(e) => {
                      setTempBill({ ...tempBill, price: Number(e.target.value) })
                    }
                    }
                  />
                </FormControl>
              </>
            )}
            <Button variant="contained" color="secondary" type="submit" fullWidth>
              <Typography variant="button">
                Agregar
              </Typography>
            </Button>
          </Form>
        </InnerModal>
      </Modal>
    </Container>
  )
}

export default SaleView