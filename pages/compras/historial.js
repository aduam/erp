import Head from 'next/head'
import { useQuery } from '@apollo/client'
import ShoppingHistory from '../../views/buy/history'
import withAuth from '../../lib/withAuth'
import { GET_SHOPPINGS } from '../../queries/shopping'

const ShoppingHitory = ({ me }) => {
  const { loading, error, data } = useQuery(GET_SHOPPINGS, {
    fetchPolicy: 'network-only',
    variables: { id_organization: me.id_organization, id_market: me.id_market }
  })

  const shoppings = data && data.organization && data.organization.market.shoppings ? data.organization.market.shoppings : []
  return (
    <>
      <Head>
        <title>{`Historial de compras | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <ShoppingHistory me={me} isLoading={loading} isError={error} shoppings={shoppings} />
    </>
  )
}

export default withAuth(ShoppingHitory, 1)
