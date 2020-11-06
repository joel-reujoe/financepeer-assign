import React from'react';
import { List, Avatar } from 'antd';

const Article =(props)=>{
    return (
        <List
        itemLayout="horizontal"
        dataSource={props.data}
        renderItem={item => (
            <List.Item>
                <List.Item.Meta
                title={<a href="https://ant.design">{item.title}</a>}
                description={item.body}
                />
            </List.Item>
            )}
        />);
}

export default Article;
