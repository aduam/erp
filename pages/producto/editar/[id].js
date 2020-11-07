import Head from 'next/head'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import ProductUpdateView from '../../../views/product/edit'
import withAuth from '../../../lib/withAuth'
import { GET_PRODUCTS_BY_MARKET, TYPE_PRODUCTS } from '../../../queries/product'

const ProductCreate = ({ me }) => {
  const router = useRouter()
  const urlId = router.query.id
  const id = !!urlId && !!parseInt(urlId, 10) ? Math.abs(parseInt(urlId, 10)) : null

  const { loading: loadingType, error: errorType, data: dataType } = useQuery(TYPE_PRODUCTS, { variables: { id_organization: me.id_organization }, fetchPolicy: 'network-only' });
  const typeProducts = dataType && dataType.organization && dataType.organization.type_products ? dataType.organization.type_products : []

  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_MARKET, { variables: { id_organization: me.id_organization, id_market: me.id_market, id_product: id }, fetchPolicy: 'network-only' });
  const product = data && data.organization && data.organization.market.product ? data.organization.market.product : {}
  return (
    <>
      <Head>
        <title>{`Editar producto | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <ProductUpdateView
        me={me}
        type_products={typeProducts}
        product={product}
        isLoading={loading}
        isError={error}
        isLoadingType={loadingType}
        isErrorType={errorType}
      />
    </>
  )
}

export default withAuth(ProductCreate, 1)
