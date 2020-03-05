import React, {Component} from 'react';
import {  Form } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { Modal,Icon } from 'semantic-ui-react'



export class DeleteCustomer extends Component {
    constructor(props) {
        super(props);
    
        this.state = {customers:[], deleteopen: false, customerid: null, customername:null, customeraddress:null }
        this.deleteclose=this.deleteclose.bind(this);
    }
    
 deleteclose = () => this.setState({ deleteopen: false })
 deletecloseConfigShow = (deletecloseOnEscape, customerdeleteid) => () => {
    this.setState({ deletecloseOnEscape, deleteopen: true, customerdeleteid: customerdeleteid })
  }

  handleSubmitDelete(event){  
    event.preventDefault();  

  fetch('https://localhost:44385/api/customers',{
    method : 'DELETE',
    headers : {
        'Accept': 'application/json',
        'Content-Type' : 'application/json'
    },
    body:JSON.stringify({
        CustomerId: event.target.customerdeleteid.value
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
        
        const { deleteopen, deletecloseOnEscape, customerdeleteid } = this.state
        return (
            <div >
                <Modal
                customerdeleteid={customerdeleteid}
                open={deleteopen}
                closeOnEscape={deletecloseOnEscape}
                onClose={this.deleteclose}
                trigger={<Button onClick={() => this.setState({ deleteopen: true })} color='red'><Icon name='trash' />Delete</Button>}
                >
                <Modal.Header>Delete Customer</Modal.Header>
                <Modal.Content>               
                 
                <Form onSubmit= {this.handleSubmitDelete}>
                   
                    <Form.Field >
                        <h3>Are you sure ?</h3>
                    </Form.Field>
                    <Form.Field hidden >
                        <label>Id</label>
                        <input 
                        name = 'customerdeleteid' 
                        defaultValue = {this.props.customerId}
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


