import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { convert } from "rupiah-format";
import {
  getProductProcess,
  getKategoriProcess,
  getDetailProcess,
  getCartProcess,
  deleteCartProcess,
  getHistoryProcess,
} from "../API/dash";

import Button from "../component/Button";
import Container from "../component/Container";
import Filter from "../component/filter";
import { getListProduct } from "../redux/action/dashAction";
import { FaArrowLeft, FaCartPlus, FaOpencart, FaStar } from "react-icons/fa";
import { BsArrowLeft, BsCart, BsClockHistory, BsTrash, BsTrashFill } from "react-icons/bs";

function History() {
  const convertRupiah = require("rupiah-format");
  const auth = useSelector((state) => state.authProcess);
  const navigate = useNavigate();
  const [ListProduct, setListProduct] = useState([]);
  const [IsFetchProduct, setIsFetchProduct] = useState(true);
  const count = 1;
  const [obj, setObj] = useState();
  const [payload, setPayload] = React.useState({
    id: "",
  });
  const getProduct = async () => {
    try {
      setIsFetchProduct(true);
      const response = await getHistoryProcess();
      setListProduct(response.data.data);
      console.log(response.data);
      setObj(obj);
      console.log(obj);
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetchProduct(false);
    }
  };

  useEffect(() => {
    getProduct();
    // getKategori();
  }, []);

  return (
    <div className="w-screen h-screen grid grid-cols-10 grid-rows-[8]">
      <Container className={"col-span-10 h-full py-5 grid grid-cols-3"}>
        <div></div>
        <div></div>
        <div className="flex justify-end space-x-5 items-center">
        <NavLink to="/cart">
            <BsCart className="text-xl" />
          </NavLink>
          <NavLink to="/history">
            <BsClockHistory className="text-xl" />
          </NavLink>
          <div className="flex items-center space-x-5">
            <div className="flex flex-col">
              <p>{auth.name}</p>
              <p className="opacity-50">{auth.email}</p>
            </div>{" "}
            <div className="h-7 w-7 bg-second rounded-full" />
          </div>
        </div>{" "}
      </Container>
      <Container
        className={"col-span-10 row-span-5 h-[595px] overflow-hidden gap-10"}
      >
        <div
          className="flex space-x-2 pb-5"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <BsArrowLeft className="text-black text-xl" />
          <p>back</p>
        </div>{" "}
        <p>Jumlah barang: {ListProduct.length}</p>
        {IsFetchProduct ? (
          <p className="animate-pulse">Loading..</p>
        ) : (
          <Container className="overflow-auto grid h-[500px] w-full space-y-3">
            {ListProduct.map((items, index) => {
              // const json = items?.produk?.gambarProduk;
              // const obj = JSON.parse(json);
              return (
                <Container
                  className={
                    "h-[150px] w-full border-main border-2 p-0 px-3 py-3 overflow-hidden grid grid-cols-5"
                  }
                >
                  <Container
                    className={"h-full w-1/2 self-center p-0 px-0 py-0"}
                  >
                    <img
                      // src={obj[0]?.gambar1}
                      alt=""
                      className="w-full h-full"
                    />
                  </Container>
                  <div className="grid grid-rows-2 w-full col-span-4">
                    <div className="flex-row justify-between flex ">
                      <div className="flex-col space-y-2">
                        <p className="uppercase">{items?.produk?.namaProduk}</p>
                        <p className="uppercase">{items?.createdAt}</p>
                      </div>{" "}
                      <p>{convertRupiah?.convert(items?.produk?.harga)}</p>
                    </div>
                  </div>
                </Container>
              );
            })}
          </Container>
        )}
      </Container>
    </div>
  );
}

export default History;
