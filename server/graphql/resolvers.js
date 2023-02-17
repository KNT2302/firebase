import { async } from "@firebase/util"
import { getUsers } from "./resolverController/User.js"

export const resolvers = {
  Query: {
    Users: (parent, args) => {
      return getUsers(parent, args)
    }
  },
  // User:{
  //   
  // }
}

