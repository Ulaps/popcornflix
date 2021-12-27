import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearMovies, getAllMovies } from '../redux/movieSlice';
import { setKeywords } from '../redux/filterSlice';

const YearFilter = () => {

    const [value, setValue] = useState(new Date());
    const { keywords } = useSelector(state => state.filter);
    const dispatch = useDispatch();

    const path = window.location.pathname

    useEffect(() => {
        if(keywords !== null && keywords.hasOwnProperty('year')) {
            switch (path) {
                case '/':
                    dispatch(clearMovies());
                    dispatch(getAllMovies({...keywords}))
                    break;
                    default:
                        break;
                    }
                }
    }, [value])

    return ( 
        <>
         <LocalizationProvider dateAdapter={AdapterDateFns}>
                 <DatePicker
                 views={['year']}
                 label="Year only"
                 value={value}
                 onChange={(newValue) => {
                     setValue(newValue);
                     dispatch(setKeywords({...keywords, year:newValue.getFullYear()}));
                    }}
                    renderInput={(params) => <TextField {...params} helperText={null} />}
                    />
                    </LocalizationProvider>
        </>
     );
}
 
export default YearFilter;