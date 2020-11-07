import Head from 'next/head'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import CreateAccountView from '../../../views/accounts/create'
import withAuth from '../../../lib/withAuth'
import { GET_CUSTOMER } from '../../../queries/customer'

const CreateAccount = ({ me }) => {
  const router = useRouter()
  const urlId = router.query.id
  const id = !!urlId && !!parseInt(urlId, 10) ? Math.abs(parseInt(urlId, 10)) : null

  const { loading, error, data } = useQuery(GET_CUSTOMER, { variables: { id_organization: me.id_organization, id_customer: id }, fetchPolicy: 'network-only'})
  const customer = data && data.organization && data.organization.customer ? data.organization.customer : {}

  return (
    <>
      <Head>
        <title>{`Editar cliente | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <CreateAccountView id_customer={id} me={me} isLoading={loading} isError={error} customer={customer} />
    </>
  )
}

export default withAuth(CreateAccount, 1)
