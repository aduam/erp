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
import { WrapButtonActions } from '../../components'
import { REMOVE_COLLABORATOR } from '../../mutations/collaborator'
import { GET_COLLABORATORS } from '../../queries/collaborator'

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
  { id: 'role', numeric: true, disablePadding: false, label: 'Rol' },
  { id: 'actions', numeric: true, disablePadding: false, label: 'Acciones' },
];

const updateCache = (client, { data: { removeCollaborator } }, id) => {
  const cache = client.readQuery({
    query: GET_COLLABORATORS,
    variables: { id }
  })

  const collaborators = cache.organization.market.collaborators.filter((e) => e.id !== removeCollaborator.id)

  const data = {
    ...cache,
    organization: {
      ...cache.organization,
      market: {
        ...cache.organization.market,
        collaborators,
      }
    },
  }

  client.writeQuery({
    query: GET_COLLABORATORS,
    variables: { id },
    data,
  })
}

const TableProvider = ({ collaborators, id_organization, me }) => {
  const classes = useStyles();

  const [removeCollaborator] = useMutation(REMOVE_COLLABORATOR, {
    //update: (cache, data) => updateCache(cache, data, id_organization),
    refetchQueries: [{ query: GET_COLLABORATORS, variables: { id_organization: me.id_organization, id_market: me.id_market }}],
    onCompleted: () => {
      Swal.fire('Colaborador eliminado!', '', 'success')
    },
    onError: (err) => {
      Swal.fire('Hubo un error al eliminar el colaborador!', '', 'error')
    },
  })

  const handleDelete = (e, collaborator) => {
    console.log(collaborator)
    e.stopPropagation()
    Swal.fire({
      title: `¿Estás seguro que quieres eliminar el colaborador "${collaborator.names} ${collaborator.surnames}"?`,
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
    }).then((result) => {
      if (result.isConfirmed) {
        removeCollaborator({
          variables: {
            id_collaborator: collaborator.id,
            id_market: me.id_market,
            id_organization: me.id_organization,
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
            {collaborators.map((element) => (
              <TableRow hover key={element.id}>
                <TableCell>
                  {`${element.names} ${element.surnames}`}
                </TableCell>
                <TableCell>{element.role.title}</TableCell>
                <TableCell>
                  <WrapButtonActions>
                    <Tooltip title="Eliminar">
                      <Button onClick={(e) => handleDelete(e, element)}>
                        <DeleteForever color="error" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Editar">
                      <Button onClick={() => Router.push('/colaborador/editar/[id]', `/colaborador/editar/${element.id}`)}>
                        <Edit />
                      </Button>
                    </Tooltip>
                    {/* <Tooltip title="Ver productos">
                      <Button onClick={() => Router.push('/proveedor/producto/[id]', `/proveedor/producto/${element.id}`)}>
                        <Visibility />
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
  )
}

export default TableProvider