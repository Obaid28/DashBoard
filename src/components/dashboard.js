import React , {Component} from 'react';
import"./dashboard.css";
import{Row,Col,Container} from 'react-bootstrap';
import WidgetText from './widgetText';
import WidgetBar from './widgetBar';
import WidgetDoughnut from './widgetDoughnut';

class DashBoard extends Component{

  render(){
    const chartData = [
      {
        label: "Venezuela",
        value: "290"
      },
      {
        label: "Saudi",
        value: "260"
      },
      {
        label: "Canada",
        value: "180"
      },
      {
        label: "Iran",
        value: "140"
      },
      {
        label: "Russia",
        value: "115"
      },
      {
        label: "UAE",
        value: "100"
      },
      {
        label: "US",
        value: "30"
      },
      {
        label: "China",
        value: "30"
      }
    ];
 
    return(
     <WidgetDoughnut title="Title" data={chartData} />
    )
  }
}

export default DashBoard;