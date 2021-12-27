import { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getGrossingTvShows, getTopGrossingTvShow } from '../redux/dashboardSlice';
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

const GrossingTvShows = () => {

    const { grossingShowLabels, grossingShowValues } = useSelector(state=> state.dashboard);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTopGrossingTvShow());
    },[dispatch])

    const labels = grossingShowLabels.map(k=>k.substr(0,6));

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              title: (tooltipItem, data) => {
                return `${grossingShowLabels[tooltipItem[0].dataIndex]}`
              }
            }
          },
          title: {
            display: true,
            text: 'Top 5 Grossing TV Shows',
          },
        },
    };

    const data = {
        labels,
        datasets : [{
            label: '$',
            data: grossingShowValues,
            backgroundColor: '#D8B6A4' 
        }]
    }

    return (
        <>
            { grossingShowLabels && <Bar options={options} data={data} />}   
        </>
    );
}
 
export default GrossingTvShows;