import React, {Component} from 'react';
import {  Form } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { Modal,Icon } from 'semantic-ui-react'



export class EditCustomer extends Component {
    constructor(props) {
        super(props);
    
        this.state = {customers:[], editopen: false, customerid: null, customername:null, customeraddress:null }
        this.editclose=this.editclose.bind(this);
    }
    
editclose = () => this.setState({ editopen: false })
editcloseConfigShow = (editcloseOnEscape,customerid,customername,customeraddress) => () => {
    this.setState({ editcloseOnEscape, editopen: true, customerid: customerid, customername:customername, customeraddress:customeraddress })
  } 

  handleSubmitEdit(event){
    event.preventDefault();
   
    fetch('https://localhost:44385/api/customers',{
        method : 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
            CustomerId: event.target.customerid.value,
            CustomerName : event.target.name.value,
            CustomerAddress : event.target.address.value
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
        
        const { editopen, editcloseOnEscape, customerid, customername, customeraddress } = this.state
        return (
            <div >
              <Modal
                customerid={customerid}
                customername = {customername}
                customeraddress = {customeraddress}
                open={editopen}
                closeOnEscape={editcloseOnEscape}
                onClose={this.editclose}
                trigger={<Button onClick={() => this.setState({ editopen: true })} color='olive'><Icon name='edit' />Edit</Button>}
                >
                <Modal.Header>Edit Customer</Modal.Header>
                <Modal.Content>               
                 
                <Form onSubmit= {this.handleSubmitEdit}>
              
                    <Form.Field hidden >
                        <label>Id</label>
                        <input  name = 'customerid' defaultValue = {this.props.customerId} required disabled/>
                    </Form.Field>
                    <Form.Field >
                        <label>Name</label>
                        <input name = 'name'  defaultValue = {this.props.customerName} required />
                    </Form.Field>
                    <Form.Field id = "Address">
                        <label>Address</label>
                        <input name ='address' defaultValue = {this.props.customerAddress} required/>
                    </Form.Field>
                    
                    <Form.Field>
                     <Button type='submit' primary>Edit Customer details</Button>
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
