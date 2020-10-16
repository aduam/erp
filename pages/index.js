import Head from 'next/head'
import HomeView from '../views/home'
import withAuth from '../lib/withAuth'

const Index = ({ me }) => {
  return (
    <>
      <Head>
        <title>{`Inicio | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <HomeView me={me} />
    </>
  )
}

export default withAuth(Index)
