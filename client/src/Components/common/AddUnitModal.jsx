import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiUrl } from "../../api";

const AddUnitModal = ({ visible, onClose, onAdded }) => {
  const [unitInfo, setUnitInfo] = useState({});

  const handleOnChange = (event) => {
    setUnitInfo({ ...unitInfo, [event.target.name]: event.target.value });
  };

  const addUnit = async () => {
    const response = await fetch(apiUrl("/units/"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(unitInfo),
    });

    if (response.status === 201) {
      toast.success("Unit successfully added!", { position: toast.POSITION.TOP_RIGHT });
      setUnitInfo({});
      onAdded?.();
      onClose?.();
    } else {
      toast.error("Unit adding failed!", { position: toast.POSITION.TOP_RIGHT });
    }
  };

  if (!visible) return <ToastContainer />;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
        <div className="w-full max-w-lg bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-200 p-4">
            <h3 className="text-lg font-semibold text-slate-950">Add New Unit</h3>
            <button type="button" className="text-slate-500 hover:text-slate-950" onClick={onClose}>
              Close
            </button>
          </div>
          <div className="space-y-4 p-5">
            <input
              required
              name="short_form"
              value={unitInfo.short_form || ""}
              onChange={handleOnChange}
              className="w-full border border-slate-300 px-3 py-2 text-sm"
              placeholder="Short form, e.g. kg"
            />
            <input
              required
              name="title"
              value={unitInfo.title || ""}
              onChange={handleOnChange}
              className="w-full border border-slate-300 px-3 py-2 text-sm"
              placeholder="Title, e.g. Kilogram"
            />
            <textarea
              name="detail"
              value={unitInfo.detail || ""}
              onChange={handleOnChange}
              rows="4"
              className="w-full border border-slate-300 px-3 py-2 text-sm"
              placeholder="Description"
            />
          </div>
          <div className="flex justify-end gap-3 border-t border-slate-200 p-4">
            <button type="button" className="border border-slate-300 px-4 py-2 text-sm" onClick={onClose}>
              Cancel
            </button>
            <button type="button" onClick={addUnit} className="bg-slate-950 px-4 py-2 text-sm font-medium text-white">
              Submit
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddUnitModal;
