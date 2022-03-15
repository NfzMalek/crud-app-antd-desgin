import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import { Table, Modal, Space, Input, Form, Row, Col } from "antd";
import { Button } from "antd";
import { Tooltip } from "antd";
//import { Space } from 'antd';
import React, { useEffect, useState } from 'react';


import axios from "axios";

//import { ExclamationCircleOutlined } from '@ant-design/icons';
/*
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];
    const removeById = (arr, id) => {
    const requiredIndex = arr.findIndex((el) => {
      return el.id === String(id);
    });
    if (requiredIndex === -1) {
      return false;
    }
    return !!arr.splice(requiredIndex, 1);
  };

  function confirm() {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Confirmation de la supprission",
      okText: "ok",
      cancelText: "annuler",
    });
  }
*/
import {
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
  LoadingOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
const { Column, ColumnGroup } = Table;

function App() {
  //const [isEditing, setIsEditing] = useState(false);
  const [posts,setPosts]=useState([])
  const [newProduct, setNewProduct]=useState({
    name: '',
    brand:'',
    madein: '',
    price: ''
  })
  

  
  const [editingStudent, setEditingStudent] = useState(null);

 useEffect(()=>{
      axios.get('http://localhost:8052/api/fullProdApi').then(res=>{
          console.log(res.data)
          setPosts(res.data)
      })
      .catch(err=>{
          console.log(err)
      })
  },[])



  

  const [form] = Form.useForm();


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleInsert, setIsModalVisibleInsert] = useState(false);
  const showModal = (record) => {
    
    setIsModalVisible(true);
    setEditingStudent({ ...record });
    form.setFieldsValue(record);
    // console.log(id);
  };


  const ModalOn = () => {
    setIsModalVisibleInsert(true);
  };

  const handleInsert=(r)=>{
    //console.log(r);
    axios.post('http://localhost:8052/api/addprod', r)
    .then(response=>{
      setPosts(posts.concat(response.data))
     
    })
    setIsModalVisibleInsert(false);
   


  }
  //////////////////whyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
  const handleOk = (r) => {
   
    axios.put("http://localhost:8052/api/UpdateProd",r).then(res=>{
      
       var newPosts=posts;
    
     newPosts.map(
        post=>{
          if(r.id===post.id){
           //post.id=r.id;
            post.name=r.name;
            
            post.brand=r.brand;
            post.madein=r.madein;
            post.price=r.price;
          }
        }
      )     
      
      console.log(newPosts)
        setPosts(newPosts);
        setIsModalVisible(true);
      

    }
    
    
    
    
    ).catch(err=>console.error(err))

  
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingStudent(null);
  };


  const handleCancelInsert = () => {
    setIsModalVisibleInsert(false);
    setEditingStudent(null);
  };

  const deleteProduct=(Id)=>{
    Modal.confirm({
      title: "CONFIRMATION",
      icon: <ExclamationCircleOutlined />,
      content: "Confirmation de la supprission",
      okType: "danger",
      okText: "OUI",
      cancelText: "annuler",
      onOk: () => {
    axios.delete("http://localhost:8052/api/deleteprod/"+Id).then((response)=>
    {
      setPosts(posts.filter(post=>post.id!==Id));
    })

    }});
}

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Made In",
      dataIndex: "madein",
      key: "madein",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (item, record) => (
        <Space size="middle">
          <Tooltip title="Mettre a jour">
            <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
          </Tooltip>
          <Modal
            title="Basic Modal"
            visible={isModalVisible}
            onOk={() => handleOk(editingStudent)}
            onCancel={handleCancel}
          >
            <Form form={form} layout="vertical">
              <Row>
                <Col span={12}>
                  <Form.Item label="ID" >
                    <Input 
                     value={editingStudent?.id}
                     onChange={(e) => {
                       setEditingStudent((pre) => {
                         return { ...pre, name: e.target.value };
                       });
                     }}
                    
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  {" "}
                  <Form.Item label="Name" >
                    <Input 
                      value={editingStudent?.name}
                      onChange={(e) => {
                        setEditingStudent((pre) => {
                          return { ...pre, name: e.target.value };
                        });
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label="Brand" >
                    <Input 
                    value={editingStudent?.brand}
                    onChange={(e) => {
                      setEditingStudent((pre) => {
                        return { ...pre, brand: e.target.value };
                      });
                    }}
                    
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Made In" >
                    <Input 
                    value={editingStudent?.madein}
                    onChange={(e) => {
                      setEditingStudent((pre) => {
                        return { ...pre, madein: e.target.value };
                      });
                    }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Form.Item label="Price" >
                    <Input 
                                        value={editingStudent?.price}
                                        onChange={(e) => {
                                          setEditingStudent((pre) => {
                                            return { ...pre, price: e.target.value };
                                          });
                                        }}
                    />
                  </Form.Item>
                </Col>
                </Row>
            </Form>
          </Modal>

          <Tooltip title="Supprimer">
            <Button icon={<DeleteOutlined />} onClick={() => deleteProduct(record.id)} />
          </Tooltip>
        </Space>
      ),
    },
  ];



  return (

    <div>
      <div className="space-one">
        
        <Button type="primary" onClick={ModalOn}>ADD</Button>
        <Modal
            title="Basic Modal"
            visible={isModalVisibleInsert}
            onOk={() => handleInsert(editingStudent)}
            onCancel={handleCancelInsert}
          >
            <Form form={form} layout="vertical">
              <Row>
                <Col span={12}>
                  <Form.Item label="ID" >
                    <Input 
                     readOnly
                    placeholder="auto id created :p"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  {" "}
                  <Form.Item label="Name" >
                    <Input 
                      value={editingStudent?.name}
                      onChange={(e) => {
                        setEditingStudent((pre) => {
                          return { ...pre, name: e.target.value };
                        });
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label="Brand" >
                    <Input 
                    value={editingStudent?.brand}
                    onChange={(e) => {
                      setEditingStudent((pre) => {
                        return { ...pre, brand: e.target.value };
                      });
                    }}
                    
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Made In" >
                    <Input 
                    value={editingStudent?.madein}
                    onChange={(e) => {
                      setEditingStudent((pre) => {
                        return { ...pre, madein: e.target.value };
                      });
                    }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Form.Item label="Price" >
                    <Input 
                                        value={editingStudent?.price}
                                        onChange={(e) => {
                                          setEditingStudent((pre) => {
                                            return { ...pre, price: e.target.value };
                                          });
                                        }}
                    />
                  </Form.Item>
                </Col>
                </Row>
            </Form>
          </Modal>
        
        </div>
     <Table dataSource={posts} columns={columns} />

    </div>
  );
}

export default App;
