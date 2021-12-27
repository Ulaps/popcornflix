import { useEffect, useState } from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux';
import { clearProducers, deleteProducer, getAllProducer, getProducerNames, setHasMore } from '../../redux/producerSlice';
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Button, CardMedia, Grid, Paper } from '@mui/material';
import Search from '../Search';
import { setKeywords } from '../../redux/filterSlice';
import RatingFilter from '../RatingFilter';
import Snack from '../Snack';

const Producer = () => {
    
    const { staffs, producerNames,  staffsCount, hasMore, page, message } = useSelector(state => state.producer);
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
              <Link to={`/producers/${staff._id}`}>
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
                <Box>
                {
                  (user && user.role === 'Admin') && <Button variant='contained'color='error' onClick={(e) => {handleDelete(e,staff._id)}}><DeleteOutlinedIcon /> DELETE </Button>
                }
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