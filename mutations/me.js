import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      names
      surnames
      identification
      photo_profile
      active
      role {
        id
        title
        description
      }
      user {
        id
        username
      }
      token
      refresh_token
    }
  }
`