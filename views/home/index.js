import styled from 'styled-components'
import { Typography } from '@material-ui/core'

const Container = styled.div`
  background-image: linear-gradient(rgba(255,255,255,.8), rgba(255,255,255,.8)), url('/img/home.jpg');
  height: calc(100vh - 150px);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
`

const WrappData = styled.div`
  margin-top: 35px;
`

const Home = ({ me }) => {
  return (
    <Container>
      <Typography variant="h1" color="secondary">Bienvenido a {process.env.NAME_BUSINESS}</Typography>
      <WrappData>
        <Typography variant="h4" color="secondary"><span style={{ color: 'black' }}>Nombre: </span>{me.names} {me.surnames}</Typography>
        <Typography variant="h4" color="secondary"><span style={{ color: 'black' }}>Tienda: </span>{me.market.name}</Typography>
      </WrappData>
    </Container>
  )
}

export default Home