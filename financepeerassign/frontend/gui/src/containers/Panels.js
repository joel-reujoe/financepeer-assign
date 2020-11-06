import React, {Component} from 'react';
import { Layout} from 'antd';
import { Form, Button, Upload } from 'antd';
import {  InboxOutlined } from '@ant-design/icons';
import axios from 'axios';


const { Header, Content, Footer } = Layout;



class Panel extends Component{

    state ={
        selectedFile: null
    }
    normFile = e => {
        if (Array.isArray(e)) {
            return e;
        }
        this.setState({ selectedFile: e.fileList }); 
        console.log(this.state)
    };

    onFileUpload = () => { 
        var allowedExtensions =  /(\.json)$/i;
        const formData = new FormData(); 
        console.log(this.state.selectedFile[0]);
        if(!allowedExtensions.exec(this.state.selectedFile[0].name))
        {
            alert('Please select file of .json format');
        }
        else{
            formData.append( 
            "file", 
            this.state.selectedFile[0].originFileObj, 
            this.state.selectedFile.name 
            ); 
            axios("http://127.0.0.1:8000/upload/",{
                method:'POST',
                data: formData
            }).then(response=>{
                console.log(response.data);
                alert(response.data);
            }).catch(error=>{
                console.log(error)
                alert("json file has incorrect key")
            }); 
        }
      }; 

    render(){
        return ( 
        <Layout>
            <Form>
            <Form.Item
                name="upload"
                label="Upload"
                valuePropName="fileList"
                getValueFromEvent={this.normFile}
            >
                <Upload name="logo" action="/upload.do" listType="picture">
                <Button >Click to upload</Button>
                </Upload>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" htmlType="submit" onClick={this.onFileUpload}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
        </Layout>
        )
    }
}

export default Panel;