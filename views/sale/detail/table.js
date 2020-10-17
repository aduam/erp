import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import CurrencyFormat from 'react-currency-format'
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

const Wrapp = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
`

const WrappInput = styled.div`
  margin-bottom: 10px;
`

const headCells = [
  { id: 'recipe', numeric: false, disablePadding: true, label: 'Factura' },
  { id: 'product', numeric: true, disablePadding: false, label: 'Producto' },
  { id: 'status', numeric: true, disablePadding: false, label: 'Estado' },
  { id: 'amount', numeric: true, disablePadding: false, label: 'Unidades' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Precio base' },
];

const TableProvider = ({ sale, id_organization, id_market }) => {
  const classes = useStyles()
  const total = sale && sale.products && sale.products.reduce((acc, cur) => acc + Number(cur.price), 0)
  return (
    <>
      {sale && sale.products && sale.products.length > 0 ? (
        <Paper className={classes.paper}>
          <TableContainer>
            {sale && sale.customer && sale.customer.id && (
              <Wrapp>
                <WrappInput>
                  <Typography variant="body1">{`NIT: ${sale.customer.nit}`}</Typography>
                </WrappInput>
                <WrappInput>
                  <Typography variant="body1">{`Nombre: ${sale.customer.names} ${sale.customer.surnames}`}</Typography>
                </WrappInput>
                <WrappInput>
                  <Typography variant="body1">{`Dirección: ${sale.customer.address}`}</Typography>
                </WrappInput>
              </Wrapp>
            )}
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
                {sale.products.map((product) => (
                  <TableRow hover key={product.id}>
                    <TableCell>
                      {id_market}-{sale.id}
                    </TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{sale.status.title}</TableCell>
                    <TableCell>{product.amount}</TableCell>
                    <TableCell>
                      <CurrencyFormat value={product && product.price ? Number(product.price).toFixed(2) : 0.00} displayType={'text'} thousandSeparator={true} prefix={'Q'} />
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow hover>
                  <TableCell rowSpan={1} />
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell>
                    <CurrencyFormat value={total.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'Q'} />
                  </TableCell>
                  {/* <TableCell align="right">{bill.data && bill.data.length > 0 ? ccyFormat(bill.totals.subtotal) : 0}</TableCell> */}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
          <Typography className={classes.nothing} variant="h3">No hay productos</Typography>
        )}
    </>
  )
}

export default TableProvider