import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class SplineChart extends Component {
	render() {
		const options = {
			animationEnabled: true,
			title:{
				text: "Height and Time Plot"
			},
            toolTip:{
              enabled: true,
              animationEnabled: true,
              content:"H: {y}, T: {x}"
            },
			axisX: {
                title: "Time (T)",
                stripLines:[
                    {                
                        startValue:5,
                        endValue:10,                
                        color:"#d8d8d8"                      
                    }
                ],
                gridDashType: "longDash",
                // gridDashType: "dot",
			    gridThickness: 1
			},
			axisY: {
				title: "Height (H)",
                suffix: "m",
                gridDashType: "longDash",
				includeZero: true
			},
			data: [{
				yValueFormatString: "###",
				xValueFormatString: "###",
				type: "spline",
				dataPoints: this.props.dataPoints
			}]
		}
		
		return (
		<div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default SplineChart;                           
