import React from 'react'
import HomeIcon  from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import HourglassEmptySharpIcon from '@material-ui/icons/HourglassEmptySharp';
import ShoppingCartSharpIcon from '@material-ui/icons/ShoppingCartSharp';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { blue } from '@material-ui/core/colors';
import {Link} from 'react-router-dom'
import PeopleIcon from '@material-ui/icons/People';
import Badge from '@material-ui/core/Badge';

const Navbar = (props) => {
  const {loggedIn, isAdmin, logout,pending, cart} = props


  return (
    <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <img src={require("../../full logo.png")} alt="logo" to="#" width="120" height="60"></img>            
            <div className="collapse navbar-collapse" id="navbarText">
                
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item" style={{display: 'flex', alignItems: 'center',color:"white"}}>
                        
                            <Link className="nav-link" to="/" style={{fontSize : "20px", marginLeft:"10px"}}>
                            <HomeIcon style={{ color: blue[100], verticalAlign:"middle"}}/>Home</Link>
                    </li>
                    <li className="nav-item">
                            <Link className="nav-link" to="/menu" style={{fontSize : "20px", marginLeft:"10px"}}>
                            <MenuBookIcon style={{ color: blue[100], verticalAlign:"middle" }}/>Menu</Link>
                        </li>


                    {loggedIn && !isAdmin &&  <li className="nav-item" >
                            <Link className="nav-link" to="/orders" style={{fontSize : "20px", marginLeft:"10px"}}>
                            <LocalShippingIcon style={{ color: blue[100], verticalAlign:"middle" }}/>My Orders</Link>
                        </li>}


                    {isAdmin &&  <li className="nav-item">
                            <Link className="nav-link" to="/admin/create" style={{fontSize : "20px", marginLeft:"10px"}}>
                            <AddCircleIcon style={{ color: blue[100], verticalAlign:"middle" }}/>Create New Pizza</Link>
                        </li>}


                    {isAdmin &&  <li className="nav-item">
                            <Link className="nav-link" to="/admin/orders/pending" style={{fontSize : "20px", marginLeft:"10px"}}>
                            <Badge badgeContent={pending} 
                                    color="secondary" 
                                    anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                    }}>
                                <HourglassEmptySharpIcon style={{ color: blue[100], verticalAlign:"middle" }}/>
                            </Badge>Pending Orders</Link>
                        </li>}

                    {isAdmin &&  <li className="nav-item">
                            <Link className="nav-link" to="/admin/employee" style={{fontSize : "20px", marginLeft:"10px"}}>
                            <PeopleIcon style={{ color: blue[100], verticalAlign:"middle" }}/>Employees</Link>
                        </li>}


                    {loggedIn && !isAdmin && <li className="nav-item">
                            <Link className="nav-link" to="/cart" style={{fontSize : "20px", marginLeft:"10px"}}>
                            <Badge badgeContent={cart} 
                                    color="secondary" 
                                    anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                    }}>
                            <ShoppingCartSharpIcon style={{ color: blue[100], verticalAlign:"middle" }}/>
                            </Badge>Cart</Link>
                        </li>}
                </ul>

                <ul className="navbar-nav ml-auto">
                        {!loggedIn && <li className="nav-item">
                            <Link className="nav-link" to="/login" style={{fontSize : "20px", marginLeft:"10px"}}>
                            <LockOpenRoundedIcon style={{ color: blue[100], verticalAlign:"middle" }}/>Login</Link>
                        </li>}

                        {!loggedIn && <li className="nav-item">
                            <Link className="nav-link" to="/register" style={{fontSize : "20px", marginLeft:"10px"}}>
                            <PersonAddOutlinedIcon  style={{ color: blue[100], verticalAlign:"middle" }}/>Register</Link>
                        </li>}
                        {loggedIn && <li className="nav-item">
                            <a className="nav-link" style={{fontSize : "20px", marginLeft:"10px"}} onClick={logout}>
                            <ExitToAppSharpIcon style={{ color: blue[100], verticalAlign:"middle" }}/>Logout</a>
                        </li>}
                </ul>
                
            </div>
            </nav>
        </div>
  )
}



export default Navbar
