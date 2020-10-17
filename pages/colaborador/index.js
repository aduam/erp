import Head from 'next/head'
import { useQuery } from '@apollo/client'
import CollaboratorsView from '../../views/collaborator'
import withAuth from '../../lib/withAuth'
import { GET_COLLABORATORS } from '../../queries/collaborator'

const Colaborador = ({ me }) => {
  const { loading, error, data } = useQuery(GET_COLLABORATORS, { variables: { id_organization: me.id_organization, id_market: me.id_market }, fetchPolicy: 'network-only' })
  const collaborators = data && data.organization && data.organization.market && data.organization.market.collaborators ? data.organization.market.collaborators : []

  return (
    <>
      <Head>
        <title>{`Colaboradores | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <CollaboratorsView me={me} isLoading={loading} isError={error} collaborators={collaborators} />
    </>
  )
}

export default withAuth(Colaborador, 1)
