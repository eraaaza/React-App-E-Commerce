import React, { useState, useEffect } from 'react'
import { io } from "socket.io-client";
import { useAlert } from 'react-alert'
import axiosInstance from '../Api'

import Listing from '../components/Listing'

const HomePage = () => {
    const alert = useAlert()
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const socket = io("ws://localhost:8000");

        socket.on("listingCreated", (data) => {
            // console.log(data)
            alert.show(`${data.title} was just posted.`)
        })

        axiosInstance.get('/listings')
            .then((res) => {
                setListings(res.data.sort((a, b) => b.createdAt - a.createdAt).reverse())
            })
            .catch((e) => {
                console.log(e)
            });
    }, [alert]);

    return (
        <div>
            <h1 className="fs-1">Home</h1>

            {listings.map(listing => (
                <Listing key={listing._id} data={listing}></Listing>
            ))}
        </div>
    )
}

export default HomePage
