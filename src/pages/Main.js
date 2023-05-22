import React, {useState} from 'react';
import axios from "axios";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Grid} from "@mui/material";
import {Link} from "react-router-dom";

const Main = () => {
    const [movies, setMovies] = useState([])

    const getMovies =async () =>{
        try{
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzM1NDc3MjQ0M2FlODIyNTUxNDQ4MjMwMzZmNDhlOCIsInN1YiI6IjY0NjlhODE1MDA2YjAxMDE4OTU4ZDlhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RJDHcyvrIfSlqIBCcK95nTmRqfDhBtjpbp7IcepDTFY'
                }
            };
            const result = await axios.get("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", options)
            setMovies(result.data.results)
            console.log(result.data.results)
        } catch (err){
            console.log(err)
        }
    }
    //자동실행 함수
    useState(() => {
        getMovies()
    }, [])


    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
            {movies && movies.map(movie => (
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 180 }}
                        image={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {movie.title.slice(0,15)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {movie.overview.slice(0,120)}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Link to={`/movie/${movie.id}`}>
                            <Button size="small">자세히 보기</Button>
                        </Link>
                    </CardActions>
                </Card>
            ))}
        </Grid>
    );
};

export default Main;