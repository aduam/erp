import styled from 'styled-components'
import Router from 'next/router'
import { Button, Typography } from '@material-ui/core'

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 30px;
  flex-direction: column;
`

const WrapButton = styled.div`
  width: 100%;
  max-width: 250px;
  min-width: 150px;
  margin-top: 15px;
`

const BuyView = () => {
  return (
    <Container>
      <WrapButton>
        <Button fullWidth color="secondary" variant="contained" onClick={() => Router.push('/compras/comprar')}>
          <Typography variant="button">Comprar</Typography>
        </Button>
      </WrapButton>
      <WrapButton>
        <Button fullWidth color="secondary" variant="contained">
          <Typography variant="button">Anular compra</Typography>
        </Button>
      </WrapButton>
      <WrapButton>
        <Button fullWidth color="secondary" variant="contained">
          <Typography variant="button">Reportes</Typography>
        </Button>
      </WrapButton>
    </Container>
  )
}

export default BuyView