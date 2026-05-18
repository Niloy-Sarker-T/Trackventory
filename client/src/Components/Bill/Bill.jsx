import { faMoneyBill, faPlus, faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiUrl, formatMoney } from "../../api";

const Bill = () => {
  const [stockItems, setStockItems] = useState([]);
  const [search, setSearch] = useState("");
  const [customer, setCustomer] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch(apiUrl("/stock/"))
      .then((res) => res.json())
      .then((data) => setStockItems(data));
  }, []);

  const filteredStock = useMemo(() => {
    const term = search.toLowerCase();
    return stockItems.filter((item) => item.product_name?.toLowerCase().includes(term));
  }, [stockItems, search]);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = Math.max(subtotal - Number(discount || 0), 0);
  const due = Math.max(total - Number(paidAmount || 0), 0);

  const addToCart = (stockItem) => {
    if (cart.some((item) => item.product === stockItem.product)) return;
    setCart([
      ...cart,
      {
        product: stockItem.product,
        product_name: stockItem.product_name,
        price: stockItem.unit_selling_price,
        quantity: 1,
        available: stockItem.quantity,
      },
    ]);
  };

  const updateCartItem = (productId, field, value) => {
    setCart(
      cart.map((item) => {
        if (item.product !== productId) return item;
        const nextValue = field === "quantity" ? Math.min(Number(value || 0), item.available) : Number(value || 0);
        return { ...item, [field]: nextValue };
      })
    );
  };

  const checkout = async () => {
    if (!customer.trim()) {
      toast.error("Customer name is required.", { position: toast.POSITION.TOP_RIGHT });
      return;
    }
    if (!cart.length) {
      toast.error("Add at least one product.", { position: toast.POSITION.TOP_RIGHT });
      return;
    }

    const response = await fetch(apiUrl("/sales/"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer,
        discount: Number(discount || 0),
        paid_amount: Number(paidAmount || 0),
        details: cart.map((item) => `${item.product_name} x ${item.quantity}`).join(", "),
        products: cart.map((item) => ({
          product: item.product,
          quantity: item.quantity,
          price: item.price,
        })),
      }),
    });

    if (response.status === 201) {
      toast.success("Sale completed and stock updated.", { position: toast.POSITION.TOP_RIGHT });
      setCart([]);
      setCustomer("");
      setPaidAmount(0);
      setDiscount(0);
      fetch(apiUrl("/stock/"))
        .then((res) => res.json())
        .then((data) => setStockItems(data));
    } else {
      const error = await response.json();
      toast.error(JSON.stringify(error), { position: toast.POSITION.TOP_RIGHT });
    }
  };

  return (
    <section className="text-left">
      <h1 className="text-3xl font-semibold text-slate-950">Bill</h1>
      <p className="mt-1 text-sm text-slate-500">Create a customer sale and update stock in one step.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <input
          className="border border-slate-300 px-3 py-2 text-sm"
          placeholder="Customer name"
          value={customer}
          onChange={(event) => setCustomer(event.target.value)}
        />
        <input
          className="border border-slate-300 px-3 py-2 text-sm"
          type="number"
          placeholder="Discount"
          value={discount}
          onChange={(event) => setDiscount(event.target.value)}
        />
        <input
          className="border border-slate-300 px-3 py-2 text-sm"
          type="number"
          placeholder="Paid amount"
          value={paidAmount}
          onChange={(event) => setPaidAmount(event.target.value)}
        />
      </div>

      <div className="mt-6 border border-slate-200 bg-white p-4">
        <div className="mb-3 flex items-center gap-2">
          <FontAwesomeIcon icon={faSearch} className="text-slate-400" />
          <input
            className="w-full border-0 text-sm outline-none"
            placeholder="Search stock products"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {filteredStock.slice(0, 8).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => addToCart(item)}
              className="flex items-center justify-between border border-slate-200 px-3 py-2 text-left text-sm hover:bg-slate-50"
            >
              <span>
                <span className="block font-medium text-slate-900">{item.product_name}</span>
                <span className="text-slate-500">{item.quantity} available</span>
              </span>
              <span className="font-medium text-slate-800">
                <FontAwesomeIcon icon={faPlus} /> {formatMoney(item.unit_selling_price)}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left text-xs uppercase text-slate-600">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3 text-right">Subtotal</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.length ? (
              cart.map((item) => (
                <tr key={item.product} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-900">{item.product_name}</td>
                  <td className="px-4 py-3">
                    <input
                      className="w-24 border border-slate-300 px-2 py-1"
                      type="number"
                      value={item.price}
                      onChange={(event) => updateCartItem(item.product, "price", event.target.value)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      className="w-24 border border-slate-300 px-2 py-1"
                      type="number"
                      min="1"
                      max={item.available}
                      value={item.quantity}
                      onChange={(event) => updateCartItem(item.product, "quantity", event.target.value)}
                    />
                  </td>
                  <td className="px-4 py-3 text-right">{formatMoney(item.price * item.quantity)}</td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => setCart(cart.filter((row) => row.product !== item.product))}>
                      <FontAwesomeIcon icon={faXmark} className="text-rose-600" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-6 text-center text-slate-500" colSpan="5">
                  No products added to this bill.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-end gap-4 text-sm">
        <span>Subtotal: <strong>{formatMoney(subtotal)}</strong></span>
        <span>Total: <strong>{formatMoney(total)}</strong></span>
        <span>Due: <strong>{formatMoney(due)}</strong></span>
        <button
          type="button"
          onClick={checkout}
          className="bg-slate-950 px-5 py-2 font-medium text-white hover:bg-slate-800"
        >
          <FontAwesomeIcon icon={faMoneyBill} className="mr-2" />
          Checkout
        </button>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Bill;
