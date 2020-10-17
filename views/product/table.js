import { makeStyles } from '@material-ui/core/styles'
import { useMutation } from '@apollo/client'
import Router from 'next/router'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Paper,
  Tooltip,
  Button,
} from '@material-ui/core'
import { DeleteForever, Edit, ShoppingCartOutlined } from '@material-ui/icons'
import Swal from 'sweetalert2'
import { WrapButtonActions } from '../../components'
import { REMOVE_PRODUCT } from '../../mutations/product'
import { GET_PRODUCTS } from '../../queries/product'

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
}));

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Nombre' },
  { id: 'description', numeric: true, disablePadding: false, label: 'Descripción' },
  { id: 'disponible', numeric: true, disablePadding: false, label: 'En bodega' },
  { id: 'actions', numeric: true, disablePadding: false, label: 'Acciones' },
];

const TableProvider = ({ products, id_organization, id_market, isAdmin }) => {
  const classes = useStyles();

  const [removeProduct] = useMutation(REMOVE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS, variables: { id_organization, id_market } }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      Swal.fire('Producto eliminado!', '', 'success')
    },
    onError: (err) => {
      Swal.fire('Hubo un error al eliminar el producto!', '', 'error')
    },
  })

  const handleDelete = (e, element) => {
    e.stopPropagation()
    Swal.fire({
      title: `¿Estás seguro que quieres eliminar el producto "${element.title}"?`,
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
    }).then((result) => {
      if (result.isConfirmed) {
        removeProduct({ variables: { id: element.id } })
      }
    })
  }

  return (
    <>
      {products.length > 0 ? (
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
                {products.map((element) => (
                  <TableRow hover key={element.id}>
                    <TableCell>
                      {element.title}
                    </TableCell>
                    <TableCell>{element.description}</TableCell>
                    <TableCell>{element.stock}</TableCell>
                    <TableCell>
                      <WrapButtonActions>
                        <Tooltip title="Editar detalles">
                          <Button onClick={() => Router.push('/producto/editar/[id]', `/producto/editar/${element.id}`)} disabled={isAdmin !== 1}>
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
      ) : (
          <Typography className={classes.nothing} variant="h3">No hay productos</Typography>
        )}
    </>
  )
}

export default TableProvider