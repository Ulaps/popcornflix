import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularMovies } from "../redux/dashboardSlice";
// import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



const PopularMovies = () => {
    
    const { popularMovies, movieLabels, movieValues } = useSelector(state => state.dashboard);
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(getPopularMovies());
    },[dispatch])
    
    const labels = movieLabels.map(k=>k.substr(0,12));

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                  title: (tooltipItem, data) => {
                    return `${movieLabels[tooltipItem[0].dataIndex]}`
                  }
                }
            },
            title: {
                display: true,
                text: 'Popular Movies',
            },
        },
    };

    const data = {
        labels,
        datasets : [{
            label: 'Count',
            data: movieValues,
            backgroundColor: [
                'rgb(216, 182, 164)',
                'rgb(205, 24, 24)',
                'rgb(230, 230, 230)',
                'rgb(166, 141, 173)',
                'rgb(105, 152, 171)',
                'rgb(200, 75, 49)',
                'rgb(250, 187, 81)',
                'rgb(6, 70, 53)',
                'rgb(120, 29, 66)',
                'rgba(15, 159, 64, 0.2)',
            ],
            borderWidth: 1,
        }]
    }
    return (
        <> 
            { popularMovies && <Pie options={options} data={data} />}   
        </>
    );
}
 
export default PopularMovies;