import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { CreateStore } from './CreateStore';
import { DeleteStore } from './DeleteStore';
import { EditStore } from './EditStore';

export class Stores extends Component {

    constructor(props) {
        super(props)
        this.state = { stores:[] }
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {

        fetch('https://localhost:44385/api/stores')

            .then(response => response.json())
            .then(data => {
                this.setState({ stores:data });
            });
    }

    componentDidUpdate() {
        this.refreshList();
    }


    render() {
        const { stores} = this.state;
        let closeModal = () => this.setState({ showModal: false });


        return (
            <div style={{
                margin:'20px 20px 20px 20px'
                
            }}>
                <h4>  Store Index. </h4>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                         
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>

                        {stores.map(storeList =>
                            <Table.Row key={storeList.StoreId}>
                               
                                <Table.Cell>{storeList.StoreName}</Table.Cell>
                                <Table.Cell>{storeList.StoreAddress}</Table.Cell>
                                <Table.Cell>
                                    <EditStore
                                    show={this.state.editopen}
                                    onClose={this.editclose}
                                    storeId={storeList.StoreId}
                                    storeName={storeList.StoreName}
                                    storeAddress={storeList.StoreAddress}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                <DeleteStore
                                show={this.state.deleteopen}
                                onClose={this.deleteclose}
                                storeId={storeList.StoreId}
                                
                                />
                                </Table.Cell>
                            </Table.Row>
                        )}

                    </Table.Body>
                </Table>
                <Button.Group >
                    <CreateStore
                        show={this.state.showModal}
                        onClose={closeModal}
                    />
                </Button.Group>  

            </div>
        )
    }
}