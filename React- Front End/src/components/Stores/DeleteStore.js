import React, {Component} from 'react';
import {  Form } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { Modal,Icon } from 'semantic-ui-react'



export class DeleteStore extends Component {
    constructor(props) {
        super(props);
    
        this.state = {stores:[], deleteopen: false, storeid: null, storename:null, storeaddress:null }
        this.deleteclose=this.deleteclose.bind(this);
    }
    
 deleteclose = () => this.setState({ deleteopen: false })
 deletecloseConfigShow = (deletecloseOnEscape, storedeleteid) => () => {
    this.setState({ deletecloseOnEscape, deleteopen: true, storedeleteid: storedeleteid })
  }

  handleSubmitDelete(event){  
    event.preventDefault();  

  fetch('https://localhost:44385/api/stores',{
    method : 'DELETE',
    headers : {
        'Accept': 'application/json',
        'Content-Type' : 'application/json'
    },
    body:JSON.stringify({
        StoreId: event.target.storedeleteid.value
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
        
        const { deleteopen, deletecloseOnEscape, storedeleteid } = this.state
        return (
            <div >
                <Modal
                storedeleteid={storedeleteid}
                open={deleteopen}
                closeOnEscape={deletecloseOnEscape}
                onClose={this.deleteclose}
                trigger={<Button onClick={() => this.setState({ deleteopen: true })} color='red'><Icon name='trash' />Delete</Button>}
                >
                <Modal.Header>Delete Store</Modal.Header>
                <Modal.Content>               
                 
                <Form onSubmit= {this.handleSubmitDelete}>
                   
                    <Form.Field >
                        <h3>Are you sure ?</h3>
                    </Form.Field>
                    <Form.Field hidden >
                        <label>Id</label>
                        <input 
                        name = 'storedeleteid' 
                        defaultValue = {this.props.storeId}
                        disabled/>
                    </Form.Field>
                    <Form.Field>
                    <Button type='submit' color="red">Delete Store details</Button>
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


