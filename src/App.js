import React, { Component} from "react";
import "./App.css";
import { Navbar,Card,Button,Form,Row,Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Info from './infocar.js';
import Contact from './Contact.js'
import Log from './login.js'
import {Route,Link} from 'react-router-dom';


const url= new URLSearchParams(window.location.search)
const data = url.get('email')
const email=data


class App extends Component {
  
    
    render() {
      
        return (
            <div>
            <Route exact path='/' component={Home} />
            <Route exact path='/infocar' component={Info} />
            <Route exact path='/Contact' component={Contact}/>
            <Route exact path='/login' component={Log}/>
            </div>
          
            
            
        );
    }
}



class Home extends Component{

    render()
    {
    return(
    <div className='homeapp' >
    <Nav email={email}/>
    <Form1 email={email}/>
    <Txt1 /> 
    <Cards />
    </div>
    );
}
}


class Nav extends Component{

scroll(){
    

    window.scrollTo(0,document.body.scrollHeight);


}

logout(){


window.location.href="http://localhost:3000/login"

}


render(){
return(

<Navbar bg="dark" variant="dark">
    <Navbar.Brand href="" id="nav1">
     auto-Rent
    </Navbar.Brand>
    <Button variant='outline-info' style={{marginLeft:'70%'}}
    onClick={this.scroll}>Services</Button>
    <Button href={"http://localhost:3000/Contact?email="+this.props.email} 
    variant='outline-success' 
    >Contact</Button>
    {this.props.email ?(window.history.pushState({},'','http://localhost:3000'),
    <Button onClick={this.logout} variant='outline-primary' 
    >Log out</Button>)
    :<Button href='http://localhost:3000/login' variant='outline-primary' 
    >Log in</Button>
   


    }
 
</Navbar>


);
}}

class Form1 extends Component{
    
    constructor(props) {
        super(props)
     
        this.state={
         category:'',
         Npers:'',
         date1:new Date(''),
         date2:new Date(''),

        }
        this.handleInputChange = this.handleInputChange.bind(this);
      }


      handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value    });
      }
    
  
     async handleSubmit(){

 if(this.state.category!='' & this.state.Npers!='' & !isNaN(Date.parse(this.state.date1)) &
 !isNaN(Date.parse(this.state.date2))){     
 try{
  
    let result= await fetch('http://localhost:9000/testApi' , {
        method: "post",
        mode:'cors',
        
        headers: {
          
          'Content-type': 'application/json'

        },
        body:JSON.stringify(this.state)
      })
     
      .then(setTimeout(() => {
        window.location.href='http://localhost:3000/infocar?email='+this.props.email;
      }, 2000))

 }catch(e){
     console.log(e)
 }
}else{alert("please enter value!")}
       
   
}
   
    render(){
       
    return(
    
        <Card bg={'dark'}  text={'white'} id="form_card">
        <Card.Header>
         <center>Find Your Car</center>  
        </Card.Header>    
        <Card.Body>
        <Form>
        <Form.Label>Category</Form.Label>
        <Form.Group >
        <Form.Control as="select" name='category'
        value={this.state.category} onChange={this.handleInputChange} required> 
        <option hidden></option>
        <option>lowcost</option>
        <option>economic</option>
        <option>cross</option>
        <option>luxe</option>
        </Form.Control> 
         </Form.Group>
         <Form.Label>Number of person</Form.Label>
         <Form.Group >
        <Form.Control as="select"   name='Npers'
        value={this.state.Npers} onChange={this.handleInputChange} required> 
        <option hidden></option>
        <option >2</option>
        <option >4</option>
        </Form.Control> 
         </Form.Group>
        <Form.Group>
        <Form.Label>pick-up Date</Form.Label>
        <Form.Control type="date" 
        name='date1'  value={this.state.date1} onChange={this.handleInputChange} 
         required/>
        <br/>
        <Form.Label>Drop off Date</Form.Label>
        <Form.Control type="date" name='date2'
       value={this.state.date2} onChange={this.handleInputChange}  required/>
        </Form.Group>
        <Button onClick={() =>this.handleSubmit()} variant="info">confirm</Button>
        </Form>
        
        </Card.Body>
        </Card>

        
    
    
    );
   
    }
}


class Txt1 extends Component
{ 

render(){
return(
    <div id="txt">
    <h2 id="txth2">Rent A Car!</h2>
    <pre >      We    Have    A    Best   Price</pre>
   </div>
);
}
}

const Cards = () => 
{
       function scroll(){

        window.scrollTo(0,0);
    
    
    }
    
    return (
        <div className='service'>
         
            <center><h5 className="mb-3" style={{color:"white"}}>SERVICES</h5></center>
            <Row>
                <Col xs="10" md="4">
    
                    <Card>
                        <Card top width="100%"  />
                        <Card.Body>
                           <Card.Title>DELIVRING</Card.Title>
                           <Card.Text>we have more than 200 vehicle to perform making the vehicle available to you on the site of your choice in Morocco</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="10" md="4">
                   
                    <Card>
                        <Card top width="100%" />
                        <Card.Body>
                            <Card.Title>MAINTENANCE</Card.Title>
                            <Card.Text>You don't have to worry about it anymore!
                                <br></br>We take care of everything:<br></br>
                                Brake pad change, oil change, tire change ...</Card.Text>
                
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="10" md="4">
                    <Card>
                        <Card top width="100%"  />
                        <Card.Body>
                            <Card.Title>ASSISTANCE</Card.Title>
                            <Card.Text>In the event of an accident or breakdown, you have rapid support</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Button
  onClick={scroll} variant='dark' style={{marginTop:'5px',float:'right',marginBottom:'20px'}}
  ><i class="lni lni-arrow-up"></i></Button>
        </div>
        
    );
}
  

export default App;