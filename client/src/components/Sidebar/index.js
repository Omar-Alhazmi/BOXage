import React from 'react';
import * as SidebarElements from './SidebarElements';

const Sidebar = ({isOpen,toggle}) => {
    return (
    <SidebarElements.SidebarContainer isOpen={isOpen} onClick={toggle}>
     <SidebarElements.Icon onClick={toggle}>
        <SidebarElements.CloseIcon />
     </SidebarElements.Icon>
     <SidebarElements.SidebarWrapper>
        <SidebarElements.SidebarMenu>
         <SidebarElements.SidebarLink to="CustomerRegistration" onClick={toggle} >Customer Registration</SidebarElements.SidebarLink>
         <SidebarElements.SidebarLink to="CustomerAddItem" onClick={toggle}>Add Item</SidebarElements.SidebarLink>
         <SidebarElements.SidebarLink to="Buyer" onClick={toggle}>Buyer Section</SidebarElements.SidebarLink>
         <SidebarElements.SidebarLink to="CarrierSection" onClick={toggle}>Carrier Section</SidebarElements.SidebarLink>
         <SidebarElements.SidebarLink to="Tracking-SKU" onClick={toggle}>Tracking-SKU</SidebarElements.SidebarLink>
        </SidebarElements.SidebarMenu>
     </SidebarElements.SidebarWrapper>
    </SidebarElements.SidebarContainer>
    )
}
export default Sidebar

