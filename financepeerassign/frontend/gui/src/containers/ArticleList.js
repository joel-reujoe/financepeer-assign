import { Components } from 'antd/lib/date-picker/generatePicker';
import React from 'react';
import Article from '../components/Article';
import axios from 'axios';
import { Button } from 'antd';
import Cookies from 'js-cookie';


class ArticleList extends React.Component{
    apiUrl = 'http://127.0.0.1:8000/api/'
    state ={
        article:[],
        selectedFile: null
    }

    onFileChange = event => { 
     
        // Update the state 
        this.setState({ selectedFile: event.target.files[0] }); 
       
    }; 

    onFileUpload = () => { 
        var allowedExtensions =  /(\.json)$/i;
        const formData = new FormData(); 
        console.log(this.state.selectedFile);
        if(!allowedExtensions.exec(this.state.selectedFile.name))
        {
            alert('Please select file of .json format');
        }
        else{
            formData.append( 
            "file", 
            this.state.selectedFile, 
            this.state.selectedFile.name 
            ); 
            const token = localStorage.getItem('token');
            axios("http://127.0.0.1:8000/upload/",{
                method:'POST',
                data: formData
            }).then(response=>{
                console.log(response.data)
                this.setState({
                    article: response.data
                })
            }).catch(error=>{
                console.log(error);
            }); 
        }
      }; 
    componentDidMount(){
        axios.get(this.apiUrl)
        .then(res=>{
        this.setState({
            article: res.data
        })
        }).catch(err=>{
            console.log(err)
        });
    }
    render(){
        return (
            <div>
                <Article data={this.state.article}/>
                <input
                type="file"
                accept=".json"
                onChange={this.onFileChange}
                />
                <button onClick={this.onFileUpload}>Upload</button>
            </div>
        );
    }
}

export default ArticleList