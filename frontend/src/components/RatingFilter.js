import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearActors, getAllActor } from "../redux/actorSlice";
import { setKeywords } from "../redux/filterSlice";
import { clearMovies, getAllMovies } from "../redux/movieSlice";
import { clearProducers, getAllProducer } from "../redux/producerSlice";

const RatingFilter = () => {

    const [ selected, setSelected ] = useState(null);
    const { keywords } = useSelector(state => state.filter)
    const dispatch = useDispatch();

    const path = window.location.pathname

    useEffect(() => {
        if(keywords !== null && keywords.hasOwnProperty('ratings')) {
            switch (path) {
                case '/':
                    dispatch(clearMovies());
                    dispatch(getAllMovies({...keywords}))
                    break;
                case '/actors':
                    dispatch(clearActors());
                    dispatch(getAllActor({...keywords}))
                    break;
                case '/producers':
                    dispatch(clearProducers());
                    dispatch(getAllProducer({...keywords}))
                    break;
        
                default:
                    break;
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected])

    return ( 
        <>
        <div>
            <FormControl component="fieldset">
            <FormLabel component="legend">Ratings</FormLabel>
            <RadioGroup
                row aria-label="ratings"
                value={selected}
                name="row radio-buttons-group"
                onChange={(e) => { setSelected(e.target.value);dispatch(setKeywords({...keywords, ratings: e.target.value}))}}
            >
                <FormControlLabel value={5} control={<Radio size="small"/>} label={<Rating name="rating5" defaultValue={5} size="small" readOnly/>} />
                <FormControlLabel value={4} control={<Radio size="small"/>} label={<Rating name="rating4" defaultValue={4} size="small" readOnly/>} />
                <FormControlLabel value={3} control={<Radio size="small"/>} label={<Rating name="rating3" defaultValue={3} size="small" readOnly/>} />
                <FormControlLabel value={2} control={<Radio size="small"/>} label={<Rating name="rating2" defaultValue={2} size="small" readOnly/>} />
                <FormControlLabel value={1} control={<Radio size="small"/>} label={<Rating name="rating1" defaultValue={1} size="small" readOnly/>} />
            </RadioGroup>
            </FormControl>
        </div>
        </>
     );
}
 
export default RatingFilter;