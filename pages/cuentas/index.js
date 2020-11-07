import Head from 'next/head'
import { useQuery } from '@apollo/client'
import AccountsView from '../../views/accounts'
import withAuth from '../../lib/withAuth'
import { GET_ACCOUNTS } from '../../queries/accounts'

const Account = ({ me }) => {
  const { loading, error, data } = useQuery(GET_ACCOUNTS, { fetchPolicy: 'network-only' })
  const accounts = data && data.accounts ? data.accounts : []

  return (
    <>
      <Head>
        <title>{`Cuentas | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <AccountsView me={me} isLoading={loading} isError={error} accounts={accounts} />
    </>
  )
}

export default withAuth(Account, 1)
