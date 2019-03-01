import { PRODUCTS_QUERY, CART_CLIENT_QUERY } from "../queries";

const resolvers = {
  Mutation: {
    addToCartClient: (parent, args, { cache }) => {
      const { cart: lastCart } = cache.readQuery({ query: CART_CLIENT_QUERY });
      const { products: lastProducts } = cache.readQuery({
        query: PRODUCTS_QUERY
      });

      const cart = lastCart.concat({ ...args, __typename: "Product" });

      cache.writeData({
        data: {
          products: lastProducts.map(item => {
            if (item.id === args.id) {
              return {
                ...item,
                isInCart: true
              };
            }

            return item;
          }),
          cart
        }
      });

      return cart;
    },
    removeFromCartClient: (parent, args, { cache }) => {
      const { cart: lastCart } = cache.readQuery({ query: CART_CLIENT_QUERY });
      const { products: lastProducts } = cache.readQuery({
        query: PRODUCTS_QUERY
      });

      const cart = lastCart.filter(cartItem => cartItem.id !== args.id);

      cache.writeData({
        data: {
          products: lastProducts.map(item => {
            if (item.id === args.id) {
              return {
                ...item,
                isInCart: false
              };
            }

            return item;
          }),
          cart
        }
      });

      return cart;
    }
  },
  Product: {
    isInCart: (parent, args, { cache }) => {
      return false;
    }
  }
};

export default resolvers;
