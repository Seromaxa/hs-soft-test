import { ApolloClient, InMemoryCache } from "@apollo/client"
import { gql } from "@apollo/client"

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com/",
})

export const LIST = gql`
  {
    continents {
      name
      countries {
        name
        languages {
          name
        }
      }
    }
  }
`
