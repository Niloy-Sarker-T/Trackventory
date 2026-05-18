import { useEffect, useState } from "react";
import { apiUrl, formatMoney } from "../../api";

const SaleHistory = () => {
  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const query = search ? `?search=${encodeURIComponent(search)}` : "";
    fetch(apiUrl(`/sales/${query}`))
      .then((res) => res.json())
      .then((data) => setSales(data));
  }, [search]);

  return (
    <section className="text-left">
      <h1 className="text-3xl font-semibold text-slate-950">Sales History</h1>
      <p className="mt-1 text-sm text-slate-500">Search and review completed customer sales.</p>
      <div className="mt-4 flex max-w-md">
        <input
          className="w-full border border-slate-300 px-3 py-2 text-sm"
          placeholder="Search by customer"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="mt-6 overflow-x-auto border border-slate-200">
        <table className="w-full text-sm text-slate-700">
          <thead className="bg-slate-100 text-left text-xs uppercase text-slate-600">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Products</th>
              <th className="px-4 py-3 text-right">Sold</th>
              <th className="px-4 py-3 text-right">Paid</th>
              <th className="px-4 py-3 text-right">Due</th>
              <th className="px-4 py-3 text-right">Cost</th>
              <th className="px-4 py-3 text-right">Profit</th>
            </tr>
          </thead>
          <tbody>
            {sales.length ? (
              sales.map((sale) => (
                <tr key={sale.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-900">{sale.customer}</td>
                  <td className="px-4 py-3">{new Date(sale.created_at).toDateString()}</td>
                  <td className="px-4 py-3">
                    {(sale.products || []).map((item) => `${item.product_name} x ${item.quantity}`).join(", ")}
                  </td>
                  <td className="px-4 py-3 text-right">{formatMoney(sale.total_price)}</td>
                  <td className="px-4 py-3 text-right">{formatMoney(sale.paid_amount)}</td>
                  <td className="px-4 py-3 text-right">{formatMoney(sale.due_amount)}</td>
                  <td className="px-4 py-3 text-right">{formatMoney(sale.purchase_cost)}</td>
                  <td className="px-4 py-3 text-right">{formatMoney(sale.profit)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-6 text-center text-slate-500" colSpan="8">
                  No sales recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default SaleHistory;
