import Head from 'next/head'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import AccountView from '../../../views/accounts/view'
import withAuth from '../../../lib/withAuth'
import { GET_ACCOUNT } from '../../../queries/accounts'

const ViewAccountPage = ({ me }) => {
  const router = useRouter()
  const urlId = router.query.id
  const id = !!urlId && !!parseInt(urlId, 10) ? Math.abs(parseInt(urlId, 10)) : null

  const { loading, error, data } = useQuery(GET_ACCOUNT, { variables: { id }, fetchPolicy: 'network-only'})
  const account = data?.account ? data.account : {}

  return (
    <>
      <Head>
        <title>{`Editar cliente | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <AccountView id_account={id} me={me} isLoading={loading} isError={error} account={account} />
    </>
  )
}

export default withAuth(ViewAccountPage, 1)
