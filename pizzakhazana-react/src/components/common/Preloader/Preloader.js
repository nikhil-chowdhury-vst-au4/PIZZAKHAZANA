import React from 'react'
import {connect} from 'react-redux'
import './Preloader.css'

const Preloader = ({ loading }) => {
  if (!loading) return null
  return (
  <div id="loading-wrapper">
    <div id="loading-text">{ loading && <div>LOADING</div>}</div>
    <div id="loading-content"></div>
  </div>
  )
}

function mapStateToProps (state) {
  return {
    loading: state.ajaxCalls > 0
  }
}

export default connect(mapStateToProps)(Preloader)
