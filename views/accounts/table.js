import { makeStyles } from '@material-ui/core/styles'
import { useMutation } from '@apollo/client'
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
  Tooltip,
  Button,
} from '@material-ui/core'
import { Edit, Visibility } from '@material-ui/icons'
import Swal from 'sweetalert2'
import CurrencyFormat from 'react-currency-format'
import { WrapButtonActions } from '../../components'
import { CUSTOMER_REMOVE } from '../../mutations/customer'
import { GET_CUSTOMERS } from '../../queries/customer'
import { graphError } from '../../lib/graphError'

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
}));

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Nombre' },
  { id: 'nit', numeric: true, disablePadding: false, label: 'Nit' },
  { id: 'deb', numeric: true, disablePadding: false, label: 'Deuda' },
  { id: 'address', numeric: true, disablePadding: false, label: 'Cancelado' },
  { id: 'action', numeric: true, disablePadding: false, label: 'Acciones' },
];

const TableProvider = ({ accounts, me, setModal, setModalData }) => {
  const classes = useStyles();

  const [customerRemove] = useMutation(CUSTOMER_REMOVE, {
    refetchQueries: [{ query: GET_CUSTOMERS, variables: { id_organization: me.id_organization }}],
    onCompleted: () => {
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Cliente eliminado!',
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

  return (
    <Paper className={classes.paper}>
      <TableContainer>
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
            {accounts.map((element) => (
              <TableRow hover key={element.id}>
                <TableCell>
                  {`${element.customer.names} ${element.customer.surnames}`}
                </TableCell>
                <TableCell>{element.customer.nit}</TableCell>
                <TableCell>
                  <CurrencyFormat value={element?.amount ? Number(element.amount).toFixed(2) : 0.00} displayType={'text'} thousandSeparator={true} prefix={'Q'} />
                </TableCell>
                <TableCell>
                  <CurrencyFormat value={element?.debit ? Number(element.debit).toFixed(2) : 0.00} displayType={'text'} thousandSeparator={true} prefix={'Q'} />
                </TableCell>
                <TableCell>
                  <WrapButtonActions>
                    <Tooltip title="Ver cuenta">
                      <Button onClick={() => Router.push('/cuentas/ver/[id]', `/cuentas/ver/${element.id}`)}>
                        <Edit />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Hacer pago">
                      <Button onClick={() => {
                        setModal(true)
                        setModalData(element)
                      }}>
                        <Visibility />
                      </Button>
                    </Tooltip>
                  </WrapButtonActions>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default TableProvider