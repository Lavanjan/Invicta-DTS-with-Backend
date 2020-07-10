import React, { Component } from 'react'
import { connect } from 'react-redux';
import {fetchemployee,addemployee} from '../../components/redux/action/ActionEmployee';
import ViewEmployee from '../employee/ViewEmployee'
import AddEmployeeForm from '../employee/AddEmployeeForm'
import { message,notification,Button} from 'antd';

export class employee extends Component {
  constructor(props) {
    super(props);
    this.state = {     
      show:false
    };
  }  
    componentWillMount(){
        this.props.fetchemployee();
    }
      
    componentWillReceiveProps(nextProps) {
        if (nextProps.msg) {
          alert(nextProps.msg)
          this.messageShow('success')
        }
    
      } 
      messageShow = (type)=>{
        notification[type]({
          message: 'Notification Title',
          description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        });
      } 
      showDrawerDefectform = () => {
        this.setState({
          show: true,
        });
      };
    render() { 
        return (
            <div>
              <Button
              type="primary"
              style={{
                marginBottom: 16,
              }}
              onClick={this.showDrawerDefectform}
           
            >
              Add New Employee
            </Button>
                <ViewEmployee employees={this.props.employees} />
                <AddEmployeeForm addemployee={this.props.addemployee} message={this.props.messageShow} show={this.state.show} />
            </div>
        )
    }
}
const mapStateToProps = state => ({
    employees: state.ReducerEmployee.employees,
    msg:state.ReducerEmployee.msg
  });
  
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchemployee: () => { dispatch(fetchemployee()) },
        addemployee:(employees) => { dispatch(addemployee(employees)) },       
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(employee)
