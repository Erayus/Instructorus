import React from 'react';
import { Chart } from '@bit/primefaces.primereact.chart';

const chart = (props) =>{
    const data = {
        labels: ['Yes', 'No'],
        datasets: [
          {
            data: [ props.noOfYes, props.noOfNo],
            backgroundColor: ['#00C851', '#e53935'],
            hoverBackgroundColor: ['#1b5e20', '#b71c1c']
          }
        ]
      };
    return (
        <div style={{width: 350}}>
            <h5>{props.title}</h5>
            <Chart  type='doughnut' data={data} />   
        </div>
    )
} 

 
export default chart;