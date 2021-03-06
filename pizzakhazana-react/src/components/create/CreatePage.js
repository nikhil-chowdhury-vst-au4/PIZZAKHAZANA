import React, {Component} from 'react'
import Input from '../common/Input'
import toastr from 'toastr'
import createProductValidator from '../../utils/createProductValidator'
import {createProductValidationFunc} from '../../utils/formValidator'
import {createProductAction} from '../../actions/productsActions'
import {redirectAction} from '../../actions/authActions'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class CreatePage extends Component {
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

  componentWillReceiveProps (nextProps) {
    if (nextProps.createProductError.hasError) {
      toastr.error(nextProps.createProductError.message)
    } else if (nextProps.createProductSuccess) {
      this.props.redirect()
      toastr.success('Pizza created successfully')
      this.props.history.push('/menu')
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
    this.props.createProduct(this.state.name, this.state.ingredients,
      this.state.description, this.state.image, this.state.weight, this.state.price)
  }

  render () {
    let validObj = createProductValidationFunc(
      this.state.name,
      this.state.ingredients,
      this.state.description,
      this.state.image,
      this.state.weight,
      this.state.price
    )

    const { productsCount } = this.props.stats

    return (

      // <div className="row">
      <div className="container mt-5 col-6">
        <h1 className="text-center">Total pizzas created till now : {productsCount}</h1>
          <div className="card near-moon-gradient form-white mt-5">
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <h1 className="text-center indigo-text font-bold">Create New Pizza</h1>
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
                  valid={validObj.validImage} 
                  />
                  {/* <input type="file" name="image"></input> */}
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
                <div className="md-form text-center">
                  <input type='submit' className='btn btn-primary' value='Create' />
                </div>
              </form>
            </div>
          </div>
        </div>
     
    )
  }
}

function mapStateToProps (state) {
  return {
    createProductSuccess: state.createProduct.success,
    createProductError: state.createProductError,
    stats: state.stats
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createProduct: (name, ingredients, description, image, weight, price) => {
      dispatch(createProductAction({name, ingredients, description, image, weight, price}))
    },
    redirect: () => dispatch(redirectAction())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePage))
