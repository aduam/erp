import Head from 'next/head'
import isLogged from '../lib/withLogin'
import LoginView from '../views/login'

const Login = () => {

  console.log(process.env.DB_USER)
  console.log(process.env.DB_PASSWORD)
  console.log(process.env.DB_HOST)
  console.log(process.env.DB_NAME)
  console.log(process.env.DB_PORT)

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