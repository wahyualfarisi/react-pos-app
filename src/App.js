import './App.scss';
import Layout from './hoc/Layout';
import { Switch, Route } from 'react-router-dom';

import Menu from './containers/Menu/Menu';
import Transaction from './containers/Transaction/Transaction';

function App() {
  return (
    <Layout>
         <Switch>
            <Route exact path="/" component={Menu} />
            <Route path="/:id" component={Transaction} />
         </Switch>
    </Layout>
  );
}

export default App;
