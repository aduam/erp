import Head from 'next/head'
import SaleView from '../../views/sale'
import withAuth from '../../lib/withAuth'

const Sale = ({ me }) => {
  return (
    <>
      <Head>
        <title>{`Ventas | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <SaleView me={me} />
    </>
  )
}

export default withAuth(Sale)