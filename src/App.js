import React, { useState } from "react";
import "./App.css";
import { Button } from "antd";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Product from "./Component/Products/products";
import Employees from "./Component/Employees/employees";
import Harvests from "./Component/Harvests/harvests";
import Invoice from "./Component/Invoice/invoice";
import _ from "lodash";

const tab = [
  {name: "Product", link: "/"},
  {name: "Employees", link: "/Employees"},
  {name: "Harvests", link: "/Harvests"},
  {name: "Invoice", link: "/Invoice"},
]

function App() {
  const [activeTab, setActiveTab] = useState(tab[0].name);

  const handleSetActiveTab = item => {
    setActiveTab(item.name);
  };

  return (
    <div className="App">
      <Router>
        <div>
          <div className="paging-group">
            {_.map(tab, (item, index) => (
              <Link onClick={() => handleSetActiveTab(item)} key={`${item.name}_${index}`} to={item.link}>
                <Button size="large" type={activeTab === item.name ? "primary" : "default"}>
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>
          <Switch>
            <Route path="/Employees">
              <Employees />
            </Route>
            <Route path="/Invoice">
              <Invoice />
            </Route>
            <Route path="/Harvests">
              <Harvests />
            </Route>
            <Route path="/">
              <Product />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
