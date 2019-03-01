import gql from "graphql-tag";

export const CART_CLIENT_QUERY = gql`
  {
    cart @client {
      id
      title
      price
    }
  }
`;
