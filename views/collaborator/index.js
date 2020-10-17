import Router from 'next/router'
import { Typography, Button } from '@material-ui/core'
import { Container, ContainerHeader, LoaderPage, ErrorPage, Loading } from '../../components'
import TableProviders from './table'

const ProvidersView = ({ isLoading, isError, collaborators, me }) => {

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
        <Typography variant="h1" color="secondary">Colaboradores</Typography>
        <Button onClick={() => Router.push('/colaborador/crear')} variant="contained" color="secondary">
          <Typography variant="button">Agregar colaborador</Typography>
        </Button>
      </ContainerHeader>
      <TableProviders collaborators={collaborators} id_organization={me.id_organization} me={me} />
    </Container>
  )
}

export default ProvidersView