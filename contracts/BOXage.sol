// SPDX-License-Identifier: MIT

pragma solidity >=0.5.16;

contract BOXage {
    /* ======================== start declaration.================================== */

    /* set owner */
    address public owner;
    // address  public seller;
    /* tracker var*/
    uint256 public skuCount;
    uint256 public customerCount;
    uint256 public CarrierCount;
    // ===  mapping === //
    mapping(uint256 => Item) items;
    mapping(address => Customer) public customers;
    mapping(address => Buyer) public buyers;
    mapping(address => Carrier) carriers;

    //mapping(address => bool) public customers;
    /*declaring item State*/
    enum State {
        Undefined,
        InStock,
        Processing,
        Shipped,
        Arrived
    }
    enum SubscriptionType {
        DailyBase,
        PrimaryBase,
        PremiumBase
    }

    struct Customer {
        string name;
        uint256 contact;
        string c_address;
        SubscriptionType subscriptionType;
        address seller;
        bool isCustomer;
    }
    struct Buyer {
        string name;
        uint256 contact;
        address buyer;
    }
    struct Item {
        string name;
        uint256 sku;
        State state;
        uint256 buyerContact;
        address seller;
        address buyer;
        address carrier;
    }

    struct Carrier {
        string name;
        uint256 contact;
        address carrier;
        bool isCarrier;
    }

    /* ======================== end  of declaration.================================== */

    /* ========================  events.================================== */

    event InStock(uint256 sku);
    event Processing(uint256 sku);
    event Shipped(uint256 sku);
    event Arrived(uint256 sku);
    event DailyBase(uint256 seller);
    event PrimaryBase(uint256 seller);
    event PremiumBase(uint256 seller);

    /* ======================== end of events.================================== */

    /* ========================  modifiers.================================== */

    /* Create a modifer that checks if the msg.sender is the owner of the contract */

    modifier isOwner() {
        require(owner == msg.sender);
        _;
    }
    modifier isCustomer() {
        require(customers[msg.sender].isCustomer, "Unauthorized");
        _;
    }
    modifier isBuyer(uint256 sku) {
        require(items[sku].buyer == msg.sender, "Unauthorized");
        _;
    }
    modifier isCarrier(uint256 sku) {
        require(
            items[sku].buyer != msg.sender && items[sku].seller != msg.sender,
            "Unauthorized"
        );
        _;
    }
    modifier belongTo(uint256 sku) {
        require(
            items[sku].seller == msg.sender ||
                owner == msg.sender ||
                items[sku].buyer == msg.sender ||
                items[sku].carrier == msg.sender,
            "Unauthorized"
        );
        _;
    }

    modifier inStock(uint256 sku) {
        require(items[sku].state == State.InStock, "Undefined Item");
        _;
    }

    modifier processing(uint256 sku) {
        require(items[sku].state == State.Processing, "Undefined Item");
        _;
    }

    modifier shipped(uint256 sku) {
        require(items[sku].state == State.Shipped, "Undefined Item");
        _;
    }

    modifier arrived(uint256 sku) {
        require(
            items[sku].state == State.Arrived,
            "You Can't Change the Item State To arrive before it been shipped ?"
        );
        _;
    }
    modifier dailyBase(address seller) {
        require(
            customers[seller].subscriptionType == SubscriptionType.DailyBase
        );
        _;
    }

    modifier primaryBase(address seller) {
        require(
            customers[seller].subscriptionType == SubscriptionType.PrimaryBase
        );
        _;
    }

    modifier premiumBase(address seller) {
        require(
            customers[seller].subscriptionType == SubscriptionType.PrimaryBase
        );
        _;
    }

    /* ======================== end of modifiers.================================== */

    //===================================== post functions ======================================================================//
    constructor() public {
        /* Here, set the owner as the person who instantiated the contract
       and set your skuCount to 0. */
        owner = msg.sender;
        customerCount = 0;
        skuCount = 0;
        CarrierCount = 0;
    }

    function addCustomer(
        string memory _name,
        string memory _c_address,
        uint256 _cntact,
        uint256 _subscriptionType
    ) public returns (string memory) {
        SubscriptionType DsubscriptionType;
        if (_subscriptionType == 0) {
            DsubscriptionType = SubscriptionType.DailyBase;
        } else if (_subscriptionType == 1) {
            DsubscriptionType = SubscriptionType.PrimaryBase;
        } else if (_subscriptionType == 2) {
            DsubscriptionType = SubscriptionType.PremiumBase;
        } else {
            return "pleas inter a valid number between 0 to 2";
        }

        customers[msg.sender] = Customer({
            name: _name,
            contact: _cntact,
            c_address: _c_address,
            subscriptionType: DsubscriptionType,
            isCustomer: true,
            seller: msg.sender
        });
        customerCount = customerCount + 1;
        return string(abi.encodePacked(_name, ": Has been added successfully"));
    }

    function addItem(string memory _name)
        public
        payable
        isCustomer
        returns (string memory)
    {
        emit InStock(skuCount);
        items[skuCount] = Item({
            name: _name,
            sku: skuCount,
            state: State.InStock,
            buyerContact: uint256(0),
            seller: msg.sender,
            buyer: address(0),
            carrier: address(0)
        });
        skuCount = skuCount + 1;
        return string(abi.encodePacked(_name, ": has been added successfully"));
    }

    function buyItem(
        uint256 _sku,
        uint256 _buyerContact,
        string memory _name
    ) public inStock(_sku) returns (string memory) {
        buyers[msg.sender] = Buyer({
            name: _name,
            contact: _buyerContact,
            buyer: msg.sender
        });
        items[_sku].buyerContact = _buyerContact;
        items[_sku].buyer = msg.sender;
        items[_sku].state = State.Processing;
        emit Processing(_sku);
        return
            string(
                abi.encodePacked(
                    items[_sku].name,
                    "=> Has Been Checked Out By ",
                    _name
                )
            );
    }

    function shipItem(uint256 _sku)
        public
        isCarrier(_sku)
        processing(_sku)
        returns (string memory)
    {
        items[_sku].carrier = msg.sender;
        items[_sku].state = State.Shipped;
        emit Shipped(_sku);
        return string(abi.encodePacked(items[_sku].name, ": Out with Carrier"));
    }

    //===================================== End of Post functions ====================================================================================================//

    //===================================== Transactions =======================//
    function receiveItem(uint256 sku) public isBuyer(sku) shipped(sku) {
        items[sku].buyer = msg.sender;
        items[sku].state = State.Arrived;
        emit Arrived(sku);
    }

    //===================================== End of Transactions =======================//
    function fetchCustomer(address cutomer)
        public
        view
        returns (
            string memory name,
            uint256 contact,
            string memory c_address
        )
    {
        name = customers[cutomer].name;
        contact = customers[cutomer].contact;
        c_address = customers[cutomer].c_address;
        return (name, contact, c_address);
    }

    //===================================== fetching functions ====================================================================================================//
    function fetchItem(uint256 _sku)
        public
        view
        returns (
            //belongTo(_sku)
            string memory name,
            uint256 sku,
            string memory state,
            string memory S_name,
            uint256 s_contact,
            string memory b_name,
            uint256 b_contact,
            address carrier
        )
    {
        if (
            items[_sku].seller == msg.sender ||
            owner == msg.sender ||
            items[_sku].buyer == msg.sender ||
            items[_sku].carrier == msg.sender
        ) {
            require(items[_sku].sku == _sku, "Please enter a valid SKU ");
            name = items[_sku].name;
            sku = items[_sku].sku;
            if (items[sku].state == State.InStock) {
                state = "InStock";
            } else if (items[sku].state == State.Processing) {
                state = "Processing";
            } else if (items[sku].state == State.Shipped) {
                state = "Shipped";
            } else if (items[sku].state == State.Arrived) {
                state = "Arrived";
            }
            address seller = items[_sku].seller;
            S_name = customers[seller].name;
            s_contact = customers[seller].contact;
            address buyer = items[_sku].buyer;
            b_contact = buyers[buyer].contact;
            b_name = buyers[buyer].name;
            carrier = items[_sku].carrier;
            return (
                name,
                sku,
                state,
                S_name,
                s_contact,
                b_name,
                b_contact,
                carrier
            );
        } else {}
    }
}
