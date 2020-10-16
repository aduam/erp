import { useState } from 'react'
import { Typography } from '@material-ui/core'
import dynamic from 'next/dynamic'
import { LoaderPage, Loading } from '../../components'
const Chart = dynamic(() => import('react-apexcharts'), {ssr:false})

const ChartView = ({ reports, isLoading, isError }) => {
  if (isLoading) {
    return <LoaderPage><Loading /></LoaderPage>
  }

  if (isError) {
    return <LoaderPage><Typography color="error">Hubo un error!</Typography></LoaderPage>
  }

  const sale = {
    options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: reports.sale.categories,
        }
      },
      series: [
        {
          name: reports.sale.title,
          data: reports.sale.series
        }
      ]
    }

    const shop = {
      options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: reports.shop.categories,
          }
        },
        series: [
          {
            name: reports.shop.title,
            data: reports.shop.series
          }
        ]
      }

  return (
    <>
      <Typography variant="h2" color="secondary">Ventas</Typography>
      <Chart
        options={sale.options}
        series={sale.series}
        type="bar"
        width="500"
      />
      <Typography variant="h2" color="secondary">Compras</Typography>
      <Chart
        options={shop.options}
        series={shop.series}
        type="bar"
        width="500"
      />
    </>
  )
}

export default ChartView