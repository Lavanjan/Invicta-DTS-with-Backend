import React, { Component } from 'react'
import { Drawer, Form, Col, Row, Select, Tag, Input, Button, Typography } from "antd";
import { PlusCircleOutlined, ClearOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { message } from 'antd';
import { withRouter } from "react-router-dom";
import { adddefect } from '../redux/action/ActionDefect';
const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;

export class AddDefectDetailsForm extends Component {
    formRef = React.createRef();

    componentWillReceiveProps(nextProps) {

        if (nextProps.msg) {
            message.loading('Action in progress..')
                .then(() => message.success(nextProps.msg))
                .then(() => {
                    this.setState({
                        show: false
                    })
                }).then(()=>{
                    window.location.reload()
                })
        }

       else if (nextProps.show) {
            this.setState({
                show: true
            })
            

        }
    }
    state = {
        show: false,
        defects: {},
        err: 'err',
        defect: '',
        stepToRecreate: '',
        type: '',
        status: 'New',
        severity: '',
        priority: '',
        enteredBy: '',
        assignTo: '',
        foundIn: '',
        module: '',
        subModule: '',
        availableIn: 'Rel-1'
    }

    onClose = () => {
        this.setState({
            show: false
        })
        window.location.reload();
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,

        });

    };
    handleTypeChange = value => {
        this.setState({ type: value });
    };
    handleStatusChange = value => {
        this.setState({ status: value });
    };
    handleSeverityChange = value => {
        this.setState({ severity: value });
    };
    handlePriorityChange = value => {
        this.setState({ priority: value });
    };
    handleEnteredByChange = value => {
        this.setState({ enteredBy: value });
    };
    handleAssignToChange = value => {
        this.setState({ assignTo: value });
    };
    handleFoundInChange = value => {
        this.setState({ foundIn: value });
    };
    handlemoduleChange = value => {
        this.setState({
            module: value
        })
    }
    handleSubModuleChange = value => {
        this.setState({
            subModule: value
        })
    }

    handleSubmit = (event) => {
        this.setState({
            defects: {
                defectsName: this.state.defect,
                stepToRecreate: this.state.stepToRecreate,
                type: this.state.type,
                status: this.state.status,
                severity: this.state.severity,
                priority: this.state.priority,
                enteredBy: this.state.enteredBy,
                assignTo: this.state.assignTo,
                foundIn: this.state.foundIn,
                module: this.state.module,
                subModule: this.state.subModule,
                availableIn: this.state.availableIn
            }
        })
        this.props.adddefect(this.state.defects)
        this.formRef.current.resetFields();
        // window.location.reload();



    }

    render() {
        return (
            <div>
                <Drawer
                    title="Add Defct Details"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.show}
                    placement='left'

                >
                    <Form layout="vertical" hideRequiredMark ref={this.formRef} name="add-defect" onFinish={this.handleSubmit}>
                        <Row gutter={16}>

                            <Col span={12}>
                                <Form.Item>
                                    <Text mark style={{ fontSize: 15, color: "black" }}>Defect ID : </Text>
                                    <Text mark  name="defectId" style={{ fontSize: 15, color: "black" }}>{this.props.data.length + 1}</Text>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item>
                                    <Text mark style={{ fontSize: 15, color: "black", marginLeft: 210 }}>Status : </Text>
                                    <Text mark name="status" style={{ fontSize: 15, color: "black" }}>NEW</Text>
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    label="Defect"
                                    onChange={this.handleChange}
                                    name="Defect"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input placeholder="Defect" name="defect" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="Step To Recreate"
                                    label="Step to Recreate"
                                    onChange={this.handleChange}
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <TextArea
                                        placeholder="Step to recreate......."
                                        autoSize={{ minRows: 3, maxRows: 5 }}
                                        name="stepToRecreate"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Module"
                                    name="Module"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select value={this.state.module} defaultValue="Select Module" name="module" onChange={this.handlemoduleChange}>
                                        <Option value="Module-1">Module-1</Option>
                                        <Option value="Module-2">Module-2</Option>
                                        <Option value="Module-3">Module-3</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Sub Module"
                                    name="SubModule"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >

                                    <Select value={this.state.subModule} defaultValue="Select Sub Module" name="subModule" onChange={this.handleSubModuleChange}>
                                        <Option value="Sub Module-1">Sub Module-1</Option>
                                        <Option value="Sub Module-2">Sub Module-2</Option>
                                        <Option value="Sub Module-3">Sub Module-3</Option>
                                        <Option value="Sub Module-4">Sub Module-4</Option>
                                        <Option value="Sub Module-5">Sub Module-5</Option>
                                        <Option value="Sub Module-6">Sub Module-6</Option>

                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Type"
                                    name="Type"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select value={this.state.type} defaultValue="Select Type" name="type" onChange={this.handleTypeChange}>
                                        <Option value="Functional">Functional</Option>
                                        <Option value="Performance">Performance</Option>
                                        <Option value="UI">UI</Option>
                                    </Select>
                                </Form.Item>
                            </Col> <Col span={12}>
                                <Form.Item
                                    label="Found In"
                                    name="Found In"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select value={this.state.foundIn} name="foundIn" defaultValue="Select Found In" onChange={this.handleFoundInChange}>
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
                                    label="Serverity"
                                    name="Severity"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}                                >
                                    <Select value={this.state.severity} defaultValue="Select Severity" name="severity" onChange={this.handleSeverityChange}>
                                        <Option value="High">High</Option>
                                        <Option value="Medium">Medium</Option>
                                        <Option value="Low">Low</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Priority"
                                    name="Priority"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select value={this.state.priority} name="priority" defaultValue="Select Priorty" onChange={this.handlePriorityChange}>
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
                                    name="enteredByLabel"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select value={this.state.enteredBy} defaultValue="Select Entered By" name="enteredBy" onChange={this.handleEnteredByChange}>
                                        <Option value="Sanjsijan">Sanjsijan</Option>
                                        <Option value="Lavanjan">Lavanjan</Option>
                                        <Option value="Sivapiriyan">Sivapiriyan</Option>
                                        <Option value="Gobika">Gobika</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Assign To"
                                    name="assignToLabel"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select value={this.state.assignTo} defaultValue="Select Assign To" name="assignTo" onChange={this.handleAssignToChange}>
                                        <Option value="Sanjsijan">Sanjsijan</Option>
                                        <Option value="Lavanjan">Lavanjan</Option>
                                        <Option value="Sivapiriyan">Sivapiriyan</Option>
                                        <Option value="Gobika">Gobika</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>

                            <Form.Item>
                                <Button type="danger" onClick={this.clearClick} style={{ width: 100, marginTop: 30, marginLeft: 460 }}>
                                    <ClearOutlined />
                                    Clear
                                 </Button>
                                &nbsp;
                                <Button type="primary" htmlType="submit" style={{ width: 100 }}>
                                    <PlusCircleOutlined />  Submit
                                 </Button>
                                {/* <Button onClick={this.onClick}>alert</Button> */}
                            </Form.Item>

                        </Row>
                    </Form>
                </Drawer>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    defect: state.ReducerDefect.defect,
    msg: state.ReducerDefect.msg
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        adddefect: (defect) => { dispatch(adddefect(defect)) },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddDefectDetailsForm))
