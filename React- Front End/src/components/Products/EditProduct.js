import React, {Component} from 'react';
import {  Form } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { Modal,Icon } from 'semantic-ui-react'



export class EditProduct extends Component {
    constructor(props) {
        super(props);
    
        this.state = {products:[], editopen: false, productid: null, productname:null, productprice:null }
        this.editclose=this.editclose.bind(this);
    }
    
editclose = () => this.setState({ editopen: false })
editcloseConfigShow = (editcloseOnEscape,productid,productname,productprice) => () => {
    this.setState({ editcloseOnEscape, editopen: true, productid: productid, productname:productname, productprice:productprice })
  } 

  handleSubmitEdit(event){
    event.preventDefault();
   
    fetch('https://localhost:44385/api/products',{
        method : 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
            ProductId: event.target.productid.value,
            ProductName : event.target.productname.value,
            ProductPrice : event.target.productprice.value
        })
    })
    .then(res => res.json())
    .then((result)=>
    {
        alert(result);
    },
    (error) =>{
        alert('failed')
    }
    )
    
}

    render() {
        
        const { editopen, editcloseOnEscape, productid, productname, productprice } = this.state
        return (
            <div >
              <Modal
                productid={productid}
                productname = {productname}
                productprice = {productprice}
                open={editopen}
                closeOnEscape={editcloseOnEscape}
                onClose={this.editclose}
                trigger={<Button onClick={() => this.setState({ editopen: true })} color='olive'><Icon name='edit' />Edit</Button>}
                >
                <Modal.Header>Edit Product</Modal.Header>
                <Modal.Content>               
                 
                <Form onSubmit= {this.handleSubmitEdit}>
              
                    <Form.Field hidden >
                        <label>Id</label>
                        <input  name = 'productid' defaultValue = {this.props.productId} required disabled/>
                    </Form.Field>
                    <Form.Field >
                        <label>Name</label>
                        <input name = 'productname'  defaultValue = {this.props.productName} required />
                    </Form.Field>
                    <Form.Field>
                        <label>Price</label>
                        <input name ='productprice' defaultValue = {this.props.productPrice} required/>
                    </Form.Field>
                    
                    <Form.Field>
                     <Button type='submit' primary>Edit Product details</Button>
                    </Form.Field>
                   
                </Form>
                </Modal.Content>  
                <Modal.Actions >
                        <Button onClick={this.editclose} color='red'> Close</Button>


                    </Modal.Actions>             
                </Modal>
            </div>

        )
    }
}
