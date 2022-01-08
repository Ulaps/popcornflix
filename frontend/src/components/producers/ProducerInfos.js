import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { getProducerInfos } from '../../redux/producerSlice';

const ProducerInfos = () => {

    const id = useParams();
    console.log(id);
    const { staff } = useSelector(state => state.producer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducerInfos(id))
        return () => {
            console.log(`Cleaned`)
        }
    }, [])

    console.log('Ewan asan', staff);
    return ( 
        <>
        <div style={{padding:'10%'}}>
            <p>Name : {staff && staff.staff.name}</p>
            {
                staff &&
                staff.staff.avatar.map(avatar => {
                    return <img src={avatar.url} alt={avatar.public_url}/>
                })
            }
            <p>Info : {staff && staff.staff.info}</p>
            <h5>Produced Movies:</h5>
            { staff && staff.movies &&
                staff.movies.map(movie => {
                    return <>
                        <Link to={`/movies/${movie._id}`}>{movie.title}</Link><br/>
                    </>
                })
            }

        </div>
        </>
     );
}
 
export default ProducerInfos;