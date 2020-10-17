import Head from 'next/head'
import isLogged from '../lib/withLogin'
import LoginView from '../views/login'

const Login = () => {

  console.log(DB_USER)
  console.log(DB_PASSWORD)
  console.log(DB_HOST)
  console.log(DB_NAME)
  console.log(DB_PORT)

return (
    <>
      <Head>
        <title>{`Login | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <LoginView />
    </>
  )
}

export default isLogged(Login)