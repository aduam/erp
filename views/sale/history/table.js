import { makeStyles } from '@material-ui/core/styles'
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
import { DeleteForever, Visibility } from '@material-ui/icons'
import { WrapButtonActions } from '../../../components'

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

const TableProvider = ({ sales, handleOpen, id_market }) => {
  const classes = useStyles();

  return (
    <>
      {sales.length > 0 ? (
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
                {sales.map((shop) => (
                  <TableRow hover key={shop.id}>
                    <TableCell>
                      {`${id_market}-${shop.id}`}
                    </TableCell>
                    <TableCell>Aquí va la descripción</TableCell>
                    <TableCell>
                      <Typography color={shop.status.title.toLowerCase() === 'anulado' ? 'error': ''}>
                        {shop.status.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <WrapButtonActions>
                        <Tooltip title="Anular Factura">
                          <Button onClick={() => handleOpen(shop)}
                          disabled={shop.status.title.toLowerCase() === 'anulado'}
                          >
                            <DeleteForever color={shop.status.title.toLowerCase() === 'anulado' ? '': 'error'} />
                          </Button>
                        </Tooltip>
                        <Tooltip title="Ver el detalle">
                          <Button onClick={() => Router.push('/venta/detalle/[id]', `/venta/detalle/${shop.id}`)}>
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
      ) : (
          <Typography className={classes.nothing} variant="h3">No hay productos</Typography>
        )}
    </>
  )
}

export default TableProvider