import React, { Component } from "react";
import AddProjectsDetails from "./../addNewProjects/AddNewProjects";
import { addProjects } from "./../redux/action/ActionProjects";
import { connect } from "react-redux";
import { PageHeader } from "antd";

export class AddNewProjects extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.msg) {
      alert(nextProps.msg);
    }
  }
  render() {
    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => null}
          title="Add New Project"
        />
        <AddProjectsDetails addProjects={this.props.addProjects} />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({  
  msg: state.ReducerProject.msg
});
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addProjects: (projects) => {
      dispatch(addProjects(projects));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewProjects);
