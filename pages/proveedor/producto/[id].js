import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import ProductsProviderView from '../../../views/providers/products'
import withAuth from '../../../lib/withAuth'
import { GET_PRODUCTS_BY_PROVIDER } from '../../../queries/product'

const ProductByProvider = ({ me }) => {
  const router = useRouter()
  const urlId = router.query.id
  const id = !!urlId && !!parseInt(urlId, 10) ? Math.abs(parseInt(urlId, 10)) : null

  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_PROVIDER, {
    fetchPolicy: 'network-only',
    variables: {
      id_organization: me.id_organization,
      id_provider: id,
    }
  })

  const products = data && data.organization && data.organization.provider && data.organization.provider.products ? data.organization.provider.products : []
  const provider = data && data.organization && data.organization.provider ? data.organization.provider : {}

  return (
    <>
      <Head>
        <title>{`Productos por proveedores | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <ProductsProviderView me={me} isLoading={loading} isError={error} products={products} provider={provider} />
    </>
  )
}

export default withAuth(ProductByProvider)
