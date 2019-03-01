import React from "react";
import { Link } from "react-router-dom";

// graphql
import { Query, Mutation } from "react-apollo";

import {
  CART_CLIENT_QUERY,
  REMOVE_FROM_CART_CLIENT
} from "../../apollo/queries";

function Cart() {
  function calcTotal({ cart }) {
    return cart.reduce((acc, curr) => {
      acc = acc + curr.price;
      return acc;
    }, 0);
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
                  <span>{item.title}</span>
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
              <li>
                <strong>Total: </strong> {calcTotal(data).toFixed(3)}
              </li>
            </ul>
          </React.Fragment>
        );
      }}
    </Query>
  );
}

export default Cart;
