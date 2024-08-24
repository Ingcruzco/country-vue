import client from '../apollo/apolloClient'
import { gql } from '@apollo/client/core'

export const fetchData = async () => {
  try {
    const response = await client.query({
      query: gql`
        query GetCountries {
          countries {
            name
            code
            capital
            continent {
              name
            }
            currency
            states {
              name
            }
          }
        }
      `
    })

    const { countries } = response.data
    return countries
  } catch (error) {
    console.error(error)
  }
}
