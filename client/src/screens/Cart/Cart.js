import React from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";

// graphql
import { Query, Mutation } from "react-apollo";

import {
  PRODUCTS_QUERY,
  CART_CLIENT_QUERY,
  REMOVE_FROM_CART_CLIENT
} from "../../apollo/queries";

const DO_CHECKOUT = gql`
  mutation Checkout($productIds: [ID!]) {
    checkout(productIds: $productIds) {
      id
    }
  }
`;

function Cart() {
  function calcTotal({ cart }) {
    return cart.reduce((acc, curr) => {
      acc = acc + curr.price;
      return acc;
    }, 0);
  }

  function handleCheckout({ cart }, checkout, client) {
    const { products } = client.readQuery({ query: PRODUCTS_QUERY });

    checkout({
      variables: {
        productIds: cart.map(item => item.id)
      }
    });

    const cartProductIds = cart.map(item => item.id);

    client.writeData({
      data: {
        products: products.map(product => {
          if (cartProductIds.includes(product.id)) {
            return {
              ...product,
              isInCart: false
            };
          }

          return product;
        }),
        cart: []
      }
    });
  }

  return (
    <Query query={CART_CLIENT_QUERY}>
      {({ loading, data }) => {
        if (loading) return <p>Loading...</p>;

        return (
          <React.Fragment>
            <ul>
              <li>
                <Link to="/">Go back to products</Link>
              </li>

              {!data.cart.length && <li>{<p>Empty cart :(</p>}</li>}

              {data.cart.map(item => (
                <li key={item.id}>
                  <span>
                    {item.title} | ${item.price.toFixed(3)}
                  </span>
                  <Mutation
                    mutation={REMOVE_FROM_CART_CLIENT}
                    variables={{ id: item.id }}
                  >
                    {removeFromCartClient => (
                      <button onClick={removeFromCartClient}>remove</button>
                    )}
                  </Mutation>
                </li>
              ))}
              {!!data.cart.length && (
                <li>
                  <strong>Total: </strong> {calcTotal(data).toFixed(3)}
                </li>
              )}
              {!!data.cart.length && (
                <li>
                  <Mutation mutation={DO_CHECKOUT}>
                    {(checkout, { client }) => (
                      <button
                        onClick={() => handleCheckout(data, checkout, client)}
                      >
                        CHECKOUT
                      </button>
                    )}
                  </Mutation>
                </li>
              )}
            </ul>
          </React.Fragment>
        );
      }}
    </Query>
  );
}

export default Cart;
