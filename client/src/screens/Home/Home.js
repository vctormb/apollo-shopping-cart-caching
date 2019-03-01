import React from "react";
import { Link } from "react-router-dom";

// graphql
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import {
  PRODUCTS_QUERY,
  REMOVE_FROM_CART_CLIENT,
  CART_CLIENT_QUERY
} from "../../apollo/queries";

const ADD_TO_CART_CLIENT = gql`
  mutation AddToCartClient($id: ID!, $title: String!, $price: Float!) {
    addToCartClient(id: $id, title: $title, price: $price) @client
  }
`;

function Home() {
  return (
    <Query query={PRODUCTS_QUERY}>
      {({ loading, data }) => {
        if (loading) return <p>Loading...</p>;

        return (
          <ul>
            <li>
              <Query query={CART_CLIENT_QUERY}>
                {({ data }) => (
                  <Link to="/cart">Go to Cart ({data.cart.length})</Link>
                )}
              </Query>
            </li>
            {data.products.map(item => (
              <li key={item.id}>
                <span>
                  {item.title} | ${item.price.toFixed(3)}
                </span>{" "}
                {item.isInCart ? (
                  <Mutation
                    mutation={REMOVE_FROM_CART_CLIENT}
                    variables={{ id: item.id }}
                  >
                    {removeFromCartClient => (
                      <button onClick={removeFromCartClient}>remove</button>
                    )}
                  </Mutation>
                ) : (
                  <Mutation
                    mutation={ADD_TO_CART_CLIENT}
                    variables={{ ...item }}
                  >
                    {addToCartClient => (
                      <button onClick={addToCartClient}>add</button>
                    )}
                  </Mutation>
                )}
              </li>
            ))}
          </ul>
        );
      }}
    </Query>
  );
}

export default Home;
