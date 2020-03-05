import React, {Component} from 'react';
import {  Form } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { Modal,Icon } from 'semantic-ui-react'



export class EditStore extends Component {
    constructor(props) {
        super(props);
    
        this.state = {stores:[], editopen: false, storeid: null, storename:null, storeaddress:null }
        this.editclose=this.editclose.bind(this);
    }
    
editclose = () => this.setState({ editopen: false })
editcloseConfigShow = (editcloseOnEscape,storeid,storename,storeaddress) => () => {
    this.setState({ editcloseOnEscape, editopen: true, storeid: storeid, storename:storename, storeaddress:storeaddress })
  } 

  handleSubmitEdit(event){
    event.preventDefault();
   
    fetch('https://localhost:44385/api/stores',{
        method : 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
            StoreId: event.target.storeid.value,
            StoreName : event.target.storename.value,
            StoreAddress : event.target.storeaddress.value
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
        
        const { editopen, editcloseOnEscape, storeid, storename, storeaddress } = this.state
        return (
            <div >
              <Modal
                storeid={storeid}
                storename = {storename}
                storeaddress = {storeaddress}
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
                        <input  name = 'storeid' defaultValue = {this.props.storeId} required disabled/>
                    </Form.Field>
                    <Form.Field >
                        <label>Name</label>
                        <input name = 'storename'  defaultValue = {this.props.storeName} required />
                    </Form.Field>
                    <Form.Field id = "Address">
                        <label>Address</label>
                        <input name ='storeaddress' defaultValue = {this.props.storeAddress} required/>
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
