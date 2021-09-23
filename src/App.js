import React,{useState, useEffect } from "react";
import './App.css';
import Axios from "axios";
import Modal  from 'react-modal';
import PostForm from './PostForm';
import ReactPlayer from "react-player";
//import ReactJWPlayer from 'react-jw-player'; 


function App() {
 
const [modalIsOpen, setModalIsOpen] = useState(false);
const [resdata, setresdata] = useState([])
const showurl = 'http://localhost/react%20project/newapp/src/show.php?function=show';


const updtcomp = () => {
  Axios.get(showurl) 
  .then(res =>{
    setresdata(res.data)
    console.log(res)
  })
  
  .catch(err => {
      console.log(err)
    
})
}

  useEffect(() => {
      Axios.get(showurl) 
      .then(res =>{
        setresdata(res.data)
        console.log(res)
      })
      
      .catch(err => {
          console.log(err)
        })
  }, [])
  console.log(resdata)

return( 
<div className="App"><br/>
          
          <div >
            <button onClick={()=>setModalIsOpen(true)}
            className="glow-on-hover">ADD REC</button>
          </div>  
          
          <Modal isOpen={modalIsOpen} className="modalcss" >
            <PostForm updtcomp={updtcomp} />
            <button onClick={()=> setModalIsOpen(false)}>Cancel</button>
          </Modal> <br/>

      <div className="tblfrm">      
        <table>
            <thead>
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Date</td>
                <td>V-Links</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              { resdata.length > 0 && resdata.map( resdata => (
              <tr> 
              <td key={resdata.Id}>{resdata.Id}</td>
                <td key={resdata.Name}>{resdata.Name}</td>
                <td key={resdata.date}>{resdata.date}</td>
                {/* /// Without Modal Implementation */}
                <td key={resdata.video}>                      
                      <a href={resdata.video}>
                       {resdata.video}</a></td>
                {/* /// React-player Implementation */}    
                <td>
                <button onClick={()=>setModalIsOpen(true)}> VIEW </button> &nbsp;
                <Modal isOpen={modalIsOpen}> 
                <ReactPlayer controls  
                width="90%"
                height="calc(90vh - 90px)"
                url={resdata.video}
                 />
                </Modal>    
                 {/* <button>EDIT</button>
                  <button>DELETE</button> */}
                </td>
                </tr>
              ) ) }
            </tbody>      
        </table>
      </div>      
</div>
    
   
  )
}
export default App;

///note:-
/// jw player ma local file ko kasy access krta hn
///loop-back-address