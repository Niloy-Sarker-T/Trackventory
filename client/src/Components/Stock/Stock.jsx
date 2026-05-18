import React from "react";
import { useState, useEffect } from "react";
import { faPencilSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiUrl, formatMoney } from "../../api";

const Stock = () => {
  const stockUrl = apiUrl(`/stock/`);
  const [stockProducts, setStockProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [maxQty, setMaxQty] = useState("");

  const removeStockProduct = async (stockProductId) => {
    const response = await fetch(`${stockUrl}${stockProductId}/`, {
      method: "DELETE",
    });
    if (response.status === 204) {
      setStockProducts(stockProducts.filter((p) => p.id !== stockProductId));
      toast.success("Product removed from stock is successfull!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error("Product removed from stock is failed!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (maxQty) params.set("max_qty", maxQty);
    fetch(`${stockUrl}${params.toString() ? `?${params.toString()}` : ""}`)
      .then((res) => res.json())
      .then((data) => setStockProducts(data));
  }, [stockUrl, search, maxQty]);

  return (
    <>
      <div>
        <h1 className="text-start sm:text-3xl text-2xl font-medium title-font text-gray-900">
          Product Stock
        </h1>
        <p className="text-sm text-start">
          See the product details with quantity and price.
        </p>
        <div className="mt-4 grid max-w-2xl grid-cols-1 gap-3 md:grid-cols-2">
          <input
            className="border border-slate-300 px-3 py-2 text-sm"
            placeholder="Search stock by product"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <input
            className="border border-slate-300 px-3 py-2 text-sm"
            placeholder="Max quantity filter, e.g. 5"
            type="number"
            value={maxQty}
            onChange={(event) => setMaxQty(event.target.value)}
          />
        </div>
      </div>
      <div className="container px-5 py-6 mx-auto">
        {/* Product Table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-amber-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-6 w-2/12">
                  Name
                </th>
                <th scope="col" className="px-6 py-6 w-1/12">
                  P Price
                </th>
                <th scope="col" className="px-6 py-6 w-1/12">
                  S Price
                </th>
                <th scope="col" className="px-6 py-6 w-1/12 text-center">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-6 w-1/12 text-center">
                  Margin
                </th>
                <th scope="col" className="px-6 py-6 w-1/12 text-center">
                  Sell Value
                </th>
                <th scope="col" className="px-6 py-6 w-2/12 text-center">
                  Cost Value
                </th>
                <th scope="col" className="px-6 py-6 w-1/12 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {stockProducts.length ? (
                stockProducts.map((stockProduct) => (
                  <tr key={stockProduct.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {stockProduct.product_name}
                    </th>
                    <td className="px-6 py-4">
                      {stockProduct.unit_purchase_price}
                    </td>
                    <td className="px-6 py-4">{stockProduct.unit_selling_price}</td>
                    <td className="px-6 py-4">{stockProduct.quantity}</td>
                    <td className="px-6 py-4 text-end">
                      {formatMoney(stockProduct.quantity * (stockProduct.unit_selling_price - stockProduct.unit_purchase_price))}
                    </td>
                    <td className="px-6 py-4 text-end">{formatMoney(stockProduct.quantity * stockProduct.unit_selling_price)}</td>
                    <td className="px-6 py-4 text-end">{formatMoney(stockProduct.quantity * stockProduct.unit_purchase_price)}</td>
                    <td>
                      <Link
                        className="p-2"
                        to={`${stockProduct.id}`}
                        // onClick={() => props.removeProduct(props.product.id)}
                      >
                        <FontAwesomeIcon
                          className="text-xl text-yellow-500 hover:cursor-pointer"
                          icon={faPencilSquare}
                        />
                      </Link>
                      <button
                        className="p-2"
                        onClick={() => removeStockProduct(stockProduct.id)}
                      >
                        <FontAwesomeIcon
                          className="text-xl text-red-500 hover:cursor-pointer"
                          icon={faTrash}
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <td colSpan={`8`} className="px-6 py-4 text-center text-red-500">
                    No product added to the stock yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toaster to show confirmation message */}
      <ToastContainer />
    </>
  );
};

export default Stock;
