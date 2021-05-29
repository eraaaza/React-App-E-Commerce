import React from 'react';
import { Link } from 'react-router-dom';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import moment from 'moment'

const Listing = (props) => {
    return (
        <MDBCard className="my-2">
            <MDBCardBody>
                <MDBCardTitle>
                    <Link to={"/viewListing/" + props.data._id}>{props.data.title}</Link>
                </MDBCardTitle>
                <MDBCardText>
                    {moment(props.data.createdAt).fromNow()}
                </MDBCardText>
            </MDBCardBody>
        </MDBCard>
    )
};

export default Listing;
