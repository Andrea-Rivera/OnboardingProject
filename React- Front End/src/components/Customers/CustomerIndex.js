import React, {Component} from 'react';
import { Table , TableCell } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { CreateCustomer } from './CreateCustomer';
import { DeleteCustomer } from './DeleteCustomer';
import { EditCustomer } from './EditCustomer';

export class Customers extends Component {

    constructor(props){
        super(props)
        this.state = {customers:[] }   
      
    }
 
    componentDidMount() {
        this.refreshList();

    }

    refreshList() {

        fetch('https://localhost:44385/api/customers')

            .then(response => response.json())
            .then(data => {
                this.setState({ customers:data });
            });
    }

    componentDidUpdate() {
        this.refreshList();
    }

   

    render(){
        const {customers} = this.state;
        let closeModal = () => this.setState({ showModal: false });
        
        

        
        return(
            <div style={{
                margin:'20px 20px 20px 20px'
                
            }}>              
                <h4>  Customer Index. </h4>

                

            <Table celled className="mt-4">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Address</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                   
                   
                </Table.Row>
            </Table.Header>
            <Table.Body>
            {customers.map(custList =>
                <Table.Row  key = {custList.CustomerId}>
                    <Table.Cell>{custList.CustomerId}</Table.Cell>
                    <Table.Cell>{custList.CustomerName}</Table.Cell>
                    <Table.Cell>{custList.CustomerAddress}</Table.Cell>
                    <Table.Cell>
                    <EditCustomer 
                            show={this.state.editopen}
                            onClose={this.editclose}
                            customerId={custList.CustomerId}
                            customerName={custList.CustomerName}
                            customerAddress={custList.CustomerAddress}
                        />
                     </Table.Cell>
                     <TableCell>
                        <DeleteCustomer 
                            show={this.state.deleteopen}
                            onClose={this.deleteclose}
                            customerId={custList.CustomerId}
                        />
                    </TableCell>
                    
                </Table.Row>
            )}
            </Table.Body>                   
         </Table> 
         <Button.Group >
                    <CreateCustomer
                        show={this.state.showModal}
                        onClose={closeModal}
                    />
        </Button.Group>   
          </div> 
       )
    }
}

