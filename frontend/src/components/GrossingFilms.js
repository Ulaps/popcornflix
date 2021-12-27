import { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getGrossingFilmss, getTopGrossingFilm } from '../redux/dashboardSlice';
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

const GrossingFilms = () => {

    const { grossingFilms, grossingFilmValues, grossingFilmLabels } = useSelector(state=> state.dashboard);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTopGrossingFilm());
    },[dispatch])

    const labels = grossingFilmLabels.map(k=>k.substr(0,6));

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              title: (tooltipItem, data) => {
                return `${grossingFilmLabels[tooltipItem[0].dataIndex]}`
              }
            }
          },
          title: {
            display: true,
            text: 'Top 5 Grossing Films',
          },
        },
    };

    const data = {
        labels,
        datasets : [{
            label: '$',
            data: grossingFilmValues,
            backgroundColor: '#D8B6A4' 
        }]
    }

    return (
        <>
            { grossingFilmLabels && <Bar options={options} data={data} />}   
        </>
    );
}
 
export default GrossingFilms;