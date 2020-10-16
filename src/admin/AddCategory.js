import React from "react";
import Base from "../core/Base";
import {Link} from "react-router-dom";
import { useState } from "react";
import { isAutheticated } from "../auth/helper";
import { createCategory } from "./helper/adminapicall";
const AddCategory=()=>{
    const[name,setName]=useState("");
    const[success,setSucces]=useState(false);
    const[error,seterror]=useState(false);
    const {user,token}=isAutheticated();

    const handleChange=(event)=>{
        seterror("")
        setName(event.target.value)
    }
    const onsubmit=(event)=>{
        event.preventDefault();
        seterror("");
        setSucces(false);
        createCategory(user._id,token,{name})
        .then(data=>{
            if(data.error){
                seterror(true)
            }
            else{
                seterror("")
                setSucces(true)
                setName("")
            }
        })
    }
    const goBack=()=>(
        <div className="mt-5">
            <Link className="btn-btn-sm-btn-info mb-3" to="/admin/dashboard">
                Admin Home
            </Link>
        </div>
    );    

    const SuccesMessage=()=>{
        if(success){
            return <h4 className="text-success"> Category created Succesfully</h4>
        }
    }

    const ErrorMessage=()=>{
        if(error){
            return <h4 className="text-success"> Failed to create Category</h4>
        }
    }
    const myCategoryForm=()=>(
        <form>
            <div className="form-group">
                <p className="lead"> Enter the Category</p>
            <input type="text"className="form-control my-3"
            onChange={handleChange}
            value={name}
            autoFocus required placeholder="For Ex. Summer" />
            
            <button className="btn-btn-outline-info" onClick={onsubmit}>
                Create Category
            </button>
            </div>
        </form>
    )
    return (
        <Base title="Create Category Here" description="Add a New Category for new t-shirt" 
        className="container bg-info p-4">
        <div className="row bg-white rounded">
            <div className="col-md-8 offset-md-2">
               {SuccesMessage()}
               {ErrorMessage()}
                {myCategoryForm()}
                {goBack()}
            </div>
        </div>
        </Base>
    )
}

export default AddCategory;