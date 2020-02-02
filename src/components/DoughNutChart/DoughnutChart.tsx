import React from 'react';
import { Chart } from '@bit/primefaces.primereact.chart';

interface IProps {
  title: string,
  labels: string[],
  chartData: number[],
  backgroundColor: string[],
  hoverBackgroundColor: string[]
}

const DoughNutChart: React.FC<IProps> = ({title,labels, chartData, backgroundColor, hoverBackgroundColor}) =>{
    const data = {
        labels: [...labels],
        datasets: [
          {
            data: [ ...chartData],
            backgroundColor: [...backgroundColor],
            hoverBackgroundColor: [...hoverBackgroundColor]
          }
        ]
      };
    return (
    
        <div  style={{maxWidth: '100%'}} className="text-center ">
            <h5>{title}</h5>
            <Chart  type='doughnut' data={data} />   
        </div>
    )
}


 
export default DoughNutChart;