import React from "react"
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import EmployeeCardList from './EmployeeCardList'
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';


class EmployeeHeader extends React.Component   {
    
        render(){
            const { usersCount } = this.props.stats
            const employees = Object.keys(this.props.employees).length

        return(
            <div className="container ">
                <div className="mt-5">
                    <Link to="/admin/employee/add">
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<PersonAddIcon/>}
                    >ADD EMPLOYEE</Button>
                    </Link>
                    <h2 className="text-center"> Total users registered till now : {usersCount}</h2>
                    <h2 className="text-center"> Number of Employees are :  {employees}</h2>
                </div>
                <div>
                    <EmployeeCardList employee={this.props.employees}></EmployeeCardList>                
                </div>
            </div>
        )
    }
    
}

function mapStateToProps (state) {
    return {
    employees: state.employees,
    stats: state.stats
    }   
}

export default connect(mapStateToProps)(EmployeeHeader)