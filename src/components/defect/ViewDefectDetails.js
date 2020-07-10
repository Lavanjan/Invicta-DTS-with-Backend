import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  Input,
  Button,
  Space,
  Tag,
  Badge,
  notification,
  Modal,
  Descriptions,
} from "antd";
import Highlighter from "react-highlight-words";
import {
  SearchOutlined,
  FallOutlined,
  RiseOutlined,
  StockOutlined,
  BugOutlined,
  EditOutlined,
  RadarChartOutlined,
  FolderViewOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import { Drawer, Form, Col, Row, Select, Typography, Statistic } from "antd";
import axios from "axios";
import AddDefectDetailsForm from "./AddDefectDetailsForm";

const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: "Notification Title",
    description: "This is Notification",
  });
};

export class ViewDefectDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      defectsId: "",
      defectsName: "",
      stepToRecreate: "Hello Dear",
      type: "",
      status: "",
      severity: "",
      priority: "",
      enteredBy: "",
      foundIn: "",
      availableIn: "",
      assignTo: "",
      module: "",
      subModule: "",
      high: 0,
      medium: 0,
      low: 0,
      newdef: 0,
      severityTotal: [],
      selectedRows: [],
      selectedData: [],
      rId: "",
      putData: [],
      filteredInfo: null,
      sortedInfo: null,
      searchText: "",
      searchedColumn: "",
      visible: false,
      data: [],
      loading: false,
      show: false,
      drawerData: {},
      totalHigher: "",
      viewVisible: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  showModal = () => {
    this.setState({
      viewVisible: true,
    });
  };
  handleOk = (e) => {
    console.log(e);
    this.setState({
      viewVisible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      viewVisible: false,
    });
  };

  handleChange = (event, field) => {
    console.log(event.target.name);
    console.log(field);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  filterHandleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };
  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  handleSelect = (name, value) => {
    if (name === "type") {
      this.setState({
        type: value,
      });
    } else if (name === "status") {
      this.setState({
        status: value,
      });
    } else if (name === "severity") {
      this.setState({
        severity: value,
      });
    } else if (name === "priority") {
      this.setState({
        priority: value,
      });
    } else if (name === "enteredBy") {
      this.setState({
        enteredBy: value,
      });
    } else if (name === "assignTo") {
      this.setState({
        assignTo: value,
      });
    } else if (name === "foundIn") {
      this.setState({
        foundIn: value,
      });
    } else if (name === "availableIn") {
      this.setState({
        availableIn: value,
      });
    } else if (name === "module") {
      this.setState({
        module: value,
      });
    } else if (name === "submodule") {
      this.setState({
        subModule: value,
      });
    }
  };

  create = (data) => {
    axios.post("http://localhost:5000/defects", data).then((res) => {});
  };

  onClickView = (viewRecord) => {
    console.log("Test Record", viewRecord._id);
    this.setState({
      rId: viewRecord._id,
      viewVisible: true,
      viewData: viewRecord,
      defectsName: viewRecord.defectsName,
      type: viewRecord.type,
      defectsId: viewRecord.defectsId,
      status: viewRecord.status,
      stepToRecreate: viewRecord.stepToRecreate,
      severity: viewRecord.severity,
      priority: viewRecord.priority,
      enteredBy: viewRecord.enteredBy,
      foundIn: viewRecord.foundIn,
      availableIn: viewRecord.availableIn,
      module: viewRecord.module,
      subModule: viewRecord.subModule,
      assignTo: viewRecord.assignTo,
    });
    this.showModal();
  };

  onClickEdit = (record) => {
    console.log("Test Record", record._id);
    this.setState({
      rId: record._id,
      visible: true,
      drawerData: record,
      defectsName: record.defectsName,
      type: record.type,
      defectsId: record.defectsId,
      status: record.status,
      stepToRecreate: record.stepToRecreate,
      severity: record.severity,
      priority: record.priority,
      enteredBy: record.enteredBy,
      foundIn: record.foundIn,
      availableIn: record.availableIn,
      module: record.module,
      subModule: record.subModule,
      assignTo: record.assignTo,
    });
  };

  renderDrawer = (record) => (
    <Form layout="vertical" hideRequiredMark>
      <Row gutter={16}>
        <Col span={24}>
          {/* <Form.Item> */}
          <Text mark style={{ float: "right", fontSize: "16px" }}>
            {" "}
            Defects ID: {record.defectsId}{" "}
          </Text>
          {/* </Form.Item> */}
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="Defect"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              placeholder="Defect"
              name="defectsName"
              id="defectsName"
              value={this.state.defectsName}
              onChange={(event, field) => this.handleChange(event, field)}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="Steps To Recreate"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea
              name="stepToRecreate"
              rows={4}
              placeholder="please enter the steps to recreate"
              value={this.state.stepToRecreate}
              onChange={(event, field) => this.handleChange(event, field)}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Type"
            value={this.state.type}
            onChange={this.handleChange}
            rules={[{ required: true, message: "Please select an Type" }]}
          >
            <Select
              placeholder="Please select an Type"
              name="type"
              value={this.state.type}
              onChange={(value) => this.handleSelect("type", value)}
            >
              <Option value="Functional">Functional</Option>
              <Option value="Performance">Performance</Option>
              <Option value="UI">UI</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Status"
            rules={[{ required: true, message: "Please choose the status" }]}
          >
            <Select
              placeholder="Please choose the status"
              name="status"
              value={this.state.status}
              onChange={(value) => this.handleSelect("status", value)}
            >
              {(() => {
                switch (record.status) {
                  case "New":
                    return (
                      <>
                        <Option value="Open">Open</Option>
                        <Option value="Reject">Reject</Option>
                      </>
                    );
                  case "Closed":
                    return (
                      <>
                        <Option value="Re-open">Re-open</Option>
                      </>
                    );
                  case "Fixed":
                    return (
                      <>
                        <Option value="Closed">Closed</Option>
                        <Option value="Re-open">Re-open</Option>
                      </>
                    );
                  case "Re-open":
                    return (
                      <>
                        <Option value="Open">Open</Option>
                        <Option value="Reject">Reject</Option>
                      </>
                    );
                  case "Open":
                    return (
                      <>
                        <Option value="Fixed">Fixed</Option>
                        <Option value="Reject">Reject</Option>
                      </>
                    );
                  case "Reject":
                    return (
                      <>
                        <Option value="Re-open">Re-open</Option>
                        <Option value="Closed">Closed</Option>
                      </>
                    );
                }
              })()}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Serverity"
            rules={[{ required: true, message: "Please choose the serverity" }]}
          >
            <Select
              placeholder="Please choose the serverity"
              name="serverity"
              value={this.state.severity}
              onChange={(value) => this.handleSelect("severity", value)}
            >
              <Option value="High">High</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Low">Low</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Priority"
            rules={[{ required: true, message: "Please choose the priority" }]}
          >
            <Select
              placeholder="Please choose the priority"
              name="priority"
              value={this.state.priority}
              onChange={(value) => this.handleSelect("priority", value)}
            >
              <Option value="High">High</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Low">Low</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Entered By"
            rules={[
              { required: true, message: "Please choose the entered by" },
            ]}
          >
            <Select
              placeholder="Please choose the entered by"
              name="enteredBy"
              value={this.state.enteredBy}
              onChange={(value) => this.handleSelect("enteredBy", value)}
            >
              <Option value="Sanjsijan">Sanjsijan</Option>
              <Option value="Lavanjan">Lavanjan</Option>
              <Option value="Sivapiriyan">Sivapiriyan</Option>
              <Option value="Gobika">Gobika</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="AssignTo"
            rules={[{ required: true, message: "Please choose the assign to" }]}
          >
            <Select
              placeholder="Please choose the assign to"
              name="assignTo"
              value={this.state.assignTo}
              onChange={(value) => this.handleSelect("assignTo", value)}
            >
              <Option value="Sanjsijan">Sanjsijan</Option>
              <Option value="Lavanjan">Lavanjan</Option>
              <Option value="Sivapiriyan">Sivapiriyan</Option>
              <Option value="Gobika">Gobika</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Found In"
            rules={[{ required: true, message: "Please choose the found in" }]}
          >
            <Select
              placeholder="Please choose the found in"
              name="foundIn"
              value={this.state.foundIn}
              onChange={(value) => this.handleSelect("foundIn", value)}
            >
              <Option value="Rel-1">Rel-1</Option>
              <Option value="Rel-2">Rel-2</Option>
              <Option value="Rel-3">Rel-3</Option>
              <Option value="Rel-4">Rel-4</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Available In"
            rules={[
              {
                required: true,
                message: "Please choose the available in",
              },
            ]}
          >
            <Select
              placeholder="Please choose the available in"
              name="availableIn"
              value={this.state.availableIn}
              onChange={(value) => this.handleSelect("availableIn", value)}
            >
              <Option value="Rel-1">Rel-1</Option>
              <Option value="Rel-2">Rel-2</Option>
              <Option value="Rel-3">Rel-3</Option>
              <Option value="Rel-4">Rel-4</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Module"
            rules={[{ required: true, message: "Please choose the Module" }]}
          >
            <Select
              placeholder="Please choose the module"
              name="module"
              value={this.state.module}
              onChange={(value) => this.handleSelect("module", value)}
            >
              <Option value="Module-1">Module-1</Option>
              <Option value="Module-2">Module-2</Option>
              <Option value="Module-3">Module-3</Option>
              <Option value="Module-4">Module-4</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="SubModule"
            rules={[
              {
                required: true,
                message: "Please choose the Submodule",
              },
            ]}
          >
            <Select
              placeholder="Please choose the Submodule"
              name="submodule"
              value={this.state.subModule}
              onChange={(value) => this.handleSelect("submodule", value)}
            >
              <Option value="SubModule-1">SubModule-1</Option>
              <Option value="SubModule-2">SubModule-2</Option>
              <Option value="SubModule-3">SubModule-3</Option>
              <Option value="SubModule-4">SubModule-4</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  getAll() {
    axios
      .get("http://localhost:5000/defects")
      .then((res) => {
        this.setState({
          data: res.data,
        });
      })
      .then(() => {
        for (let i = 0; i < this.state.data.length; i++) {
          switch (this.state.data[i].severity) {
            case "High":
              this.setState({
                high: this.state.high + 1,
              });
              break;
            case "Medium":
              this.setState({
                medium: this.state.medium + 1,
              });
              break;
            case "Low":
              this.setState({
                low: this.state.low + 1,
              });
              break;
          }
          switch (this.state.data[i].status) {
            case "New":
              this.setState({
                newdef: this.state.newdef + 1,
              });
              break;
          }
        }
      });
  }
  componentDidMount() {
    this.getAll();
  }
  onClick = () => {
    for (let i = 0; i < this.state.data.length; i++) {
      switch (this.state.data[i].severity) {
        case "High":
          this.setState({
            high: this.state.high + 1,
          });
          alert(this.state.data.length);
          break;
        case "Medium":
          this.state.medium = this.state.medium + 1;
          break;
        case "Low":
          this.state.low = this.state.low + 1;
          break;
      }
    }
  };

  showDrawerDefectform = () => {
    this.setState({
      show: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
      drawerData: {},
    });
  };

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

  handleSubmit = (e) => {
    const {
      defectsName,
      type,
      defectsId,
      stepToRecreate,
      status,
      severity,
      priority,
      enteredBy,
      assignTo,
      foundIn,
      availableIn,
      module,
      subModule,
    } = this.state;
    // e.preventDefault();
    const data = {
      defectsId: defectsId,
      defectsName: defectsName,
      type: type,
      stepToRecreate: stepToRecreate,
      status: status,
      severity: severity,
      priority: priority,
      enteredBy: enteredBy,
      foundIn: foundIn,
      availableIn: availableIn,
      module: module,
      subModule: subModule,
      assignTo: assignTo,
    };
    console.log(data);
    axios
      .put(`http://localhost:5000/defects/update/${this.state.rId}`, data)
      .then((res) => {
        console.log(res.data);
        this.setState({
          putData: res.data,
          visible: false,
        });
      });
    window.location.reload();
  };

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
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: "ID",
        width: "1%",
        dataIndex: "defectsId",
        key: "defectsId",
        sorter: (a, b) => a.defectsId - b.defectsId,
        defaultSortOrder: "descend",
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Defect Description",
        dataIndex: "defectsName",
        key: "defectsName",
        ...this.getColumnSearchProps("defectsName"),
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        filters: [
          {
            text: "Functional",
            value: "Functional",
          },
          {
            text: "Performance",
            value: "Performance",
          },
          {
            text: "UI",
            value: "UI",
          },
        ],
        filterMultiple: false,
        filteredValue: filteredInfo.type || null,
        onFilter: (value, record) => record.type.includes(value),
      },
      {
        title: "Module",
        dataIndex: "module",
        key: "module",
        filterMultiple: false,
        ...this.getColumnSearchProps("module"),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        filters: [
          {
            text: "New",
            value: "New",
          },
          {
            text: "Open",
            value: "Open",
          },
          {
            text: "Fixed",
            value: "Fixed",
          },
          {
            text: "Closed",
            value: "Closed",
          },
          {
            text: "Re-open",
            value: "Re-open",
          },
          {
            text: "Postpone",
            value: "Postpone",
          },
        ],
        filterMultiple: false,
        filteredValue: filteredInfo.status || null,
        onFilter: (value, record) => record.status.includes(value),
        render: (value, record) => {
          switch (record.status) {
            case "New":
              return <Tag color="geekblue">New</Tag>;
            case "Open":
              return <Tag color="orange">Open</Tag>;
            case "Fixed":
              return <Tag color="green">Fixed</Tag>;
            case "Closed":
              return <Tag color="lime">Closed</Tag>;
            case "Re-open":
              return <Tag color="purple">Re-open</Tag>;
            case "Postpone":
              return <Tag color="cyan">Postpone</Tag>;
            case "Reject":
              return <Tag color="red">Reject</Tag>;
          }
        },
      },
      {
        title: "Severity",
        dataIndex: "severity",
        key: "severity",
        filters: [
          {
            text: "High",
            value: "High",
          },
          {
            text: "Medium",
            value: "Medium",
          },
          {
            text: "Low",
            value: "Low",
          },
        ],
        filterMultiple: false,
        filteredValue: filteredInfo.severity || null,
        onFilter: (value, record) => record.severity.includes(value),
        render: (value, record) => {
          switch (record.severity) {
            case "High":
              return <Tag color="red">High</Tag>;
            case "Medium":
              return <Tag color="orange">Medium</Tag>;
            case "Low":
              return <Tag color="green">Low</Tag>;
          }
        },
      },
      {
        title: "Priority",
        dataIndex: "priority",
        key: "priority",
        filters: [
          {
            text: "High",
            value: "High",
          },
          {
            text: "Medium",
            value: "Medium",
          },
          {
            text: "Low",
            value: "Low",
          },
        ],
        filterMultiple: false,
        filteredValue: filteredInfo.priority || null,
        onFilter: (value, record) => record.priority.includes(value),
        render: (value, record) => {
          switch (record.priority) {
            case "High":
              return <Tag color="red">High</Tag>;
            case "Medium":
              return <Tag color="orange">Medium</Tag>;
            case "Low":
              return <Tag color="green">Low</Tag>;
          }
        },
      },
      {
        title: "Entered By",
        dataIndex: "enteredBy",
        key: "enteredBy",
        ...this.getColumnSearchProps("enteredBy"),
      },
      {
        title: "Assign To",
        dataIndex: "assignTo",
        key: "assignTo",
        ...this.getColumnSearchProps("assignTo"),
      },
      {
        title: "View",
        key: "view",
        render: (viewRecord = this.state.selectedRows) => (
          <a onClick={() => this.onClickView(viewRecord)}>
            <FolderViewOutlined style={{ color: "magenta", textAlign:"center", fontSize: 16 }} />
          </a>
        ),
      },
      {
        title: "Edit",
        // dataIndex: "view",
        key: "edit",
        render: (record = this.state.selectedRows) => (
          <a onClick={() => this.onClickEdit(record)}>
            <EditOutlined style={{ fontSize: 16 }} />
          </a>
        ),
      },
    ];

    const { drawerData } = this.state;
    return (
      <Fragment>
        <Row gutter={8}>
          <Col span={3}>
            <Button
              type="primary"
              ghost
              style={{
                marginBottom: 16,
                marginTop: 10,
              }}
              onClick={this.showDrawerDefectform}
            >
              Add New Defect
            </Button>
          </Col>
          <Col span={6}>
            <Button
              danger
              onClick={this.clearFilters}
              style={{
                marginBottom: 16,
                marginTop: 10,
              }}
            >
              Clear filters
            </Button>
          </Col>
          <Col span={3}>
            <Statistic
              title="High Severity"
              style={{ textAlign: "center" }}
              value={this.state.high}
              valueStyle={{ color: "red", textAlign: "center" }}
              prefix={<RiseOutlined />}
            ></Statistic>
          </Col>
          <Col span={3}>
            <Statistic
              title="Medium Severity"
              style={{ textAlign: "center" }}
              value={this.state.medium}
              valueStyle={{ color: "orange", textAlign: "center" }}
              prefix={<StockOutlined />}
            ></Statistic>
          </Col>
          <Col span={3}>
            <Statistic
              title="Low Severity"
              style={{ textAlign: "center" }}
              value={this.state.low}
              valueStyle={{ color: "green", textAlign: "center" }}
              prefix={<FallOutlined />}
            ></Statistic>
          </Col>
          <Col span={3}>
            <Statistic
              title="New Defects"
              style={{ textAlign: "center" }}
              value={this.state.newdef}
              valueStyle={{ color: "blue", textAlign: "center" }}
              prefix={<RadarChartOutlined />}
            ></Statistic>
          </Col>
          <Col span={3}>
            <Statistic
              title="Total Defects"
              style={{ textAlign: "center" }}
              value={this.state.data.length}
              valueStyle={{ color: "#006d75", textAlign: "center" }}
              prefix={<BugOutlined />}
            ></Statistic>
          </Col>
        </Row>
        <br></br>
        <Table
          columns={columns}
          dataSource={this.state.data}
          onChange={this.filterHandleChange}
        />

        <Drawer
          title="Update Defect Details"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: "right",
              }}
            >
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={(e) => this.handleSubmit(e)} type="primary">
                Update
              </Button>
            </div>
          }
        >
          {this.renderDrawer(drawerData)}
        </Drawer>
        <AddDefectDetailsForm show={this.state.show} data={this.state.data} />

        <Modal
        style = {{borderRadius:"10px"}}
          footer={[]}
          style={{ top: 40 }}
          width="90%"
          title="Defect Brief Details"
          visible={this.state.viewVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Descriptions column={5} layout="vertical" bordered>
            <Descriptions.Item label="Defect Description" span={5}>
              {this.state.defectsName}
            </Descriptions.Item>
            <Descriptions.Item label="Steps to Recreate" span={5}>
              {this.state.stepToRecreate}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              {this.state.status}
            </Descriptions.Item>
            <Descriptions.Item label="Type">
              {this.state.type}
            </Descriptions.Item>
            <Descriptions.Item label="Module">
              {this.state.module}
            </Descriptions.Item>
            <Descriptions.Item label="SubModule">
              {this.state.subModule}
            </Descriptions.Item>
            <Descriptions.Item label="Serverity">
              {this.state.severity}
            </Descriptions.Item>
            <Descriptions.Item label="Priority">
              {this.state.priority}
            </Descriptions.Item>
            <Descriptions.Item label="Entered By">
              {this.state.enteredBy}
            </Descriptions.Item>
            <Descriptions.Item label="Assign To">
              {this.state.assignTo}
            </Descriptions.Item>
            <Descriptions.Item label="Found In">
              {this.state.foundIn}
            </Descriptions.Item>
            <Descriptions.Item label="Available In">
              {this.state.availableIn}
            </Descriptions.Item>
          </Descriptions>
        </Modal>
      </Fragment>
    );
  }
}

export default ViewDefectDetails;
