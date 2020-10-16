import { gql } from '@apollo/client'

export const REPORTS = gql`
  query Reports {
    reports {
      sale {
        title
        categories
        series
      }
      shop {
        title
        categories
        series
      }
    }
  }
`