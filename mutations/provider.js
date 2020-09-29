import { gql } from '@apollo/client'

export const CREATE_PROVIDER = gql`
  mutation CreateProvider($provider: ProviderInput!, $id_market: Int!, $id_organization: Int!) {
    createProvider(provider: $provider, id_market: $id_market, id_organization: $id_organization) {
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
`

export const REMOVE_PROVIDER = gql`
  mutation RemoveProvider($id: Int!) {
    removeProvider(id: $id) {
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
`

export const EDIT_PROVIDER = gql`
  mutation EditProvider($provider: ProviderEditInput, $id_organization: Int!, $id_provider: Int!) {
    editProvider(provider: $provider, id_organization: $id_organization, id_provider: $id_provider) {
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
`