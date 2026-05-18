import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  CssBaseline,
  Drawer,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import CustomerAccountBook from "../../Components/AccountBook/CustomerAccountBook";
import SupplierAccountBook from "../../Components/AccountBook/SupplierAccountBook";
import Bill from "../../Components/Bill/Bill";
import Dashboard from "../../Components/Dashboard/Dashboard";
import PayoffPayments from "../../Components/Payments/PayoffPaymetns";
import ReceivedPayments from "../../Components/Payments/ReceivedPayments";
import AddProducts from "../../Components/Products/AddProducts";
import ViewProducts from "../../Components/Products/ViewProducts";
import AddPurchase from "../../Components/Purchases/AddPurchase";
import PurchasedItems from "../../Components/Purchases/PurchasedItems";
import PurchaseHistory from "../../Components/Purchases/PurchaseHistory";
import PurchaseReturn from "../../Components/Purchases/PurchaseReturn";
import SaleHistory from "../../Components/Sales/SaleHistory";
import SalesReturn from "../../Components/Sales/SalesReturn";
import SideMenu, { drawerWidth } from "../../Components/SideMenu";
import AddProductStock from "../../Components/Stock/AddProductStock";
import Stock from "../../Components/Stock/Stock";
import AddSuppliers from "../../Components/Suppliers/AddSuppliers";
import ViewSuppliers from "../../Components/Suppliers/ViewSuppliers";

const LoggedHome = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const drawer = <SideMenu onNavigate={() => setMobileOpen(false)} />;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          ml: { lg: `${drawerWidth}px` },
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          bgcolor: "rgba(255, 255, 255, 0.86)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Toolbar sx={{ gap: 2, minHeight: 76 }}>
          {!isDesktop && (
            <IconButton color="primary" edge="start" onClick={() => setMobileOpen(true)} aria-label="Open navigation">
              <MenuRoundedIcon />
            </IconButton>
          )}

          <TextField
            size="small"
            placeholder="Search inventory, bills, suppliers"
            sx={{ display: { xs: "none", md: "block" }, width: 360 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ flexGrow: 1 }} />

          <Button
            variant="contained"
            href="/dashboard/add-purchase"
            startIcon={<AddBusinessRoundedIcon />}
            sx={{ display: { xs: "none", sm: "inline-flex" } }}
          >
            New Purchase
          </Button>
          <IconButton>
            <Badge badgeContent={3} color="error">
              <NotificationsNoneRoundedIcon />
            </Badge>
          </IconButton>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar sx={{ bgcolor: "primary.main", width: 38, height: 38 }}>IMS</Avatar>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography variant="subtitle2" sx={{ lineHeight: 1.2 }}>
                Shop Manager
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Inventory Admin
              </Typography>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth, border: 0 },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": { width: drawerWidth, border: 0 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          pt: "100px",
          px: { xs: 2, sm: 3 },
          pb: 4,
        }}
      >
        <Routes>
          <Route path="" element={<Dashboard />} />
          <Route path="bill" element={<Bill />} />

          <Route path="view-stock" element={<Stock />} />
          <Route path="add-stock" element={<AddProductStock />} />
          <Route path="view-stock/:productStockId" element={<AddProductStock />} />

          <Route path="purchase-history" element={<PurchaseHistory />} />
          <Route path="purchase-history/:purchasedId" element={<AddPurchase />} />
          <Route path="purchased-items" element={<PurchasedItems />} />
          <Route path="add-purchase" element={<AddPurchase />} />
          <Route path="return-purchase" element={<PurchaseReturn />} />

          <Route path="sale-history" element={<SaleHistory />} />
          <Route path="sales-return" element={<SalesReturn />} />

          <Route path="products" element={<ViewProducts />} />
          <Route path="add-products" element={<AddProducts />} />
          <Route path="products/:productId" element={<AddProducts />} />

          <Route path="suppliers" element={<ViewSuppliers />} />
          <Route path="add-suppliers" element={<AddSuppliers />} />
          <Route path="suppliers/:supplierId" element={<AddSuppliers />} />

          <Route path="received-payments" element={<ReceivedPayments />} />
          <Route path="payoff-payments" element={<PayoffPayments />} />

          <Route path="customer-account-book" element={<CustomerAccountBook />} />
          <Route path="supplier-account-book" element={<SupplierAccountBook />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default LoggedHome;
