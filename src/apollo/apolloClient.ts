import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import SERVICE_CONFIG from '../constants/service'

const client = new ApolloClient({
  uri: SERVICE_CONFIG.URL_BASE,
  cache: new InMemoryCache()
})

export default client
