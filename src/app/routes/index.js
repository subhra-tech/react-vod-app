import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">History</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={A} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
      </div>
    </Router>
  );
}

export default AppRouter;