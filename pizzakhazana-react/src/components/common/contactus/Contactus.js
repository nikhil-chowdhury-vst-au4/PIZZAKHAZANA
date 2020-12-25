import React from 'react'
import Input from '../Input'
import toastr from 'toastr'
import {sendEmail} from '../../../api/remote'


class Contactus extends React.Component{
    
    state={
            name: '',
            email:'',
            message:''
    }

    onChange (e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit =  (event) => {
        event.preventDefault();
        let {email, message} = this.state
        sendEmail(email,message)
            toastr.success("Email send successfully")
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="container mt-5 col-6">
                <div className="card near-moon-gradient form-white">
                    <div className="card-body">
                        <h1 className="text-center indigo-text font-bold">Contact us</h1>
                        <div className="md-form">
                        <Input
                        type='text'
                        name='name'
                        placeholder="Enter your name"
                        value={this.state.name}
                        onChange={(e) => {this.onChange(e)}}
                        />
                        </div>
                        <div className="md-form">
                        <Input
                        type='email'
                        name='email'
                        placeholder="Enter your email"
                        value={this.state.email}
                        onChange={(e) => {this.onChange(e)}}
                        />
                        </div>
                        
                        <div className="md-form">
                        <Input
                        type='text'
                        name='message'
                        placeholder="Enter your message"
                        value={this.state.message}
                        onChange={(e) => {this.onChange(e)}}
                        />
                        </div>
                        <div className="md-form text-center">
                        <button className='btn btn-primary' type="submit">Submit</button>
                        </div>
                    </div>
                </div>
                </div>
            </form>
        )
    }
}

export default Contactus