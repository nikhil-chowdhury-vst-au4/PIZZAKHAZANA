import toastr from 'toastr'
const emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )

function employeeProductValidator (name, email, photo, mobile_no, adhar_card, address) {
  if (name.length < 3 || name === '') {
    toastr.error('Name must be at least 3 characters long')
    return false
  }
  if (!emailRegex.test(email) || email === '') {
    toastr.error('Please provide a correct email address')
    return false
  }
  if (photo.length < 14 || !(photo.startsWith('https://') || photo.startsWith('http://'))) {
    toastr.error('photo URL must be at least 14 characters long and must be valid URL')
    return false
  }
  if (mobile_no.length < 10 || mobile_no === '') {
    toastr.error('mobile number must be 10 characters long')
    return false
  }
  if (adhar_card.length < 14 || !(adhar_card.startsWith('https://') || adhar_card.startsWith('http://'))) {
    toastr.error('adhar card URL must be at least 14 characters long and must be valid URL')
    return false
  }
  if (address.length < 10 || address.length > 200 || address === '') {
    toastr.error('address must be between 10 and 200 characters long')
    return false
  }
  return true
}

export default employeeProductValidator
 
