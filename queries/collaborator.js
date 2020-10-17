import { gql } from '@apollo/client'

export const GET_COLLABORATORS = gql`
  query GetCollaborators($id_organization: Int!, $id_market: Int!) {
    organization(id: $id_organization) {
      id
      market(id: $id_market) {
        id
        name
        collaborators {
          id
          names
          surnames
          identification
          active
          role {
            id
            title
          }
          user {
            id
            username
          }
        }
      }
    }
  }
`

export const GET_COLLABORATOR = gql`
  query GetCollaborators($id_organization: Int!, $id_market: Int!, $id_collaborator: Int!) {
    organization(id: $id_organization) {
      id
      market(id: $id_market) {
        id
        name
        collaborator(id: $id_collaborator) {
          id
          names
          surnames
          identification
          active
          role {
            id
            title
          }
          user {
            id
            username
          }
        }
      }
    }
  }
`