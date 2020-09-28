import Router from 'next/router'
import { Typography, Button } from '@material-ui/core'
import { Container, ContainerHeader, LoaderPage, ErrorPage } from '../../components'
import TableProviders from './table'

const ProvidersView = ({ isLoading, isError, products, me }) => {

  if (isLoading) {
    return (
      <LoaderPage>
        Cargando...
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

  return (
    <Container>
      <ContainerHeader>
        <Typography variant="h1" color="secondary">Productos</Typography>
        <Button onClick={() => Router.push('/producto/tipo-producto/crear')} variant="contained" color="secondary">
          <Typography variant="button">Agregar tipo de producto</Typography>
        </Button>
      </ContainerHeader>
      <TableProviders products={products} id_organization={me.id_organization} />
    </Container>
  )
}

export default ProvidersView