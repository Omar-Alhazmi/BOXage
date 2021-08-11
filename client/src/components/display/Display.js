import React, { Component } from 'react'
import styled from 'styled-components'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaBox, FaRegArrowAltCircleRight, FaBoxes, FaShippingFast } from "react-icons/fa";
import SupplyChain from "../../contracts/SupplyChain.json";
import getWeb3 from "../../getWeb3";
import Web3 from 'web3'
import Swal from "sweetalert2";
import * as CustomerStyled from '../customerSection/CustomerStyled';
export default class Display extends Component {
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
      accounts: null,
      web3: null,
      contract: null,
      Sku: null,
      fetchItem: null,
      lastItem: null
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
      if (deployedNetwork) {
        const skuCount = await this.state.contract.methods.skuCount().call();
        if (skuCount > 0) {
          let fetchItem = []
          //  //this.state.contract.methods.fetchItem(1).call();
          console.log("skuCount: " + skuCount)
          console.log(fetchItem)
          console.log(this.state.contract.methods)
          // await skuCount.forEach(function(item){ ItemInfo.push(this.state.contract.methods.fetchItem(item).call())});
          for (let i = 0; i < skuCount; i++) {
            fetchItem.push(await this.state.contract.methods.fetchItem(i).call())
          }
          this.setState({ fetchItem })
        }
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
  async handleClick(event) {
    const { Sku, fetchItem } = this.state;
    console.log(fetchItem);
    event.preventDefault();
    try {
      let lastItem = []
      if (fetchItem != null) {
        lastItem.push(fetchItem[Sku])
        this.setState({ lastItem: lastItem })
      }
    } catch (err) {
      Swal.fire({ icon: 'error', title: `Something Went Wrong`, showConfirmButton: false, timer: 1500 });
    }
  }
  handleChange = event =>
    this.setState({
      [event.target.name]: event.target.value
    });
  render() {
    const { Sku, lastItem } = this.state
    let today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    const DisplayWrapper = styled.div`
     display: grid;
    height: fit-content;
    grid-template-rows: 69px 1fr;
    justify-content: center;
    z-index: 1;
    /* height: 860px; */
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    padding: 0 24px;
    justify-content: center;
    background-color: #282c34;
    `;
    return (
      <>
        <DisplayWrapper id={'Tracking-SKU'}>
          <form style={{ justifySelf: "center" }}>
            <CustomerStyled.Heading
              lightText={true.toString()}
              required
              placeholder="SKU"
              name="Sku"
              type="text"
              value={Sku}
              onChange={this.handleChange} />
            <FaRegArrowAltCircleRight className="icon_style" onClick={this.handleClick} />
          </form>
          {lastItem != null ?
            <VerticalTimeline layout={"2-columns"} >
              {lastItem[0].S_name !== "" ?
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  date={today}
                  dateClassName={'date_color'}
                  contentStyle={{ color: '#282c34' }}
                  iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                  icon={<FaBoxes />}
                >
                  <h3 className="vertical-timeline-element-title">{`SKU: ${Sku}  order placed`}</h3>
                  <h4 className="vertical-timeline-element-subtitle">{`Item store By: ${lastItem[0].S_name} `}</h4>
                </VerticalTimelineElement>
                : ""}
              {lastItem[0].b_name !== "" ?
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  date={today}
                  dateClassName={'date_color'}
                  contentStyle={{ color: '#282c34' }}
                  iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                  icon={<FaBox />}
                >
                  <h3 className="vertical-timeline-element-title">{`SKU: ${Sku}  order placed`}</h3>
                  <h4 className="vertical-timeline-element-subtitle">{`Item Processed For: ${lastItem[0].b_name} `}</h4>
                </VerticalTimelineElement>
                : ""}
              {lastItem[0].carrier !== "0x0000000000000000000000000000000000000000" ?
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  date={today}
                  dateClassName={'date_color'}
                  contentStyle={{ color: '#282c34' }}
                  iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                  icon={<FaShippingFast />}
                >
                  <h3 className="vertical-timeline-element-title">{`Item: ${Sku} Has Been Shipped`}</h3>
                  <h4 className="vertical-timeline-element-subtitle">{`By: ${lastItem[0].carrier} `}</h4>

                </VerticalTimelineElement>
                : ""}
            </VerticalTimeline>
            : ""
          }
        </DisplayWrapper>
      </>
    )
  }
}
