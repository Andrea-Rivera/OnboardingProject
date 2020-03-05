import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { Modal } from 'semantic-ui-react'
import { CreateSale } from './CreateSale';
import { DeleteSale } from './DeleteSale';
import { EditSale } from './EditSale';


export class Sales extends Component {

    constructor(props) {
        super(props)
        this.state = {sales:[]}
        
    }
   

   
    componentDidMount() {
        this.refreshList();

        fetch('https://localhost:44385/api/customers')
            .then(response => response.json())
            .then(data => {
                this.setState({ customers: data });
            });

        fetch('https://localhost:44385/api/products')
            .then(response => response.json())
            .then(data => {
                this.setState({ products: data });
            });

        fetch('https://localhost:44385/api/stores')
            .then(response => response.json())
            .then(data => {
                this.setState({ stores: data });
            });

    }

    componentDidUpdate() {
        this.refreshList();
    }

    refreshList() {

        fetch('https://localhost:44385/api/sales')
            .then(response => response.json())
            .then(data => {
                this.setState({ sales: data });
            });
    }
    

    render() {
        const { sales } = this.state;
        let addclose = () => this.setState({ addopen: false })
        let deleteclose = () => this.setState({ deleteopen: false })
        let editclose = () => this.setState({ editopen: false })


        return (
            <div style={{
                margin:'20px 20px 20px 20px'
                
            }}>
                <h3>  Sales Index. </h3>


                <Table celled>
                    <Table.Header>
                        <Table.Row>

                            <Table.HeaderCell>Product Id</Table.HeaderCell>
                            <Table.HeaderCell>Customer Id</Table.HeaderCell>
                            <Table.HeaderCell>Store Id</Table.HeaderCell>
                            <Table.HeaderCell>Date Sold of Sale</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                         
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {sales.map(saleList =>
                            <Table.Row key={saleList.SalesId}>

                                <Table.Cell>{saleList.ProductName}</Table.Cell>
                                <Table.Cell>{saleList.CustomerName}</Table.Cell>
                                <Table.Cell>{saleList.StoreName}</Table.Cell>
                                <Table.Cell>{saleList.DateSold}</Table.Cell>
                                
                               <Table.Cell>
                              <EditSale
                              show={this.state.editopen}
                              onClose={editclose}
                              salesid={saleList.SalesId}
                              salesproductname ={saleList.ProductName}
                              salescustomername={saleList.CustomerName}
                              salesstorename={saleList.StoreName}
                              salesdatesold={saleList.DateSold}
                              />
                               </Table.Cell>
                               <Table.Cell>
                               <DeleteSale
                               show={this.state.deleteopen}
                               onClose={deleteclose}
                               saledeleteid={saleList.SalesId}
                               
                               
                                 />
                               </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>

                </Table>
                <Button.Group >
                   <CreateSale
                        show={this.state.addopen}
                        onClose={addclose}
                    
                      
                    />
                 </Button.Group> 

            </div>
        )
        

    }

}

