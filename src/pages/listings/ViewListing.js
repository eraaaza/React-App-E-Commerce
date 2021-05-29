import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { addListing } from "../../redux/actions/ownerActions"
import { addItem } from "../../redux/actions/cartActions"

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
    MDBDropdown,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBDropdownItem,
    MDBDropdownLink,
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardTitle,
} from 'mdb-react-ui-kit';
import moment from 'moment'
import axiosInstance from '../../Api'

const ViewListing = (props) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cartReducer.items);
    const ownerItems = useSelector(state => state.ownerReducer.items);

    const [Listing, setListing] = useState({});
    const [Password, setPassword] = useState("");
    const [Inquiry, setInquiry] = useState("");
    const [Inquiries, setInquiries] = useState([]);
    const [IsOwner, setIsOwner] = useState(false);
    const [IsInCart, setIsInCart] = useState(false);
    const [goHome, setGoHome] = useState(false);
    const [claimModal, setClaimModal] = useState(false);
    const [inquiryModal, setInquiryModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [inquiriesModal, setInquiriesModal] = useState(false);

    const toggleClaimShow = () => setClaimModal(!claimModal);
    const toggleInquiryShow = () => setInquiryModal(!inquiryModal);
    const toggleDeleteShow = () => setDeleteModal(!deleteModal);
    const toggleInquiriesShow = () => setInquiriesModal(!inquiriesModal);

    function submitInquiry () {
        const body = {
            'text': Inquiry
        };

        toggleInquiryShow();

        axiosInstance.post(`/listings/${props.match.params.id}/inquiries`, body)
            .then((res) => {
                axiosInstance.get(`/listings/${props.match.params.id}`)
                    .then((res) => {
                        setInquiries(res.data.inquiries)
                        // setGoHome(true)
                    })
            })
            .catch((e) => {
                console.log(e)
            });
    };

    function submitPassword () {

        const body = {
            "password": Password
        };

        axiosInstance.post(`/listings/${props.match.params.id}/password`, body)
            .then((res) => {
                dispatch(addListing(Listing._id, Password))
                setIsOwner(true)
                setClaimModal(false)
            })
            .catch((e) => {
                console.log(e)
            })
    };

    function addToCart () {
        if (IsInCart) {
            return
        }

        dispatch(addItem(Listing._id))
        setIsInCart(true)
    }

    function deleteListing () {
        let p = ""

        ownerItems.forEach(item => {
            if (item.id === props.match.params.id) {
                p = item.password;
            }
        });

        const body = {
            "password": p
        };

        axiosInstance.delete(`/listings/${props.match.params.id}`, { data: body })
            .then((res) => {
                setGoHome(true)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    useEffect(() => {
        let t1 = false

        cartItems.forEach(item => {
            if (item === props.match.params.id) {
                t1 = true;
            }
        });

        let t2 = false

        ownerItems.forEach(item => {
            if (item.id === props.match.params.id) {
                t2 = true;
            }
        });

        axiosInstance.get('/listings/' + props.match.params.id)
            .then((res) => {
                setListing(res.data)
                setInquiries(res.data.inquiries)
                console.log(res.data)
            })
            .catch((e) => {
                console.log(e)
            });

        setIsInCart(t1)
        setIsOwner(t2)
    }, [cartItems, ownerItems, props.match.params.id]);

    if (goHome === true) {
        return <Redirect to='/' />
    }

    return (
        <div>
            {!IsOwner &&
                <h1 className="fs-1">{Listing.title}</h1>
            }
            {IsOwner &&
                <h1 className="fs-1">
                    Welcome back {Listing.title} owner!
                    <MDBDropdown class="right-btn">
                        <MDBDropdownToggle>
                            More Info
                        </MDBDropdownToggle>
                        <MDBDropdownMenu>
                            <MDBDropdownItem>
                                <MDBDropdownLink className="my-3" color="danger" block onClick={toggleDeleteShow}>Delete Listing</MDBDropdownLink>
                            </MDBDropdownItem>
                            <MDBDropdownItem>
                                <MDBDropdownLink className="my-3" color="success" block onClick={toggleInquiriesShow}>View Inquiries</MDBDropdownLink>
                            </MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                </h1>
            }
            {
                /**
                <MDBCarousel showIndicators showControls>
                    <MDBCarouselInner>
                        <MDBCarouselItem itemId={0}>
                            <MDBCarouselElement src="https://source.unsplash.com/random/1320x583" alt="Pic"></MDBCarouselElement>
                        </MDBCarouselItem>
                        <MDBCarouselItem itemId={1}>
                            <MDBCarouselElement src="https://source.unsplash.com/random/1320x582" alt="Pic"></MDBCarouselElement>
                        </MDBCarouselItem>
                        <MDBCarouselItem itemId={2}>
                            <MDBCarouselElement src="https://source.unsplash.com/random/1320x584" alt="Pic"></MDBCarouselElement>
                        </MDBCarouselItem>
                    </MDBCarouselInner>
                </MDBCarousel>
                */
            }

            {IsOwner &&
                /*
                <MDBBtn className="my-3" color="danger" block onClick={deleteListing}>Delete</MDBBtn>
                */
                <div>
                    <MDBModal show={deleteModal} getOpenState={(e) => setDeleteModal(e)} tabIndex='-1'>
                        <MDBModalDialog>
                            <MDBModalContent>
                                <MDBModalHeader>
                                    <MDBModalTitle>Delete Listing</MDBModalTitle>
                                </MDBModalHeader>
                                <MDBModalBody>
                                    Pressing the "Delete Listing" button below will result in losing all data attached to this listing. This data will be unretrievable.
                            </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color='secondary' onClick={toggleDeleteShow}>
                                        Close
                                </MDBBtn>
                                    <MDBBtn onClick={deleteListing} color="danger">Delete Listing</MDBBtn>
                                </MDBModalFooter>
                            </MDBModalContent>
                        </MDBModalDialog>
                    </MDBModal>

                    <MDBModal show={inquiriesModal} getOpenState={(e) => setInquiriesModal(e)} tabIndex='-1'>
                        <MDBModalDialog size="fullscreen-xl-down">
                            <MDBModalContent>
                                <MDBModalHeader>
                                    <MDBModalTitle>My Inquiries</MDBModalTitle>
                                </MDBModalHeader>
                                <MDBModalBody>
                                    {/* {onclick = viewInquiries} */}
                                    {Inquiries.map((item, index) => {
                                        return (
                                            <div className='' key={index}>
                                                {
                                                    <MDBCard className='my-2'>
                                                        <MDBCardBody>
                                                            <MDBCardTitle>
                                                                {Listing.title}
                                                            </MDBCardTitle>
                                                            <MDBCardText>
                                                                <div>{item.text}</div>
                                                                <div className=''>
                                                                    <i className='far fa-clock mx-1'></i>
                                                                    <i>{moment(item.createdAt).fromNow()}</i>
                                                                    <p style={{ float: 'right' }}>{index + 1}/{Inquiries.length}</p>
                                                                </div>
                                                            </MDBCardText>
                                                        </MDBCardBody>
                                                    </MDBCard>
                                                }
                                            </div>
                                        );
                                    })}

                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color="secondary" onClick={toggleInquiriesShow}>Close</MDBBtn>
                                </MDBModalFooter>
                            </MDBModalContent>
                        </MDBModalDialog>
                    </MDBModal>

                </div>
            }
            {!IsOwner &&
                <div className="my-3">
                    {
                    /**<MDBInput label="Password" type="password" onChange={e => setPassword(e.target.value)}/>
                    <MDBBtn className="my-3" color="info" block onClick={submitPassword}>Claim Listing</MDBBtn> */}
                    <MDBBtn className="my-3" color="info" block onClick={toggleClaimShow}>Claim Listing</MDBBtn>
                    <MDBModal show={claimModal} getOpenState={(e) => setClaimModal(e)} tabIndex='-1'>
                        <MDBModalDialog>
                            <MDBModalContent>
                                <MDBModalHeader>
                                    <MDBModalTitle>Claim Listing</MDBModalTitle>
                                </MDBModalHeader>
                                <MDBModalBody>
                                    <MDBInput label="Enter listing's password" type="password" onChange={e => setPassword(e.target.value)} />
                                    <div id='textExample1' className='form-text'>
                                        This password was shared with you when created this listing.
                                </div>
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color='secondary' onClick={toggleClaimShow}>
                                        Close
                                </MDBBtn>
                                    <MDBBtn onClick={submitPassword}>Claim</MDBBtn>
                                </MDBModalFooter>
                            </MDBModalContent>
                        </MDBModalDialog>
                    </MDBModal>
                </div>
            }

            <div className="my-2">
                {Listing.description}
            </div>
            <div>
                <i className="far fa-square mx-1"></i>
                {Listing.type}
            </div>
            <div>
                <i className="far fa-money-bill-alt mx-1"></i>
                ${Listing.price}
            </div>
            <div>
                <i className="far fa-clock mx-1"></i>
                {moment(Listing.createdAt).fromNow()}
            </div>
            {!IsOwner &&
                <div className="my-3">
                    {/*
                    <MDBInput label="Inquire" textarea rows={4} onChange={e => setInquiry(e.target.value)}/>
                    <MDBBtn className="my-3" color="primary" block onClick={submitInquiry}>Submit</MDBBtn>
                    */}
                    <MDBBtn color="success" block onClick={addToCart} disabled={IsInCart || IsOwner}>Add to Cart</MDBBtn>
                    <MDBBtn className="my-3" color="warning" block onClick={toggleInquiryShow}>Make Inquiry</MDBBtn>
                    <MDBModal show={inquiryModal} getOpenState={(e) => setInquiryModal(e)} tabIndex='-1'>
                        <MDBModalDialog>
                            <MDBModalContent>
                                <MDBModalHeader>
                                    <MDBModalTitle>Inquiry</MDBModalTitle>
                                </MDBModalHeader>
                                <MDBModalBody>
                                    <MDBInput label="Enter message to Lister" textarea row={4} onChange={e => setInquiry(e.target.value)} />
                                    <div id='textExample1' className='form-text'>
                                        This message will only be shared with the lister.
                                    </div>
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color='secondary' onClick={toggleInquiryShow}>
                                        Close
                                </MDBBtn>
                                    <MDBBtn onClick={submitInquiry}>Submit Inquiry</MDBBtn>
                                </MDBModalFooter>
                            </MDBModalContent>
                        </MDBModalDialog>
                    </MDBModal>

                </div>
            }
        </div>
    )
}

export default ViewListing;


