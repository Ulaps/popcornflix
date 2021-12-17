import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearFilters, setKeywords } from "../redux/filterSlice";
import { getAllActor, clearActors } from '../redux/actorSlice';
import { clearProducers, getAllProducer } from "../redux/producerSlice";
import { clearMovies, getAllMovies } from "../redux/movieSlice";

const Search = ({items, label}) => {

    // const [items, setItem] = useState([]);

    const { keywords } = useSelector(state => state.filter);
    const dispatch = useDispatch();

    const path = window.location.pathname;
    console.log(path);

    // useEffect(() => {
    //     return () => {
    //         dispatch(clearFilters());
    //     }
    // }, [])

    const handleSearch = (e) => {
        // e.preventDefault();
        if(e.key === 'Enter')
        console.log(e,'enter');
        if (path === '/'){dispatch(clearMovies()); dispatch(getAllMovies({...keywords})); return;}
        if (path === '/actors'){dispatch(clearActors()); dispatch(getAllActor({...keywords})); return;}
        if (path === '/producers'){dispatch(clearProducers()); dispatch(getAllProducer({...keywords})); return;}
    }

    const handleOnChange = (e) => {
        e.preventDefault()
        if (path === '/') return dispatch(setKeywords({...keywords, title: e.target.value}));
        if (path === '/actors') return dispatch(setKeywords({...keywords, name: e.target.value}));
        if (path === '/producers') return dispatch(setKeywords({...keywords, name: e.target.value}));
        console.log(e.target.value)
    }

    const handleAutoComplete = (event, value, reason) => {
        event.preventDefault();
        if(reason === 'clear') {
            dispatch(clearFilters());
            switch (path) {
                case '/':
                    dispatch(clearMovies());
                    // dispatch(clearFilters());
                    dispatch(getAllMovies({}));
                    return;
                case '/actors':
                    dispatch(clearActors());
                    // dispatch(clearFilters());
                    dispatch(getAllActor({}));
                    return;
                    case '/producers':
                    dispatch(clearProducers());
                    // dispatch(clearFilters());
                    dispatch(getAllProducer({}));
                    return;
                default:
                    break;
            };  
        }
        // if (path === '/') return dispatch(setKeywords({...keywords, title: value}));
        // if (path === '/actors') return dispatch(setKeywords({...keywords, name: value}));
        // if (path === '/producers') return dispatch(setKeywords({...keywords, name: value}));
        // console.log(event.target.value,value)

    }

    return ( 
        <>
        <Autocomplete
        id="search-bar"
        freeSolo
        options={items && items.map((option) => option.title)}
        renderInput={(params) => <TextField {...params} label={label} 
        onChange={handleOnChange}
        onKeyPress={handleSearch}
        />}
        onChange={handleAutoComplete}
        />
        </>
     );
}
 
export default Search;