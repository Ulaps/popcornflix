import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Rating, Typography } from "@mui/material"

const Comment = ({comment}) => {
    return (
        <>
            <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={`https://ui-avatars.com/api/?name=${comment.name}`} />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                    >
                    {comment.name}
                    </Typography>
                }
                secondary={ 
                <> 
                    {`${comment.comment}`} <br/>
                    <Rating name="simple-controlled" defaultValue={parseFloat(comment.rating)} value={parseFloat(comment.rating)} precision={0.5} readOnly />
                </>}
                
            />
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    );
}
 
export default Comment;