import redirect from './redirect'
import { ME } from '../queries/me'

const isLogged = (WrappComponent) => {
  const IsLogged = (props) => {
    return <WrappComponent {...props} />
  }

  IsLogged.getInitialProps = async (ctx) => {
    const { me } = await ctx.apolloClient
      .query({ query: ME })
      .then(({ data }) => data)
      .catch((err) => {
        console.log('errrrr:::: ', err)
        return {}
      })

    if (me) {
      redirect(ctx, '/')
    }

    let appProps
    if (WrappComponent.getInitialProps) {
      appProps = WrappComponent.getInitialProps(ctx)
    }

    return { ...appProps }
  }

  return IsLogged
}

export default isLogged