import React, { Component } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';



export class CreateStore extends Component {
    constructor(props) {
        super(props);
    }
  

    handleSubmit(event) {
        event.preventDefault();
        // alert(event.target.name.value + event.target.address.value )
        fetch('https://localhost:44385/api/stores', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               
                StoreName: event.target.name.value,
                StoreAddress: event.target.address.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert('Store added successfully!');
            },
                (error) => {

                    alert('Failed')
                }
            )
    }

    state = { showModal: false }

    render() {
        const { showModal } = this.state;


        return (
            <div >
                <Modal
                    open={showModal}
                    onClose={this.closeModal}
                    trigger={<Button onClick={() => this.setState({ showModal: true })} primary>New Store</Button>}
                    style={{
                        height: '26rem',
                        position: 'relative'
                    }}>
                    <Modal.Header >New Store</Modal.Header>
                    <Modal.Content>
                        <div className="container">
                            <Form onSubmit={this.handleSubmit}>
                                
                                <Form.Group controlId="name">
                                    <Form.Field >
                                        <label>Name</label>
                                        <input placeholder='Store Name' name="name" required />
                                    </Form.Field>
                                </Form.Group>

                                <Form.Group controlId="address">
                                    <Form.Field>
                                        <label>Store Address</label>
                                        <input placeholder='Store Address' name="address" required/>
                                    </Form.Field>
                                </Form.Group>

                                <Form.Group controlId="submit">
                                    <Form.Field>
                                        <Button type='submit' primary>Add Store details</Button>
                                    </Form.Field>
                                </Form.Group>

                            </Form>
                        </div>
                    </Modal.Content>
                    <Modal.Actions >
                        <Button onClick={() => this.setState({ showModal: false })} color='red'> Close</Button>


                    </Modal.Actions>
                </Modal>
            </div>

        )
    }
}