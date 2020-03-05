import React, {Component} from 'react';
import {  Form } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { Modal,Icon } from 'semantic-ui-react'



export class DeleteSale extends Component {
    constructor(props) {
        super(props);
    
        this.state = {sales:[], deleteopen: false, saleid: null, productid:null, customerid:null ,storeid:null}
        this.deleteclose=this.deleteclose.bind(this);
    }
    

 deleteclose = () => this.setState({ deleteopen: false })
 deletecloseConfigShow = (deletecloseOnEscape, saledeleteid) => () => {
    this.setState({ deletecloseOnEscape, deleteopen: true, saledeleteid: saledeleteid })
  }

  handleSubmitDelete(event){  
    event.preventDefault();  

  fetch('https://localhost:44385/api/sales',{
    method : 'DELETE',
    headers : {
        'Accept': 'application/json',
        'Content-Type' : 'application/json'
    },
    body:JSON.stringify({
        SalesId: event.target.saledeleteid.value
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
        
        const { deleteopen, deletecloseOnEscape, saledeleteid } = this.state
        return (
            <div >
                <Modal
                saledeleteid={saledeleteid}
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
                        name = 'saledeleteid' 
                        defaultValue = {this.props.saledeleteid}
                        disabled/>
                    </Form.Field>
                    <Form.Field>
                    <Button type='submit' color="red">Delete Sale details</Button>
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