import React, { Component, useState } from "react";
import { Navbar,Button,Toast,Jumbotron,Modal,Form,Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import './infoapp.scss';
import firebase from './firebase'
import Log from './login.js'


const url= new URLSearchParams(window.location.search)
const data = url.get('email')
const email=data

class Info extends Component {
  
render(){

    return(
    
      
    <div className='body'>
    <Nav email={email}/>
    <Navrt />
    <Data email={email}/>
    </div>
    
    
    );
}







}



class Nav extends Component{
  constructor(props) {
    super(props);
    this.state = { 
      active: false
 
    };
  }
    
    handleClick = () => {
  
      const currentState = this.state.active;
      this.setState({ active: !currentState });

    }

    logout(){

      firebase.auth().signOut();
      window.location.href="http://localhost:3000/login";
    
      }
 
    render(){
    if(this.props.email=="admin@gmail.com"){
      var show=<Button variant='outline-success' style={{marginLeft:'60%',color:'lime'}} 
      onClick={()=>this.handleClick()}>admin</Button>  
    
    } 
    return(
    
<Navbar bg={'dark'} style={{paddingLeft:'50%',
position:'Fixed',width:'100%',zIndex:'9'}}
     variant="dark">
 <Navbar.Brand href="http://localhost:3000" id='nav1'>auto-Rent</Navbar.Brand>
 {this.props.email ?(
    <Button onClick={this.logout}
    style={{marginLeft:'70%',color:'white'}} 
    >Log out</Button>):(null)}
 {show}

 {this.state.active ? <Adminshow show={this.state.active} />: null}    
    </Navbar>


    
    )
    }}



  
  
  
  class Data extends React.Component {
    constructor(props) {
        super(props);
        this.state= { results:[],
          name:'',
          active: false,
          date1:new Date(),
          date2:new Date(),
        };
        
     

      
    }

    callAPI() {
        fetch("http://localhost:9000/testApi")
        .then(res => res.json())
        .then(json => {
            this.setState({ results: json})})
            .catch(err => err);

        
    }

    componentDidMount() {
        this.callAPI();
    }
    
    handleClick = (e,e1,e2) => {
  

      this.state.name=e;
      this.state.date1=e1;
      this.state.date2=e2;
      const currentState = this.state.active;
      this.setState({ active: !currentState });

    }
 

    render() {
     
  
      return (
     
         
        <div className='cardiv'>
            {
this.state.results.map((data1,i) => (

  data1.data.map((data) =>(
  <Jumbotron 
  style={{display:'flex',flexDirection:'row',padding:'10px',width:'900px'}}>
  <div className='imgdata'>
  <img  src={`./images/${data.name}.jpg`} />  
  </div> 
  <div className='data'>

  <h3>{data.name}</h3>
  <h5>{data.category}</h5>
  <p style={{fontSize:'11px',paddingTop:'25px'}}>FROM: {data1.Date.date1}
  </p>
  </div>
  <div className='data2'>
  <h5>PRICE :{data.price}dh/day</h5>
   <p>CAR fuel : {data.fuel}</p>
   <p style={{fontSize:'11px',paddingTop:'20px',color:'black'}}>to: {data1.Date.date2}
  </p>
  </div>
  <Button variant="primary" onClick={()=>this.handleClick(data.name,data1.Date.date1,
    data1.Date.date2)}>Reserve</Button>  

</Jumbotron>
  ))   

 ))}

{this.state.active ? <Modl show={this.state.active} car={this.state.name} 
date1={this.state.date1} date2={this.state.date2} email={this.props.email}/>: null}

</div>


)
    }
  }

  
  class Modl extends Component {
   
    constructor(props) {
      super(props);
      this.state= {
        show: this.props.show,
         fname:'',
         lname:'',   
         email:'',
         tel:'',
         car:this.props.car,
         date1:this.props.date1,
         date2:this.props.date2,
      };
       
      const db = firebase.firestore();
      this.handleInputChange = this.handleInputChange.bind(this);
    }
  close=()=>{

  this.setState({show:false})

  };

 

  handleInputChange = (event) => {
      
    this.setState({
      [event.target.name]: event.target.value });
    
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
   
    const db = firebase.firestore();
    const userRef = db.collection("reservation").add({
        email: this.state.email,
        fname: this.state.fname,
        lname:this.state.lname,
        tel:this.state.tel,
        car:this.state.car,
        date1:this.state.date1,
        date2:this.state.date2,
      }); 
      this.setState({
        fname: "",
        email: "",
        lname:"",
        tel:"",
        car:"",
        date1:"",
        date2:""
      });
  alert("RESERVED");
  }

  render(){
    if(this.props.email==true && this.props.email!=null){
     var show=<p hidden>{this.state.email=this.props.email}</p>
    }else{
     
      show=<Form.Group>
      <label>email</label>
      <Form.Control type="email" 
      name="email" placeholder="Enter email" 
       onChange={this.handleInputChange} required />
    </Form.Group>

    }
    return (
      

        <Modal show={this.state.show} onHide={()=>this.close()}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.car}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form  onSubmit={this.mySubmitHandler}>
    <Form.Group>
      <label>First name</label>
    <Form.Control type="text" placeholder="Enter first name" 
     name="fname"
     onChange={this.handleInputChange} required/>
    </Form.Group>
    <Form.Group>
    <label>last name</label>
    <Form.Control type="text" placeholder="Enter last name"
     name="lname"
     onChange={this.handleInputChange} required />
    </Form.Group>
    {show}
  <Form.Group>
    <label>Telephone</label>
    <Form.Control type="tel"
    name="tel" placeholder="Enter telephone"
     onChange={this.handleInputChange} required />
  </Form.Group>
  <Button onClick={()=>this.close()} variant="primary" type="submit">
    Submit
  </Button>
</Form>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>this.close()} >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
     
    );}
  }
  
 



