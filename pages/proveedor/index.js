import Head from 'next/head'
import ProvidersView from '../../views/providers'
import withAuth from '../../lib/withAuth'

const Provider = () => {
  return (
    <>
      <Head>
        <title>{`Proveedores | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <ProvidersView />
    </>
  )
}

export default withAuth(Provider)
