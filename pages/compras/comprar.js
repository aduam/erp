import Head from 'next/head'
import BuyViewNow from '../../views/buy/buyNow'
import withAuth from '../../lib/withAuth'

const Buy = () => {
  return (
    <>
      <Head>
        <title>{`Comprar | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <BuyViewNow />
    </>
  )
}

export default withAuth(Buy)
