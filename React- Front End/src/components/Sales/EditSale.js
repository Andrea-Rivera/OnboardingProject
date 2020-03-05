import React, {Component} from 'react';
import { Form} from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { Modal,Icon } from 'semantic-ui-react'

export class EditSale extends Component {
    constructor(props){
        super(props)
        this.state = {customers:[],products:[],stores:[],customers:[],sales:[], editopen: false, salesid:null , salesproductid : null, salescustomerid:null, salesstoreid:null,salesdatesold:null, salesproductname :null, 
            salescustomername :null, salesstorename :null }
        
        this.editclose=this.editclose.bind(this);   
        this._selectproduct = this._selectproduct.bind(this);
        this._selectcustomer = this._selectcustomer.bind(this);
        this._selectstore = this._selectstore.bind(this);
    }
    editcloseConfigShow = (editcloseOnEscape,salesid, salesproductname,salescustomername,salesstorename,salesdatesold) => () => {
        this.setState({ editcloseOnEscape, editopen: true, salesid : salesid, salesproductname : salesproductname, salescustomername : salescustomername, 
            salesstorename: salesstorename,salesdatesold:salesdatesold })
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
    
    _selectproduct = (event,val) => {
        event.preventDefault();
        console.log(">>", val.value)
        this.setState({salesproductid: val.value}, () => 
        { console.log('updated state in callback fun', this.state) })
   } 
   _selectcustomer = (event,val) => {
       event.preventDefault();
       console.log(">>", val.value)
       this.setState({salescustomerid: val.value}, () => 
       { console.log('updated state in callback fun', this.state) })
  }        

  _selectstore = (event,val) => {
       event.preventDefault();
       console.log(">>", val.value)
       this.setState({salesstoreid: val.value}, () => 
       { console.log('updated state in callback fun', this.state) })
   } 

      handleSubmitEdit = (event) => {
        event.preventDefault();

        fetch('https://localhost:44385/api/sales',{
            method : 'PUT',
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                SalesId: event.target.salesid.value,
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

    editclose = () => this.setState({ editopen: false })

    render(){

        const { editopen, editcloseOnEscape, salesid,salescustomername,salesproductname,salesstorename, salesproductid, salescustomerid, salesstoreid,salesdatesold } = this.state;
            


        return(
        <Modal
        salesid={salesid}
        salesproductid = {salesproductid}
        salesstoreid = {salesstoreid}
        salescustomerid = {salescustomerid}
        salesdatesold = {salesdatesold}
        salescustomername = {salescustomername}
        salesproductname = {salesproductname}
        salesstorename = {salesstorename}
        open={editopen}
        closeOnEscape={editcloseOnEscape}
        onClose={this.editclose}
        trigger={<Button onClick={() => this.setState({ editopen: true })} color='olive'><Icon name='edit' />Edit</Button>}
        >
        <Modal.Header>Edit Sales Record</Modal.Header>
        <Modal.Content>
        <Form onSubmit= {this.handleSubmitEdit}>
           
            <Form.Field >
                <label>Id</label>
                <input 
                name = 'salesid' 
                defaultValue = {this.props.salesid}
                required
                disabled/>
            </Form.Field>
            <Form.Field>
        <Form.Select
                fluid
                label="Product"
                name = 'salesproductid'
                placeholder = {this.props.salesproductname}
                options={this.state.products.map(productList => ({                                
                    
                    key: productList.ProductId,
                    value: productList.ProductId, 
                    text: productList.ProductName
                 }))} 
               
                
                onChange={this._selectproduct}
            />
            </Form.Field>
            <Form.Field>
              <Form.Select
                fluid
                label="Customer"
                name = 'salescustomerid'
                placeholder = {this.props.salescustomername}
                options={this.state.customers.map(customerList => ({                                
                    name: customerList.CustomerId,
                    key: customerList.CustomerId,
                    value: customerList.CustomerId, 
                    text: customerList.CustomerName
                 }))} 
               
                onChange={this._selectcustomer}
            />
            </Form.Field>
            <Form.Field>
              <Form.Select
                fluid
                label="Store"
                name ='salesstoreid'
                placeholder = {this.props.salesstorename}
                options={this.state.stores.map(storeList => ({                                
                    name: storeList.StoreId,
                    key: storeList.StoreId,
                    value: storeList.StoreId, 
                    text: storeList.StoreName
                 }))} 
                onChange={this._selectstore}
            />                 
            </Form.Field>
            <Form.Field >
                <label>Date Sold</label>
                <input 
                name ='salesdatesold'
                type = 'date'
                defaultValue = {this.props.salesdatesold} 
                required/>
            </Form.Field>
           
            <Form.Field>
                <Button type='submit' primary>Edit Store details</Button>
            </Form.Field>
           
        </Form>
        </Modal.Content>
        <Modal.Actions >
            <Button onClick={() => this.setState({ editopen: false })} color='red'> Close</Button>
        </Modal.Actions>
        </Modal>

        )

    }

}
            