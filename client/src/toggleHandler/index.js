import React,{useState} from 'react'
import Navbar from '../components/heder/Header'
import Sidebar from '../components/Sidebar'
import LandingPage from '../components/landingPage/LandingPage'
import CustomerRegistration from '../components/customerSection/CustomerRegistration'
import CustomerAddItem from '../components/customerSection/CustomerAddItem'
import BuyerSection from '../components/BuyerSection/Buyer'
import CarrierSection from '../components/carrierSection/CarrierSection'
import Footer from '../components/footer/Footer';
import TrackingSKU from '../components/display/Display';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
      setIsOpen(!isOpen)
  }

    return (
        <>
          <Sidebar isOpen={isOpen} toggle={toggle}/>
          <Navbar toggle={toggle}/>
          <LandingPage />
          <CustomerRegistration />
          <CustomerAddItem />
          <BuyerSection />
          <CarrierSection />
          <TrackingSKU />
          <Footer />
        </>
    )
}
export default Home
