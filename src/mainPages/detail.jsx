import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { convert } from "rupiah-format";

import {
  getProductProcess,
  getKategoriProcess,
  getDetailProcess,
  postCartProcess,
  postBuyProcess,
} from "../API/dash";

import Button from "../component/Button";
import Container from "../component/Container";
import Filter from "../component/filter";
import {
  addToCartProcess,
  getListProduct,
  postProductProduct,
} from "../redux/action/dashAction";
import { FaArrowLeft, FaCartPlus, FaOpencart, FaStar } from "react-icons/fa";
import { BsArrowLeft, BsCart, BsClockHistory } from "react-icons/bs";
import Swal from "sweetalert2";

function Detail() {
  let dispatch = useDispatch();

  const convertRupiah = require("rupiah-format");
  const { uuid } = useParams();
  const auth = useSelector((state) => state.authProcess);
  const navigate = useNavigate();
  const [ListProduct, setListProduct] = useState([]);
  const [obj, setObj] = useState();
  const [IsFetchProduct, setIsFetchProduct] = useState(true);
  const [payload, setPayload] = React.useState({
    data: [
      {
        id: 2,
        produkId: "",
        jumlah: 1,
        userId: 1,
        createdAt: "",
        updatedAt: "",
        produk: {
          namaProduk: "",
          harga: "",
          stok: 34,
          rating: "",
          gambarProduk: "",
        },
      },
    ],
  });
  const [ProdukId, setProdukId] = useState({
    produkId: "",
  });
  const addToCart = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(addToCartProcess(ProdukId));
      console.log(response);
      if (response.data.status === "Success") {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: response.data.msg,
        });
      }
      return;
    } catch (error) {}
  };
  const buyNow = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(postBuyProcess(payload));
      console.log(response);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Transaksi Berhasil",
      });

      return;
    } catch (error) {}
  };

  const getProduct = async () => {
    try {
      setIsFetchProduct(true);
      const response = await getDetailProcess(uuid);
      setListProduct(response.data.data);
      console.log(response.data.data);
      setProdukId({
        produkId: response.data.data.id,
      });
      setPayload({
        data: [
          {
            id: response.data.data.id,
            produkId: response.data.data.id,
            jumlah: 1,
            userId: 1,
            createdAt: response.data.data.createdAt,
            updatedAt: response.data.data.updatedAt,
            produk: {
              namaProduk: response.data.data.namaProduk,
              harga: response.data.data.harga,
              stok: response.data.data.stok,
              rating: response.data.data.rating,
              gambarProduk: response.data.data.gambarProduk,
            },
          },
        ],
      });

      console.log(payload);
      console.log(ListProduct);

      const json = response.data.data.gambarProduk;
      const obj = JSON.parse(json);
      setObj(obj);
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
          className="flex space-x-2 pb-5 cursor-pointer"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <BsArrowLeft className="text-black text-xl" />
          <p>back</p>
        </div>{" "}
        {IsFetchProduct ? (
          <p className="animate-pulse">Loading..</p>
        ) : (
          <div className="container grid grid-cols-2 h-full w-full gap-16">
            <Container
              className={
                "h-[80%] w-full border-main border-2 p-0 px-0 py-0 overflow-hidden"
              }
            >
              <img src={obj[0].gambar1} alt="" className="w-full h-full" />
            </Container>

            <section className="px-5 h-full w-full justify-between flex-col space-y-10">
              <div className="space-y-10 ">
                <div>
                  <div className="flex flex-row justify-between">
                    <p className="font-bold uppercase">
                      {ListProduct.namaProduk}
                    </p>
                    <div className="flex space-x-2">
                      <FaStar className="text-orange-500" />
                      <p>{ListProduct.rating}</p>
                    </div>
                  </div>{" "}
                  <p className="font-medium underline">
                    {convertRupiah.convert(ListProduct.harga)}
                  </p>
                </div>
                <div className="">
                  <p className="font-bold">Deskripsi</p>
                  <p className="text-justify">{ListProduct.deskripsi}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 self-end">
                <Button title={"Add to Cart"} onClick={addToCart}></Button>
                <Button title={"Buy Now"} onClick={buyNow}></Button>
              </div>{" "}
            </section>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Detail;
