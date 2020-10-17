import Head from 'next/head'
import CreateCustomerView from '../../views/customers/create'
import withAuth from '../../lib/withAuth'

const CreateCustomer = ({ me }) => {
  return (
    <>
      <Head>
        <title>{`Crear cliente | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <CreateCustomerView me={me} />
    </>
  )
}

export default withAuth(CreateCustomer, 1)
