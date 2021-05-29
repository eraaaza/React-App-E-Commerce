import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../Api'
import { clearItem } from "../redux/actions/cartActions"
import {
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCheckbox,
  MDBValidation
} from 'mdb-react-ui-kit';

const Checkout = (props) => {
  const cartItems = useSelector(state => state.cartReducer.items);
  const dispatch = useDispatch();
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [goHome, setGoHome] = useState(false);

  const toggleCheckoutShow = () => setCheckoutModal(!checkoutModal);
  const toggleGoHome = () => setGoHome(!goHome);

  const [formValue, setFormValue] = useState({
    name: '',
    cardNum: '',
    expiration: '',
    cvv: ''
  });

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  if (goHome === true) {
    return <Redirect to='/' />
  }

  function submit() {
    console.log("calling payments")
    const body = {
      cart: cartItems
    };
    axiosInstance.post('/payments', body)
      .then((res) => {
        console.log("payment call success")
        dispatch(clearItem())
        setGoHome(true)
      })
      .catch((e) => {
        console.log(e)
      })
  };

  return (
    <div>
      <h1 className="fs-1">Checkout</h1>

      <MDBCard className="my-2">
        <MDBCardBody>
          <MDBCardTitle>
            <h3>Listings</h3>
            {cartItems.map(listing => (
              <div key={listing}>{listing}</div>
            ))}
          </MDBCardTitle>
          <MDBBtn className="my-3" color="success" block onClick={toggleCheckoutShow}>Checkout</MDBBtn>
        </MDBCardBody>
      </MDBCard>
      <MDBModal show={checkoutModal} getOpenState={(e) => setCheckoutModal(e)} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Payment Information</MDBModalTitle>
            </MDBModalHeader>
            <MDBValidation noValidate>
              <MDBModalBody>
                <div>
                  <div className='col-md-4'>
                    <MDBInput
                      validationTooltip
                      label='Name on card'
                      id='validationTooltip05'
                      name='name'
                      value={formValue.name}
                      onChange={onChange}
                      required
                      invalid
                    />
                  </div>
                    &nbsp;
                    <div className='col-md-6 position-relative'>
                    <MDBInput
                      validation='Please provide a valid card number.'
                      validationTooltip
                      label='Card number'
                      id='validationTooltip05'
                      name='cardNum'
                      value={formValue.cardNum}
                      onChange={onChange}
                      required
                      invalid
                    />
                  </div>
                    &nbsp;
                    <div className='col-md-6 position-relative'>
                    <MDBInput
                      validation='Please provide a valid expiration date.'
                      validationTooltip
                      label='Expiration'
                      id='validationTooltip02'
                      name='expiration'
                      value={formValue.expiration}
                      onChange={onChange}
                      required
                      invalid
                    />
                  </div>
                    &nbsp;
                    <div className='col-md-2 position-relative'>
                    <MDBInput
                      validation='Please provide a valid CVV.'
                      validationTooltip
                      label='CVV'
                      id='validationTooltip05'
                      name='cvv'
                      value={formValue.cvv}
                      onChange={onChange}
                      required
                      invalid
                    />
                  </div>
                    &nbsp;
                    <div className="col-20">
                    <MDBCheckbox
                      ValidationTooltip
                      label='Agree to terms and conditions'
                      id='validationTooltip06'
                      validation='You must agree before submitting.'
                      invalid
                      required
                    />
                  </div>
                </div>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color='secondary' onClick={toggleCheckoutShow}>
                  Close
                </MDBBtn>
                <MDBBtn type='submit' onClick={submit}>Submit Payment</MDBBtn>
              </MDBModalFooter>
            </MDBValidation>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  )
};

export default Checkout;
