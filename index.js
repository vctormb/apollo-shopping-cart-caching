const { ApolloServer, gql } = require("apollo-server");

const products = [
  {
    id: "1",
    title: "Spaceship",
    price: "2.000"
  },
  {
    id: "2",
    title: "Submarine",
    price: "500"
  },
  {
    id: "3",
    title: "Flying Saucer",
    price: "3.500"
  }
];

let cart = [];

const typeDefs = gql`
  type Product {
    id: String
    title: String
    price: Float
  }

  type Query {
    products: [Product]!
    cart: [Product]!
  }

  type Mutation {
    addToCart(productIds: [String!]): [Product]!
    removeFromCart(productId: String!): Product
  }
`;

const resolvers = {
  Query: {
    products: () => products,
    cart: () => cart
  },
  Mutation: {
    addToCart: (parent, args, context) => {
      products.forEach(p => {
        args.productIds.forEach(pId => {
          if (p.id === pId) {
            const hasProductInCart = cart.some(x => x.id === pId);

            if (!hasProductInCart) {
              const product = products.filter(x => x.id === pId)[0];

              cart.push(product);
            }
          }
        });
      });

      return cart;
    },
    removeFromCart: (parent, args, context) => {
      const product = cart.filter(x => x.id === args.productId)[0];

      cart = cart.filter(x => x.id !== args.productId);

      return product;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
