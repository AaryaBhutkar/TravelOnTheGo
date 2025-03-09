import './App.css';
import Form from './modules/Form';
import HomePage from './modules/HomePage/HomePage';
import SignIn from './modules/Form/sign_in';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContextProvider } from './components/ToastContext';
import Mappu from './components/Mappu';
import FeedBack from './components/FeedBack';
import ItinerarySuggestions from './components/Itinerary';

const ProtectedRoute = ({children, auth=false}) => {
  const isLoggedIn = localStorage.getItem('user:token') !== null || false;
  if(!isLoggedIn && auth){ 
    return <Navigate to={'/users/sign_in'} />
  }else if(isLoggedIn && ['/users/sign_in', '/users/sign_up'].includes(window.location.pathname)){
    return <Navigate to={'/'} />
  }
  return children;
}

function App() {
  return (
    <ToastContextProvider>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute auth={true}>
            <HomePage/>
          </ProtectedRoute>
        }/> 
        
        <Route path='/users/sign_in' element={
          <ProtectedRoute>
            <SignIn/>
          </ProtectedRoute>
        }/>

        <Route path='/users/sign_up' element={
          <ProtectedRoute>
            <Form/>
          </ProtectedRoute>
        }/>

        <Route path='/maps' element={
          <Mappu/>
        }/>

        <Route path='/feedback' element={
          <FeedBack/>
        }/>

        <Route path='/itinerary' element={
          <ProtectedRoute auth={true}>
            <ItinerarySuggestions/>
          </ProtectedRoute>
        }/>
      </Routes>
    </ToastContextProvider>
  );
}

export default App;