import Router from 'next/router'
import { Typography, Button } from '@material-ui/core'
import { Container, ContainerHeader, LoaderPage, ErrorPage, Loading } from '../../components'
import TableProviders from './table'

const ProvidersView = ({ isLoading, isError, customers, me }) => {

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

  return (
    <Container>
      <ContainerHeader>
        <Typography variant="h1" color="secondary">Clientes</Typography>
        <Button onClick={() => Router.push('/cliente/crear')} variant="contained" color="secondary">
          <Typography variant="button">Agregar cliente</Typography>
        </Button>
      </ContainerHeader>
      <TableProviders customers={customers} id_organization={me.id_organization} me={me} />
    </Container>
  )
}

export default ProvidersView