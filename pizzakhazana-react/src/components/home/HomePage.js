import React, { Component } from 'react'
import PizzaCardList from '../common/Pizza/PizzaCardList'
import Auth from '../../utils/auth'
import { connect } from 'react-redux'
import CircularCards from "../circularCards/CircularCards"

class HomePage extends Component {
  render () {
    const isAdmin = Auth.isUserAdmin()
    // const isAuthenticated = Auth.isUserAuthenticated()

    // let headingText, secondLinkName, secondLinkPath
    // if (isAdmin) {
    //   headingText = ', ' + Auth.getUsername()
    //   secondLinkName = 'View pending orders'
    //   secondLinkPath = '/admin/orders'
    // } else if (isAuthenticated) {
    //   headingText = ', ' + Auth.getUsername()
    //   secondLinkName = 'View your orders'
    //   secondLinkPath = '/orders'
    // } else {
    //   headingText = ''
    //   secondLinkName = 'Register'
    //   secondLinkPath = '/register'
    // }

    const startIndex = 0
    const pageSize = 6
    const pizzaCards = this.props.products
      .sort((a, b) => b.likes.length - a.likes.length)
      .slice(startIndex, pageSize)

    return (

<div className="container-fluid p-0" >
        <div>
        <div className="jumbotron jumbotron-fluid bg-cover text-white" style={{backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.6) 100%), url(https://cdn.pixabay.com/photo/2015/04/28/21/20/pizza-744405_960_720.jpg)"}}>
          
          <div className="container-fluid">
          <h1 className="display-4">Welcome to pizzaKhazana...! </h1>
          <hr className="my-4"/>
          <div style={{marginTop:"200px"}}>
          <p>Best Offers and Deals on Your Favorite Pizzas are Just a Few Clicks Away...!</p>
          <a className="btn btn-primary btn-lg" href="/menu" role="button">Menu</a>
          <a className="btn btn-primary btn-lg" href="/register" role="button">Register</a>
          </div>
            </div>
        </div>
        <div style={{marginTop:"100px"}}>
            {!isAdmin && <CircularCards className="mt-5"/>}
        </div>
        <div style={{marginTop:"100px"}}>
            {!isAdmin && <h1 className='font-italic text-center white-text mt-5'>Some of our top rated pizzas...</h1>}
            {isAdmin && <h1 className='font-italic text-center white-text mt-5'>Modify top rated pizzas...</h1>}
            <PizzaCardList products={pizzaCards} />
        </div>
        </div>
    </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(HomePage)
