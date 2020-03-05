import React, {Component} from 'react';
import {  Form } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { Modal } from 'semantic-ui-react'

export class CreateSale extends Component {
    constructor(props){
        super(props)
        this.state = {sales:[],products:[],customers:[],stores:[] ,addopen:false, salesid:null , salesproductid : null, salescustomerid:null, salesstoreid:null,
                      salesdatesold:null, salesproductname :null, salescustomername :null, salesstorename :null }
        this.addclose=this.addclose.bind(this);
       
        this._selectproduct = this._selectproduct.bind(this);
        this._selectcustomer = this._selectcustomer.bind(this);
        this._selectstore = this._selectstore.bind(this);     
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
    addcloseConfigShow = (addcloseOnEscape) => () => {
        this.setState({ addcloseOnEscape, addopen: true  })
      } 

      _selectproduct = (event,val) => {
        event.preventDefault();
        this.setState({salesproductid: val.value}, () => 
        { console.log('updated ', this.state) })
   } 
   _selectcustomer = (event,val) => {
       event.preventDefault();
       this.setState({salescustomerid: val.value}, () => 
       { console.log('updated ', this.state) })
  }        

  _selectstore = (event,val) => {
       event.preventDefault();
       this.setState({salesstoreid: val.value}, () => 
       { console.log('updated ', this.state) })
   } 

   handleSubmitAdd = (event) => {
       event.preventDefault();
     
       
       fetch('https://localhost:44385/api/sales',{
           method : 'POST',
           headers : {
               'Accept': 'application/json',
               'Content-Type' : 'application/json'
           },
           body:JSON.stringify({
               SaleId: null,
               ProductId : this.state.salesproductid,
               CustomerId : this.state.salescustomerid,
               StoreId : this.state.salesstoreid,
               DateSold : event.target.salesdatesold.value
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

   addclose = () => this.setState({ addopen: false })

   render(){
    
    const { addopen, addcloseOnEscape, salesproductid } = this.state;

    return(
        <div>  
<Modal
                
                open={addopen}
                closeOnEscape={addcloseOnEscape}
                onClose={this.addclose}
                trigger={<Button onClick={() => this.setState({ addopen: true })} primary>New Sale</Button>}>
                <Modal.Header>Create New Sales Record</Modal.Header>
                <Modal.Content>
                <Form onSubmit= {this.handleSubmitAdd}>
                <Form.Field>
                <Form.Select
                        fluid
                        label="Product"
                        name = 'salesproductid'
                        options={this.state.products.map(productList => ({                                
                            
                            key: productList.ProductId,
                            value: productList.ProductId, 
                            text: productList.ProductName
                         }))} 
                        placeholder="Product"
                        
                        onChange={this._selectproduct}
                    />
                    </Form.Field>
                    <Form.Field>
                      <Form.Select
                        fluid
                        label="Customer"
                        name = 'salescustomerid'
                        options={this.state.customers.map(customerList => ({                                
                            name: customerList.CustomerId,
                            key: customerList.CustomerId,
                            value: customerList.CustomerId, 
                            text: customerList.CustomerName
                         }))} 
                        placeholder="Customer"
                        onChange={this._selectcustomer}
                    />
                    </Form.Field>
                    <Form.Field>
                      <Form.Select
                        fluid
                        label="Store"
                        name ='salesstoreid'
                        options={this.state.stores.map(storeList => ({                                
                            name: storeList.StoreId,
                            key: storeList.StoreId,
                            value: storeList.StoreId, 
                            text: storeList.StoreName
                         }))} 
                        placeholder="Store"
                        onChange={this._selectstore}
                    />                 
                    </Form.Field>
                                  
                    <Form.Field id = "Date Sold">
                        <label>Date Sold</label>
                        <input                         
                        name ='salesdatesold' 
                        type = 'date'
                        placeholder='Enter Date Sold'
                        required />
                    </Form.Field>
                    <Form.Field>
                    <Button type='submit' primary>Add Sales details</Button>
                    </Form.Field>
                   
                </Form>
                </Modal.Content>
                <Modal.Actions >
                        <Button onClick={() => this.setState({ addopen: false })} color='red'> Close</Button>


                    </Modal.Actions>
                </Modal>



        </div>
    )
   }
}
