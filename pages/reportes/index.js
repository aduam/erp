import Head from 'next/head'
import { useQuery } from '@apollo/client'
import ChartView from '../../views/chart'
import withAuth from '../../lib/withAuth'
import { REPORTS } from '../../queries/reports'

const Chart = ({ me }) => {
  const { loading, error, data } = useQuery(REPORTS, { fetchPolicy: 'network-only' })
  const reports = data && data.reports ? data.reports : {}
  return (
    <>
      <Head>
        <title>{`Reportes | ${process.env.NAME_BUSINESS}`}</title>
      </Head>
      <ChartView isLoading={loading} isError={error} reports={reports} me={me} />
    </>
  )
}

export default withAuth(Chart)
