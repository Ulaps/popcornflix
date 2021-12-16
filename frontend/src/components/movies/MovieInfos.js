import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { getMovieInfos } from '../../redux/movieSlice';

const MovieInfos = () => {

    const id = useParams();
    console.log(id);
    const { movie } = useSelector(state => state.movie);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMovieInfos(id))
        return () => {
            console.log(`Cleaned`)
        }
    }, [])

    console.log('Ewan asan', movie);
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
            <p>{movie && movie.genre}</p>
            <p>{movie && movie.showType}</p>
            <p>{movie && movie.date_released}</p>
            <p>{movie && movie.summary}</p>

        </div>
        </>
     );
}
 
export default MovieInfos;