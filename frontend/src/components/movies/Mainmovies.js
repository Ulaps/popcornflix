import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux';
import { clearMovies, getAllMovies, getMovieTitles, setHasMore } from '../../redux/movieSlice';
import InfiniteScroll from "react-infinite-scroll-component";
import { CardMedia, Grid, Paper } from '@mui/material';
import Search from '../Search';
import { Box } from '@mui/system';
import RatingFilter from '../RatingFilter';
import YearFilter from '../YearFilter';

const Mainmovies = () => {
    
    const { movies, movieTitles, moviesCount, filteredMoviesCount, hasMore, page } = useSelector(state => state.movie);
    const { keywords } = useSelector(state => state.filter)
    const dispatch = useDispatch();


    useEffect(() => {
      dispatch(getMovieTitles());
      fetchMoreData()

      return () => {
        dispatch(clearMovies());
      }
    }, [])

    console.log(movies);

    const fetchMoreData = () => {
        dispatch (getAllMovies({page, ...keywords}));
        // if(movies.length < 0 && movies.length >= filteredMoviesCount) return dispatch(setHasMore(false));
      };
    
    return ( 
        <>

<div>
        <h1>MOVIES</h1>
        <hr />
        <Box sx={{m:3}}>
          <Search items={movieTitles} label="Search Movie"/>
        </Box>
        <Box sx={{m:3}}>
          <RatingFilter/>
          <YearFilter/>
        </Box>
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
            { movies && movies.map(movie => (
            <Grid item lg={4} md={4} key={movie._id} sm={4} xs={12}>
              <Link to={`/movies/${movie._id}`}>
              <Paper elevation={4} sx={{p:2}}>
                <CardMedia
                component="img"
                height="194"
                image={movie.posters[0].url}
                alt={movie.posters[0].public_url}
                sx={{pb:2}}
                />
                {movie.title}
                </Paper>
                </Link>
                </Grid>
                ))}
                </Grid>
        </InfiniteScroll>
      </div>
        </>
     );
}
 
export default Mainmovies;