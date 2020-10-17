import redirect from './redirect'
import { removeCookies } from './cookies'
import { ME } from '../queries/me'

const withAuth = (WrappComponent, action, subjet) => {
  const WithAuth = (props) => {
    return <WrappComponent {...props} />
  }

  WithAuth.getInitialProps = async (ctx) => {
    const { me } = await ctx.apolloClient
      .query({ query: ME })
      .then(({ data }) => data)
      .catch((err) => {
        console.log(err)
        return {}
      })
    if (!me) {
      removeCookies(ctx, ['token', 'refresh_token'])
      redirect(ctx, '/login')
    }

    if (me && me.role && me.role.id) {
      if (action && action !== me.role.id) {
        redirect(ctx, '/')
      }
    }

    let appProps = {}
    if (WrappComponent.getInitialProps) {
      appProps = WrappComponent.getInitialProps(ctx)
    }
    return { ...appProps, me }
  }

  return WithAuth
}

export default withAuth