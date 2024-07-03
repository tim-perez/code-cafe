import axios from 'axios';
import { useEffect, useState, useReducer } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import RewardsTier from './components/RewardsTier';
import DetailItem from './components/DetailItem';
import Details from './components/Details';
import Header from './components/Header';
import Home from './components/Home';
import NotFound from './components/NotFound';
import { cartReducer, CartTypes, initialCartState } from './reducers/cartReducer';

function App() {
  const [items, setItems] = useState([]);
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);
  const addToCart = (itemId) => dispatch({ type: CartTypes.ADD, itemId });

  useEffect(() => {
    axios.get('/api/items')
      .then((result) => setItems(result.data))
      .catch(console.error);
  }, []);

  return (
    <Router>
      <Header title="Code Café" cart={cart} />
      {items.length === 0
        ? <div>Loading...</div>
        : (
          <Routes>
            <Route path="/details" element={<Details items={items} />}>
              <Route
                path=":id"
                element={<DetailItem items={items} dispatch={addToCart} />}
              />
              <Route index element={<div>No Item Selected</div>} />
            </Route>
            <Route path="/" element={<Home items={items} />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/rewards" element={<RewardsTier />}>
              <Route path=":tier" element={<RewardsTier />} />
            </Route>
          </Routes>
        )}
    </Router>
  );
}

export default App;
