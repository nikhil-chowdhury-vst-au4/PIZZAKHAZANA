import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';

class Info extends Component {
  onLikeButtonClick () {
    if (this.props.product.likes.includes(this.props.username)) {
      this.props.unlikeProduct(this.props.product._id)
    } else {
      this.props.likeProduct(this.props.product._id)
    }
  }

  onOrderButtonClick (e) {
    e.preventDefault()
    this.props.addToCart(this.props.product._id)
    this.props.history.push('/cart')
  }

  render () {
    const { product, username } = this.props
    let buttonText = <FavoriteIcon />
    if (product.likes.includes(username)) {
      buttonText = <FavoriteIcon color="secondary"/>
    }

    return (
      <div className='row space-top'>
        <div className='col-md-4'>
          <div className='card text-white bg-primary'>
            <div className='card-body bg-light'>
              <blockquote className='card-blockquote'>
                <img src={product.image} alt={product.name} className='card-image' />
              </blockquote>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <p><span className='indigo-text font-weight-bold'>Ingredients</span>: {product.ingredients.join(', ')}</p>
          <p><span className='indigo-text font-weight-bold'>Description</span>: {product.description}</p>
          <p><span className='indigo-text font-weight-bold'>Weight</span>: {product.weight} gm</p>
          <p><span className='indigo-text font-weight-bold'>Price</span>: {product.price.toFixed(2)} ₹</p>
          <p><span className='indigo-text font-weight-bold'>Likes</span>: {product.likes.length}</p>
          {/* <button className='btn btn-primary btn-sm' onClick={this.onLikeButtonClick.bind(this)}>{buttonText}</button> */}
          <IconButton aria-label="delete" onClick={this.onLikeButtonClick.bind(this)}>
          {buttonText}
          </IconButton>
          <button className='btn btn-warning btn-sm' onClick={this.onOrderButtonClick.bind(this)}>Order</button>
        </div>
      </div>
    )
  }
}

export default withRouter(Info)
