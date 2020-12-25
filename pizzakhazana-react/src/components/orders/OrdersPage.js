import React, { Component } from 'react'
import OrdersRow from './OrdersRow'
import Auth from '../../utils/auth'
import {fetchUserOrdersAction, fetchPendingOrdersAction, approveOrderAction} from '../../actions/ordersActions'
import {connect} from 'react-redux'
// import {approved} from '../../mailer/mailer'
import {approveEmail} from '../../api/remote'


class OrdersPage extends Component {
  constructor (props) {
    super(props)

    this.onApproveButtonClick = this.onApproveButtonClick.bind(this)
  }

  componentWillMount () {
    if (Auth.isUserAdmin()) {
      this.props.fetchPendingOrders()
    //   let obj = this.props.pendingOrders.find(o => o._id === id)
    // alert(id)
    // alert(obj.email)
    // alert(obj.products[0].price)
    // this.props.approveOrder(id)
    } else {
      this.props.fetchUserOrders()
    }
  }

  onApproveButtonClick (id) {
    // alert(id)
    let obj = this.props.pendingOrders.find(o => o._id === id)
    let to = obj.email.trim()
    let data = {
      id : id,
      price : 0
    }

    obj.products.forEach((item) => {
      return data.price += item.price * item.quantity
    })
      
      // alert(data.id)
      // alert(to)
      // alert(data.price)
      // approved(to, data)
      approveEmail(to, data.id, data.price)
    this.props.approveOrder(id)
  }

  render () {
    let heading
    let noOrdersMessage
    let orders
    const isAdmin = Auth.isUserAdmin()
    if (isAdmin) {
      orders = this.props.pendingOrders.sort((a, b) => new Date(b.date) - new Date(a.date)).map((o, i) => (<OrdersRow key={o._id} order={o} index={i} onApprove={this.onApproveButtonClick} />))
      heading = 'Pending Orders'
      noOrdersMessage = 'There are currently no pending orders!'
    } else {
      orders = this.props.userOrders.sort((a, b) => new Date(b.date) - new Date(a.date)).map((o, i) => (<OrdersRow key={o._id} order={o} index={i} />))
      heading = 'My Orders'
      noOrdersMessage = 'You have not made any orders!'
    }

    return (
      <div className='container near-moon-gradient mt-5' style={{'paddingTop': 25}}>
        <h1 className='text-center indigo-text font-weight-bold'>{heading}</h1>
        <div className='row' style={{'paddingTop': 25}}>
          <div className='col-md-12' id='customer-orders'>
            <div className='box'>
              <div className='table-responsive'>
                <table className='table table-hover'>
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>View</th>
                      {isAdmin && <th>Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {orders}
                  </tbody>
                </table>
                {orders.length === 0 && <h3 className='indigo-text'>{noOrdersMessage}</h3>}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    userOrders: state.userOrders,
    pendingOrders: state.pendingOrders
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchUserOrders: () => dispatch(fetchUserOrdersAction()),
    fetchPendingOrders: () => dispatch(fetchPendingOrdersAction()),
    approveOrder: (id) => dispatch(approveOrderAction(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage)
