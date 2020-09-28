import Head from 'next/head'
import { useQuery } from '@apollo/client'
import ProvidersView from '../../views/providers'
import withAuth from '../../lib/withAuth'
import { GET_PROVIDERS } from '../../queries/provider'

const Provider = ({ me }) => {
  const { loading, error, data } = useQuery(GET_PROVIDERS, { variables: { id: me.id_organization }, fetchPolicy: 'network-only' })
  const providers = data && data.organization && data.organization.providers ? data.organization.providers : []
  console.log('PROVIDERS::: ', providers)
  return (
    <>
      <Head>
        <title>{`Proveedores | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <ProvidersView me={me} isLoading={loading} isError={error} providers={providers} />
    </>
  )
}

export default withAuth(Provider)
