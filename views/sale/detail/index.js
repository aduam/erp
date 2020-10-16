import { useRef, Fragment } from 'react'
import { useReactToPrint } from 'react-to-print'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Button } from '@material-ui/core'
import { Container, ContainerHeader, LoaderPage, ErrorPage, Loading } from '../../../components'
import Table from './table'

const useStyles = makeStyles((theme) => ({
  download: {
    width: '200px',
    marginBottom: '25px',
  },
}));

const ShoppingHistory = ({ me, isError, isLoading, sale }) => {
    if (isLoading) {
    return (
      <LoaderPage>
        <Loading />
      </LoaderPage>
    )
  }

  if (isError) {
    return (
      <ErrorPage>
        <Typography variant="h2" color="error">Hubo un error!</Typography>
      </ErrorPage>
    )
  }
  const classes = useStyles()
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  return (
    <Container>
      <Button className={classes.download} onClick={handlePrint} variant="contained" color="secondary">
        Imprimir
      </Button>
      <div ref={componentRef}>
        <ContainerHeader>
          <Typography variant="h1" color="secondary">Factura <strong>{me.id_market}-{sale.id}</strong></Typography>
        </ContainerHeader>
        <Table
          sale={sale}
          id_market={me.id_market}
        />
      </div>
    </Container>
  )
}

export default ShoppingHistory