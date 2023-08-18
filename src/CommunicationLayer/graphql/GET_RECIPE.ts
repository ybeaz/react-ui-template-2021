import { gql, DocumentNode } from '@apollo/client'

export const GET_RECIPE: DocumentNode = gql`
  query GetRecipe($id: String!) {
    recipe(id: $id) {
      id
      title
      description
      ingredients
    }
  }
`