class Navrt extends Component{

  
render(){

return(
<div className='navr'>
<ul>

  <li id="date"><a className="active" href="#home">{Date().toLocaleString().substring(0, 25)}</a></li>
  
</ul>
<br></br><br></br>
<a className="icon" href="" ><i style={{fontSize:'25px',color:'black'}} className="lni lni-facebook-original"></i></a><br></br>
<a className="icon" href=""><i style={{fontSize:'25px',color:'brown'}} className="lni lni-instagram"></i></a><br></br>
<a className="icon" href="" ><i style={{fontSize:'25px',color:'blue'}} className="lni lni-twitter-original"></i></a><br></br>
<br></br><br></br><br></br>
<Toast>
  <Toast.Header  closeButton={false}>
    <strong className="mr-auto">With you</strong>
    <small>be happy</small>
  </Toast.Header>
  <Toast.Body>We have expert who will help you<br></br>
  <a href='http://localhost:3000/Contact'>CONTACT US</a> for help.
  </Toast.Body>
</Toast>
<Toast>
  <Toast.Header closeButton={false}>
    <strong className="mr-auto">OFFRES</strong>
    <small>for the next month</small>
  </Toast.Header>
  <Toast.Body>Some Special offre will came next month, YEAH!</Toast.Body>
</Toast>

</div>

)
}
}  


class Adminshow extends Component{
 
  constructor(props) {
    super(props);
    this.state={
    reservation:[],
    show:this.props.show
 
    } 
    const db = firebase.firestore();
   
    db.collection('reservation').get().then((snapshot)=>{
      snapshot.docs.forEach(doc=>{
 
      this.setState({reservation:this.state.reservation.concat([doc.data()])})
      console.log(doc.data())
      console.log(this.state.reservation)
      })
     }
     )
  }



  close=()=>{

    this.setState({show:false})
   
   
  
    }
 
  
  
   
render(){
return(

  <Modal show={this.state.show} onHide={()=>this.close()}>
  <Modal.Header closeButton>
    <Modal.Title>RESERVATION</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <Table striped bordered hover variant="dark">
<tr ><th>#</th><th>first Name</th><th>last Name</th><th>CAR</th><th>Pick up Date</th>
<th>Drop off date</th></tr>      
 {this.state.reservation.map((data,i) => (

<tr><td>{i+1}</td><td>{data.fname}</td><td>{data.lname}</td>
<td>{data.car}</td><td>{data.date1}</td><td>{data.date2}</td></tr> 

 ))
  }
  </Table>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={()=>this.close()} >
      Close
    </Button>
  </Modal.Footer>
</Modal>

)

}

}
  

export default Info;