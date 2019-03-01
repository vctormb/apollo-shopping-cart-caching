import React from "react";
import { Route } from "react-router-dom";

// screens
import Home from "./screens/Home";
import Cart from "./screens/Cart";

function App() {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/cart" component={Cart} />
    </div>
  );
}

export default App;
