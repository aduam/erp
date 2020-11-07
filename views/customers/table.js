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
import { DeleteForever, Edit, Visibility, RotateLeft, AccountBalanceWallet } from '@material-ui/icons'
import Swal from 'sweetalert2'
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
  { id: 'phone', numeric: true, disablePadding: false, label: 'Teléfono' },
  { id: 'address', numeric: true, disablePadding: false, label: 'Dirección' },
  { id: 'action', numeric: true, disablePadding: false, label: 'Acciones' },
];

const TableProvider = ({ customers, me }) => {
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

  const handleDelete = (e, customer) => {
    e.stopPropagation()
    Swal.fire({
      title: `¿Estás seguro que quieres eliminar el cliente "${customer.names} ${customer.surnames}"?`,
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
    }).then((result) => {
      if (result.isConfirmed) {
        customerRemove({
          variables: {
            id_customer: customer.id,
          }
        })
      }
    })
  }

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
            {customers.map((element) => (
              <TableRow hover key={element.id}>
                <TableCell>
                  {`${element.names} ${element.surnames}`}
                </TableCell>
                <TableCell>{element.nit}</TableCell>
                <TableCell>{element.phone || ''}</TableCell>
                <TableCell>{element.address}</TableCell>
                <TableCell>
                  <WrapButtonActions>
                  <Tooltip title="Crear cuenta">
                      <Button onClick={() => Router.push('/cuentas/crear/[id]', `/cuentas/crear/${element.id}`)}>
                        <AccountBalanceWallet />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <Button onClick={(e) => handleDelete(e, element)}>
                        <DeleteForever color="error" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Editar">
                      <Button onClick={() => Router.push('/cliente/editar/[id]', `/cliente/editar/${element.id}`)}>
                        <Edit />
                      </Button>
                    </Tooltip>
                  </WrapButtonActions>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      /> */}
    </Paper>
  )
}

export default TableProvider