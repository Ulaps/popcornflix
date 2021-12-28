import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux';
import { clearMovies, deleteMovie, getAllMovies, getMovieTitles, setHasMore } from '../../redux/movieSlice';
import InfiniteScroll from "react-infinite-scroll-component";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { CardMedia, Grid, Paper, Button } from '@mui/material';
import Search from '../Search';
import { Box } from '@mui/system';
import RatingFilter from '../RatingFilter';
import YearFilter from '../YearFilter';
import Snack from '../Snack';
import CreateMovie from './CreateMovie';
import { clearActorNames, getActorNames } from '../../redux/actorSlice';
import { clearProducerNames, getProducerNames } from '../../redux/producerSlice';

const Mainmovies = () => {
    
    const { movies, movieTitles, moviesCount, filteredMoviesCount, hasMore, page, message } = useSelector(state => state.movie);
    const { keywords } = useSelector(state => state.filter)
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [snack, setSnack] = useState({message:'', open:false})


    useEffect(() => {
      // get ng mga names ng actor at producer para sa option sa form ng create at update
      dispatch(getActorNames());
      dispatch(getProducerNames());

      dispatch(getMovieTitles());
      fetchMoreData()

      return () => {
        dispatch(clearMovies());
        dispatch(clearActorNames());
        dispatch(clearProducerNames());
      }
    }, [])

    console.log(movies);

    const fetchMoreData = () => {
        dispatch (getAllMovies({page, ...keywords}));
      };

    const handleDelete = (e,movie) => {
      e.preventDefault();
      dispatch(deleteMovie(movie));
      setTimeout(() => {
        setSnack({message : message !== '' ? message : 'Movie REMOVED', open:true})
      },1000);
    }
    
    
    return ( 
        <>

<div>
        <h1>MOVIES</h1>
        <hr />
        { snack &&
        <Snack
        handleOnClose={() => {setSnack({...snack,open:false})}}
        message={snack.message}
        snackState={snack.open}
        timeOpen={5000}
        />
        }
        <Box sx={{m:3}}>
          <Search items={movieTitles} label="Search Movie"/>
        </Box>
        <Box sx={{m:3}}>
          <RatingFilter/>
          <YearFilter/>
        </Box>
        {
          user && user.role === 'Admin' && <CreateMovie/>
        }
        <InfiniteScroll
          dataLength={movies.length}
          next={fetchMoreData}
          hasMore={movies.length >= filteredMoviesCount ? false : true}
          loader={movies.length >= filteredMoviesCount ? <h4>NO MORE</h4> : <h4>Loading...</h4>}
          endMessage={
              <p>END</p>
          }
        >
          <Grid container spacing={2} sx={{p:2}}>
            { movies.map(movie => (
            <Grid item lg={4} md={4} key={movie._id} sm={4} xs={12}>
              <Paper elevation={4} sx={{p:2}}>
              <Link to={`/movies/${movie._id}`}>
                <CardMedia
                component="img"
                height="194"
                image={movie.posters[0].url}
                alt={movie.posters[0].public_url}
                sx={{pb:2}}
                />
                {movie.title}
                </Link>
                <Box>
                {
                  (user && user.role === 'Admin') && <Button variant='contained'color='error' onClick={(e) => {handleDelete(e,movie._id)}}><DeleteOutlinedIcon /> DELETE </Button>
                }
                </Box>
                </Paper>
                </Grid>
                ))}
                </Grid>
        </InfiniteScroll>
      </div>
        </>
     );
}
 
export default Mainmovies;