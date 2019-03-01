import React from "react";
import { Link } from "react-router-dom";

// graphql
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { CART_CLIENT_QUERY } from "../../queries";

const PRODUCTS_QUERY = gql`
  {
    products {
      id
      title
      price
    }
  }
`;

function Home() {
  function addToCart(item, client) {
    const { cart } = client.readQuery({ query: CART_CLIENT_QUERY });

    const hasProductInCart = cart.some(product => product.id === item.id);

    if (hasProductInCart) return;

    client.writeData({
      data: {
        cart: cart.concat(item)
      }
    });
  }

  return (
    <Query query={PRODUCTS_QUERY}>
      {({ loading, data, client }) => {
        if (loading) return <p>Loading...</p>;

        return (
          <ul>
            <li>
              <Link to="/cart">Go to Cart</Link>
            </li>
            {data.products.map(item => (
              <li key={item.id}>
                <span>{item.title}</span>
                <button onClick={() => addToCart(item, client)}>add</button>
              </li>
            ))}
          </ul>
        );
      }}
    </Query>
  );
}

export default Home;
