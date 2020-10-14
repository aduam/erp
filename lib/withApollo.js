import fetch from 'isomorphic-unfetch'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { decode } from 'jsonwebtoken'
import { createUploadLink } from 'apollo-upload-client'
import Head from 'next/head'
import { parseCookies, setCookies } from './cookies'

let apolloClient = null

if (!process.browser) {
  global.fetch = fetch
}

const uri = process.env.URL || 'http://localhost:4000/api/graphql'

const httpLink = createUploadLink({ uri })

const create = (initial, { getContext }) => {
  const getToken = () => { }

  const verifyTokenAndRefresh = () => {
    const token = parseCookies(getContext().req).authorization
    const refresh_token = parseCookies(getContext().req).refresh_token
    if (!token) {
      return null
    }

    const payload = decode(token)
    if (Date.now() / 1000 > payload.exp) {
      setCookies(getContext(), { token, refresh_token })
      return token
    }
    return token
  }

  const asyncAuthLink = setContext(
    (operation) => new Promise(async (resolve) => {
      const { headers, operationName } = operation
      console.log(operationName)
      const token = await verifyTokenAndRefresh()
      resolve({
        headers: {
          ...headers,
          authorization: token ? token.toString() : ''
        }
      })
    })
  )

  const client = new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: from([
      asyncAuthLink,
      httpLink,
    ]),
    cache: new InMemoryCache(),
  })
  return client
}

const initApollo = (initialState, opt) => {
  if (!process.browser) {
    return create(initialState, opt)
  }

  if (!apolloClient) {
    apolloClient = create(initialState, opt)
  }
  return apolloClient
}

const withApollo = (App) => {
  const WithApollo = (props) => {
    const apollo = initApollo(props.apolloState, { getContext: () => ({}) })
    return <App {...props} apollo={apollo} />
  }

  WithApollo.getInitialProps = async (ctx) => {
    const { Component, router, role } = ctx
    const initialState = {}

    const apollo = initApollo(initialState, { getContext: () => (ctx.ctx) })
    ctx.ctx.apolloClient = apollo

    let appProps = {}
    if (App.getInitialProps) {
      appProps = await App.getInitialProps(ctx)
    }

    if (!process.browser) {
      try {
        await getDataFromTree(
          <App
            {...appProps}
            Component={Component}
            router={router}
            apollo={apollo}
            role={role}
          />
        )
      } catch (error) {
        console.log('getDataFromTree: ', error.message)
      }
      Head.rewind()
    }

    const apolloState = apollo.cache.extract()
    return {
      ...appProps,
      apolloState
    }
  }

  return WithApollo
}

export default withApollo