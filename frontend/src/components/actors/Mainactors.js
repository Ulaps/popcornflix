import { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getAllActor, setHasMore } from '../../redux/actorSlice';
import InfiniteScroll from "react-infinite-scroll-component";
import { CardMedia, Grid, Paper } from '@mui/material';

const Actor = () => {
    
    const { staffs,  staffsCount, hasMore, page } = useSelector(state => state.actor);
    const dispatch = useDispatch();


    useEffect(() => {
            fetchMoreData()
        }, [])

    console.log(staffs);

    const fetchMoreData = () => {
        dispatch (getAllActor({page}));
        if(staffs.length < 0 && staffs.length >= staffsCount) return dispatch(setHasMore(false));
      };
    
    return ( 
        <>

<div>
        <h1>ACTORS</h1>
        <hr />
        <InfiniteScroll
          dataLength={staffs.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={staffs.length >= staffsCount ? <h4>NO MORE</h4> : <h4>Loading...</h4>}
        //   endMessage={
        //       <p>end result</p>
        //   }
        >
          <Grid container spacing={2} sx={{p:2}}>
            { staffs && staffs.map(staff => (
            <Grid item lg={4} md={4} key={staff._id} sm={4} xs={12}>
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
                </Grid>
                ))}
                </Grid>
        </InfiniteScroll>
      </div>
        </>
     );
}
 
export default Actor;