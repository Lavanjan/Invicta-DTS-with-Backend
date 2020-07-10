import React, { Component } from 'react'
import { Drawer, Form, Col, Row, Select, Tag, Input, Button, Typography,message } from "antd";
import { employee } from '.';

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not validate email!',
        number: '${label} is not a validate number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

export class AddEmployeeForm extends Component {
    formRef = React.createRef();

    componentWillReceiveProps(nextProps) {

        if (nextProps.msg) {
            message.loading('Action in progress..')
                .then(() => message.success(nextProps.msg))
                .then(() => {
                    this.setState({
                        show: false
                    })
                }).then(() => {
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
        name: '',
        email: '',
        number: '',
        department: '',
        employee: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,

        });
    }
    onFinish = (event) => {

        const employee = {
            employeeName: this.state.name,
            employeeEmail: this.state.email,
            employeeMobileNumber: this.state.email,
            employeeDepartment: this.state.department
        }

        this.props.addemployee(employee);
        this.props.messageShow('success');


    }

    onClose = () => {
        this.setState({
            show: false
        })
        window.location.reload();
    };
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
                    <Form layout="vertical" hideRequiredMark name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>
                    <Row gutter={16}>
                            <Col span={24}>
                        <Form.Item
                            name="Name"
                            label="Name"
                            onChange={this.handleChange}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input name="name" />
                        </Form.Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                        <Form.Item
                            name="Email"
                            onChange={this.handleChange}
                            label="Email"
                            rules={[
                                {
                                    required: true
                                },
                            ]}
                        >
                            <Input name="email" />
                        </Form.Item>
                        </Col></Row>
                        <Row gutter={16}>
                            <Col span={24}>
                        <Form.Item
                            name="Number"
                            onChange={this.handleChange}
                            label="Number"
                            rules={[
                                {
                                    required: true
                                },
                            ]}
                        >
                            <Input name="number" />
                        </Form.Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                        <Form.Item
                            name="Department"
                            onChange={this.handleChange}
                            label="Department"
                            rules={[
                                {
                                    required: true
                                },
                            ]}
                        >
                            <Input name="department" />
                        </Form.Item>
                            </Col>                            
                            </Row>
                            <Row gutter={16}>
                            <Col span={24}>
                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Submit
                        </Button>
                        </Form.Item>
                        </Col>
                        </Row>
                    </Form>
                </Drawer>
            </div>
        )
    }
}

export default AddEmployeeForm
