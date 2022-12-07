import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/details/:userId" component={Details} />
    </Switch>
  );
};

export default App;
