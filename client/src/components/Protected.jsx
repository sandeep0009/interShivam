import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
    const navigate=useNavigate()
    const {Component}=props;

    const token=localStorage.getItem('token');

    useEffect(()=>{
        if(!token){
            navigate('login')
        }
    })


  return (
    <Component/>
  )
}

export default Protected