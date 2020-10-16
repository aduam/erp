import Head from 'next/head'
import SalesView from '../../views/sale'
import withAuth from '../../lib/withAuth'

const Sales = ({ me }) => {
  return (
    <>
      <Head>
        <title>{`Ventas | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <SalesView me={me} />
    </>
  )
}

export default withAuth(Sales)