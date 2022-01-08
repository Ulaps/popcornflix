import { useEffect, useState } from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux';
import { clearActors, deleteActor, getActorNames, getAllActor, setHasMore } from '../../redux/actorSlice';
import InfiniteScroll from "react-infinite-scroll-component";
import { Backdrop, Box, Button, CardMedia, CircularProgress, Grid, Paper } from '@mui/material';
import Search from '../Search';
import RatingFilter from '../RatingFilter';
import Snack from '../Snack';
import CreateActor from './CreateActor';
import UpdateActor from './UpdateActors';

const Actor = () => {
    
    const { staffs, actorNames, staffsCount, hasMore, page, message, isLoading } = useSelector(state => state.actor);
    const { keywords } = useSelector(state => state.filter);
    const { user } = useSelector(state => state.user); 
    const dispatch = useDispatch();
    const [snack, setSnack] = useState({message:'', open:false});


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
      };

      const handleDelete = (e,actor) => {
        e.preventDefault();
        dispatch(deleteActor(actor));
        setTimeout(() => {
          setSnack({message : message !== '' ? message : 'Actor REMOVED', open:true})
        },1000);
      }
    
    return ( 
        <>

<div>
        <h1>ACTORS</h1>
        <hr />
        { isLoading &&
            <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
            onClick={false}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        }
        { snack &&
        <Snack
        handleOnClose={() => {setSnack({...snack,open:false})}}
        message={snack.message}
        snackState={snack.open}
        timeOpen={5000}
        />
        }
        <Box sx={{m:3}}>
          <Search items={actorNames} label="Search Actor"/>
        </Box>
        <Box sx={{m:3}}>
          <RatingFilter/>
        </Box>
        {
          user && user.role === 'Admin' && <CreateActor/>
        }
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
            { staffs.map(staff => (
            <Grid item key={staff._id} xs={3}>
              <Paper elevation={4} sx={{p:2}}>
              <Link to={`/actors/${staff._id}`}>
                <CardMedia
                component="img"
                height="250"
                image={staff.avatar[0].url}
                alt={staff.avatar[0].public_url}
                sx={{pb:2}}
                />
                {staff.name}
                  </Link>
                <Box>
                {
                  (user && user.role === 'Admin') && 
                  <div>
                    <UpdateActor id={staff._id} staff={staff}/>
                    <Button variant='contained'color='error' onClick={(e) => {handleDelete(e,staff._id)}}><DeleteOutlinedIcon /> DELETE </Button>
                  </div>
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
 
export default Actor;