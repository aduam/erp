import Head from 'next/head'
import isLogged from '../lib/withLogin'
import LoginView from '../views/login'

const Login = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <LoginView />
    </>
  )
}

export default isLogged(Login)