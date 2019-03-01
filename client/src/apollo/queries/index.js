import gql from "graphql-tag";

export const PRODUCTS_QUERY = gql`
  query Products {
    products {
      id
      title
      price
      isInCart @client
    }
  }
`;

export const CART_CLIENT_QUERY = gql`
  {
    cart @client {
      id
      title
      price
    }
  }
`;

export const REMOVE_FROM_CART_CLIENT = gql`
  mutation RemoveFromCartClient($id: ID!) {
    removeFromCartClient(id: $id) @client
  }
`;