import Router from 'next/router'
import { Typography, Button } from '@material-ui/core'
import { Container, ContainerHeader, LoaderPage, ErrorPage, Loading } from '../../components'
import TableProducts from './table'

const ProvidersView = ({ isLoading, isError, products, me }) => {
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

  const isAdmin = me && me.role && me.role.id ? me.role.id : 2

  return (
    <Container>
      <ContainerHeader>
        <Typography variant="h1" color="secondary">Productos</Typography>
        {isAdmin === 1 && (
          <>
            <Button onClick={() => Router.push('/producto/tipo-producto/crear')} variant="outlined" color="secondary">
              <Typography variant="button" color="secondary">Agregar tipo de producto</Typography>
            </Button>
            <Button onClick={() => Router.push('/producto/crear')} variant="contained" color="secondary">
              <Typography variant="button">Agregar producto</Typography>
            </Button>
          </>
        )}
      </ContainerHeader>
      <TableProducts isAdmin={isAdmin} products={products} id_organization={me.id_organization} id_market={me.id_market} />
    </Container>
  )
}

export default ProvidersView