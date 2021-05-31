import './App.scss';
import Layout from './hoc/Layout';
import { Switch, Route } from 'react-router-dom';

import Menu from './containers/Menu/Menu';

function App() {
  return (
    <Layout>
         <Switch>
            <Route exact component={Menu} />
         </Switch>
    </Layout>
  );
}

export default App;
