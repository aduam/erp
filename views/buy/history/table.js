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
import { WrapButtonActions } from '../../../components'
import { REMOVE_PRODUCT } from '../../../mutations/product'
import { GET_PRODUCTS } from '../../../queries/product'

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
  { id: 'recipe', numeric: false, disablePadding: true, label: 'Factura' },
  { id: 'description', numeric: true, disablePadding: false, label: 'Descripción' },
  { id: 'status', numeric: true, disablePadding: false, label: 'Estado' },
  { id: 'actions', numeric: true, disablePadding: false, label: 'Acciones' },
];

const TableProvider = ({ shoppings, id_organization, id_market }) => {
  const classes = useStyles();

  /* const [removeProduct] = useMutation(REMOVE_PRODUCT, {
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
  } */

  return (
    <>
      {shoppings.length > 0 ? (
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
                {shoppings.map((shop) => (
                  <TableRow hover key={shop.id}>
                    <TableCell>
                      {shop.recipe}
                    </TableCell>
                    <TableCell>Aquí va la descripción</TableCell>
                    <TableCell>{shop.status.title.toString()}</TableCell>
                    <TableCell>
                      <WrapButtonActions>
                        <Tooltip title="Anular Factura">
                          <Button onClick={(e) => console.log('anular')}>
                            <DeleteForever color="error" />
                          </Button>
                        </Tooltip>
                        <Tooltip title="Ver el detalle">
                          <Button onClick={() => Router.push('/compras/detalle/[id]', `/compras/detalle/${shop.id}`)}>
                            <Edit />
                          </Button>
                        </Tooltip>
                        {/* <Tooltip title="Comprar">
                          <Button onClick={() => Router.push('/proveedor/comprar/[id]', `/proveedor/comprar/${element.id}`)}>
                            <ShoppingCartOutlined />
                          </Button>
                        </Tooltip> */}
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