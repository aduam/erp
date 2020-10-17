import Head from 'next/head'
import CreateColaboratorView from '../../views/collaborator/create'
import withAuth from '../../lib/withAuth'

const CreateColaborator = ({ me }) => {
  return (
    <>
      <Head>
        <title>{`Crear colaborador | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <CreateColaboratorView me={me} />
    </>
  )
}

export default withAuth(CreateColaborator, 1)
