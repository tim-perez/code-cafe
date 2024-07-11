import axios from 'axios';
import PropTypes from 'prop-types';
import { PatternFormat } from 'react-number-format';
import { useRef, useState } from 'react';
import './Cart.css';
import ItemType from '../types/item';
import CartRow from './CartRow';
import Alert from './Alert';
import { CartTypes } from '../reducers/cartReducer';

function Cart({ cart, dispatch, items }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [coupon, setCoupon] = useState('');
  const [isEmployeeOfTheMonth, setIsEmployeeOfTheMonth] = useState(false);
  const debounceRef = useRef(null);
  const zipRef = useRef(null);
  const nameRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [apiError, setApiError] = useState(' ');

  const subTotal = isEmployeeOfTheMonth ? 0 : cart.reduce((acc, item) => {
    const detailItem = items.find((i) => i.itemId === item.itemId);
    const itemPrice = detailItem.salePrice ?? detailItem.price;
    return item.quantity * itemPrice + acc;
  }, 0);

  const taxPercentage = parseInt(zipCode.substring(0, 1) || '0', 10) + 1;
  const taxRate = taxPercentage / 100;
  const tax = subTotal * taxRate;
  const total = subTotal + tax;
  const isFormValid = zipCode.length === 5 && name.trim();

  const submitOrder = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setApiError('');
    const orders = await axios.get('/api/orders');
    const orderNumber = orders.data.length;
    try {
      await axios.post('/api/orders', {
        items: cart,
        name,
        phone,
        zipCode,
      });
      dispatch({ type: CartTypes.EMPTY });
      setShowSuccessAlert(true);
      console.log(`There are ${orderNumber - 1} orders ahead of you.`);
      setName('');
      setPhone('');
      setZipCode('');
    } catch (error) {
      console.error('Error submitting the order:', error);
      setApiError(error?.response?.data?.error || 'Unknown Error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const setFormattedPhone = () => (
    <PatternFormat
      id="phone"
      format="(###) ###-####"
      mask="_"
      value={phone}
      onValueChange={({ value }) => setPhone(value)}
      aria-label="Enter your phone number.
      After a phone number is entered,
      you will automatically be moved to the next field."
    />
  );
  if (phone.length === 10) {
    zipRef.current.focus();
  }

  const onZipChange = (newZip) => {
    if (zipCode.length === 5 && name.trim() === '') {
    nameRef.current.focus();
    }
    setZipCode(newZip);
  };

  const setFormattedCoupon = (newCoupon) => {
    const formatted = newCoupon.toUpperCase();
    setCoupon(formatted);
  };
  const onNameChange = (newName) => {
    setName(newName);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      axios
        .get(`/api/employees/isEmployeeOfTheMonth?name=${newName}`)
        .then((response) => setIsEmployeeOfTheMonth(
          response?.data?.isEmployeeOfTheMonth,
        ))
        .catch(console.error);
    }, 300);
  };

  return (
    <div className="cart-component">
      <Alert visible={showSuccessAlert} type="success">Thank you for your order.</Alert>
      <Alert visible={!!apiError} type="error">
        <p>There was an error submitting your order.</p>
        <p>{apiError}</p>
        <p>Please try again.</p>
      </Alert>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Item</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <CartRow
                  key={item.itemId}
                  cartItem={item}
                  items={items}
                  dispatch={dispatch}
                />
              ))}
            </tbody>
          </table>
          <div>
            Subtotal: $
            {subTotal.toFixed(2)}
          </div>
          { zipCode.length === 5
            ? (
              <>
                <div>
                  Tax: $
                  {tax.toFixed(2)}
                </div>
                <div>
                  Total: $
                  { total.toFixed(2) }
                </div>
              </>
            ) : (
              <div className="warning">Enter ZIP Code to get total</div>
            )}
          <h2>Checkout</h2>
          <form onSubmit={submitOrder}>
            <label htmlFor="name">
              Name
              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => onNameChange(event.target.value)}
                ref={nameRef}
                required
              />
            </label>
            <label htmlFor="phone">
              Phone Number
              {setFormattedPhone()}
            </label>
            <label htmlFor="zipcode">
              Zip Code
              <input
                id="zipCode"
                type="text"
                maxLength="5"
                inputMode="numeric"
                value={zipCode}
                onChange={(event) => onZipChange(event.target.value)}
                required
                ref={zipRef}
              />
            </label>
            <label htmlFor="coupon">
              Coupon Code
              <input
                id="coupon"
                type="text"
                placeholder="Enter coupon code here"
                value={coupon}
                onChange={(event) => setFormattedCoupon(event.target.value)}
              />
            </label>
            <button type="submit" disabled={!isFormValid || isSubmitting}>
              Order Now
            </button>
          </form>
        </>

      )}
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    itemId: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(ItemType).isRequired,
};

export default Cart;
