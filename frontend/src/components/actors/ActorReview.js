import { Button, Paper, Rating, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createActorReview, onSubmitReview } from "../../redux/actorSlice";

const ActorReview = () => {

    const [value, setValue] = useState(0);
    const [comment, setComment] = useState('');
    const { message, staff } = useSelector(state => state.actor);
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch()

    const handleSubmitReview = (e) => {
        e.preventDefault();

        const review = {
            staffId:staff.staff._id,
            user : {
                _id : user._id,
                name: user.name
            },
            rating : value,
            comment
        }

        dispatch(createActorReview(review));

        setValue(0);
        setComment('');
    }

    return (
        <>
            <Paper elevation={2} sx={{p:2}}>        
              <TextField
                    id="standard-textarea"
                    value={comment}
                    label="Comment"
                    placeholder="Actor review"
                    multiline
                    fullWidth
                    variant="filled"
                    onChange={(e) => setComment(e.target.value) }
                />
                <Box sx={{pt:2,pb:2}}>
                    <Typography component="legend">Did you like it?</Typography>
                    <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    />
                </Box>
                <Button variant="contained" onClick={handleSubmitReview}>
                    SUBMIT
                </Button>
            </Paper>
        </>
    );
}
 
export default ActorReview;