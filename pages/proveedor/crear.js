import Head from 'next/head'
import CreateProvidersView from '../../views/providers/create'
import withAuth from '../../lib/withAuth'

const CreateProvider = () => {
  return (
    <>
      <Head>
        <title>{`Crear proveedores | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <CreateProvidersView />
    </>
  )
}

export default withAuth(CreateProvider)
