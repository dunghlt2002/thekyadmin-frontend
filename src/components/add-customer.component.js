import React, { Component } from "react";
import customerDataService from "../services/customer.service";
import axios from "axios";
import MyEmail from './email.component'
import { renderEmail } from 'react-html-email'


export default class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.onChangecustomers_name = this.onChangecustomers_name.bind(this);
    this.onChangecustomers_email = this.onChangecustomers_email.bind(this);
    this.onChangecustomers_password = this.onChangecustomers_password.bind(this);
    this.onChangecustomers_address = this.onChangecustomers_address.bind(this);
    this.onChangecustomers_city = this.onChangecustomers_city.bind(this);
    this.onChangecustomers_zip = this.onChangecustomers_zip.bind(this);
    this.onChangecustomers_state = this.onChangecustomers_state.bind(this);
    this.onChangecustomers_country = this.onChangecustomers_country.bind(this);
    this.saveCustomer = this.saveCustomer.bind(this);
    this.newCustomer = this.newCustomer.bind(this);

    this.state = {
      id: null,
      customers_name: "Cheo",
      customers_email: "chutcheo@gmail.com", 
      customers_password: "aaa", 
      customers_address: "aaa", 
      customers_city: "city", 
      customers_zip: "zip", 
      customers_state: "GA", 
      customers_country: "US", 
      // customers_: "aaa", 
      // customers_: "aaa", 
      custadv: false, // nhan quang cao On Off
      submitted: false
    };
  }

  onChangecustomers_name(e) {
    this.setState({
      customers_name: e.target.value
    });
  }

  onChangecustomers_email(e) {
    this.setState({
      customers_email: e.target.value
    });
  }

  onChangecustomers_password(e) {
    this.setState({
      customers_name: e.target.value
    });
  }

  onChangecustomers_address(e) {
    this.setState({
      customers_name: e.target.value
    });
  }

  onChangecustomers_city(e) {
    this.setState({
      customers_name: e.target.value
    });
  }

  onChangecustomers_zip(e) {
    this.setState({
      customers_name: e.target.value
    });
  }

  onChangecustomers_state(e) {
    this.setState({
      customers_name: e.target.value
    });
  }

  onChangecustomers_country(e) {
    this.setState({
      customers_name: e.target.value
    });
  }

  saveCustomer() {
    console.log('vo save');
    var data = {
      customers_name: this.state.customers_name,
      customers_email: this.state.customers_email,
      // customers_: this.state.,
      customers_password: this.state.customers_password,
      customers_address: this.state.customers_address,
      customers_city: this.state.customers_city,
      customers_state: this.state.customers_state,
      customers_country: this.state.customers_country,
      customers_zip: this.state.customers_zip
    };

    customerDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          customers_name: response.data.customers_name,
          customers_email: response.data.customers_email,
          customers_address: response.data.customers_address,
          customers_city: response.data.customers_city,
          customers_state: response.data.customers_state,
          customers_country: response.data.customers_country,
          custadv: response.data.custadv,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    // mailling

            const messageHtml =  renderEmail(
              <MyEmail name={this.state.customers_name}> 
                "A customer name: {this.state.customers_name + " has just created in our system. Thank you for joinging us."}
              </MyEmail>
            );
    
            axios({
                method: "POST", 
                url:"http://localhost:8080/send", 
                data: {
            name: this.state.customers_name,
            email: this.state.customers_email,
            messageHtml: messageHtml
                }
            }).then((response)=>{
                if (response.data.msg === 'success'){
                    alert("Email sent, awesome!"); 
                    // this.resetForm()
                }else if(response.data.msg === 'fail'){
                    alert("Oops, something went wrong. Try again")
                }
            })

  }

  newCustomer() {
    this.setState({
      id: null,
      customers_name: "bbb",
      customers_email: "dunghlt2002@gmail.com",
      customers_address: "bbb bbbbbb",
      customers_city: "Grayson",
      customers_state: "NY",
      customers_country: "US",
      customers_zip: "zip",
      custadv: false,
      submitted: false
    });
  }

  render() {
    return (
      <div className="form">
        {this.state.submitted ? (
          <div className="form-info">
            <h4>You submitted successfully!</h4>
            <button className="btn-block btn-primary" onClick={this.newCustomer}>
              Add
            </button>
          </div>
        ) : (
          <div className="form-container">
            <li>
              <h2>Add New Customer</h2>
            </li>
            <li className="form-group">
              <label htmlFor="customers_name">Customers name</label>
              <input
                type="text"
                className="form-control"
                id="customers_name"
                required
                value={this.state.customers_name}
                onChange={this.onChangecustomers_name}
                name="customers_name"
              />
            </li>

            <li className="form-group">
              <label htmlFor="customers_email">Email (also is user_name to login)</label>
              <input
                type="text"
                className="form-control"
                id="customers_email"
                required
                value={this.state.customers_email}
                onChange={this.onChangecustomers_email}
                name="customers_email"
              />
            </li>

            <div className="form-group">
              <label htmlFor="customers_password">Password</label>
              <input
                type="text"
                className="form-control"
                id="customers_password"
                required
                value={this.state.customers_password}
                onChange={this.onChangecustomers_password}
                name="customers_password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="customers_address">Address</label>
              <input
                type="text"
                className="form-control"
                id="customers_address"
                required
                value={this.state.customers_address}
                onChange={this.onChangecustomers_address}
                name="customers_address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="customers_city">City</label>
              <input
                type="text"
                className="form-control"
                id="customers_city"
                required
                value={this.state.customers_city}
                onChange={this.onChangecustomers_city}
                name="customers_city"
              />
            </div>

            <div className="form-group">
              <label htmlFor="customers_zip">Zipcode</label>
              <input
                type="text"
                className="form-control"
                id="customers_zip"
                required
                value={this.state.customers_zip}
                onChange={this.onChangecustomers_zip}
                name="customers_zip"
              />
            </div>

            <div className="form-group">
              <label htmlFor="customers_state">State</label>
              <input
                type="text"
                className="form-control"
                id="customers_state"
                required
                value={this.state.customers_state}
                onChange={this.onChangecustomers_state}
                name="customers_state"
              />
            </div>

            <div className="form-group">
              <label htmlFor="customers_country">Country</label>
              <input
                type="text"
                className="form-control"
                id="customers_country"
                required
                value={this.state.customers_country}
                onChange={this.onChangecustomers_country}
                name="customers_country"
              />
            </div>



            <button onClick={this.saveCustomer} className="btn btn-primary">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
