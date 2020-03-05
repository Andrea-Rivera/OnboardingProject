import React, { Component } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';



export class CreateProduct extends Component {
    constructor(props) {
        super(props);
    }
  

    handleSubmit(event) {
        event.preventDefault();
        // alert(event.target.name.value + event.target.address.value )
        fetch('https://localhost:44385/api/products', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               
                ProductName: event.target.name.value,
                ProductPrice: event.target.price.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert('Product added successfully!');
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
                    trigger={<Button onClick={() => this.setState({ showModal: true })} primary>New Product</Button>}
                    style={{
                        height: '26rem',
                        position: 'relative'
                    }}>
                    <Modal.Header >New Product</Modal.Header>
                    <Modal.Content>
                        <div className="container">
                            <Form onSubmit={this.handleSubmit}>
                                
                                <Form.Group controlId="name">
                                    <Form.Field >
                                        <label>Name</label>
                                        <input placeholder='Product Name' name="name" required />
                                    </Form.Field>
                                </Form.Group>

                                <Form.Group controlId="address">
                                    <Form.Field>
                                        <label> Price</label>
                                        <input placeholder='Product Price' name="price" required/>
                                    </Form.Field>
                                </Form.Group>

                                <Form.Group controlId="submit">
                                    <Form.Field>
                                        <Button type='submit' primary>Add Product details</Button>
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
