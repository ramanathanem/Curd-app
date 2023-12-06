import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useHistory} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/action';
const useStyle = makeStyles((theme) => ({
    root:{
        marginTop:100,
        "&> *":{
            margin:theme.spacing(1),
            width: "45ch",
        },
    },
}));



const AddUser = () => {
    const classes=useStyle();
    const [state, setState]=useState({
        name:"",
        email:"",
        contact:"",
        address:"",
    });
    const [error,setError]=useState("");
    let history= useHistory();
    let dispatch=useDispatch();
    const {name,email,contact,address}=state;
    const handleInputChange=(e) =>{
        let {name,value}=e.target;
        setState({...state,[name]: value});
    };
    const handleSumbit = (e) => {
        e.preventDefault();
        if(!name ||!address || !email ||!contact){
            setError("Pleace input all input Field");
        }else{
dispatch(addUser(state));
history.push("/");
setError("");
        }
    };
  return (
    <div>
        <Button
style={{width:"100px", marginTop:"20px"}}
variant="contained"
 color="secondary" 
onClick={() =>history.push("/")}
>
    Go Back
    </Button>
        <h2>Add User</h2>
        {error && <h3 style={{ color:"red"}}>{error}</h3>}
        <form className ={classes.root} noValidate autoComplete ="off" onSubmit={handleSumbit}>
<TextField id="standard-basic" label="Name"  value={name} name="name" type="text" onChange={handleInputChange} />
<br/>
<TextField id="standard-basic" label="Email" value={email} name="email" type="email" onChange={handleInputChange}/>
<br/>
<TextField id="standard-basic" label="Contact" value={contact} name="contact"type="number" onChange={handleInputChange}/>
<br/>
<TextField id="standard-basic" label="Address" value={address} name="address"type="text" onChange={handleInputChange}/>
<br/>
<Button
style={{width:"100px"}}
variant="contained"
color="primary" 
type="sumbit"
>
    Sumbit
    </Button>
</form>
    </div>
  )
}

export default AddUser;