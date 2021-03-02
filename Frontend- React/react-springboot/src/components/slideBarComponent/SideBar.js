import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import PageManagementService from "../../services/PageManagementService";
import NavBarService from "../../services/NavBarService";
import {SidebarData} from "./SideBarData";

const Nav = styled.div` 
  background: #15171c; 
  height: 80px; 
  display: flex; 
  justify-content: flex-start; 
  align-items: center; 
`;

const NavIcon = styled(Link)` 
  margin-left: 2rem; 
  font-size: 2rem; 
  height: 80px; 
  display: flex; 
  justify-content: flex-start; 
  align-items: center; 
`;

const SidebarNav = styled.nav` 
  background: #15171c; 
  width: 250px; 
  height: 100vh; 
  display: flex; 
  justify-content: center; 
  position: fixed; 
  top: 0; 
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")}; 
  transition: 350ms; 
  z-index: 10; 
`;

const SidebarWrap = styled.div` 
  width: 100%; 
`;

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);
    const [data,setData]=useState([]);
    useEffect(() => {
        NavBarService.getNavBarData().then((res) => {
            setData(res.data);
        })
        });



    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <IconContext.Provider value={{ color: "#fff" }}>
                <Nav>
                    <NavIcon to="#">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </NavIcon>
                    <h1
                        style={{ textAlign: "center",
                            marginLeft: "500px",
                            color: "green" }}
                    >
                        Struts Revamp
                    </h1>
                </Nav>
                <SidebarNav sidebar={sidebar}>
                    <SidebarWrap>
                        <NavIcon to="#">
                            <AiIcons.AiOutlineClose onClick={showSidebar} />
                        </NavIcon>
                        {data.map((item, index) => {
                            return <SubMenu item={item} key={index} />;
                        })}
                    </SidebarWrap>
                </SidebarNav>
            </IconContext.Provider>
        </>
    );
};

export default Sidebar;