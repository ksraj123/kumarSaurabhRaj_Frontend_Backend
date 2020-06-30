import React from 'react';
import axios from 'axios';
import Graph from '../component/Graph';
import classes from './PlotGraph.module.css';
import Slider from '../component/Slider'
import HeightInput from '../component/HeightInput';
import Spinner from '../component/Spinner';

class PlotGraph extends React.Component{

    serverLink="http://localhost:8000/api/data";

    state={
        datapoints: [],
        showSpinner: true,
        height: 100,
        coff: 0.9
    }

    onSliderChange = (result) => {
        console.log(result);
        this.setState({
            showSpinner: true,
            coff: result
        }, ()=>{
            this.getDataFromAPI();
        })
    }

    setHeight = (event) => {
        event.preventDefault();
        console.log(event.target.height.value);
        this.setState({
            showSpinner: true,
            height: event.target.height.value
        }, this.getDataFromAPI)
    }

    render(){
        return(
            <React.Fragment>
            {this.state.showSpinner && <Spinner />}
            <Graph dataPoints={this.state.datapoints}/>
            <div className={classes.Controls}>
                <HeightInput val={this.state.height} setHeight={this.setHeight}/>
                <Slider
                    val={this.state.coff} 
                    onChange={this.onSliderChange} 
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