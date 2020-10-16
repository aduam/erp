import Head from 'next/head'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import SaleDetailView from '../../../views/sale/detail'
import withAuth from '../../../lib/withAuth'
import { GET_SALE } from '../../../queries/sales'

const SaleDetail = ({ me }) => {
  const router = useRouter()
  const urlId = router.query.id
  const id = !!urlId && !!parseInt(urlId, 10) ? Math.abs(parseInt(urlId, 10)) : null

  const { loading, error, data } = useQuery(GET_SALE, { fetchPolicy: 'network-only', variables: { id_organization: me.id_organization, id_market: me.id_market, id_sale: id }})
  const sale = data && data.organization && data.organization.market && data.organization.market.sale ? data.organization.market.sale : {}

  return (
    <>
      <Head>
        <title>{`Editar proveedor | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <SaleDetailView id_shopping={id} me={me} isLoading={loading} isError={error} sale={sale} />
    </>
  )
}

export default withAuth(SaleDetail)
