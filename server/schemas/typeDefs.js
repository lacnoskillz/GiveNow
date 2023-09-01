const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    donations: [Donation]
    topdonor: Boolean
  }

  type Donation {
    _id: ID!
    amount: Int!
    date: String!
    userId: User
    organization: Organization!
  }
 type Organization{
 _id: ID!
 name: String!
 description: String!
 amountraised: Int
 topDonation1: Int
 topDonation2: Int
 topDonation3: Int
 }
  type Query {
 
    me: User
    users: [User]
    donations: [Donation]
    organizations: [Organization]
  }

  type Auth {
    token: ID!
    user: User!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    makeDonation(amount: Int!, organization: ID!): Donation
    makeOrganization(name: String!, description: String!, amountraised: Int): Organization
  }
`;

module.exports = typeDefs;
