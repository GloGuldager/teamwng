import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Reviews from "./pages/Reviews";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Reviews} />
          <Route exact path="/reviews" component={Reviews} />
          <Route exact path="/reviews/:id" component={Detail} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
