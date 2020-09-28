import { gql } from '@apollo/client'

export const ME = gql`
  query Me {
    me {
      id
      names
      surnames
      id_market
      id_organization
    }
  }
`