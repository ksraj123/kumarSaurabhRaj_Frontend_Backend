import React from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
const Graph = (props)=>{
	const options = {
		animationEnabled: true,
		title:{
			text: "Height and Time Plot"
		},
		zoomEnabled: true,
		toolTip:{
			enabled: true,
			animationEnabled: true,
			content:"H: {y}, T: {x}"
		},
		axisX: {
			title: "Time (T)",
			gridDashType: "longDash",
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
			dataPoints: props.dataPoints
		}]
	}
	
	return (
		<React.Fragment>
			<h3>Select a appropirate size portion of the graph to zoom it</h3>
			<CanvasJSChart options = {options} />
		</React.Fragment>
	);
}

export default Graph;                           
