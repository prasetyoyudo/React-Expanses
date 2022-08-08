import logo from './logo.svg';
import './App.css';
import { Navigate, useRoutes } from 'react-router-dom';
import { Layout } from './layout/layout'
import { AddExpanses } from './layout/add-expanses/add-expanses';

function App() {
  const routes = useRoutes([
    {path: '', element: <Layout />},
  ])
  return routes;
}

export default App;
