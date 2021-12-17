import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux';
import { clearActors, getActorNames, getAllActor, setHasMore } from '../../redux/actorSlice';
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, CardMedia, Grid, Paper } from '@mui/material';
import Search from '../Search';
import RatingFilter from '../RatingFilter';

const Actor = () => {
    
    const { staffs, actorNames, staffsCount, hasMore, page } = useSelector(state => state.actor);
    const { keywords } = useSelector(state => state.filter);
    const dispatch = useDispatch();


    useEffect(() => {
      dispatch(getActorNames())
      fetchMoreData()
      return () => {
        dispatch(clearActors());
      }
    }, [])

    console.log(staffs);

    const fetchMoreData = () => {
        dispatch (getAllActor({...keywords, page}));
        // if(staffs.length < 0 && staffs.length >= staffsCount) return dispatch(setHasMore(false));
      };
    
    return ( 
        <>

<div>
        <h1>ACTORS</h1>
        <hr />
        <Box sx={{m:3}}>
          <Search items={actorNames} label="Search Actor"/>
        </Box>
        <Box sx={{m:3}}>
          <RatingFilter/>
        </Box>
        <InfiniteScroll
          dataLength={staffs.length}
          next={fetchMoreData}
          hasMore={staffs.length >= staffsCount ? false : true}
          loader={staffs.length >= staffsCount ? <h4>NO MORE</h4> : <h4>Loading...</h4>}
          endMessage={
              <p>END</p>
          }
        >
          <Grid container spacing={2} sx={{p:2}}>
            { staffs && staffs.map(staff => (
            <Grid item lg={4} md={4} key={staff._id} sm={4} xs={12}>
              <Link to={`/actors/${staff._id}`}>
              <Paper elevation={4} sx={{p:2}}>
                <CardMedia
                component="img"
                height="194"
                image={staff.avatar[0].url}
                alt={staff.avatar[0].public_url}
                sx={{pb:2}}
                />
                {staff.name}
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
 
export default Actor;