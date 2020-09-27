import Head from 'next/head'
import BuyView from '../../views/buy'
import withAuth from '../../lib/withAuth'

const Buys = () => {
  return (
    <>
      <Head>
        <title>{`Compras | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <BuyView />
    </>
  )
}

export default withAuth(Buys)
