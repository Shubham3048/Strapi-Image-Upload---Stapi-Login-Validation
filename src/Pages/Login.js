import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FileUpload from './FileUpload';

const config = require('../config.json');

//RFC
export default function Login() {
// 1.Hook Variable
    const [data2,setData2] = useState ({     //{p:v,p:v}=JS Object
        identifier:'',
        password:'',
    })  

    // Another Hook Variable
    const [user,setUser] = useState ({
        user:null,
        is_loggedin:true,
    })

    //useEffect
    useEffect(()=>{
        try {
         let user =  JSON.parse(localStorage.getItem('user'))
         if(user){
            //logged in
            setUser({
                ...user,
                is_loggedin:true
            })
         }else{
            // not logged in
            setUser({
                ...user,
                is_loggedin:false
            })
         }
        } catch (error) {
            
        }
        alert('Page Loaded Succsessfully')
    },[])

//2.Function
    let handleChange =(e)=>{   // e is event & formal Argument
        console.log(e.target.classList.contains("s_username"));

        if(e.target.classList.contains("s_username")){
            //Username
            console.log(e.target.value);
            setData2({
                //get previous data2 and place Here
                ...data2,
                //now set the value of key/property
                identifier:e.target.value
            });
            console.log("Username Block")  
        }
        if(e.target.classList.contains("s_password")){
            //Password
            console.log(e.target.value);
            setData2({
                //get previous data2 and place Here
                ...data2,
                //now set the value of key/property
                password:e.target.value
            });
            console.log("Password Block")

        }

    }
        

    let login = async (e)=>{
        e.preventDefault();
        console.log(data2);
        console.log("Login Function Work")

        try {
                // axios return PO(Promise Object)
            let {data} = await axios.post(`${config.dev_api_url}/api/auth/local`,{
                identifier: data2.identifier,
                password: data2.password,
            });
            console.log(data);

            setUser({
                //get previous data2 and place Here
                ...user,
                is_loggedin:true
            })
            localStorage.setItem('user',JSON.stringify(data)
            )

        } catch (error) {
           console.log(error); 
        }  
    }
//3.Return Statement JSX
  return (
    <>
      
        <div className='row'>
            <div className='col-6 offset-3 mt-5'>
                <h1 className='text-center'>Login Form </h1>
                    <form onSubmit={(e)=>{login(e)}}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control s_username" name='identifier' onChange={(e)=>{handleChange(e)}} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control s_password" name='password' onChange={(e)=>{handleChange(e)}} id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        </div>

        { user.is_loggedin &&
        <FileUpload/>
            }
        
        


    </>
  )
}
