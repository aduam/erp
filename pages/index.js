import Head from 'next/head'
import HomeView from '../views/home'
import withAuth from '../lib/withAuth'

const Index = () => {
  return (
    <>
      <Head>
        <title>Inicio</title>
      </Head>
      <HomeView />
    </>
  )
}

export default withAuth(Index)
