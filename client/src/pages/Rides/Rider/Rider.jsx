import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar/Navbar.jsx';
import BookCard from '../../../components/MyRides/book.jsx';
import axios from 'axios';

function Rider({ user,setCurrentChat,currentChat,setIsLoggedIn }) {
  const [bookings, setBookings] = useState([]);
  const [driverNames, setDriverNames] = useState({});
  const [driverPhones, setDriverPhones] = useState({});
  const [driver,setDriver] = useState({});

  useEffect(() => {
    const fetchDriverNames = async () => {
      const names = {};
      const phones = {};
      const driverid={};
      await Promise.all(
        bookings.map(async (booking) => {
          try {
            const res = await axios.get(
              `http://localhost:3001/api/user/getUser/${booking.Driver}`
            );
            names[booking._id] = res.data.user.name;
            phones[booking._id] = res.data.user.phone;
            driverid[booking._id] = res.data.user._id;
          } catch (err) {
            console.error(err);
            names[booking._id] = '';
            phones[booking._id] = '';
            driverid[booking._id]= '';
          }
        })
      );
      setDriverNames(names);
      setDriverPhones(phones);
      setDriver(driverid);
    };

    fetchDriverNames();
  }, [bookings]);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/booking/mybookings/${user._id}`
        );
        console.log(response);
        console.log(response.data)
        setBookings(response.data.book);
      } catch (err) {
        if (err.response && err.response.status === 400) {
          return;
        }
        if (err.response) {
          console.log(err);
        } else {
          console.log(err);
        }
      }
    };

    getBookings();
  }, []);
  const pastBooking = bookings.filter((book)=>{
    const bookDate = new Date(book.Date);
    return bookDate <= new Date();
  })
  const upcomingBooking = bookings.filter((book)=>{
    const bookDate = new Date(book.Date);
    return bookDate > new Date();
  })

  const handleDeleteBooking = async (bookingId) => {
    try {
        await axios.delete(`http://localhost:3001/api/booking/cancelbooking/${bookingId}`);
        // Update bookings state after successful deletion
        setBookings(bookings.filter(booking => booking._id !== bookingId));
    } catch (error) {
        console.error('Error deleting booking:', error);
    }
};

  return (
    <>
    <Navbar user={user} setIsLoggedIn={setIsLoggedIn}/>
      <div className="mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6">Your Bookings</h1>
        <h2 className="text-2xl font-semibold mb-4">Upcoming Bookings</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {upcomingBooking.map((booking) => {
            return <BookCard key={booking._id} onDelete={handleDeleteBooking} driverid={driver[booking._id]} booking={booking} name={driverNames[booking._id] || ''} phone={driverPhones[booking._id] || ''} setCurrentChat={setCurrentChat} currentChat={currentChat}/>;
          })}
        </div>
        <h2 className="text-2xl font-semibold mb-4 mt-8">Past Bookings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pastBooking.map((booking) => (
            <BookCard key={booking._id} onDelete={handleDeleteBooking} driverid={driver[booking._id]} booking={booking} name={driverNames[booking._id] || ''} phone={driverPhones[booking._id] || ''} setCurrentChat={setCurrentChat} currentChat={currentChat}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default Rider;