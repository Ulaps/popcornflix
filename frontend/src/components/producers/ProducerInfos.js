import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
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
            <p>{staff && staff.name}</p>
            {
                staff &&
                staff.avatar.map(avatar => {
                    return <img src={avatar.url} alt={avatar.public_url}/>
                })
            }
            <p>{staff && staff.work}</p>
            <p>{staff && staff.info}</p>

        </div>
        </>
     );
}
 
export default ProducerInfos;