import Head from 'next/head'
import { useQuery } from '@apollo/client'
import SaleHistoryView from '../../views/sale/history'
import withAuth from '../../lib/withAuth'
import { GET_SALES } from '../../queries/sales'

const SaleHitory = ({ me }) => {
  const { loading, error, data } = useQuery(GET_SALES, {
    fetchPolicy: 'network-only',
    variables: { id_organization: me.id_organization, id_market: me.id_market }
  })

  const sales = data && data.organization && data.organization.market.sales ? data.organization.market.sales : []
  return (
    <>
      <Head>
        <title>{`Historial de compras | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <SaleHistoryView me={me} isLoading={loading} isError={error} sales={sales} />
    </>
  )
}

export default withAuth(SaleHitory)
