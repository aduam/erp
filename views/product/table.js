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
import { REMOVE_PROVIDER } from '../../mutations/provider'
import { GET_PROVIDERS } from '../../queries/provider'

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

const updateCache = (client, { data: { removeProvider } }, id) => {
  const cache = client.readQuery({
    query: GET_PROVIDERS,
    variables: { id }
  })

  const providers = cache.organization.providers.filter((e) => e.id !== removeProvider.id)

  const data = {
    ...cache,
    organization: {
      ...cache.organization,
      providers,
    },
  }

  client.writeQuery({
    query: GET_PROVIDERS,
    variables: { id },
    data,
  })
}

const TableProvider = ({ products, id_organization }) => {
  const classes = useStyles();

  const [removeProvider] = useMutation(REMOVE_PROVIDER, {
    update: (cache, data) => updateCache(cache, data, id_organization),
    onCompleted: () => {
      Swal.fire('Proveedor eliminado!', '', 'success')
    },
    onError: (err) => {
      Swal.fire('Hubo un error al eliminar el proveedor!', '', 'error')
    },
  })

  const handleDelete = (e, provider) => {
    e.stopPropagation()
    Swal.fire({
      title: `¿Estás seguro que quieres eliminar el proveedor "${provider.name}"?`,
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
    }).then((result) => {
      if (result.isConfirmed) {
        removeProvider({ variables: { id: provider.id } })
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
                      {element.name}
                    </TableCell>
                    <TableCell>{element.description}</TableCell>
                    <TableCell>{element.stock}</TableCell>
                    <TableCell>
                      <WrapButtonActions>
                        <Tooltip title="Eliminar">
                          <Button onClick={(e) => handleDelete(e, element)}>
                            <DeleteForever color="error" />
                          </Button>
                        </Tooltip>
                        <Tooltip title="Editar">
                          <Button onClick={() => Router.push('/proveedor/editar/[id]', `/proveedor/editar/${element.id}`)}>
                            <Edit />
                          </Button>
                        </Tooltip>
                        <Tooltip title="Comprar">
                          <Button onClick={() => Router.push('/proveedor/comprar/[id]', `/proveedor/comprar/${element.id}`)}>
                            <ShoppingCartOutlined />
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
          <>
            <Typography className={classes.nothing} variant="h3">No hay productos</Typography>
            <Button className={classes.goProduct} onClick={() => Router.push('/proveedor')}>
              <Typography variant="button" color="secondary">
                Agregar producto
              </Typography>
            </Button>
          </>
        )}
    </>
  )
}

export default TableProvider