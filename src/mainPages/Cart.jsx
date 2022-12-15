import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { convert } from "rupiah-format";
import {
  getProductProcess,
  getKategoriProcess,
  getDetailProcess,
  getCartProcess,
  deleteCartProcess,
  postBuyProcess,
} from "../API/dash";

import Button from "../component/Button";
import Container from "../component/Container";
import Filter from "../component/filter";
import {
  buyNowProcess,
  getListProduct,
  putProcess,
} from "../redux/action/dashAction";
import { FaArrowLeft, FaCartPlus, FaOpencart, FaStar } from "react-icons/fa";
import {
  BsArrowLeft,
  BsCart,
  BsClockHistory,
  BsTrash,
  BsTrashFill,
} from "react-icons/bs";
import Swal from "sweetalert2";

function Cart() {
  const dispatch = useDispatch();
  const convertRupiah = require("rupiah-format");
  const auth = useSelector((state) => state.authProcess);
  const navigate = useNavigate();
  const [ListProduct, setListProduct] = useState([]);
  const [payload, setPayload] = React.useState([]);
  const [total, setTotal] = React.useState();
  const [count, setCount] = React.useState(1);
  const [obj, setObj] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const getProduct = async () => {
    try {
      const response = await getCartProcess();
      setListProduct(response.data.data);
      setPayload(response.data);
      console.log(response.data);
      setObj(obj);
      console.log(obj);

      // console.log(payload);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };
  const buyNow = async () => {
    console.log("Udah di set", payload);
    try {
      console.log("Jalan Buy");
      const response = await dispatch(postBuyProcess(payload));
      console.log("RES", response);
      return;
    } catch (error) {}
  };
  const deleteProduct = async (id) => {
    // e.preventDefault();
    try {
      const response = await deleteCartProcess(id);
      console.log(response);
      getProduct();
    } catch (error) {
    } finally {
    }
  };
  const countProduct = async (id, jumlah) => {
    try {
      const response = await dispatch(putProcess(total));
      setTotal({
        id: id,
        jumlah: jumlah,
      });
    } catch (error) {}
  };

  let array = ListProduct.map((value) => value?.produk?.harga * value.jumlah);
  const hasil = array.reduce((total, currentValue) => total + currentValue, 0);
  console.log("hasil =>", hasil);
  useEffect(() => {
    getProduct();
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
        <div className="grid-cols-5 grid">
          <div className="flex flex-col col-span-4">
            <p className="">Jumlah barang: {ListProduct.length}</p>
            <p className="">Total Harga: {convertRupiah.convert(hasil)}</p>
          </div>
          <Button
            className="h-full w-full"
            title={"Checkout"}
            onClick={() => {
              // console.log("Belum di set", payload);
              buyNow();
              getProduct();
            }}
          >
            {" "}
          </Button>
        </div>
        {ListProduct.length == 0 ? (
          <Container className="overflow-auto grid h-[500px] w-full space-y-3">
            <p>No Items</p>
          </Container>
        ) : (
          <Container className="overflow-auto grid h-[500px] w-full space-y-3">
            {ListProduct.map((items, index) => {
              const json = items.produk.gambarProduk;
              const obj = JSON.parse(json);
              const handleKurang = () => {
                if (items.jumlah <= 1) {
                  return deleteProduct(items.id);
                } else {
                  countProduct(items.id, items.jumlah--);
                }
                // getProduct();
              };
              const handleTambah = () => {
                if (items.jumlah === -1) {
                  return;
                } else {
                  countProduct(items.id, items.jumlah++);
                } // getProduct();
              };
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
                      src={obj[0].gambar1}
                      alt=""
                      className="w-full h-full"
                    />
                  </Container>
                  <div className="grid grid-rows-2 w-full col-span-3">
                    <div className="flex-row justify-between flex ">
                      <p className="uppercase">{items.produk.namaProduk}</p>
                      <p>{convertRupiah.convert(items.produk.harga)}</p>
                    </div>
                    <div className="flex-row justify-between flex">
                      <div className="flex-row flex items-center space-x-10">
                        <Button title={"+"} onClick={handleTambah}></Button>

                        <p>{items.jumlah}</p>

                        <Button title={"-"} onClick={handleKurang}></Button>
                      </div>{" "}
                      <p className="self-end text-main">
                        {convertRupiah.convert(
                          items.produk.harga * items.jumlah
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="pl-5 w-full h-full justify-end flex flex-row gap-3">
                    <Button
                      className="h-full w-1/2"
                      title={<BsTrashFill className={""}></BsTrashFill>}
                      onClick={() => {
                        deleteProduct(items.id);
                      }}
                    >
                      {" "}
                    </Button>
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

export default Cart;
