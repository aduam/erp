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
import { DeleteForever, Edit, Visibility } from '@material-ui/icons'
import Swal from 'sweetalert2'
import { WrapButtonActions } from '../../../components'
import { REMOVE_PROVIDER } from '../../../mutations/provider'
import { GET_PROVIDERS } from '../../../queries/provider'
import { graphError } from '../../../lib/graphError'

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
  { id: 'description', numeric: true, disablePadding: false, label: 'Descripción' },
  { id: 'bodega', numeric: true, disablePadding: false, label: 'Disponible' },
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

const TableProvider = ({ products, id_organization, modal }) => {
  const classes = useStyles();

  const [removeProvider] = useMutation(REMOVE_PROVIDER, {
    update: (cache, data) => updateCache(cache, data, id_organization),
    onCompleted: () => {
      Swal.fire('Proveedor eliminado!', '', 'success')
    },
    onError: (err) => {
      const error = graphError(err)
      Swal.fire(error, '', 'error')
    },
  })

  const handleDelete = (e, provider) => {
    e.stopPropagation()
    Swal.fire({
      title: `¿Estás seguro que quieres eliminar el producto "${provider.title}"?`,
      text: '**Esta acción no se puede deshacer**',
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
    }).then((result) => {
      if (result.isConfirmed) {
        removeProvider({ variables: { id: provider.id } })
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
            {products.map((element) => (
              <TableRow hover key={element.id}>
                <TableCell>
                  {element.title}
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
                      <Button onClick={() => modal(element)}>
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