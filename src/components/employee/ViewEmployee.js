import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { Table, Input, Button, Space, Tag } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { Drawer, Form, Col, Row, Select, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";


const { Option } = Select;

export class ViewEmployee extends Component {   

  constructor(props) {
    super(props);
    this.state = { 
      searchText: "",
      searchedColumn: "",
      visible: false,
      data: [],
      show:false
    };
  }  
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const columns = [
      {
        title: "Employee ID",
        dataIndex: "employeeId",
        key: "employeeId",
        ...this.getColumnSearchProps("Id"),
      },
      {
        title: "Employee Name",
        dataIndex: "employeeName",
        key: "employeeName",
        ...this.getColumnSearchProps("Name"),
      },
      {
        title: "Email",
        dataIndex: "employeeEmail",
        key: "employeeEmail",
        ...this.getColumnSearchProps("Email"),
      },
      {
        title: "Mobile Number",
        dataIndex: "employeeMobileNumber",
        key: "employeeMobileNumber",
        ...this.getColumnSearchProps("Mobile Number"),
      }, 
      {
        title: "Department",
        dataIndex: "employeeDepartment",
        key: "employeeDepartment",
        ...this.getColumnSearchProps("Department"),
      },     
    ];
    
    return (
      <Fragment>
        <div>    
    
          <Table columns={columns} dataSource={this.props.employees} />
        </div>        
      </Fragment>
    );
  }
}

export default ViewEmployee;
