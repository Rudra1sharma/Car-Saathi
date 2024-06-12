import React from 'react'
import Hero from '../../components/Hero/Hero.jsx'
import Navbar from '../../components/Navbar/Navbar.jsx';
import Analytics from '../../components/Analytics/Analytics.jsx';
import Analytics2 from '../../components/Analytics/Analytics2.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import Analytics3 from '../../components/Analytics/Analytics3.jsx';
function Dashboard ({user,setUser,setIsLoggedIn}){
  return (
    <>
    <Navbar user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>
    <Hero/>
    {/* <Analytics3/> */}
    <Analytics2 />
    <Analytics/>
    <Footer/>
    </>
  )
}
export default Dashboard