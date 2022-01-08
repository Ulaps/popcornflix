import { useEffect, useState } from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux';
import { clearProducers, deleteProducer, getAllProducer, getProducerNames } from '../../redux/producerSlice';
import InfiniteScroll from "react-infinite-scroll-component";
import { Backdrop, Box, Button, CardMedia, CircularProgress, Grid, Paper } from '@mui/material';
import Search from '../Search';
import RatingFilter from '../RatingFilter';
import Snack from '../Snack';
import UpdateProducer from './UpdateProducer';
import CreateProducer from './CreateProducer';

const Producer = () => {
    
    const { staffs, producerNames,  staffsCount, page, message, isLoading } = useSelector(state => state.producer);
    const { keywords } =useSelector(state => state.filter);
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [ snack, setSnack] = useState({message:'', open:false});


    useEffect(() => {
      dispatch(getProducerNames())
      fetchMoreData()
      return () => {
        dispatch(clearProducers());
      }
    }, [])

    console.log(staffs);

    const fetchMoreData = () => {
        dispatch (getAllProducer({...keywords, page}));
      };

      const handleDelete = (e,producer) => {
        e.preventDefault();
        dispatch(deleteProducer(producer));
        setTimeout(() => {
          setSnack({message : message !== '' ? message : 'Producer REMOVED', open:true})
        },1000);
      }
    
    return ( 
        <>

<div>
        <h1>PRODUCERS</h1>
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
          <Search items={producerNames} label="Search Producer"/>
        </Box>
        <Box sx={{m:3}}>
        </Box>
        {
          user && user.role === 'Admin' && <CreateProducer/>
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
            { staffs && staffs.map(staff => (
            <Grid item key={staff._id} xs={3}>
              <Paper elevation={4} sx={{p:2}}>
              <Link to={`/producers/${staff._id}`}>
                <CardMedia
                component="img"
                height="250"
                image={staff.avatar[0].url}
                alt={staff.avatar[0].public_url}
                sx={{pb:2}}
                />
                {staff.name}
                </Link>
                {
                  (user && user.role === 'Admin') && 
                  <div>
                  <UpdateProducer id={staff._id} staff={staff}/>
                  <Button variant='contained'color='error' onClick={(e) => {handleDelete(e,staff._id)}}><DeleteOutlinedIcon /> DELETE </Button>
                  </div>
                }
                </Paper>
                <Box>
                </Box>
                </Grid>
                ))}
                </Grid>
        </InfiniteScroll>
      </div>
        </>
     );
}
 
export default Producer;