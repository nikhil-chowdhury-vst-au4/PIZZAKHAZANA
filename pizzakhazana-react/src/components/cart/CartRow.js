import React, { Component } from 'react'
import AutorenewIcon from '@material-ui/icons/Autorenew';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


class CartRow extends Component {
  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this.onRefreshButtonClick = this.onRefreshButtonClick.bind(this)
    this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this)
  }

  onChange (e) {
    this.props.syncCart(this.props.product._id, parseInt(e.target.value, 10))
  }

  onRefreshButtonClick () {
    this.props.syncCart(this.props.product._id, 1)
  }

  onDeleteButtonClick () {
    this.props.removeFromCart(this.props.product._id)
  }

  render () {
    const {image, name, ingredients, price} = this.props.product
    const subtotal = this.props.product.quantity * price

    return (
      <tr>
        <td data-th='Product'>
          <div className='row'>
            <div className='col-sm-4 hidden-xs'><img src={image} alt='...' className='cart-image' /></div>
            <div className='col-sm-8'>
              <h4 className='nomargin'>{name}</h4>
              <p>{ingredients.join(', ')}</p>
            </div>
          </div>
        </td>

        <td data-th='Price'>{price.toFixed(2)} ₹</td>

        <td data-th='Quantity'>
          <input
            type='number'
            name='quantity'
            className='form-control text-center'
            value={this.props.product.quantity}
            onChange={this.onChange}
            min="1" />
        </td>
        <td data-th='Subtotal' className='text-center'>{subtotal.toFixed(2)} ₹</td>

        <td className='actions' data-th=''>
          <IconButton aria-label="delete" onClick={this.onRefreshButtonClick} >
            <AutorenewIcon />
          </IconButton>

          <IconButton aria-label="delete" onClick={this.onDeleteButtonClick} >
            <DeleteIcon />
          </IconButton>
        </td>
      </tr>
    )
  }
}

export default CartRow
