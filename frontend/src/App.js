import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Nav from './Components/Nav';
import Home from './Components/Home';
import About from './Components/About';
import Footer from './Components/Footer';
import Profile from './Components/Profile';
import Dubai from './Components/Dubai';
import Privacy  from './Components/Privacy';
import Termscondition  from './Components/Termscondition';
import Thailand from './Components/Thailand';
import Russia from './Components/Russia';
import Uzbekistan from './Components/Uzbekistan';
import Vietnam from './Components/Vietnam';
import Indonesia from './Components/Indonesia';
import Combodia from './Components/Combodia';
//import USA from './Components/USA';
import Hongkong from './Components/Hongkong';
//import Egypt from './Components/Egypt';
import Srilanka from './Components/Srilanka';
import Greece from './Components/Greece';
import Azerbaijan from './Components/Azerbaijan';
import France from './Components/France';
import Malasia from './Components/Malasia';
import Uk from './Components/Uk';
import Turkey from './Components/Turkey';
import Australia from './Components/Australia';
import Japan from './Components/Japan';
import Italy from './Components/Italy';
import Germany from './Components/Germany';
import Spain from './Components/Spain';
import Southkorea from './Components/Southkorea';
import Contact from './Components/Contact';
import Apply from './Components/Apply';
import Reviews from './Components/Reviews';
import ThailandTDACForm from './Components/ThailandTDACForm';
import Documents from './Components/Documents';
import NotFound from './Components/NotFound';
import Aichat from './Components/Aichat';
import ThailandBooking from './Components/ThailandBooking';
//import Payment from './Components/Payment';
//import Thankyou from './Components/Thankyou';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/Profile' element={<Profile />} />
         <Route path='/Privacy' element={<Privacy />} />
           <Route path='/Termscondition' element={<Termscondition />} />
                <Route path='/Contact' element={<Contact />} />
                 
                <Route path='/Reviews' element={<Reviews />} />
                <Route path="*" element={<NotFound />} />

                
        

        {/* Visa Pages */}
        <Route path='/visa/Dubai' element={<Dubai />} />
         <Route path='/visa/Thailand' element={<Thailand />} />
          <Route path='/visa/Azerbaijan' element={<Azerbaijan />} />
           <Route path='/visa/Russia' element={<Russia />} />
           <Route path='/visa/Vietnam' element={<Vietnam />} />
            <Route path='/visa/Srilanka' element={<Srilanka />} />
      <Route path='/visa/Hongkong' element={<Hongkong />} />
      <Route path='/visa/Uzbekistan' element={<Uzbekistan />} />
       <Route path='/visa/Indonesia' element={<Indonesia />} />
        <Route path='/visa/France' element={<France />} />
          <Route path='/visa/Malasia' element={<Malasia />} />
        <Route path='/visa/Turkey' element={<Turkey />} />
          <Route path='/visa/Australia' element={<Australia />} />
           <Route path='/visa/Japan' element={<Japan />} />
              <Route path='/visa/Italy' element={<Italy />} />
               <Route path='/visa/Germany' element={<Germany />} />
                      <Route path='/visa/Southkorea' element={<Southkorea />} />
           <Route path='/visa/Spain' element={<Spain />} />
               <Route path='/visa/Greece' element={<Greece />} />
                 <Route path='/visa/Combodia' element={<Combodia />} />
                  <Route path='/visa/Uk' element={<Uk />} />

               {/* Apply requirments */}
                <Route path='/Documents' element={<Documents />} />
                <Route path='/Apply' element={<Apply />} />
                  <Route path='/ThailandTDACForm' element={<ThailandTDACForm />} />
                  <Route path='/ThailandBooking' element={<ThailandBooking />} />
                   
       
      </Routes>
      < Aichat />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
