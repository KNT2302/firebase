import { gql } from "apollo-server-express"

export const typeDefs = gql`
type Query {
  Users: [User]
}

type User {
  currentToken: String
  lastCreate: String
  userId: String
  displayName:String
  urlPhoto: String
}

`
