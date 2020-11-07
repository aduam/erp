import Head from 'next/head'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import CollaboratorEditView from '../../../views/collaborator/editar'
import withAuth from '../../../lib/withAuth'
import { GET_COLLABORATOR } from '../../../queries/collaborator'

const Provider = ({ me }) => {
  const router = useRouter()
  const urlId = router.query.id
  const id = !!urlId && !!parseInt(urlId, 10) ? Math.abs(parseInt(urlId, 10)) : null

  const { loading, error, data } = useQuery(GET_COLLABORATOR, { variables: { id_organization: me.id_organization, id_collaborator: id, id_market: me.id_market }, fetchPolicy: 'network-only' })
  const collaborator = data && data.organization && data.organization.market.collaborator ? data.organization.market.collaborator : {}

  return (
    <>
      <Head>
        <title>{`Editar colaborador | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <CollaboratorEditView id_collaborator={id} me={me} isLoading={loading} isError={error} collaborator={collaborator} />
    </>
  )
}

export default withAuth(Provider, 1)
