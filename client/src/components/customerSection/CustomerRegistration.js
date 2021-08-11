import { Button } from '../Buttons'
import React, { Component } from 'react'
import * as CustomerStyled from './CustomerStyled';
import SupplyChain from "../../contracts/SupplyChain.json";
import getWeb3 from "../../getWeb3";
import Web3 from 'web3'
import Swal from "sweetalert2";
import add_c from '../../images/add_c.svg'
export default class CustomerRegistration extends Component {
  async componentWillMount() {
    window.ethereum.enable();
    await this.loadWeb3();
  }
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      storageValue: 0,
      accounts: null,
      web3: null,
      contract: null,
      name: "",
      cntact: 0,
      c_address: "",
      subscriptionType: 0,
      message: ""
    };
  }
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SupplyChain.networks[networkId];
      const instance = new web3.eth.Contract(
        SupplyChain.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
  async handleClick(event) {
    const { accounts, contract, name, c_address, cntact, subscriptionType } = this.state;
    event.preventDefault();
    await window.web3.eth.getCoinbase((err, account) => {
      this.setState({ account: accounts[0] })
      try {
        contract.methods.addCustomer(
          name,
          c_address,
          cntact,
          subscriptionType).send({ from: account }).then(() => {
            Swal.fire({ icon: 'success', title: `Customer   ${name}  Has Been Added Successfully  `, showConfirmButton: false, timer: 1500 });
            window.location.reload(false)
          });
      } catch (err) {
        Swal.fire({ icon: 'error', title: `Something Went Wrong`, showConfirmButton: false, timer: 1500 });
      }
    })
  }
  handleChange = event =>
    this.setState({
      [event.target.name]: event.target.value
    });
  render() {

    const { name, c_address, cntact, subscriptionType } = this.state
    return (
      <div id="CustomerRegistration">
        <CustomerStyled.InfoContainer >
          <CustomerStyled.InfoWrapper>
            <CustomerStyled.InfoRow >
              <CustomerStyled.Column1>
                <form>
                  <CustomerStyled.TextWrapper>
                    <CustomerStyled.TopLine></CustomerStyled.TopLine>
                    <CustomerStyled.Heading lightText={true.toString()}
                      required
                      placeholder="Enter Your Name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={this.handleChange} />
                    <CustomerStyled.Heading lightText={true.toString()}
                      required
                      type="text"
                      name="c_address"
                      placeholder="Enter Your Address"
                      value={c_address}
                      onChange={this.handleChange} />
                    <CustomerStyled.Heading lightText={true.toString()}
                      required
                      placeholder="Enter Your Contact"
                      name="cntact"
                      type="number"
                      value={cntact}
                      onChange={this.handleChange} />

                    <CustomerStyled.Selection
                      lightText
                      className="subscribe-input"
                      required
                      name="subscriptionType"
                      value={subscriptionType}
                      type="text"
                      onChange={this.handleChange}>
                      <option className="dropdown-content">SubscriptionType</option>
                      <option className="dropdown-content" value={0}>DailyBase</option>
                      <option className="dropdown-content" value={1}>PrimaryBase</option>
                      <option className="dropdown-content" value={2}>PremiumBase</option>
                    </CustomerStyled.Selection>

                    <CustomerStyled.Subtitle ></CustomerStyled.Subtitle>
                    <CustomerStyled.BtnWrap>
                      <Button to="home"
                        smooth={true.toString()}
                        duration={500}
                        spy={true}
                        exact={true.toString()}
                        offset={-13}
                        primary
                        onClick={this.handleClick}
                      > Submit </Button>
                    </CustomerStyled.BtnWrap>
                  </CustomerStyled.TextWrapper>
                </form>
              </CustomerStyled.Column1>
              <CustomerStyled.Column2>
                <CustomerStyled.ImgWrap>
                  <CustomerStyled.Img src={add_c} alt="" />
                </CustomerStyled.ImgWrap>
              </CustomerStyled.Column2>
            </CustomerStyled.InfoRow>
          </CustomerStyled.InfoWrapper>
        </CustomerStyled.InfoContainer>
      </div>
    )
  }
}



