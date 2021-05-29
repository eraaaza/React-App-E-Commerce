import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axiosInstance from '../../Api'
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
} from 'mdb-react-ui-kit';

const NewListing = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [goHome, setGoHome] = useState(false);
  const [basicModal, setBasicModal] = useState(false);
  const [password, setPassword] = useState("");

  const toggleShow = () => setBasicModal(!basicModal);
  // const toggleGoHome = () => setGoHome(!goHome);

  function submit() {
    const body = {
      "title": title,
      "description": description,
      "type": type,
      "price": price
    };

    toggleShow();

    axiosInstance.post('/listings', body)
      .then((res) => {
        console.log(res.data)
        console.log(res.data.password)
        setPassword(res.data.password)
        //setBasicModal(true)
      })
      .catch((e) => {
        console.log(e)
      })
  };

  if (goHome === true) {
    return <Redirect to='/' />
  }

  return (
    <div>
      <h1 className="fs-1">New Listing</h1>

      <div className="my-2">
        <MDBInput label="Title" type="Text" required onChange={e => setTitle(e.target.value)} />
      </div>
      <div className="my-2">
        <MDBInput label="Description" textarea rows={4} required onChange={e => setDescription(e.target.value)} />
      </div>
      <div className="my-2">
        <MDBInput label="Category" type="text" required onChange={e => setType(e.target.value)} />
      </div>
      <div className="my-2">
        <MDBInput label="Price" type="number" min="0" onChange={e => setPrice(e.target.value)} />
      </div>

      <MDBBtn onClick={submit}>Post Listing</MDBBtn>
      <MDBModal show={basicModal} getOpenState={(e) => setBasicModal(e)} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Listing Posted Succesfully!</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>Please save the following password: {password}. </MDBModalBody>
            <MDBModalBody>It is required to claim listing at a later time. </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn onClick={() => setGoHome(true)}>Return Home</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}

export default NewListing;

