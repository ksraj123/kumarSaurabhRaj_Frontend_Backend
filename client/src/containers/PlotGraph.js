import React from 'react';
import axios from 'axios';
import Slider from '../component/Slider/Slider'
import Graph from '../component/Graph';
import Spinner from '../component/Spinner/Spinner';

class PlotGraph extends React.Component{
    serverLink="http://localhost:8000/api/data";
    state={
        datapoints: [],
        showSpinner: true,
        height: 100,
        coff: 0.9
    }

    onSliderChange(result){
        console.log(result);
        this.setState({
            showSpinner: true,
            coff: result
        }, ()=>{
            this.getDataFromAPI();
        })
    }

    render(){
        return(
            <React.Fragment>
            {this.state.showSpinner && <Spinner />}
            <div className="PlotGraph">
                <div>Input field to set h</div>
                <Graph dataPoints={this.state.datapoints}/>
                <Slider
                    val={this.state.coff} 
                    onChange={this.onSliderChange.bind(this)} 
                />
            </div>
            </React.Fragment>
        )
    }

    getDataFromAPI = () => {
        axios.post(this.serverLink, {
            height: this.state.height,
            coff: this.state.coff
        })
        .then(Response => {
            console.log(Response);
            this.setState({
                datapoints: [...Response.data.result],
                showSpinner: false
            })
        })
    }

    componentDidMount(){
        this.getDataFromAPI();
    }
}

export default PlotGraph;