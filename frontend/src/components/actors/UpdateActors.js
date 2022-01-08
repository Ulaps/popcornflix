import { Autocomplete, Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, ImageList, ImageListItem, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import NotesIcon from '@mui/icons-material/Notes';
import { useDispatch, useSelector } from "react-redux";
import { updateActor } from "../../redux/actorSlice";
import EditIcon from '@mui/icons-material/Edit';

const UpdateActor = ({id,staff}) => {

    const work = [
        'Actor',
        'Actress'
    ];

    const [imagePreview, setImagePreview] = useState([]);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const [images, setImages] = useState([]);
    const [values, setValues] = useState({
        name: "",
        work: "",
        info: ""
    })

    useEffect(() => {
        setValues({
            ...values,
            name : staff.name,
            work : staff.work,
            info : staff.info
        })
        
        setImagePreview(staff.avatar.map(avatar => avatar.url))
        return () => {
            console.log('Cleaned')
        }
    }, [])

    const handleChange = (e) => {
        setValues({...values, [e.target.name] : e.target.value})
    }

    const handleImage =(e) => {
        const files = Array.from(e.target.files)
        setImagePreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2){
                    setImagePreview((oldImages) => [...oldImages, reader.result]);
                    setImages((oldImages) => [...oldImages, reader.result]);
                }
            }
            reader.readAsDataURL(file);
        })
    }
    console.log(values)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const formHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("_id",id);
        formData.set("name", values.name);
        formData.set("work", values.work);
        formData.set("info", values.info);
        images.forEach((image) => {
            formData.append("images", image)
        });

        dispatch(updateActor(formData))
    }
    return (
        <>
        <Button variant='contained' color='warning' onClick={(e) => {handleOpen(e,staff._id)}}><EditIcon/>UPDATE </Button>
        <Dialog fullWidth open ={open} onClose={handleClose}>
            <DialogTitle>Update Actor</DialogTitle>
            <form encType="multipart/form-data" noValidate onSubmit={formHandler}>
                <DialogContent>
                    <Grid container spacing={2} sx={{p:1}}>
                        <Grid item xs={15} sx={{mt:1, mb:1}}>
                        <TextField
                            name="name"
                            required
                            fullWidth
                            label="Name"
                            value={values.name}
                            onChange={handleChange}
                            autoFocus
                            />
                            </Grid>
                    <Grid item xs={6} sx={{mt:1, mb:1}}>
                        <FormControl fullWidth>
                            <InputLabel id="actor_work_label">Role</InputLabel>
                            <Select
                            labelId="work_label"
                            id="actorwork"
                            name="work"
                            value={values.work}
                            label="Role"
                            onChange={handleChange}
                            >
                                { work &&
                                    work.map(work => {
                                        return (
                                            <MenuItem value={work} key={work}>{work}</MenuItem>
                                            )
                                        })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={15}sx={{mt:1, mb:1}}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="info-label">Info</InputLabel>
                            <OutlinedInput
                                id="info-label"
                                name="info"
                                multiline={true}
                                value={values.info}
                                onChange={handleChange}
                                startAdornment={<InputAdornment position="start"><NotesIcon/></InputAdornment>}
                                label="Actor Info"
                                />
                        </FormControl>
                    </Grid>
                    <Grid item xs={10}>
                        <Button variant="contained" component="label">
                            <input
                                type="file"
                                name="images"
                                accept="images/*"
                                multiple
                                onChange={handleImage}
                                hidden
                            />
                            Add Actor Images
                        </Button>
                    </Grid>
                    <ImageList cols={5} rowHeight={100}>
                        { imagePreview.map((img) => (
                            <ImageListItem key={img}>
                                <img
                                src={img}
                                alt=""
                                loading="lazy"
                                />
                            </ImageListItem>
                        ))
                        }
                    </ImageList>
                </Grid>
                </DialogContent>
                <Button type="submit" variant="contained" sx={{ml:4, mt:3, mb:3}}>Save Actor</Button>
                <Button variant="contained" sx={{ml:3, mt:3, mb:3}} onClick={handleClose}>Cancel</Button>
            </form>
        </Dialog>
        </>
    )
}

export default UpdateActor