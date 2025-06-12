import React, { useState } from 'react';
import './AddFirm.css';
import {API_URL} from '../../Data/api';


const AddFirm = () => {
 
  const[firmName,setfirmName]=useState("")
  const[area,setArea]=useState("")
  const[category,setCategory]=useState([])
  const[region,setRegion]=useState([])
  const[offer,setOffer]=useState("")
  const[file,setFile]=useState(null)

  const Categorychange =(event)=>{
    const value=event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=>item !== value))
    }else{
      setCategory([...category,value])
    }
  }

  const Regionchange =(event)=>{
    const value=event.target.value;
    if(region.includes(value)){
      setRegion(region.filter((item)=>item !== value))
    }else{
      setRegion([...region,value])
    }
  }

  const Imageupload=(event)=>{
    const selectImage=event.target.files[0];
    setFile(selectImage)
  }
  const FirmSubmit=async(e)=>{
    e.preventDefault();
    try{
      const loginToken=localStorage.getItem('loginToken')
      if(!loginToken){
        console.error("User not authenticated")
      }

      const formData=new FormData();
      formData.append('firmName',firmName);
      formData.append('area',area);
      formData.append('offer',offer);
      formData.append('image',file);

      category.forEach((value)=>{
        formData.append('category',value)
      });

      region.forEach((value)=>{
        formData.append('region',value)
      });

      const response=await fetch(`${API_URL}/firm/add-firm`,{
        method:'POST',
        headers:{
          'token':`${loginToken}`
        },
          body:formData
        });
      const data = await response.json()
      if(response.ok){
        console.log(data)
        setfirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null)
        alert("Firm added successfully")
      }else if(data.message==="vendor can have only one firm"){
        alert("Firm Exists. Only 1 firm can be added")
      } else{
        alert('Failed to add firm')
      }
      console.log('This is firmId',data.firmId)
      const mango = data.firmId;

      localStorage.setItem('firmId',mango)
    }
    catch(error){
      console.error("failed to add firm")
    }

  }
  
  return (
     
    <div className='add-firm'><br/> <br/> <br/> <br/>
      <form className='form3' onSubmit={FirmSubmit}>

        <label className='label3'>Firm Name</label>
        <input className='input3' type="text" name='firmName' value={firmName} onChange={(e)=>setfirmName(e.target.value)} />

        <label className='label3'>Area</label>
        <input className='input3' type="text" name='area' value={area} onChange={(e)=>setArea(e.target.value)} />

        {/* CATEGORY CHECKBOXES */}
        <div className="check-box">
          <label className='label3'>Category</label>
          <div className="category-row">
            <div className="checkcontainer">
              <label className='labelbox1'>Veg</label>
              <input className='inputbox1' type="checkbox" checked={category.includes('veg')}  value="veg" onChange={Categorychange}/>
            </div>
            <div className="checkcontainer">
              <label className='labelbox1'>Non-Veg</label>
              <input className='inputbox1' type="checkbox" checked={category.includes('non-veg')} value="non-veg" onChange={Categorychange} />
            </div>
          </div>
        </div>

        {/* REGION CHECKBOXES */}
        <div className="check-box">
          <label className='label3'>Region</label>
          <div className="region-grid">
            <div className="checkcontainer">
              <label className='labelbox1'>South-Indian</label>
              <input className='inputbox1' type="checkbox" value="south-indian" checked={region.includes('south-indian')} onChange={Regionchange}/>
            </div>
            <div className="checkcontainer">
              <label className='labelbox1'>North-Indian</label>
              <input className='inputbox1' type="checkbox" value="north-indian" checked={region.includes('north-indian')} onChange={Regionchange} />
            </div>
            <div className="checkcontainer">
              <label className='labelbox1'>Chinese</label>
              <input className='inputbox1' type="checkbox" value="chinese" checked={region.includes('chinese')} onChange={Regionchange}/>
            </div>
            <div className="checkcontainer">
              <label className='labelbox1'>Bakery</label>
              <input className='inputbox1' type="checkbox" value="bakery" checked={region.includes('bakery')} onChange={Regionchange} />
            </div>
          </div>
        </div>

        <label className='label3'>Offer</label>
        <input className='input3' type="text" value={offer} onChange={(e)=>setOffer(e.target.value)} />

        <label className='label3'>Firm Image</label>
        <input className='input3' type="file" onChange={Imageupload}/>

        <button type='submit' className='btn3'>Submit</button>
      </form>
    </div>
  );
};

export default AddFirm;
