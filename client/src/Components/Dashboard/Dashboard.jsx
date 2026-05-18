import { useEffect, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  LinearProgress,
  Link,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import PointOfSaleRoundedIcon from "@mui/icons-material/PointOfSaleRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { apiUrl, formatMoney } from "../../api";

const numberValue = (value) => Number(value || 0);

const formatDate = (value) =>
  value
    ? new Intl.DateTimeFormat("en-BD", { month: "short", day: "numeric" }).format(new Date(value))
    : "No date";

const compactMoney = (value) =>
  new Intl.NumberFormat("en-BD", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(numberValue(value));

const StatCard = ({ title, value, subtitle, icon, color = "primary" }) => {
  const theme = useTheme();
  const palette = theme.palette[color] || theme.palette.primary;

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              bgcolor: palette.light,
              color: palette.dark || palette.main,
            }}
          >
            {icon}
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body2" color="text.secondary" fontWeight={700}>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ mt: 0.5 }} noWrap>
              {value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

const EmptyState = ({ children }) => (
  <Box
    sx={{
      minHeight: 220,
      border: "1px dashed",
      borderColor: "divider",
      borderRadius: 2,
      display: "grid",
      placeItems: "center",
      bgcolor: "grey.50",
      color: "text.secondary",
      textAlign: "center",
      p: 3,
    }}
  >
    <Typography variant="body2">{children}</Typography>
  </Box>
);

const Dashboard = () => {
  const theme = useTheme();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [trendMetric, setTrendMetric] = useState("earned");

  useEffect(() => {
    let isActive = true;

    fetch(apiUrl("/analytics/dashboard/"))
      .then((response) => {
        if (!response.ok) throw new Error("Dashboard API did not respond successfully.");
        return response.json();
      })
      .then((data) => {
        if (isActive) setAnalytics(data);
      })
      .catch((err) => {
        if (isActive) setError(err.message || "Could not load dashboard analytics.");
      })
      .finally(() => {
        if (isActive) setLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  const money = analytics?.money || {};
  const counts = analytics?.counts || {};
  const topProducts = analytics?.top_products || [];
  const lowStock = analytics?.low_stock || [];
  const recentSales = analytics?.recent_sales || [];
  const recentPurchases = analytics?.recent_purchases || [];

  const trendRows = useMemo(() => {
    const salesRows = analytics?.sales_by_day || [];
    const purchaseRows = analytics?.purchases_by_day || [];
    const dates = new Map();

    salesRows.forEach((item) => {
      dates.set(item.day, {
        date: item.day,
        earned: numberValue(item.earned),
        profit: numberValue(item.profit),
        spent: 0,
      });
    });

    purchaseRows.forEach((item) => {
      const existing = dates.get(item.day) || {
        date: item.day,
        earned: 0,
        profit: 0,
        spent: 0,
      };
      dates.set(item.day, { ...existing, spent: numberValue(item.spent) });
    });

    return Array.from(dates.values()).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [analytics]);

  const inventoryMix = useMemo(
    () => [
      { name: "Available", value: Math.max(numberValue(counts.stock_items) - lowStock.length, 0) },
      { name: "Low stock", value: lowStock.length },
    ],
    [counts.stock_items, lowStock.length]
  );

  if (loading) {
    return (
      <Box sx={{ minHeight: 420, display: "grid", placeItems: "center" }}>
        <Stack spacing={2} alignItems="center">
          <CircularProgress />
          <Typography color="text.secondary">Loading Berry dashboard analytics...</Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Box>
      <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h3">Inventory Dashboard</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.75 }}>
            Berry-style control center connected to your Django REST inventory API.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Button component={RouterLink} to="add-products" variant="outlined" startIcon={<AddRoundedIcon />}>
            Product
          </Button>
          <Button component={RouterLink} to="add-purchase" variant="contained" startIcon={<LocalShippingRoundedIcon />}>
            Purchase
          </Button>
          <Button component={RouterLink} to="bill" color="secondary" variant="contained" startIcon={<PointOfSaleRoundedIcon />}>
            Bill
          </Button>
        </Stack>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Total Sales"
            value={formatMoney(money.sales_total)}
            subtitle={`${counts.sales || 0} sales orders`}
            color="success"
            icon={<PointOfSaleRoundedIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Purchase Cost"
            value={formatMoney(money.purchase_total)}
            subtitle={`${counts.purchases || 0} purchase bills`}
            color="warning"
            icon={<LocalShippingRoundedIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Profit"
            value={formatMoney(money.profit)}
            subtitle="Revenue minus purchase cost"
            color="secondary"
            icon={<TrendingUpRoundedIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Stock Value"
            value={formatMoney(money.stock_cost_value)}
            subtitle={`${counts.stock_items || 0} stock entries`}
            color="primary"
            icon={<Inventory2RoundedIcon />}
          />
        </Grid>

        <Grid item xs={12} lg={8}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={2} sx={{ mb: 2 }}>
                <Box>
                  <Typography variant="h5">Performance Overview</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Earned, spent, and profit trend by transaction date.
                  </Typography>
                </Box>
                <Select
                  size="small"
                  value={trendMetric}
                  onChange={(event) => setTrendMetric(event.target.value)}
                  sx={{ minWidth: 140 }}
                >
                  <MenuItem value="earned">Earned</MenuItem>
                  <MenuItem value="spent">Spent</MenuItem>
                  <MenuItem value="profit">Profit</MenuItem>
                </Select>
              </Stack>

              {trendRows.length > 1 ? (
                <Box sx={{ height: 330 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendRows} margin={{ top: 12, right: 24, bottom: 0, left: 0 }}>
                      <defs>
                        <linearGradient id="berryTrend" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.28} />
                          <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                      <XAxis dataKey="date" tickFormatter={formatDate} tickLine={false} axisLine={false} />
                      <YAxis tickFormatter={compactMoney} tickLine={false} axisLine={false} />
                      <Tooltip
                        formatter={(value) => formatMoney(value)}
                        labelFormatter={formatDate}
                        contentStyle={{ borderRadius: 8, borderColor: theme.palette.divider }}
                      />
                      <Area
                        type="monotone"
                        dataKey={trendMetric}
                        stroke={theme.palette.primary.main}
                        strokeWidth={3}
                        fill="url(#berryTrend)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              ) : (
                <EmptyState>Add sales and purchases on separate dates to populate this chart.</EmptyState>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h5">Inventory Position</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Potential sales value and stock health.
              </Typography>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  mb: 2,
                  bgcolor: "primary.main",
                  color: "white",
                  borderColor: "primary.main",
                }}
              >
                <Typography variant="body2" sx={{ opacity: 0.82 }}>
                  Potential inventory revenue
                </Typography>
                <Typography variant="h4" sx={{ mt: 0.75 }}>
                  {formatMoney(money.stock_sales_value)}
                </Typography>
              </Paper>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper variant="outlined" sx={{ p: 1.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      Receivable
                    </Typography>
                    <Typography variant="subtitle1">{formatMoney(money.sales_due)}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper variant="outlined" sx={{ p: 1.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      Payable
                    </Typography>
                    <Typography variant="subtitle1">{formatMoney(money.purchase_due)}</Typography>
                  </Paper>
                </Grid>
              </Grid>
              <Box sx={{ height: 210, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={inventoryMix} dataKey="value" innerRadius={58} outerRadius={82} paddingAngle={3}>
                      {inventoryMix.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={entry.name === "Low stock" ? theme.palette.error.main : theme.palette.success.main}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Stack direction="row" justifyContent="center" spacing={1}>
                <Chip size="small" color="success" label="Available" />
                <Chip size="small" color="error" label="Low stock" />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={7}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Box>
                  <Typography variant="h5">Top Stock Products</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Products with the highest available quantity.
                  </Typography>
                </Box>
                <Link component={RouterLink} to="view-stock" underline="hover" fontWeight={700}>
                  View stock
                </Link>
              </Stack>
              {topProducts.length ? (
                <Box sx={{ height: 310 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topProducts} layout="vertical" margin={{ top: 8, right: 24, bottom: 8, left: 16 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={theme.palette.divider} />
                      <XAxis type="number" axisLine={false} tickLine={false} />
                      <YAxis
                        type="category"
                        dataKey="product_name"
                        width={120}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip />
                      <Bar dataKey="quantity" fill={theme.palette.secondary.main} radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              ) : (
                <EmptyState>Add stock records to see top products.</EmptyState>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Box>
                  <Typography variant="h5">Low Stock Alerts</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Items at or below the low-stock threshold.
                  </Typography>
                </Box>
                <WarningAmberRoundedIcon color="error" />
              </Stack>
              {lowStock.length ? (
                <Stack spacing={2}>
                  {lowStock.map((item) => (
                    <Box key={item.id}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.75 }}>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography variant="subtitle2" noWrap>
                            {item.product_name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Sell price {formatMoney(item.unit_selling_price)}
                          </Typography>
                        </Box>
                        <Chip size="small" color="error" label={`${item.quantity} left`} />
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min((numberValue(item.quantity) / 5) * 100, 100)}
                        color="error"
                        sx={{ height: 8, borderRadius: 8 }}
                      />
                    </Box>
                  ))}
                </Stack>
              ) : (
                <EmptyState>No low-stock items right now.</EmptyState>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                <Box>
                  <Typography variant="h5">Recent Sales</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Latest customer sales output.
                  </Typography>
                </Box>
                <Link component={RouterLink} to="sale-history" underline="hover" fontWeight={700}>
                  View all
                </Link>
              </Stack>
              <RecentTable
                rows={recentSales}
                emptyText="No sales recorded."
                firstLabel="Customer"
                amountKey="total_price"
                nameGetter={(row) => row.customer || `Order ${row.id}`}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                <Box>
                  <Typography variant="h5">Recent Purchases</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Latest supplier purchase input.
                  </Typography>
                </Box>
                <Link component={RouterLink} to="purchase-history" underline="hover" fontWeight={700}>
                  View all
                </Link>
              </Stack>
              <RecentTable
                rows={recentPurchases}
                emptyText="No purchases recorded."
                firstLabel="Supplier"
                amountKey="total"
                nameGetter={(row) => row.supplier_name || `Bill ${row.bill_no}`}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

const RecentTable = ({ rows, emptyText, firstLabel, amountKey, nameGetter }) => {
  if (!rows.length) return <EmptyState>{emptyText}</EmptyState>;

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{firstLabel}</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id || row.bill_no} hover>
              <TableCell>
                <Typography variant="subtitle2">{nameGetter(row)}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {row.id ? `Sale #${row.id}` : `Bill #${row.bill_no}`}
                </Typography>
              </TableCell>
              <TableCell>{formatDate(row.created_at)}</TableCell>
              <TableCell align="right">{formatMoney(row[amountKey])}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Dashboard;
