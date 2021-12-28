import { Autocomplete, Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, ImageList, ImageListItem, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material"
import { useState } from "react"
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import NotesIcon from '@mui/icons-material/Notes';
import MoneyIcon from '@mui/icons-material/Money';
import { useDispatch, useSelector } from "react-redux";
import { createMovie } from "../../redux/movieSlice";
import {yearMonthDateConvert} from "../../helpers/dateHelpers"

const CreateMovie = () => {

    const genres = [
        'Thriller',
        'Horror',
        'Sci-Fi',
        'Fantasy',
        'Drama',
        'Documentation',
        'Comedy',
        'War',
        'Sports',
        'Crime',
        'Action',
        'Musicals',
        'Mystery',
        'Romance'
    ];

    const [imagePreview, setImagePreview] = useState([]);
    const [open, setOpen] = useState(false);
    const { actorNamesWithId } = useSelector(state => state.actor);
    const { producerNamesWithId } = useSelector(state => state.producer);
    const dispatch = useDispatch();

    const [images, setImages] = useState([]);
    const [dateReleased, setDateReleased] = useState(yearMonthDateConvert(new Date().toLocalDateString));
    const [year, setYear] = useState(new Date());
    const [values, setValues] = useState({
        title: "",
        genre: "",
        showType: "",
        runtime: 0,
        year: new Date().getFullYear(),
        date_released: '',
        summary: '',
        actors: [],
        producers:[],
        staff: [],
        gross: 0,
    })

    const handleChange = (e) => {
        setValues({...values, [e.target.name] : e.target.value})
    }

    const handleProducers = (event, value, reason) => {
        event.preventDefault();
        let prod = [];
        for (let i=0; i<value.length; i++) {
            prod.push({
                user : value[i]._id,
                name : value[i].name,
                work : 'Producer'

            })
        }
        setValues({...values, 'producers' : prod})
    }

    const handleActors = (event, value, reason) => {
        event.preventDefault();
        let act = [];
        for (let i=0; i<value.length; i++) {
            act.push({
                user : value[i]._id,
                name : value[i].name,
                work : value[i].work

            })
        }
        setValues({...values, 'actors' : act})
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
    // console.log(year)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const formHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("title", values.title);
        formData.set("genre", values.genre);
        formData.set("showType", values.showType);
        formData.set("runtime", values.runtime);
        formData.set("year", year.getFullYear());
        formData.set("date_released", yearMonthDateConvert(dateReleased));
        formData.set("summary", values.summary);
        formData.set("staff", JSON.stringify(values.actors.concat(values.producers)));
        images.forEach((image) => {
            formData.append("images", image)
        });

        dispatch(createMovie(formData))
        
        setValues({
            title: "",
            genre: "",
            showType: "",
            runtime: 0,
            year: new Date().getFullYear(),
            date_released: '',
            summary: '',
            actors: [],
            producers:[],
            staff: [],
            gross: 0,
        })

        setOpen(false);
        setImages([]);
        setImagePreview([]);
    }
    return (
        <>
        <Button variant="contained" onClick={handleOpen}> Create New Movie </Button>
        <Dialog fullWidth open ={open} onClose={handleClose}>
            <DialogTitle>Create New Movie</DialogTitle>
            <form encType="multipart/form-data" noValidate onSubmit={formHandler}>
                <DialogContent>
                    <Grid container spacing={2} sx={{p:1}}>
                        <Grid item xs={15} sx={{mt:1, mb:1}}>
                        <TextField
                            name="title"
                            required
                            fullWidth
                            label="Title"
                            value={values.title}
                            onChange={handleChange}
                            autoFocus
                            />
                            </Grid>
                    <Grid item xs={6} sx={{mt:1, mb:1}}>
                        <FormControl fullWidth>
                            <InputLabel id="movie_type_label">Type</InputLabel>
                            <Select
                            labelId="movie_type_label"
                            id="showtype"
                            name="showType"
                            value={values.showType}
                            label="Type"
                            onChange={handleChange}
                            >
                                <MenuItem value="Movie">Movie</MenuItem>
                                <MenuItem value="Film">Film</MenuItem>
                                <MenuItem value="TV SHow">TV Show</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sx={{mt:1, mb:1}}>
                        <FormControl fullWidth>
                            <InputLabel id="movie_genre_label">Genre</InputLabel>
                            <Select
                            labelId="genre_label"
                            id="moviegenre"
                            name="genre"
                            value={values.genre}
                            label="Genre"
                            onChange={handleChange}
                            >
                                { genres &&
                                    genres.map(genre => {
                                        return (
                                            <MenuItem value={genre} key={genre}>{genre}</MenuItem>
                                            )
                                        })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sx={{mt:1, mb:1}}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year']}
                                label="Year"
                                value={year}
                                onChange={(newValue) => {
                                    setYear(newValue);
                                }}
                                renderInput={(params) => <TextField {...params}/>}
                                />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6} sx={{mt:1, mb:1}}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year', 'month', 'day']}
                                label="Date Released"
                                value={dateReleased}
                                onChange={(newValue) => {
                                    setDateReleased(newValue);
                                }}
                                renderInput={(params) => <TextField {...params}/>}
                                />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={5}sx={{mt:1, mb:1}}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="runtime-label">Runtime</InputLabel>
                            <OutlinedInput
                                id="runtime-label"
                                name="runtime"
                                value={values.runtime}
                                onChange={handleChange}
                                startAdornment={<InputAdornment position="start"><AccessTimeFilledIcon/></InputAdornment>}
                                label="Runtime"
                                />
                        </FormControl>
                    </Grid>
                    <Grid item xs={7} sx={{mt:1, mb:1}}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="gross-label">Gross</InputLabel>
                            <OutlinedInput
                                id="summary-label"
                                name="gross"
                                value={values.gross}
                                onChange={handleChange}
                                startAdornment={<InputAdornment position="start"><MoneyIcon/></InputAdornment>}
                                label="Gross"
                                />
                        </FormControl>
                    </Grid>
                    <Grid item xs={15}sx={{mt:1, mb:1}}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="summary-label">Summary</InputLabel>
                            <OutlinedInput
                                id="summary-label"
                                name="summary"
                                multiline={true}
                                value={values.summary}
                                onChange={handleChange}
                                startAdornment={<InputAdornment position="start"><NotesIcon/></InputAdornment>}
                                label="Plot"
                                />
                        </FormControl>
                    </Grid>
                    <Grid item xs={15}>
                        <Autocomplete
                            multiple={true}
                            id="producers-list"
                            name="producers"
                            options={producerNamesWithId}
                            getOptionLabel={((option) => option.title)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Producers"
                                    placeholder="Producer"
                                />
                            )}
                            onChange={handleProducers}
                        />
                    </Grid>
                    <Grid item xs={15}>
                        <Autocomplete
                            multiple={true}
                            id="actors-list"
                            name="actors"
                            options={actorNamesWithId}
                            getOptionLabel={((option) => option.title)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Actors"
                                    placeholder="Actor"
                                />
                            )}
                            onChange={handleActors}
                        />
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
                            Add Movie Posters
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
                <Button type="submit" variant="contained" sx={{ml:4, mt:3, mb:3}}>Save Movie</Button>
                <Button variant="contained" sx={{ml:3, mt:3, mb:3}} onClick={handleClose}>Cancel</Button>
            </form>
        </Dialog>
        </>
    )
}

export default CreateMovie