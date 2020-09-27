import Router from 'next/router'
import { Typography, Button } from '@material-ui/core'
import { Container, ContainerHeader } from '../../components'

const ProvidersView = () => {
  return (
    <Container>
      <ContainerHeader>
        <Typography variant="h1" color="secondary">Proveedores</Typography>
        <Button onClick={() => Router.push('/proveedor/crear')} variant="contained" color="secondary">
          <Typography variant="button">Agregar proveedor</Typography>
        </Button>
      </ContainerHeader>
    </Container>
  )
}

export default ProvidersView