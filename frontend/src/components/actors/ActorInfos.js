import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { getActorInfos } from '../../redux/actorSlice';
import { Box, Button, List } from '@mui/material';
import Comment from '../Comment';
import { deleteActorReview } from '../../redux/actorSlice';
import ActorReview from './ActorReview';

const ActorInfos = () => {

    const id = useParams();
    console.log(id);
    const { staff, reviews, userReview } = useSelector(state => state.actor);
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getActorInfos({id, user}))
        return () => {
            console.log(`Cleaned`)
        }
    }, [user])

    console.log('Ewan asan', staff, userReview);
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
            <p>Work : {staff && staff.staff.work}</p>
            <p>Ratings : {staff && staff.staff.ratings}</p>
            <p>Info : {staff && staff.staff.info}</p>
            <h5>Starred At:</h5>
            { staff && staff.movies &&
                staff.movies.map(movie => {
                    return <>
                        <Link to={`/movies/${movie._id}`}>{movie.title}</Link><br/>
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
                        <Button size="small" onClick={() => { dispatch(deleteActorReview({id:userReview[0]._id, staffId:staff.staff._id})) }}>Delete</Button>
                    </Box> 
                    }
                </List>
                <ActorReview/>
            </Box>

        </div>
        </>
     );
}
 
export default ActorInfos;