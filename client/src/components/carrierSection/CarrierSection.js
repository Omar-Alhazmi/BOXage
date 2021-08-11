import { Button } from '../Buttons'
import React, { Component } from 'react'
import * as CustomerStyled from '../customerSection/CustomerStyled';
import SupplyChain from "../../contracts/SupplyChain.json";
import getWeb3 from "../../getWeb3";
import Web3 from 'web3'
import Swal from "sweetalert2";
import shipping from '../../images/shipping.svg'

export default class CarrierSection extends Component {
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
      sku: 0,
      Cr_fitchItem: null,
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
    const { accounts, contract, sku } = this.state;
    event.preventDefault();
    await window.web3.eth.getCoinbase((err, account) => {
      this.setState({ account: accounts[0] })
      try {
        contract.methods.shipItem(sku).send({ from: account }).then(() => {
          Swal.fire({ icon: 'success', title: ` Item: ${sku} Out With Carrier `, showConfirmButton: false, timer: 1500 });
          // window.location.reload(false);
        });
      } catch (err) {
        Swal.fire({ icon: 'error', title: `Something Went Wrong`, showConfirmButton: false, timer: 1500 });
      }
    })
    try {
      let Cr_fitchItem = [];
      Cr_fitchItem.push(await contract.methods.fetchItem(sku).call())
      this.setState({ Cr_fitchItem })
    } catch (err) {
      Swal.fire({ icon: 'error', title: `Something Went Wrong`, showConfirmButton: false, timer: 1500 });
    }
  }
  handleChange = event =>
    this.setState({
      [event.target.name]: event.target.value
    });
  render() {
    const { sku } = this.state
    return (
      <div id="CarrierSection">
        <CustomerStyled.InfoContainer lightBg>
          <CustomerStyled.InfoWrapper>
            <CustomerStyled.InfoRow imgStart>
              <CustomerStyled.Column1>
                <form>
                  <CustomerStyled.TextWrapper>
                    <CustomerStyled.TopLine></CustomerStyled.TopLine>
                    <CustomerStyled.Heading
                      required
                      placeholder="SKU"
                      name="sku"
                      type="number"
                      value={sku}
                      onChange={this.handleChange} />
                    <CustomerStyled.Subtitle ></CustomerStyled.Subtitle>
                    <CustomerStyled.BtnWrap>
                      <Button to="home"
                        smooth={true.toString()}
                        duration={500}
                        spy={true}
                        exact={true.toString()}
                        offset={-13}
                        onClick={this.handleClick}
                      > Submit </Button>
                    </CustomerStyled.BtnWrap>
                  </CustomerStyled.TextWrapper>
                </form>
              </CustomerStyled.Column1>
              <CustomerStyled.Column2>
                <CustomerStyled.ImgWrap>
                  <CustomerStyled.Img src={shipping} alt="" />
                </CustomerStyled.ImgWrap>
              </CustomerStyled.Column2>
            </CustomerStyled.InfoRow>
          </CustomerStyled.InfoWrapper>
        </CustomerStyled.InfoContainer>
      </div>
    )
  }
}



