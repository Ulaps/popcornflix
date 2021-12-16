import * as React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Movie from './components/movies/MainMovies';
import Actor from './components/actors/MainActors';
import Producer from './components/producers/MainProducers';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Backdrop, Paper} from '@mui/material';
import LoginForm from './components/Login';
import RegisterForm from './components/Register';
import { getUserDetails } from './redux/userSlice';
import ActorInfos from './components/actors/ActorInfos';
import MovieInfos from './components/movies/MovieInfos';
import ProducerInfos from './components/producers/ProducerInfos';

function App() {

  const { email, isLogin, onRegister } = useSelector( state => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if(!localStorage.getItem('id')) return 'No user'
    dispatch(getUserDetails({id:localStorage.getItem('id')}))
    return () => {
      console.log(`Cleaned`)
    }
  }, [dispatch])

  return (
    <Router>
    <div className="App" style={{overflowY:'scroll'}}>
      { !isLogin && 
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
              <Paper elevation={6} sx={{ p:4, m:2}}>
                <Alert severity="info">Please Login or Sign Up first to access this website</Alert>
                { onRegister &&
                  <RegisterForm/>
                }
                { !onRegister &&
                  <LoginForm/>
                }
              </Paper>
          </Backdrop>

      }
      <Navbar />

      <Routes>
        <Route exact path="/" element={ <Movie/>} />
        <Route exact path="/movies/:id" element={ <MovieInfos/>} />
        <Route exact path="/actors" element={ <Actor/>} />
        <Route exact path="/actors/:id" element={ <ActorInfos/>} />
        <Route exact path="/producers" element={ <Producer/>} />
        <Route exact path="/producers/:id" element={ <ProducerInfos/>} />
      </Routes>


    </div>
    </Router>
  );
}

export default App;
