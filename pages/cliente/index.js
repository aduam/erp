import Head from 'next/head'
import { useQuery } from '@apollo/client'
import CustomersView from '../../views/customers'
import withAuth from '../../lib/withAuth'
import { GET_CUSTOMERS } from '../../queries/customer'

const Customer = ({ me }) => {
  const { loading, error, data } = useQuery(GET_CUSTOMERS, { variables: { id_organization: me.id_organization }, fetchPolicy: 'network-only' })
  const customers = data && data.organization && data.organization.customers ? data.organization.customers : []

  return (
    <>
      <Head>
        <title>{`Clientes | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <CustomersView me={me} isLoading={loading} isError={error} customers={customers} />
    </>
  )
}

export default withAuth(Customer, 1)
