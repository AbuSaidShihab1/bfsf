import React from "react";
import {Box,Divider,Drawer,IconButton,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Typography,useTheme,} from "@mui/material";
import {SettingsOutlined,ChevronLeft,ChevronRightOutlined,HomeOutlined,ShoppingCartOutlined,Groups2Outlined,ReceiptLongOutlined,PublicOutlined,PointOfSaleOutlined,TodayOutlined,CalendarMonthOutlined,AdminPanelSettingsOutlined,TrendingUpOutlined,PieChartOutlined,} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profie.jpeg";
import { capitalizeRole } from "utilities/CommonUtility";
import { PiUserCircleDashedDuotone } from "react-icons/pi";
import { RiRefund2Line } from "react-icons/ri";
// logo
import { MdOutlineNotificationsActive } from "react-icons/md";
import logo from "assets/easypay-logo.png";
import { MdPendingActions } from "react-icons/md";
import { MdPhoneIphone } from "react-icons/md";
import { SiWebmoney } from "react-icons/si";
const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  let navItems = [];
  if (user.role === "merchant" || user.role === "subadmin") {
    navItems = [
      {
        text: "Dashboard",
        icon: <HomeOutlined />,
      },
      {
        text: "Payment",
        icon: <ReceiptLongOutlined />,
      },
      {
        text: "Payout",
        icon: <PointOfSaleOutlined />,
      },
      {
        text: "Setting",
        icon: <PublicOutlined />,
      },
    ];    
  } else if (user.role === "admin") {
    navItems = [
      {
        text: "Dashboard",
        icon: <HomeOutlined size={30} />,
      },
           {
        text: "Agent",
        icon: <PiUserCircleDashedDuotone size={25} />,
      },
            {
        text: "Request Agent",
        icon: <MdPendingActions size={25} />,
      },
            {
        text: "Agent Deposit",
        icon: <RiRefund2Line size={25} />,
      },
         {
        text: "Real Time ALert",
        icon: <MdOutlineNotificationsActive size={25} />,
      },
      {
        text: "Merchants",
        icon: <Groups2Outlined size={25} />,
      },
      {
        text: "Numbers",
        icon: <MdPhoneIphone size={25} />,
      },
      {
        text: "Bkash API",
        icon: <PublicOutlined size={25} />,
      },
      {
        text: "Nagad API",
        icon: <SiWebmoney size={25} />,
      },
      {
        text: "Payment",
        icon: <ReceiptLongOutlined size={25} />,
      },
      {
        text: "Payout",
        icon: <PointOfSaleOutlined size={25} />,
      },
      {
        text: "Setting",
        icon: <PublicOutlined size={25} />,
      },
    ];
  }

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav" className="font-sans overflow-y-auto no-scollbar bg-[#CFF4FC]" sx={{backgroundColor:"#CFF4FC"}}>
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            display:"block",
            width: "100%",
            "& .MuiDrawer-paper": {
              color:"#0DCAF0",
              backgroundColor: '#151A2D', // theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width:"20%"
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color="#CFF4FC">
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <img src={logo} alt="EasyPay" style={{width: '3rem'}}/>
                  <Typography variant="h4" fontWeight="bold" sx={{color: 'white'}}>
                    EassyPay
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List sx={{
              display:"block",
              marginBottom:"20px"
            }}>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem",fontSize:"22px"}}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase().replaceAll(' ', '_');
                // console.log('lcText', lcText);
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        borderBottom:"1px solid #4b6584",
                        marginBottom:"15px",
                        backgroundColor:
                          active === lcText
                            ? "#6A3FFF" // theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? "#45aaf2"
                            : theme.palette.grey[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? "#fff"
                              : theme.palette.grey[100],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} sx={{color:"#fff",fontSize:"22px"}} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto",color:"#000"}} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          {/* <Box position="absolute" bottom="2rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  textTransform="capitalize"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {capitalizeRole(user.role)}
                </Typography>
                
              </Box>
              <SettingsOutlined
                  sx={{
                    color: theme.palette.secondary[300],
                    fontSize: "25px ",
                  }}
                />
            </FlexBetween>
          </Box> */}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;