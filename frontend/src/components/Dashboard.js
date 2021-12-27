import { useDispatch, useSelector } from "react-redux";
import Grid from '@mui/material/Grid'
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@mui/material";
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import { useEffect } from "react";
import { getTopRatedActors, getTopRatedMovies, getTopRatedTvShows } from "../redux/dashboardSlice";
import PopularGenre from "./PopularGenre";
import PopularMovies from "./PopularMovies";
import GrossingFilms from "./GrossingFilms";
import GrossingTvShows from "./GrossingTvShows";
import { getAllMovies } from "../redux/movieSlice";

const Dashboard = () => {

    const { moviesCount } = useSelector(state => state.movie)
    const { topRatedMovies, topRatedTvShows, topRatedActors } = useSelector(state => state.dashboard)
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getAllMovies({}));
        dispatch(getTopRatedMovies());
        dispatch(getTopRatedTvShows());
        dispatch(getTopRatedActors());
    },[dispatch])

    console.log(topRatedMovies);

    return (
        <>
        <Grid container spacing={3} justifyContent="center" sx={{mt:6,p:3}}>
            {/* BILANG NG SHOWS */}
            <Paper sx={{padding:'1%',borderRadius:'10px', display:'flex', justifyContent:'center', alignItems:'center'}} elevation={6}>
                <LocalMoviesIcon sx={{color:"#1e88e5", backgroundColor:"#b3e5fc", padding:'8px', borderRadius:'50%'}}/>
                <strong>Total number of shows : {moviesCount}</strong>
            </Paper>
        </Grid>
        
        <Grid container spacing={2} sx={{p:3}}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid container spacing={3} justifyContent="center">
                    
                    {/* TOP RATED MOVIES */}
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                        <Paper sx={{p:1, borderRadius:'10px'}} elevation={6}>
                            <List>
                                <ListItem>
                                    <Typography variant="subtitl1" component="div">
                                        <strong>Top 10 Highest Rated Movies</strong>
                                    </Typography>
                                </ListItem>
                                { topRatedMovies &&
                                    topRatedMovies.map(top => {
                                        return(
                                        <ListItem key={top._id.substr(6)}>
                                            <ListItemAvatar>
                                                <Avatar src={top.avatar} alt={top.title} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={top.title}
                                            />
                                        </ListItem>
                                        )
                                    })
                                }
                            </List>
                        </Paper>
                    </Grid>

                    {/* TOP RATED SHOWS */}
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                        <Paper sx={{p:1, borderRadius:'10px'}} elevation={6}>
                            <List>
                                <ListItem>
                                    <Typography variant="subtitl1" component="div">
                                        <strong>Top 10 Highest Rated TV Shows</strong>
                                    </Typography>
                                </ListItem>
                                { topRatedTvShows &&
                                    topRatedTvShows.map(top => {
                                        return(
                                        <ListItem key={top._id.substr(6)}>
                                            <ListItemAvatar>
                                                <Avatar src={top.avatar} alt={top.title} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={top.title}
                                            />
                                        </ListItem>
                                        )
                                    })
                                }
                            </List>
                        </Paper>
                    </Grid>

                    {/* TOP RATED ACTORS */}
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                        <Paper sx={{p:1, borderRadius:'10px'}} elevation={6}>
                            <List>
                                <ListItem>
                                    <Typography variant="subtitl1" component="div">
                                        <strong>Top 10 Highest Rated Actors</strong>
                                    </Typography>
                                </ListItem>
                                { topRatedActors &&
                                    topRatedActors.map(top => {
                                        return(
                                        <ListItem key={top._id.substr(6)}>
                                            <ListItemAvatar>
                                                <Avatar src={top.avatar} alt={top.name} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={top.name}
                                            />
                                        </ListItem>
                                        )
                                    })
                                }
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid container spacing={3} justifyContent="center">
                    {/* TOP GROSSING FILMS */}
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                        <Paper sx={{marginTop:'4%',padding:'3%',borderRadius:'10px', display:'flex', justifyContent:'center', alignItems:'center'}} elevation={6}>
                            <GrossingFilms/>
                        </Paper>
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                        {/* POPULAR GENRE */}
                        <Paper sx={{padding:'3%',borderRadius:'10px', display:'flex', justifyContent:'center', alignItems:'center'}} elevation={6}>
                            <PopularGenre/>
                        </Paper>
                        {/* TOP GROSSING TV SHOW */}
                        <Paper sx={{marginTop:'4%',padding:'3%',borderRadius:'10px', display:'flex', justifyContent:'center', alignItems:'center'}} elevation={6}>
                            <GrossingTvShows/>
                        </Paper>
                    </Grid>
                    {/* POPULAR MOVIES */}
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                        <Paper sx={{padding:'5%',borderRadius:'10px', display:'flex', justifyContent:'center', alignItems:'center'}} elevation={6}>
                            <PopularMovies/>
                        </Paper>
                    </Grid>
                </Grid>
                    
              </Grid>
            </Grid>
        </>
    );
}
 
export default Dashboard;