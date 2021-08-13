import './App.scss';
import Layout from './hoc/Layout';
import { Switch, Route } from 'react-router-dom';

import Menu from './containers/Menu/Menu';
import Transaction from './containers/Transaction/Transaction';
import DetailTransaction from './containers/Transaction/DetailTransaction/DetailTransaction';

function App() {
  return (
    <Layout>
         <Switch>
            <Route exact path="/" component={Menu} />
            <Route exact path="/transaction/" component={Transaction} />
            <Route path="/transaction/:id" component={DetailTransaction} />
         </Switch>
    </Layout>
  );
}

export default App;
