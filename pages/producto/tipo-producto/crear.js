import Head from 'next/head'
import TypeProductsView from '../../../views/product/tipo-producto'
import withAuth from '../../../lib/withAuth'

const TypeProductCreate = ({ me }) => {

  return (
    <>
      <Head>
        <title>{`Crear tipo de producto | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <TypeProductsView me={me} />
    </>
  )
}

export default withAuth(TypeProductCreate, 1)
