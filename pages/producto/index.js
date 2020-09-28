import Head from 'next/head'
import { useQuery } from '@apollo/client'
import ProductsView from '../../views/product'
import withAuth from '../../lib/withAuth'
import { GET_PRODUCTS } from '../../queries/product'

const Products = ({ me }) => {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      id_organization: me.id_organization,
      id_market: me.id_market,
    }
  })

  const products = data && data.organization && data.organization.market && data.organization.market.products ? data.organization.market.products : []

  return (
    <>
      <Head>
        <title>{`Productos | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <ProductsView me={me} products={products} isLoading={loading} isError={error} />
    </>
  )
}

export default withAuth(Products)
