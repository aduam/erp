import { makeStyles } from '@material-ui/core/styles'
import CurrencyFormat from 'react-currency-format'
import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import Router from 'next/router'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 450,
  },
  nothing: {
    marginTop: '70px',
    textAlign: 'center'
  },
  goProduct: {
    width: '200px',
    margin: '0 auto',
  },
  download: {
    width: '200px',
    marginTop: '25px',
  },
}));

const headCells = [
  { id: 'recipe', numeric: false, disablePadding: true, label: 'Factura' },
  { id: 'product', numeric: true, disablePadding: false, label: 'Producto' },
  { id: 'status', numeric: true, disablePadding: false, label: 'Estado' },
  { id: 'amount', numeric: true, disablePadding: false, label: 'Unidades' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Precio base' },
];

const TableProvider = ({ shopping, id_organization, id_market }) => {
  const classes = useStyles()
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  const total = shopping && shopping.products && shopping.products.reduce((acc, cur) => acc + Number(cur.price), 0)
  return (
    <>
      {shopping && shopping.products && shopping.products.length > 0 ? (
        <>
          <Button className={classes.download} onClick={handlePrint} variant="contained" color="secondary">
            Imprimir
          </Button>
          <Paper className={classes.paper}>
            <TableContainer ref={componentRef}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    {headCells.map((headCell) => (
                      <TableCell
                        key={headCell.id}
                      >
                        {headCell.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {shopping.products.map((product) => (
                    <TableRow hover key={product.id}>
                      <TableCell>
                        {shopping.recipe}
                      </TableCell>
                      <TableCell>{product.title}</TableCell>
                      <TableCell>{shopping.status.title}</TableCell>
                      <TableCell>{product.amount}</TableCell>
                      <TableCell>
                        <CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'Q'} />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow hover>
                    <TableCell rowSpan={1} />
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell>
                      <CurrencyFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'Q'} />
                    </TableCell>
                    {/* <TableCell align="right">{bill.data && bill.data.length > 0 ? ccyFormat(bill.totals.subtotal) : 0}</TableCell> */}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      ) : (
          <Typography className={classes.nothing} variant="h3">No hay productos</Typography>
        )}
    </>
  )
}

export default TableProvider