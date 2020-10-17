import Head from 'next/head'
import HomeView from '../views/password'
import withAuth from '../lib/withAuth'

const Index = ({ me }) => {
  return (
    <>
      <Head>
        <title>{`Reiniciar mi contraseña | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <HomeView me={me} />
    </>
  )
}

export default withAuth(Index)
