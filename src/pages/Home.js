import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, loadUsers } from '../redux/action';
import React, { useEffect } from 'react';
import {useHistory} from "react-router-dom";

const useButtonStyles = makeStyles((theme) => ({
  root:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    '& > *':{
  margin:theme.spacing(1),
    },
  },
}));
const StyledTableCell=withStyles((theme)=>({
  head:{
    backgroundColor:theme.palette.common.black,
    color:theme.palette.common.white,
  },
  body:{
    fontSize:14,
  },
}))(TableCell);
  const StyledTableRow=withStyles((theme)=>({
    root:{
      "&:nth-of-type(odd)":{
backgroundColor:theme.palette.action.hover,
      },
    },
    }))(TableRow);
  function createData(name,calories,fat,carbs,protein ) {
    return { name, calories, fat, carbs, protein };
  }  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
const useStyle=makeStyles({
  table:{
    marginTop:100,
    minWidth:900,
  },
});

const Home = () => {
    const classes=useStyle();
    const buttonStyles=useButtonStyles();
    let dispatch=useDispatch();
    let history =useHistory();
    const {users}=useSelector(state=>state.data)
    
    useEffect(()  => {
      dispatch(loadUsers());
    },[]);

    const handleDelete = (id) =>{
      if(window.confirm("Are you sure wanted to delete the user  ?")){
        dispatch(deleteUser(id));
      }
    };
  
  return (
  <div>
    <div className={buttonStyles.root}>
      <Button variant="contained" color="primary" onClick={()=> history.push("/addUser")}>Add User</Button>
    </div>
         <TableContainer component={Paper}>
      <Table className={ classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Contact</StyledTableCell>
            <StyledTableCell align="center">Address</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users && users.map((user) => (
            <StyledTableRow key={user.id}>
              <StyledTableCell component="th" scope="row">
                {user.name}
              </StyledTableCell>
              <StyledTableCell align="center">{user.email}</StyledTableCell>
              <StyledTableCell align="center">{user.contact}</StyledTableCell>
              <StyledTableCell align="center">{user.address}</StyledTableCell>
              <StyledTableCell align="center">
                
             <div className={buttonStyles.root}>

              <ButtonGroup variant="contained" aria-label="outlined primary button group">
  <Button style={{marginRight: "5px"}} color="secondary"
  onClick={()=> handleDelete(user.id)}
  >
    Delete</Button>
  <Button color="primary" onClick={() => history.push(`/editUser/${user.id}`)}
  >Edit</Button>
  
</ButtonGroup>
</div>
</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default Home;