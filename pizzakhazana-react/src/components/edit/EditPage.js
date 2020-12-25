import React, {Component} from 'react'
import Input from '../common/Input'
import toastr from 'toastr'
import createProductValidator from '../../utils/createProductValidator'
import NotFoundPage from '../common/NotFound/NotFoundPage'
import {createProductValidationFunc} from '../../utils/formValidator'
import {editProductAction, fetchProductsAction} from '../../actions/productsActions'
import {redirectAction} from '../../actions/authActions'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class EditPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      ingredients: '',
      description: '',
      weight: '',
      price: '',
      image: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount () {
    const productId = this.props.match.params.id
    let product = this.props.products.find(p => p._id === productId)
    if (product) {
      this.setState({
        name: product.name,
        ingredients: product.ingredients.join(','),
        description: product.description,
        weight: product.weight,
        price: product.price.toFixed(2),
        image: product.image
      })
    } else {
      this.props.fetchProducts()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.editProductError.hasError) {
      toastr.error(nextProps.editProductError.message)
    } else if (nextProps.editProductSuccess) {
      this.props.redirect()
      toastr.success('Product edited successfully')
      this.props.history.push('/menu')
    } else {
      const productId = this.props.match.params.id
      let product = this.props.products.find(p => p._id === productId)
      if (product) {
        this.setState({
          name: product.name,
          ingredients: product.ingredients.join(','),
          description: product.description,
          weight: product.weight,
          price: product.price.toFixed(2),
          image: product.image
        })
      }
    }
  }

  onChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit (e) {
    e.preventDefault()
    if (!createProductValidator(this.state.name, this.state.ingredients,
      this.state.description, this.state.image, this.state.weight, this.state.price)) {
      return
    }
    this.props.editProduct(this.props.match.params.id, this.state.name, this.state.ingredients,
      this.state.description, this.state.image, this.state.weight, this.state.price)
  }

  render () {
    let productId = this.props.match.params.id
    let product = this.props.products.find(o => o._id === productId)
    if (!product) {
      return (
        <NotFoundPage errMessage='PRODUCT NOT FOUND' />
      )
    }

    let validObj = createProductValidationFunc(
      this.state.name,
      this.state.ingredients,
      this.state.description,
      this.state.image,
      this.state.weight,
      this.state.price
    )

    return (
      <div className="row">
        <div className="container mt-5 col-6">
          <div className="card near-moon-gradient form-white">
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <h1 className="text-center indigo-text font-bold">Edit Pizza</h1>
                <div className="md-form">
                  <Input
                  type='text'
                  name='name'
                  // label='Name'
                  placeholder='Enter pizza name'
                  value={this.state.name}
                  onChange={this.onChange}
                  valid={validObj.validName} />
                </div>
                <div className="md-form">
                <Input
                  type='text'
                  name='ingredients'
                  // label='Ingredients'
                  placeholder='Enter ingredients for the pizza. Put a comma between them'
                  value={this.state.ingredients}
                  onChange={this.onChange}
                  valid={validObj.validIngredients} />
                </div>
                <div className="md-form">
                  <Input
                  type='text'
                  name='description'
                  // label='Description'
                  placeholder='Enter pizza description'
                  value={this.state.description}
                  onChange={this.onChange}
                  valid={validObj.validDescription} />
                </div>
                <div className="md-form">
                  <Input
                  type='text'
                  name='image'
                  // label='Image URL'
                  placeholder='Enter pizza image URL'
                  value={this.state.image}
                  onChange={this.onChange}
                  valid={validObj.validImage} />
                </div>
                <div className="md-form">
                  <Input
                  type='number'
                  name='weight'
                  // label='Weight'
                  placeholder='Enter pizza weight'
                  value={this.state.weight}
                  onChange={this.onChange}
                  valid={validObj.validWeight} />
                </div>
                <div className="md-form">
                  <Input
                  type='number'
                  name='price'
                  // label='Price'
                  placeholder='Enter pizza price'
                  value={this.state.price}
                  onChange={this.onChange}
                  valid={validObj.validPrice} />
                </div>
                <div className="md-form">
                  <input type='submit' className='btn btn-warning' value='Update' />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    editProductSuccess: state.editProduct.success,
    editProductError: state.editProductError,
    products: state.products
  }
}

function mapDispatchToProps (dispatch) {
  return {
    editProduct: (id, name, ingredients, description, image, weight, price) => {
      dispatch(editProductAction(id, {name, ingredients, description, image, weight, price}))
    },
    redirect: () => dispatch(redirectAction()),
    fetchProducts: () => dispatch(fetchProductsAction())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPage))
