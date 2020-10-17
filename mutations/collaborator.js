import { gql } from '@apollo/client'

export const COLLABORATOR_CREATE = gql`
  mutation CollaboratorCreate(
    $collaborator: CollaboratorInput!
    $id_role: Int!
    $id_market: Int!
    $id_organization: Int!
    $username: String!) {
      createCollaborator(
        collaborator: $collaborator
        id_role: $id_role
        id_market: $id_market
        username: $username
        id_organization: $id_organization
      ) {
        id
      }
    }
`

export const COLLABORATOR_UPDATE = gql`
  mutation CollaboratorUpdate(
    $collaborator: CollaboratorInput!
    $id_role: Int!
    $id_market: Int!
    $id_organization: Int!
    $username: String!,
    $id_collaborator: Int!
  ) {
    updateCollaborator(
      collaborator: $collaborator
      id_role: $id_role
      id_market: $id_market
      username: $username
      id_organization: $id_organization,
      id_collaborator: $id_collaborator
    ) {
      id
    }
  }
`

export const REMOVE_COLLABORATOR = gql`
  mutation RemoveCollaborator(
    $id_market: Int!
    $id_organization: Int!
    $id_collaborator: Int!
  ) {
    removeCollaborator(
      id_market: $id_market
      id_organization: $id_organization,
      id_collaborator: $id_collaborator
    ) {
      id
    }
  }
`

export const RESET_ME_PASSWORD = gql`
  mutation ResetMePassword($password: String!) {
    resetMePassword(password: $password) {
      id
    }
  }
`

export const RESET_PASSWORD = gql`
  mutation ResetPassword($id_collaborator: Int!) {
    resetPassword(id_collaborator: $id_collaborator) {
      id
    }
  }
`