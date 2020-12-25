import React, { Component } from 'react'
import Auth from '../../../utils/auth'
import {deleteProductAction} from '../../../actions/productsActions'
import { addToCartAction } from '../../../actions/cartActions'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import AOS from 'aos';
import 'aos/dist/aos.css'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

AOS.init();

class PizzaCard extends Component {
  constructor (props) {
    super(props)

    this.onOrderButtonClick = this.onOrderButtonClick.bind(this)
    this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this)
  }

  onOrderButtonClick (e) {
    if (Auth.isUserAuthenticated()) {
      this.props.addToCart(this.props.id)
      this.props.history.push('/cart')
    } else {
      this.props.history.push('/login')
    }
  }

  onDeleteButtonClick (e) {
    this.props.deleteProduct(this.props.id)
  }

  render () {
    const { id, name, image, description, weight, price } = this.props
    let footer
    if (Auth.isUserAdmin()) {
      footer = (
        <div className='buttons'>
          <small className='text-muted'>{weight} gr</small>
          <Link to={`/admin/edit/${id}`} className='btn' style={{background: "#d3d3d3", padding:"20px", borderRadius: "50%"}}><EditIcon color="primary"/></Link>
          <button onClick={this.onDeleteButtonClick} className='btn' style={{background: "#d3d3d3", padding:"20px", borderRadius: "50%"}}><DeleteIcon color="secondary"/></button>
        </div>
      )
    } else {
      footer = (
        <div className='buttons'>
          <small className='text-muted'>{weight} gm</small>
          <Link to={`/details/${id}`} type='button' className='btn btn-primary float-right btn-sm'>Details</Link>
          <button type='button' className='btn btn-info float-right btn-sm' onClick={this.onOrderButtonClick}>Order</button>
        </div>
      )
    }

    return (
      <div className="card mt-3 shadow p-3 mb-5 bg-white rounded"  style={{width: "22rem", height: "30rem"}} data-aos="zoom-in" data-aos-duration="1200">
        <img className="card-img-top" src={image} alt={name}/>
        <div className="card-body">
          <h5 className='card-title'>{name}</h5>
          <div style={{textAlignLast:"right"}}>
          <small className='text-muted red-text'>₹ {price}</small>
          </div>
          <p className='card-text'>{description}</p>
        </div>
        {/* <br></br> */}
        {footer}
      </div>

    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addToCart: (id) => dispatch(addToCartAction(id)),
    deleteProduct: (id) => dispatch(deleteProductAction(id))
  }
}

export default withRouter(connect(() => { return {} }, mapDispatchToProps)(PizzaCard))
