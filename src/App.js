import "./app.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/** Layouts **/
import LoginLayoutRoute from "./layouts/LoginLayoutRoute";
import DashboardLayoutRoute from "./layouts/DashboardLayout";

/** Components **/
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import TransactionList from "./pages/transactionList/TransactionList";
import ConfigurationList from "./pages/configurationList/ConfigurationList";
import Configuration from "./pages/configuration/Configuration";

function App() {
  return (
    <Router>
      <Switch>
        <LoginLayoutRoute exact path="/" component={Login} />
        <DashboardLayoutRoute exact path="/dashboard" component={Home} />
        <DashboardLayoutRoute exact path="/users" component={UserList} />
        <DashboardLayoutRoute exact path="/user/:userId" component={User} />
        <DashboardLayoutRoute exact path="/newUser" component={NewUser} />
        <DashboardLayoutRoute exact path="/products" component={ProductList} />
        <DashboardLayoutRoute
          exact
          path="/product/:productId"
          component={Product}
        />
        <DashboardLayoutRoute exact path="/newProduct" component={NewProduct} />
        <DashboardLayoutRoute
          exact
          path="/transactions"
          component={TransactionList}
        />
        <DashboardLayoutRoute
          exact
          path="/configurations"
          component={ConfigurationList}
        />
        <DashboardLayoutRoute
          exact
          path="/configuration/:configId"
          component={Configuration}
        />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </Router>
  );
}

export default App;
