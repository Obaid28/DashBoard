import React , {Component} from 'react';

class FetchData extends Component{

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json()).then(data =>{
    console.log(data);
    })

  }

  render(){
    return(
      <div>
        
        </div>
    )
  }
}

export default FetchData;