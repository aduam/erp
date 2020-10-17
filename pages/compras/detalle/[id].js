import Head from 'next/head'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import ShoppingDetailView from '../../../views/buy/detail'
import withAuth from '../../../lib/withAuth'
import { GET_SHOPPING } from '../../../queries/shopping'

const ShoppingDetail = ({ me }) => {
  const router = useRouter()
  const urlId = router.query.id
  const id = !!urlId && !!parseInt(urlId, 10) ? Math.abs(parseInt(urlId, 10)) : null

  const { loading, error, data } = useQuery(GET_SHOPPING, { fetchPolicy: 'network-only', variables: { id_organization: me.id_organization, id_market: me.id_market, id_shopping: id }})
  const shopping = data && data.organization && data.organization.market && data.organization.market.shopping ? data.organization.market.shopping : {}

  return (
    <>
      <Head>
        <title>{`Editar proveedor | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <ShoppingDetailView id_shopping={id} me={me} isLoading={loading} isError={error} shopping={shopping} />
    </>
  )
}

export default withAuth(ShoppingDetail, 1)
