import Head from 'next/head'
import CreateProvidersView from '../../views/providers/create'
import withAuth from '../../lib/withAuth'

const CreateProvider = ({ me }) => {
  return (
    <>
      <Head>
        <title>{`Crear proveedores | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <CreateProvidersView me={me} />
    </>
  )
}

export default withAuth(CreateProvider, 1)
