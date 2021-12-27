import { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularGenres } from '../redux/dashboardSlice';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Popular Genres',
      },
    },
  };

const PopularGenre = () => {

    const { popularGenres, genreLabels, genreValues } = useSelector(state=> state.dashboard);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPopularGenres());
    },[dispatch])

    const labels = [...genreLabels];

    const data = {
        labels,
        datasets : [{
            label: 'Count',
            data: genreValues,
            backgroundColor: '#D8B6A4' 
        }]
    }

    return (
        <>
            { popularGenres && <Bar options={options} data={data} />}   
        </>
    );
}
 
export default PopularGenre;