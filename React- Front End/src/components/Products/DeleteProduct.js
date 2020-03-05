import React, {Component} from 'react';
import {  Form } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { Modal,Icon } from 'semantic-ui-react'



export class DeleteProduct extends Component {
    constructor(props) {
        super(props);
    
        this.state = {products:[], deleteopen: false, productid: null, productname:null, productaddress:null }
        this.deleteclose=this.deleteclose.bind(this);
    }
    
 deleteclose = () => this.setState({ deleteopen: false })
 deletecloseConfigShow = (deletecloseOnEscape, productdeleteid) => () => {
    this.setState({ deletecloseOnEscape, deleteopen: true, productdeleteid: productdeleteid })
  }

  handleSubmitDelete(event){  
    event.preventDefault();  

  fetch('https://localhost:44385/api/products',{
    method : 'DELETE',
    headers : {
        'Accept': 'application/json',
        'Content-Type' : 'application/json'
    },
    body:JSON.stringify({
        ProductId: event.target.productdeleteid.value
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
        
        const { deleteopen, deletecloseOnEscape, productdeleteid } = this.state
        return (
            <div >
                <Modal
                productdeleteid={productdeleteid}
                open={deleteopen}
                closeOnEscape={deletecloseOnEscape}
                onClose={this.deleteclose}
                trigger={<Button onClick={() => this.setState({ deleteopen: true })} color='red'><Icon name='trash' />Delete</Button>}
                >
                <Modal.Header>Delete Product</Modal.Header>
                <Modal.Content>               
                 
                <Form onSubmit= {this.handleSubmitDelete}>
                   
                    <Form.Field >
                        <h3>Are you sure ?</h3>
                    </Form.Field>
                    <Form.Field hidden >
                        <label>Id</label>
                        <input 
                        name = 'productdeleteid' 
                        defaultValue = {this.props.productId}
                        disabled/>
                    </Form.Field>
                    <Form.Field>
                    <Button type='submit' color="red">Delete Product details</Button>
                    </Form.Field>
                </Form>
                </Modal.Content>    
                <Modal.Actions >
                        
                        <Button onClick={this.deleteclose} color='black'> Cancel</Button>
                    </Modal.Actions>             
                           
                </Modal>
            </div>

        )
    }
}


