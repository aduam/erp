import Head from 'next/head'
import { useQuery } from '@apollo/client'
import ProductCreateView from '../../../views/product/create'
import withAuth from '../../../lib/withAuth'
import { TYPE_PRODUCTS } from '../../../queries/product'

const ProductCreate = ({ me }) => {
  const { loading, error, data } = useQuery(TYPE_PRODUCTS, { variables: { id_organization: me.id_organization } });
  const typeProducts = data && data.organization && data.organization.type_products ? data.organization.type_products : []
  return (
    <>
      <Head>
        <title>{`Crear producto | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <ProductCreateView me={me} type_products={typeProducts} isLoading={loading} isError={error} />
    </>
  )
}

export default withAuth(ProductCreate, 1)
