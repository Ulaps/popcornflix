import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { deleteMovieReview, getMovieInfos } from '../../redux/movieSlice';
import { Box } from '@mui/system';
import { Button, List } from '@mui/material';
import Comment from '../Comment';
import MovieReview from './MovieReview';

const MovieInfos = () => {

    const id = useParams();
    console.log(id);
    const { movie, reviews, userReview } = useSelector(state => state.movie);
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMovieInfos({id, user}))
        return () => {
            console.log(`Cleaned`)
        }
    }, [user])

    // console.log('Ewan asan', movie, userReview);
    return ( 
        <>
        <div style={{padding:'10%'}}>
            <p>{movie && movie.title}</p>
            {
                movie &&
                movie.posters.map(poster => {
                    return <img src={poster.url} alt={poster.public_url}/>
                })
            }
            <p>Genre: {movie && movie.genre}</p>
            <p>Type: {movie && movie.showType}</p>
            <p>Year: {movie && movie.year}</p>
            <p>Movie Rating: {movie && movie.ratings}</p>
            <p>Summary: {movie && movie.summary}</p>
            <h5>Starring: </h5>
            { (movie && movie.staff) && 
                movie.staff.filter(staff => staff.work === 'Actor' || staff.work === 'Actress')
                .map(item => {
                    return <>
                    <Link to={`/actors/${item.user}`} key={item.user}>{item.name}</Link><br/>
                    </>
                })
            }
            <h5>Produced By: </h5>
            { (movie && movie.staff) && 
                movie.staff.filter(staff => staff.work === 'Producer')
                .map(item => {
                    return <>
                    <Link to={`/producers/${item.user}`} key={item.user}>{item.name}</Link><br/>
                    </>
                })
            }

            <Box sx={{m:3}}>
                <h3>Reviews</h3>
                <List sx={{width:'100%', bgcolor:'Background.paper'}}>
                    { reviews && 
                    reviews.map(review => {
                        return <Comment comment={review} key={review._id}/>
                    })
                    }
                    {( userReview && userReview.length > 0) &&
                    <Box sx={{backgroundColor:'#fafafa'}}>
                        <Comment comment={userReview[0]}/>
                        {/* {console.log(userReview)} */}
                        <Button size="small" onClick={() => { dispatch(deleteMovieReview({id:userReview[0]._id, movieId:movie._id})) }}>Delete</Button>
                    </Box> 
                    }
                </List>
                <MovieReview/>
            </Box>

        </div>
        </>
     );
}
 
export default MovieInfos;