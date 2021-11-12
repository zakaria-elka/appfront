import React, { Component, useEffect, useState } from "react";
import { Form,Button,Navbar} from 'react-bootstrap';
import firebase from './firebase'
import './log.css'





const Log=()=>{

const [user, setUser ] = useState('');
const [email,setEmail] = useState('');
const [password,setPassword]= useState('');
const [emailError,setEmailError]= useState('');
const [hasAccount,setHasAccount]= useState(false);
const [passwordError,setPasswordError]=useState('');

const clearInput=()=>{
setEmail("");
setPassword("");
}

const clearErrors=()=>{
setEmailError('');
setPasswordError('');

}

const handleLogin=()=>{
  clearErrors();
  firebase
          .auth()
          .signInWithEmailAndPassword(email,password)
          .catch(err=>{
             switch(err.code){
              case "auth/invalid-email":
              case "auth/user-disabled":
              case "auth/user-nto-found":
               setEmailError(err.message);
               break;
              case "auth/wrong-password":
                  setPasswordError(err.message);
                  break;              


             }

         
          })
        

}

const handleSignup=()=>{
    clearErrors();
    firebase
    .auth()
    .createUserWithEmailAndPassword(email,password)
    .catch(err=>{
       switch(err.code){
        case "auth/email-already-in-use":
        case "auth/invalid-email":
         setEmailError(err.message);
         break;
        case "auth/weak-password":
            setPasswordError(err.message);
            break;              


       }


    })
   
}




const authListner=()=>{
firebase.auth().onAuthStateChanged(user=>{
if(user){
clearInput();    
setUser(user)
setTimeout(() => {
        window.location.href='http://localhost:3000/?email='+user.email;
      }, 500)

}else{
setUser("");
}
})
}

useEffect(()=>{
authListner();
},[])


return(
<section className='log'>  


{user ?(null):(

<Login

email={email}
setEmail={setEmail}
password={password}
setPassword={setPassword}
handleLogin={handleLogin}
handleSignup={handleSignup}
hasAccount={hasAccount}
setHasAccount={setHasAccount}
emailError={emailError}
passwordError={passwordError}

/>)}

</section>
);


};



const Login=(props)=>{

    const{
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSignup,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError,

    }=props;

return(
   <section className='login'>
    <div className='loginContainer'>
    <label>username</label>
    <input type='text'
    autoFocus
    required
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    />
    <p className='errorMsg'>{emailError}</p>
    <label>password</label>
    <input type='password'
    required
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    />
    <p className='errorMsg'>{passwordError}</p>
    <div className='btnContainer'>
         {hasAccount ?(
           <>
           <button className='btn' onClick={handleLogin}>Sign in</button>
           <p>Don't have a Account?
               <span onClick={()=>setHasAccount(!hasAccount)}>Sign up</span></p>
           </>
         ):(
            <>
            <button className='btn' onClick={handleSignup}>Sign up</button>
            <p>have a Account?
                <span onClick={()=>setHasAccount(!hasAccount)}>Sign in</span></p>
            </>
         )
         }

    </div>
    </div>
   </section>

)

}



     


export default Log;