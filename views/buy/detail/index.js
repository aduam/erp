import { Typography } from '@material-ui/core'
import { Container, ContainerHeader, LoaderPage, ErrorPage, Loading } from '../../../components'
import Table from './table'

const ShoppingHistory = ({ me, isError, isLoading, shopping }) => {
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
        <Typography variant="h1" color="secondary">Factura <strong>{shopping.recipe}</strong></Typography>
      </ContainerHeader>
      <Table
        shopping={shopping}
      />
    </Container>
  )
}

export default ShoppingHistory