import React,{ useState } from "react";
import Axios from "axios";


function PostForm (props) {
    const url ="http://localhost/react%20project/newapp/src/file.php";

    const [data, setData] = useState({
          id:"",
          name:"",
          date:"",
          video:"",
          vfile:""//
      })
      let axiosConfig = {
        headers: {
            'Content-Type': 'text/html; charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
      };
function submit(e){
        e.preventDefault();
        alert("form submit");       
        

        var bodyFormData = new FormData();
              bodyFormData.append('id', data.id);
              bodyFormData.append('name', data.name);
              bodyFormData.append('date', data.date);
              bodyFormData.append('video', data.vfile);//

        Axios.post(url,bodyFormData,axiosConfig )
    
        .then(res=>{
            console.log(res.data)
            props.updtcomp();
        })
      }

function handle(e, val) {
    const newdata = {...data}

    switch(val) {
        case 'id':   
            {newdata.id = e.target.value
            setData(newdata)
            console.log(newdata)
            break;}
        case 'name':
            {newdata.name = e.target.value
            setData(newdata)
            console.log(newdata)
            break;}
        case 'date':
            
           {
           newdata.date = e.target.value; 
            setData(newdata)
            console.log(newdata)
            break;
        }
        case 'video':    
            {
            newdata.video = e.target.value;
              let files= e.target.files;
              newdata.vfile = files[0];//  
              setData(newdata)//                
                 break;
            }
        default:
            {console.log("no data")}    
        }
      }

    return ( 
        <div>
            <form action="file.php" method="post" onSubmit={(e)=> submit(e)} >
              
                    <div>
                    <label className="lblfrm">I'D  : &nbsp; &nbsp; </label>
                    <input onChange={(e)=>handle(e, "id")} name ="id" value={data.id} type="text" placeholder="ID" required/>
                    </div>
                    <div>
                    <label className="lblfrm">Name : </label>
                    <input onChange={(e)=>handle(e, "name")} name ="name" value={data.name} type="text" placeholder="Name" required/>
                    </div>
                    <div>
                    <label className="lblfrm">Date:&nbsp; &nbsp; </label>
                    <input onChange={(e)=>handle(e, "date")} name ="date" value={data.date} type="date" className="date" required/>   
                    </div>
                    <div>
                    <label className="lblfrmv">Video: </label>
                    <input onChange={(e)=>handle(e, "video")} name="video" value={data.video} type="file" accept="video/*" required/>
                    </div>
                    <br/><button>Submit</button>   

            </form>
       </div>
    );
}
export default PostForm;