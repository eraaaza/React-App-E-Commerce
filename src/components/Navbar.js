import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import {
    MDBContainer,
    MDBBtn,
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse,
    MDBIcon
} from 'mdb-react-ui-kit';

const Navbar = (props) => {
    const cartItems = useSelector(state => state.cartReducer.items);

    const [showNav, setShowNav] = useState(false);

    return (
        <MDBNavbar expand="lg" className="shadow-1">
            <MDBContainer>
                <Link to="/">
                    <img src='https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.png' height='30' alt='Logo' loading='lazy' />
                </Link>
                <MDBNavbarToggler type='button' onClick={() => setShowNav(!showNav)}>
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse navbar show={showNav}>
                    <MDBNavbarNav right fullWidth={false}>
                        <MDBNavbarItem>
                            <MDBNavbarLink>
                                <Link to="/">Home</Link>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink>
                                <Link to="/checkout">Cart ({cartItems.length})</Link>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBBtn outline rounded color="secondary">
                                <Link to="/newListing">New Listing</Link>
                            </MDBBtn>
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}

export default Navbar;
