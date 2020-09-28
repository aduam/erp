import { gql } from '@apollo/client'

export const GET_PROVIDERS = gql`
  query GetProviders($id: Int!) {
    organization(id: $id) {
      id
      providers {
        id
        name
        description
        business_name
        social_reason
        nit
        address
        phone
        mobile
        photo
      }
    }
  }
`

export const GET_PROVIDER = gql`
  query GetProviders($id_organization: Int!, $id_provider: Int!) {
    organization(id: $id_organization) {
      id
      provider(id: $id_provider) {
        id
        name
        description
        business_name
        social_reason
        nit
        address
        phone
        mobile
        photo
      }
    }
  }
`