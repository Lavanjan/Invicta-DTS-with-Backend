import React, { Component } from 'react'
import { Form, Input, Button, Select, Table, Popconfirm, Pagination } from 'antd';
import { PlusCircleOutlined, ClearOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import { PageHeader } from 'antd';



const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const { Option } = Select;
const OPTIONS = ['Sivapiriyan', 'Sivathanu', 'Lavanjan', 'Vakeeshan'];

export class EmplyeeAllocation extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            selectedEmployees: [],
            employee: [],
            project: '',
            dataSource: [],

        }
        this.columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                width: '30%',

            },
            {
                title: 'Roll As',
                dataIndex: 'roll-as',
                render: () =>
                    this.state.dataSource.length >= 1 ? (
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select Roll As"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="04">Project Manager</Option>
                            <Option value="05">Team Lead</Option>
                        </Select>
                    ) : null,
            },
            {
                title: 'Operation',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <a><DeleteOutlined /></a>
                        </Popconfirm>
                    ) : null,
            },

        ];

    }
    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({
            dataSource: dataSource.filter(item => item.key !== key),
        });
    };
    handleProjectChange = (value) => {
        this.setState({
            project: value,
        });
    };
    handleChange = selectedEmployees => {
        this.setState({ 
            selectedEmployees
        
         });
      };
    handleEmployeeChange = () => {        
               for(let i=0; i<this.state.selectedEmployees.length;i++)  {
                // this.setState({                
                //     dataSource: [...this.state.dataSource,
                //     {
                //         name: this.state.selectedEmployees[i],
                //         key: Date.now()
                //     },                    
                //     ],                    
                // });
                alert(this.state.selectedEmployees[i])
               }     

    }
    onAddEmployee = (e) => {
        console.log(this.state.dataSource)
        const project = this.state.project
        for (let i = 0; i < this.state.dataSource.length; i++) {
            this.setState({
                employee: [...this.state.employee, this.state.dataSource[i].name],

            })

        }
        alert(project)
        alert(this.state.employee)
        this.setState({
            dataSource: [],
            employee: []

        })
        this.formRef.current.resetFields();

    }

    render() {
        const { selectedEmployees } = this.state;
        const filteredOptions = OPTIONS.filter(o => !selectedEmployees.includes(o));
        const { dataSource } = this.state;
        return (
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => null}
                    title="Allocate Employees"
                />
                <Form {...layout} name="employee-allocation" ref={this.formRef} onFinish={this.onAddEmployee}>
                    <Form.Item
                        name="select-project"
                        label="Project"
                        rules={[
                            {
                                // required: true,
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            style={{ width: 400 }}
                            placeholder="Select a Project"
                            optionFilterProp="children"
                            name="project"
                            onSelect={this.handleProjectChange}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="Project-01">Project-01</Option>
                            <Option value="Project-02">Project-02</Option>
                            <Option value="Project-03">Project-03</Option>
                            <Option value="Project-04">Project-04</Option>
                            <Option value="Project-05">Project-05</Option>
                        </Select>,
                </Form.Item>
                    <Form.Item
                        name="select-employee"
                        label="Select Employee"                        >
                        <Select
                            mode='multiple'
                            style={{ width: 400 }}
                            placeholder="Select a Employee"                            
                            name="employee"
                            onChange={this.handleChange}
                            value={selectedEmployees}                            
                        >
                            {filteredOptions.map(item => (
                                <Select.Option key={item} value={item}>
                                    {item}
                                </Select.Option>
                            ))}
                        </Select>
                                <Button onClick={this.handleEmployeeChange}>
                                <PlusCircleOutlined />
                                </Button>
                    </Form.Item>
                    
                    <Form.Item>
                        <Table
                            // components={components}                    
                            bordered
                            dataSource={dataSource}
                            columns={this.columns}
                            style={{ width: 800, marginLeft: 200 }}
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 16 }}>
                        <Button type="danger" style={{ width: 100 }}>
                            <ClearOutlined />
                            Clear
                        </Button>
                        &nbsp;
                        <Button type="primary" htmlType="submit" style={{ width: 100 }}>
                            <PlusCircleOutlined />  Allocate
                        </Button>


                    </Form.Item>

                </Form>




            </div >
        )
    }
}

export default EmplyeeAllocation