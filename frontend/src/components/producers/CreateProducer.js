import { Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, ImageList, ImageListItem, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import NotesIcon from '@mui/icons-material/Notes';
import { useDispatch } from "react-redux";
import { createProducer } from "../../redux/producerSlice";

const CreateProducer = () => {

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
            work : 'Producer',
        })
        
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
        formData.set("name", values.name);
        formData.set("work", values.work);
        formData.set("info", values.info);
        images.forEach((image) => {
            formData.append("images", image)
        });

        dispatch(createProducer(formData))
        
        setValues({
            name: "",
            work: "",
            info: ""
        })

        setOpen(false);
        setImages([]);
        setImagePreview([]);
    }
    return (
        <>
        <Button variant="contained" onClick={handleOpen}> Create New Producer </Button>
        <Dialog fullWidth open ={open} onClose={handleClose}>
            <DialogTitle>Create New Producer</DialogTitle>
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
                        <Grid item xs={15} sx={{mt:1, mb:1}}>
                        <TextField
                            name="work"
                            required
                            fullWidth
                            label="Work"
                            value={values.work}
                            onChange={handleChange}
                            autoFocus
                            />
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
                            Add Producer Images
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
                <Button type="submit" variant="contained" sx={{ml:4, mt:3, mb:3}}>Save Producer</Button>
                <Button variant="contained" sx={{ml:3, mt:3, mb:3}} onClick={handleClose}>Cancel</Button>
            </form>
        </Dialog>
        </>
    )
}

export default CreateProducer