import gql from "graphql-tag";

const typeDefs = gql`
  extend type Query {
    cart: [Product]!
  }

  extend type Mutation {
    addToCartClient(id: ID!, title: String!, price: Float!): [Product]
    removeFromCartClient(id: ID!): [Product]
  }

  extend type Product {
    isInCart: Boolean!
  }
`;

export default typeDefs;
