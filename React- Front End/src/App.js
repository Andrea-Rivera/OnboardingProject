import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Customers } from './components/Customers/CustomerIndex';
import { Products } from './components/Products/ProductIndex';
import { Stores } from './components/Stores/StoreIndex';
import { Sales } from './components/Sales/SalesIndex';

function App() {
  return (
    <BrowserRouter>
    <div className="container">

        <h1 >Onboarding Task</h1>
        <div className="ui inverted segment">
            <div className="ui inverted secondary menu">
                <a href="/" className=" item">Customers</a>
                <a href="/Products" className="item">Products</a>
                <a href="/Stores" className="item">Stores</a>
                <a href="/Sales" className="item">Sales</a>
            </div>
        </div>

       

        <Switch>
            <Route path='/' component={Customers} exact />
            <Route path='/Products' component={Products} exact />
            <Route path='/Stores' component={Stores} exact />
            <Route path='/Sales' component={Sales} exact />
            
          
           
        </Switch>
    </div>
</BrowserRouter>
  );
}

export default App;
