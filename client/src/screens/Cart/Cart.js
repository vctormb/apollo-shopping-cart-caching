import React from "react";

// graphql
import { Query } from "react-apollo";

import { CART_CLIENT_QUERY } from "../../queries";

function Cart() {
  function removeFromCart(itemId, client) {
    const { cart: lastCart } = client.readQuery({ query: CART_CLIENT_QUERY });

    const cart = lastCart.filter(itemCart => itemCart.id !== itemId);

    client.writeData({
      data: {
        cart
      }
    });
  }

  return (
    <Query query={CART_CLIENT_QUERY}>
      {({ loading, data, client }) => {
        if (loading) return <p>Loading...</p>;

        if (!data.cart.length) return <p>Empty cart :(</p>;

        return (
          <ul>
            {data.cart.map(item => (
              <li key={item.id}>
                <span>{item.title}</span>
                <button onClick={() => removeFromCart(item.id, client)}>
                  remove
                </button>
              </li>
            ))}
          </ul>
        );
      }}
    </Query>
  );
}

export default Cart;
