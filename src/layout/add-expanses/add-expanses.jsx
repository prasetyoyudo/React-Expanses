import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpanses, getListExpanses } from "../../actions/expanses";
import "./add-expanses.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TextField } from "@mui/material";
import moment from "moment";
import Swal from "sweetalert2";

export function AddExpanses() {
  const [jam, setJam] = useState(null);
  const [nama, setNama] = useState("");
  const [pengeluaran, setPengeluaran] = useState('');
  const [tanggal, setTanggal] = useState(null);
  const [showAddModal, setShowAddModal] = useState(true);

  const { addExpansesResult } = useSelector((state) => state.ExpansesReducer);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addExpanses({ tanggal, jam, nama, pengeluaran }));

    setTimeout(() => {
      Swal.fire("Selamat", "Pengeluaran berhasil dicatat", "success");
    }, 300);
    setShowAddModal(false);
  };

  useEffect(() => {
    if (addExpansesResult) {
      dispatch(getListExpanses());
      setTanggal("");
      setJam("");
      setNama("");
      setPengeluaran(0);
    }
  }, [addExpansesResult, dispatch]);

  return (
    <div>
      {showAddModal && (
        <div className="fixed add-expanses-modal shadow-xl">
          <div>
            <h4 className="text-xl font-semibold my-4">
              Input Pengeluaran Harian
            </h4>
            <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
              <DatePicker
                selected={tanggal}
                placeholderText="Masukkan tanggal pengluaran Anda"
                onChange={(date) => setTanggal(date)}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Masukan jam pengeluaran Anda"
                  value={jam}
                  onChange={(newValue) => {
                    setJam(newValue);
                  }}
                  className="mb-4"
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <input
                type="text"
                name="nama"
                placeholder="Masukkan nama pengeluaran Anda"
                value={nama}
                className="mt-4"
                onChange={(e) => setNama(e.target.value)}
              />
              <input
                type="number"
                name="pengeluaran"
                placeholder="Masukkan harga pengularan Anda"
                value={pengeluaran}
                min="0"
                onChange={(e) => setPengeluaran(parseInt(e.target.value))}
              />
              <button
                disabled={
                  nama == "" || pengeluaran == "" || jam == "" || tanggal == ""
                }
                type="submit"
                className={[
                  nama == "" || pengeluaran == "" || jam == "" || tanggal == ""
                    ? "disabled-button"
                    : "submit-expanses-btn",
                ]}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
