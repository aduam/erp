import { useRef } from 'react'
import { Button, Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'
import { useReactToPrint } from 'react-to-print'
import CurrencyFormat from 'react-currency-format'
import { Container, ContainerHeader, ErrorPage, LoaderPage, Loading } from '../../../components'
import { graphError } from '../../../lib/graphError'
import moment from 'moment'

const AccountView = ({ id_account, isLoading, isError, me, account }) => {
  if (isLoading) {
    return <LoaderPage><Loading /></LoaderPage>
  }

  if (isError) {
    const error = graphError(isError)
    return <ErrorPage>{error}</ErrorPage>
  }
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  return (
    <Container>
      <ContainerHeader>
        <Typography variant="h1" color="secondary">Cuenta de cliente {account?.customer?.names} {account?.customer?.surnames}</Typography>
      </ContainerHeader>
      <br />
      <br />
      <Button onClick={handlePrint} variant="contained" color="secondary">
        Imprimir
      </Button>
      <br />
      <br />
      <TableContainer ref={componentRef}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha de pago</TableCell>
              <TableCell>Cuota</TableCell>
              <TableCell>Cancelado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {account?.projectionFees.map((element) => {
              const date = moment.unix(element.due_date / 1000).format('DD/MM/YYYY')
              return (
                <TableRow key={element.id}>
                  <TableCell>{date}</TableCell>
                  <TableCell>
                    <CurrencyFormat value={element?.amount ? Number(element.amount).toFixed(2) : 0.00} displayType={'text'} thousandSeparator={true} prefix={'Q'} />
                  </TableCell>
                  <TableCell>
                    <CurrencyFormat value={(element?.paid ? Number(element.paid) : 0.00).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'Q'} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default AccountView