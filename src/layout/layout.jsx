import { useEffect, useState } from "react";
import { getListExpanses } from "../actions/expanses";
import { useDispatch, useSelector } from "react-redux";
import { AddExpanses } from "./add-expanses/add-expanses";
import "./layout.css";
import moment from "moment";
import "moment/locale/id";

export function Layout() {
  const { getListExpansesRes, getListExpansesLoading, getListExpansesError } =
    useSelector((state) => state.ExpansesReducer);
  const [showAddModal, setShowAddModal] = useState(false);
  const onOpenModal = (isOpen) => {
    setShowAddModal(isOpen)
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListExpanses());
  }, [dispatch]);

  return (
    <div className="body-layout">
      <h4 className="mx-auto text-center text-2xl font-bold mb-6 pt-8">
        Data Pengeluaran
      </h4>
      <div className="text-center mx-auto">
        <button
          className="rounded-full w-fit p-8 mx-auto text-center add-btn mb-4"
          onClick={() => setShowAddModal(true)}
        >
          Tambah pengeluaran
        </button>
        {showAddModal && (
          <div className="add-modal-expanses">
            <AddExpanses onOpenModal={onOpenModal} />
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-3 gap-4 mx-8">
        {getListExpansesRes ? (
          getListExpansesRes.map((expand) => {
            return (
              <div key={expand.id}>
                <div className="block p-6 max-w-sm card-expand bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900 dark:text-white">
                    {moment(expand.tanggal).locale("id").format("DD MMMM YYYY")}
                  </h5>
                  {expand.summary.map((dataSummary, i) => (
                    <div className="flex flex-col" key={i}>
                      <div className="flex justify-between">
                        <div className="flex">
                          <p>{moment(dataSummary.jam).format("LT")}</p>
                          <p className="ml-2">{dataSummary.nama}</p>
                        </div>
                        <p>
                          {"Rp " +
                            dataSummary.pengeluaran
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        </p>
                      </div>
                    </div>
                  ))}
                  <hr className="my-4" />
                  <div className="flex justify-between">
                    <p className="font-bold">Total</p>
                    <p className="font-bold">
                      {"Rp " +
                        expand.total
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                      }
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : getListExpansesLoading ? (
          <p>Loading ...</p>
        ) : (
          <p>{getListExpansesError ? getListExpansesError : "Data Kosong"}</p>
        )}
      </div>
    </div>
  );
}
