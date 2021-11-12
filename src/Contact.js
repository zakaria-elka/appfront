import React, { Component } from "react";
import "./App.css";
import { Navbar,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from './firebase';


const url= new URLSearchParams(window.location.search)
const data = url.get('email')
const email=data

class Contact extends Component{

render(){
return(

<div className='Cbody'>
<div style={{paddingBottom:'80px'}}>    
<Nav />
</div>
<Fom email={email}/>
</div>


)
}
}


class Nav extends Component{

    render(){
    return(
 
<Navbar bg={'dark'} style={{paddingLeft:'45%',
position:'Fixed',width:'100%',zIndex:'9'}}
     variant="dark">
 <Navbar.Brand href="http://localhost:3000" id='nav1'>auto-Rent</Navbar.Brand>
    </Navbar>
 
    
    );
    }}


class Fom extends Component{

    constructor(props) {
        super(props)
     
        this.state={
         fname:'',
         lname:'',   
         email:'',
         message:'',

        }
        this.handleInputChange = this.handleInputChange.bind(this);
      }

    handleInputChange = (event) => {
      
        this.setState({
          [event.target.name]: event.target.value });
        
      }

      mySubmitHandler = (event) => {
        event.preventDefault();
       
        const db = firebase.firestore();
        const userRef = db.collection("contact").add({
            email: this.state.email,
            fname: this.state.fname,
            lname:this.state.lname,
            message:this.state.message
          }); 
          this.setState({
            fname: "",
            email: "",
            lname:"",
            message:""
          });
      alert("MESSAGE SEND");
      }

    render(){
      
    return(

<div>
<div className="auth-wrapper">
        <div className="auth-inner">
<form  onSubmit={this.mySubmitHandler}>
                <h3>Contact us</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" name="fname"  
                     className="form-control" placeholder="First name" 
                    onChange={this.handleInputChange} required/>
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text"  name="lname" value={this.state.lname}
                    className="form-control" placeholder="Last name" 
                    onChange={this.handleInputChange} required/>
                </div>
                {this.props.email?(
                     <p hidden>{this.state.email=this.props.email}</p> 
                ):(
                    <div className="form-group">
                    <label>Email address</label>
                    <input type="email"  name="email" value={this.state.email}
                    className="form-control" placeholder="Enter email"
                    onChange={this.handleInputChange} required/>
                </div>
                
                )}
                <div className="form-group">
                    <label>Message</label>
                    <textarea  name="message" value={this.state.message}
                     className="form-control" placeholder="Enter Message" 
                    onChange={this.handleInputChange} required/>
                </div>

                <button 
                 type="submit" className="btn btn-primary btn-block">Send</button>
           
            </form>
            </div>
      </div>
      <i class="lni lni-envelope"></i>
      </div>      

    )
    }
}


export default Contact;