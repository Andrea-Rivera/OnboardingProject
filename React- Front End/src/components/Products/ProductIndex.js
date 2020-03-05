import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { CreateProduct } from './CreateProduct';
import { DeleteProduct } from './DeleteProduct';
import { EditProduct } from './EditProduct';

export class Products extends Component {

    constructor(props) {
        super(props)
        this.state = { products: []}
    
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {

        fetch('https://localhost:44385/api/products')
            .then(response => response.json())
            .then(data => {
                this.setState({ products: data });
            });
    }

    componentDidUpdate() {
        this.refreshList();

    }

    render() {
        const { products } = this.state;
        let closeModal = () => this.setState({ showModal: false });
        

        return (
             <div style={{
                margin:'20px 20px 20px 20px'
                
            }}>
                <h3> Product Index. </h3>
                <Table celled>
                    <Table.Header>
                        <Table.Row>

                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Price ($)</Table.HeaderCell>  
                            <Table.HeaderCell>Actions</Table.HeaderCell> 
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {products.map(productList =>
                            <Table.Row key={productList.ProductId}>
                                <Table.Cell>{productList.ProductName}</Table.Cell>
                                <Table.Cell>{productList.ProductPrice}</Table.Cell>
                                <Table.Cell>
                                    <EditProduct
                                    
                                    show={this.state.editopen}
                                    onClose={this.editclose}
                                    productId={productList.ProductId}
                                    productName= {productList.ProductName}
                                    productPrice= {productList.ProductPrice}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <DeleteProduct     
                                    show={this.state.deleteopen}
                                    onClose={this.deleteclose}
                                    productId={productList.ProductId}
                                    />
                                </Table.Cell>
                                
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
                <Button.Group >
                    <CreateProduct
                        show={this.state.showModal}
                        onClose={closeModal}
                    />
                </Button.Group>   

            </div>
        )
    }
}