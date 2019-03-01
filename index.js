const { ApolloServer, gql } = require("apollo-server");

const products = [
  {
    id: "1",
    title: "Spaceship",
    price: 2.0
  },
  {
    id: "2",
    title: "Submarine",
    price: 1.0
  },
  {
    id: "3",
    title: "Flying Saucer",
    price: 3.5
  }
];

let cart = [];

const typeDefs = gql`
  type Product {
    id: ID!
    title: String!
    price: Float!
  }

  type Query {
    products: [Product]!
    cart: [Product]!
  }

  type Mutation {
    checkout(productIds: [String!]): [Product]!
  }
`;

const resolvers = {
  Query: {
    products: () => products,
    cart: () => cart
  },
  Mutation: {
    checkout: (parent, args, context) => {
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
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
