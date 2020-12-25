import React from "react"
import "./circularCards.css"
// import '../../../node_modules/font-awesome/css/font-awesome.min.css'
import LocalPizzaRoundedIcon from '@material-ui/icons/LocalPizzaRounded';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import RoomIcon from '@material-ui/icons/Room';

class CircularCards extends React.Component{
    render(){
        return(
            <div className="container">
                <div className="row">
                <div className="card card-circle">
                    <div className="card-icon" style={{alignSelf:"center"}}>
                            <RoomIcon className="i"/>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Track order</h5>
                            <p className="card-text">Get update about your current order</p>
                            <a href="/orders" className="btn btn-primary">Track</a>
                        </div>
                    </div>
                    <div className="card card-circle">
                        <div className="card-icon" style={{alignSelf:"center"}}>
                            <LocalPizzaRoundedIcon className="i"/>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Order now</h5>
                            <p className="card-text">Feeling hungry...? Now order your favourate pizza in just few steps...</p>
                            <a href="/menu" className="btn btn-primary">Order</a>
                        </div>
                    </div>
                    <div className="card card-circle ">
                    <div className="card-icon" style={{alignSelf:"center"}}>
                            <ContactMailIcon className="i"/>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Contact us</h5>
                            <p className="card-text">please don't hesitate to contact us regarding questions you may have</p>
                            <a href="/contactus" className="btn btn-primary">contact</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CircularCards