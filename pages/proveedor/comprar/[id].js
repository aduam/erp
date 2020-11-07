import Head from 'next/head'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import ProvidersBuyView from '../../../views/providers/buy'
import withAuth from '../../../lib/withAuth'
import { GET_TYPE_PRODUCTS } from '../../../queries/product'

const ProviderBuy = ({ me }) => {
  const router = useRouter()
  const urlId = router.query.id
  const id = !!urlId && !!parseInt(urlId, 10) ? Math.abs(parseInt(urlId, 10)) : null

  const { loading, error, data } = useQuery(GET_TYPE_PRODUCTS, { variables: { id_organization: me.id_organization, id_provider: id }, fetchPolicy: 'network-only' })
  const typeProducts = data && data.organization && data.organization.type_products ? data.organization.type_products : []
  const provider = data && data.organization && data.organization.provider ? data.organization.provider : {}

  return (
    <>
      <Head>
        <title>{`Proveedor compras | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <ProvidersBuyView
        me={me}
        id_provider={id}
        type_products={typeProducts}
        provider={provider}
        isLoading={loading}
        isError={error}
      />
    </>
  )
}

export default withAuth(ProviderBuy, 1)
