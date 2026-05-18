import { NavLink } from "react-router-dom";
import {
  Box,
  Chip,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import PointOfSaleRoundedIcon from "@mui/icons-material/PointOfSaleRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import WarehouseRoundedIcon from "@mui/icons-material/WarehouseRounded";

export const drawerWidth = 292;

const menuGroups = [
  {
    title: "Dashboard",
    items: [
      { label: "Overview", to: "", icon: DashboardRoundedIcon, end: true },
      { label: "Bill Desk", to: "bill", icon: PointOfSaleRoundedIcon },
    ],
  },
  {
    title: "Inventory",
    items: [
      { label: "Stock Control", to: "view-stock", icon: WarehouseRoundedIcon },
      { label: "Add Stock", to: "add-stock", icon: Inventory2RoundedIcon },
      { label: "Products", to: "products", icon: StorefrontRoundedIcon },
      { label: "New Product", to: "add-products", icon: ReceiptLongRoundedIcon },
    ],
  },
  {
    title: "Trading",
    items: [
      { label: "Purchase History", to: "purchase-history", icon: LocalShippingRoundedIcon },
      { label: "Purchased Items", to: "purchased-items", icon: Inventory2RoundedIcon },
      { label: "New Purchase", to: "add-purchase", icon: ReceiptLongRoundedIcon },
      { label: "Purchase Return", to: "return-purchase", icon: ReceiptLongRoundedIcon },
      { label: "Sales History", to: "sale-history", icon: PointOfSaleRoundedIcon },
      { label: "Sales Return", to: "sales-return", icon: ReceiptLongRoundedIcon },
    ],
  },
  {
    title: "People & Accounts",
    items: [
      { label: "Suppliers", to: "suppliers", icon: PeopleAltRoundedIcon },
      { label: "New Supplier", to: "add-suppliers", icon: LocalShippingRoundedIcon },
      { label: "Received Payments", to: "received-payments", icon: AccountBalanceWalletRoundedIcon },
      { label: "Payoff Payments", to: "payoff-payments", icon: AccountBalanceWalletRoundedIcon },
      { label: "Customer Ledger", to: "customer-account-book", icon: ReceiptLongRoundedIcon },
      { label: "Supplier Ledger", to: "supplier-account-book", icon: ReceiptLongRoundedIcon },
    ],
  },
];

const SideMenu = ({ onNavigate }) => {
  return (
    <Box
      sx={{
        height: "100%",
        bgcolor: "background.paper",
        borderRight: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ px: 3, py: 2.5 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              bgcolor: "primary.main",
              color: "white",
              display: "grid",
              placeItems: "center",
              fontWeight: 800,
              letterSpacing: 0,
            }}
          >
            B
          </Box>
          <Box>
            <Typography variant="h5" sx={{ lineHeight: 1 }}>
              Berry IMS
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Django inventory suite
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Box sx={{ px: 2 }}>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: "primary.light",
            color: "primary.dark",
            border: "1px solid",
            borderColor: "rgba(103, 58, 183, 0.14)",
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="subtitle2">Inventory Health</Typography>
              <Typography variant="caption">Live API connected</Typography>
            </Box>
            <Chip size="small" label="Online" color="success" />
          </Stack>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ flex: 1, overflowY: "auto", px: 1.5, pb: 2 }}>
        {menuGroups.map((group) => (
          <Box key={group.title} sx={{ mb: 2 }}>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ px: 1.5, fontWeight: 800, letterSpacing: 0.7 }}
            >
              {group.title}
            </Typography>
            <List dense disablePadding>
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <ListItemButton
                    key={`${group.title}-${item.to}`}
                    component={NavLink}
                    to={item.to}
                    end={item.end}
                    onClick={onNavigate}
                    sx={{
                      mx: 0.5,
                      my: 0.25,
                      minHeight: 44,
                      borderRadius: 2,
                      color: "text.secondary",
                      "& .MuiListItemIcon-root": {
                        minWidth: 38,
                        color: "text.secondary",
                      },
                      "&.active": {
                        bgcolor: "primary.light",
                        color: "primary.dark",
                        fontWeight: 800,
                        "& .MuiListItemIcon-root": {
                          color: "primary.main",
                        },
                      },
                      "&:hover": {
                        bgcolor: "grey.100",
                      },
                    }}
                  >
                    <ListItemIcon>
                      <Icon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ fontSize: 14, fontWeight: 700 }}
                    />
                  </ListItemButton>
                );
              })}
            </List>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SideMenu;
