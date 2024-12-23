import React, { useState } from 'react'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const config = require ('../config.json');

//RFC
export default function FileUpload() {
    //1. State/Hook Variable
      const [file,setFile] = useState ('');
      const [data,setData] = useState ({
        percent:0,
        loaded:false
      })

    //2.Function
    let handleChange = (e)=>{
      console.log('Changed',e[0])
      setFile(e[0])
      
       }

        let uploadImage = async (e)=>{ // Fat Arrow Function /ES6
          e.preventDefault();
          console.log('OkOkOk');
          //Lets Create An Object Of FormData Class
          // let object=new ClassName();
          let data=new FormData();
            data.append('files',file);

          // Promise Chain
          try {
            setData({
              percent:0,
              loaded:true
            });
            //Success 
              // awat always wait for PO(Promise Chain)
            let upload_response = await axios ({
              method:'POST',
              url:`${ config.dev_api_url }/api/file-uploads`,
              data,
              onUploadProgress:(progress)=>{
                console.log(progress);
                setData({
                  loaded:true,
                  percent: (progress.loaded / progress.total * 100)
                })
              }
            })

            setData({
              percent:0,
              loaded:false
            });

            toast("File Uploaded Successfully");
            console.log('file upload response ',upload_response) 
          
          } catch (error) {
            //Error 
            setData({
              percent:0,
              loaded:false
            });
            toast("File Not Uploaded");
            console.log("Error")
            
          }
          
        }
    //3.Return Statement JSX
  return (
    <>
    <div className="row">
        <div className="col-6 offset-3 pb-5 mt-5">
            <h1>File Upload using ReactJS and Axios</h1>
            
            <form className="mt-5" onSubmit={(e)=>{ uploadImage(e) }}>
                <div className="mb-3">
                    <label htmlFor="file" className="form-label">Upload File</label>
                    <input onChange={ (e)=>{ handleChange(e.target.files) } } type="file" accept="image/*" name="files" className="form-control" id="file"/>
                </div>
                <button type="submit" className={ `btn btn-primary`}>Submit</button>
            </form>

              {
                data.loaded && <div className="progress mt-3 " role="progressbar" aria-label="Example with label" aria-valuenow={ data.percent } aria-valuemin={0} aria-valuemax={100}>
                                  <div className="progress-bar" style={{width: data.percent+'%'}}>{ data.percent }%</div>
                                </div>
              }


            <ToastContainer />
        </div>
    </div>
</>
  )
}
