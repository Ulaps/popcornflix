import { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getAllMovies, setHasMore } from '../../redux/movieSlice';
import InfiniteScroll from "react-infinite-scroll-component";
import { CardMedia, Grid, Paper } from '@mui/material';

const Mainmovies = () => {
    
    const { movies, moviesCount, filteredMoviesCount, hasMore, page } = useSelector(state => state.movie);
    const dispatch = useDispatch();


    useEffect(() => {
            fetchMoreData()
        }, [])

    console.log(movies);

    const fetchMoreData = () => {
        dispatch (getAllMovies({page}));
        if(movies.length < 0 && movies.length >= filteredMoviesCount) return dispatch(setHasMore(false));
      };
    
    return ( 
        <>

<div>
        <h1>MOVIES</h1>
        <hr />
        <InfiniteScroll
          dataLength={movies.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={movies.length >= filteredMoviesCount ? <h4>NO MORE</h4> : <h4>Loading...</h4>}
        //   endMessage={
        //       <p>end result</p>
        //   }
        >
          <Grid container spacing={2} sx={{p:2}}>
            { movies && movies.map(movie => (
            <Grid item lg={4} md={4} key={movie._id} sm={4} xs={12}>
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
                </Grid>
                ))}
                </Grid>
        </InfiniteScroll>
      </div>
        </>
     );
}
 
export default Mainmovies;