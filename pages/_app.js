import { useEffect } from 'react'
import App from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ApolloProvider } from '@apollo/client'
import theme from '../styles/theme'
import withApollo from '../lib/withApollo'
import Layout from '../views/layout'

const MyApp = ({ Component, pageProps, router, apollo, role }) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  const page = pageProps && pageProps.me && pageProps.me.id ? (
    <Layout {...pageProps} router={router}>
      <Component {...pageProps} router={router} />
    </Layout>
  ) : (
      <Component {...pageProps} router={router} />
    )
  return (
    <>
      <Head>
        <title>{`Erp | ${process.env.NAME_BUSINESS}`}</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ApolloProvider client={apollo}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {page}
        </ThemeProvider>
      </ApolloProvider>
    </>
  )
}

MyApp.getInitialProps = async ctx => {
  const initialProps = await App.getInitialProps(ctx)
  let role = null
  if (initialProps.pageProps && initialProps.pageProps.me) {
    role = initialProps.pageProps.me.role
  }
  return { ...initialProps, role }
}

export default withApollo(MyApp)
