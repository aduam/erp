import Head from 'next/head'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import ProvidersView from '../../../views/providers/editar'
import withAuth from '../../../lib/withAuth'
import { GET_PROVIDER } from '../../../queries/provider'

const Provider = ({ me }) => {
  const router = useRouter()
  const urlId = router.query.id
  const id = !!urlId && !!parseInt(urlId, 10) ? Math.abs(parseInt(urlId, 10)) : null

  const { loading, error, data } = useQuery(GET_PROVIDER, { variables: { id_organization: me.id_organization, id_provider: id }, fetchPolicy: 'network-only' })
  const provider = data && data.organization && data.organization.provider ? data.organization.provider : {}

  return (
    <>
      <Head>
        <title>{`Editar proveedor | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <ProvidersView id_provider={id} me={me} isLoading={loading} isError={error} provider={provider} />
    </>
  )
}

export default withAuth(Provider, 1)
