import Signup from './pages/Signup/Signup.jsx';
import SignIn from './pages/SignIn/SignIn.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';



function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>

          <Route path="/" element={<SignIn />} />
          <Route path="/SignIn" element={<SignIn/>} />
          
          <Route path="/Signup" element={<Signup/>} />
          
        </Routes>
      </BrowserRouter>   
    </>
    
  );
}

export default App;