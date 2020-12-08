import React , {Component} from 'react';
import"./dashboard.css";
import{Row,Col,container} from 'react-bootstrap';
import WidgetText from './widgetText';
import WidgetBar from './widgetBar';
import WidgetDoughnut from './widgetDoughnut';
import WidgetPie from './widgetPie';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

//excel import
const config = {
  apiKey: 'AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI',
  spreadsheetId: '1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg'
}
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId
  }/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;


class DashBoard extends Component{

  constructor(){
    super();
    this.state = {
      items:[],
      dropdownOptions: [],
      selectedValue: null , 
      organicSource: null,
      directSource: null,
      referralSource:null,
      emailSource:null,
      socialSource:null,
      pageViews:null,
      users:null,
      newUsers:null,
      sessions:null,
      userspersession:null,
      sourceArr:[],
      usersArr:[],
      sessionsArr:[],

    }
  }

  getData = arg => {
    const arr = this.state.items;
    const arrLen = arr.length;

    let organicSource= 0;
    let directSource= 0;
    let referralSource= 0;
    let users= 0;
    let pageViews= 0;
    let newUsers= 0;
    let emailSource= 0;
    let socialSource= 0;
    let sessions = 0;
    let userspersession = 0;
    let selectedValue=null;
    let sourceArr = [];
    let usersArr= [];
    let sessionsArr= [];

    for(let i=0;i<arrLen;i++){
      if(arg==arr[i]["month"]){
        organicSource=arr[i].organic_source;
        directSource=arr[i].direct_source;
        referralSource=arr[i].referral_source;
        pageViews=arr[i].page_views;
        users=arr[i].users;
        newUsers=arr[i].new_users;
        emailSource=arr[i].email_source;
        socialSource=arr[i].social_source;
        sessions=arr[i].sessions;
        userspersession=arr[i].number_of_sessions_per_users;
        sourceArr.push(
         {
            label: "Organic Source",
            value: arr[i].organic_source
          },
          {
            label: "Direct Source",
            value: arr[i].direct_source
          },
          {
            label: "Referral Source",
            value: arr[i].referral_source
          },
          {
            label: "Email Source",
            value: arr[i].email_source
          },
          {
            label: "Social Source",
            value: arr[i].social_source
          },
        )
        usersArr.push(
          {
             label: "Users",
             value: arr[i].users
           },
           {
             label: "New Users",
             value: arr[i].new_users
           },
         )
         sessionsArr.push(
          {
             label: "Session",
             value: arr[i].sessions
           },
           {
             label: "Session Per User ",
             value: arr[i].number_of_sessions_per_users
           },
         )
      }
    }

    selectedValue=arg;

    this.setState({
      organicSource:organicSource,
      directSource:directSource,
      referralSource:referralSource,
      pageViews:pageViews,
      users:users,
      newUsers:newUsers,
      emailSource:emailSource,
      socialSource:socialSource,
      sourceArr:sourceArr,
      usersArr:usersArr,
      sessionsArr:sessionsArr,
    } , () => {
      console.log(this.state.organicSource);
    })

  }

  updateDashboard = event =>{
    this.getData(event.value);
    this.setState({ selectedValue: event.value} , () => {
      console.log(this.state.organicSource);
    })

  }

  componentDidMount(){

    fetch(url)
    .then(response => response.json())
    .then(data => {

        let batchRowValues = data.valueRanges[0].values;

        const rows = [];

        for (let i = 1; i < batchRowValues.length; i++) {
            let rowObject = {};
            for (let j = 0; j < batchRowValues[i].length; j++) {
                rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
            }
            rows.push(rowObject);
        }

        // dropdown options
        let dropdownOptions = [];

        for (let i = 0; i < rows.length; i++) {
            dropdownOptions.push(rows[i].month);
        }

        dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();
        this.setState(
            {
                items: rows,
                dropdownOptions: dropdownOptions,
                selectedValue: "Jan 2018"
            },
            () => this.getData("Jan 2018")
        );

      });

  }

  render(){
 
    return(
      <div>
        <container fluid>
          <Row className="TopHeader">
            <Col>
            DashBoard
          </Col>
          <Col>
          <Dropdown options={this.state.dropdownOptions} onChange={this.updateDashboard} value={this.state.selectedValue} placeholder="Select an option" />
          </Col>
            </Row>
          </container>
          <container>
          <Row className="MainDashboard">
            <Col>
            <WidgetText title="Organic Source" value={this.state.organicSource} />
            </Col>
            <Col>
            <WidgetText title="Direct Source" value={this.state.directSource} />
            </Col>
            <Col>
            <WidgetText title="Referral Source" value={this.state.referralSource} />
            </Col>
            <Col>
            <WidgetText title="Social Source" value={this.state.socialSource} />
            </Col>
            <Col>
            <WidgetText title="Email Source" value={this.state.emailSource} />
            </Col>
            </Row>
            <Row>
            <Col>
            <WidgetDoughnut title="Users Comaprision" data={this.state.usersArr} />
            </Col>
            <Col>
            <WidgetPie title="User and Session Comaprision" data={this.state.sessionsArr} />
            </Col>
            <Col>
            <WidgetBar className="source" title="Source Comaprision" data={this.state.sourceArr} />
            </Col>
              </Row>
            </container>
      
    </div>
    )
  }
}

export default DashBoard;