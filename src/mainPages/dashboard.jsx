import React, { useEffect, useState } from "react";
import { BsCart, BsClockHistory } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { convert } from "rupiah-format";
import { getProductProcess, getKategoriProcess } from "../API/dash";

import Button from "../component/Button";
import Container from "../component/Container";
import Filter from "../component/filter";
import TextField from "../component/TextField";
import { getListProduct } from "../redux/action/dashAction";

function Dashboard() {
  const convertRupiah = require("rupiah-format");

  const navigate = useNavigate();
  const [ListKategori, setListKategori] = useState([]);
  const [Kategori, setKategori] = useState("");
  const [IsFetchProduct, setIsFetchProduct] = useState(true);
  const auth = useSelector((state) => state.authProcess);
  const handleChange = (e) => {
    // console.log(payload.email);
    console.log(payload.kategori);
    console.log(payload.keyword);
    e.preventDefault();
    setPayload((payload) => {
      return {
        ...payload,
        [e.target.name]: e.target.value,
      };
    });
    getProduct();
  };
  const [ListProduct, setListProduct] = useState([]);
  const [payload, setPayload] = useState({
    kategori: "",
    keyword: "",
    page: 1,
    keyword: "",
    lowest: "",
    highest: "",
  });
  const getProduct = async () => {
    try {
      setIsFetchProduct(true);
      const response = await getProductProcess(
        payload.kategori,
        payload.page,
        payload.keyword,
        payload.lowest,
        payload.highest
      );
      setListProduct(response.data.data.rows);
      console.log(response.data.data.rows);
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetchProduct(false);
    }
  };

  const getKategori = async () => {
    try {
      setIsFetchProduct(true);
      const response = await getKategoriProcess();
      setListKategori(response.data.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetchProduct(false);
    }
  };
  useEffect(() => {
    getProduct();
    getKategori();
  }, [payload.kategori]);
  var format = require("format-number");
  return (
    <div className="w-screen h-screen grid grid-cols-10 grid-rows-[8]">
      <Container className={"col-span-10 h-full py-5 grid grid-cols-3"}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getProduct();
          }}
        >
          <TextField
            label={"Search"}
            onChange={handleChange}
            name={"keyword"}
            value={payload.keyword}
          ></TextField>
        </form>
        <div className="flex justify-end space-x-5 items-center col-span-2">
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
          <div>
            <Button
              title={"Log Out"}
              onClick={() => {
                navigate("/login", { replace: true });
              }}
            />
          </div>
        </div>{" "}
      </Container>
      <Container className={"col-span-7 row-span-5 h-[595px] overflow-auto"}>
        {IsFetchProduct || ListProduct.length == 0 ? (
          <div className="w-full h-full flex justify-center items-center">
            <p className="animate-pulse">There's no such a product</p>
          </div>
        ) : (
          <div className="container grid grid-cols-3 gap-4">
            {ListProduct.map((items, index) => {
              const json = items.gambarProduk;
              const obj = JSON.parse(json);
              return (
                <a
                  className="hover:scale-[1.03] transition-all ease-in-out"
                  onClick={() => {
                    return navigate(`/product/detail/${items.uuid}`);
                  }}
                >
                  <Container
                    className={
                      "overflow-hidden grid grid-rows-6 px-0 py-0 cursor-pointer transition-all ease-in-out"
                    }
                  >
                    <div className="row-span-6 p-0">
                      <Container
                        className={
                          "h-[200px] border-x-0 border-t-0  border-b-2 overflow-hidden p-0 px-0 py-0"
                        }
                      >
                        <img
                          src={obj[0].gambar1}
                          alt=""
                          className="-translate-y-10 transform"
                        />
                      </Container>
                    </div>
                    <section className="px-5 py-5 space-y-3  w-72">
                      <div className="flex-row flex justify-between">
                        <p className="font-bold truncate text-ellipsis w-1/2">
                          {items.namaProduk}
                        </p>
                        <div className="flex space-x-2">
                          <FaStar className="text-orange-500" />
                          <p>{items.rating}</p>
                        </div>
                      </div>
                      <div className="flex-row flex justify-between">
                        <p className="underline">
                          {convertRupiah.convert(items.harga)}
                        </p>
                        <p className="opacity-50">Stock {items.stok}</p>
                      </div>
                      <div className=" ">
                        <p className="text-justify truncate text-ellipsis">
                          {items.deskripsi}
                        </p>
                      </div>
                    </section>
                  </Container>
                </a>
              );
            })}
          </div>
        )}
      </Container>
      <Container
        className={
          "col-span-3 grid grid-cols-2 w-full h-full px-0 py-0 p-0 border-2 items-center justify-center"
        }
      >
        <Container className="px-3 py-0 h-full">
          <label htmlFor="" className="justify-center flex w-full p-2">
            Kategori
          </label>
        </Container>
        <select
          className="border-2 border-main p-2 px-4 focus:outline-none"
          onChange={handleChange}
          name="kategori"
        >
          <option value="">Tampilkan Semua</option>
          {ListKategori.map((items, index) => {
            return (
              <option value={`${items.kategori}`}>{items.kategori}</option>
            );
          })}
        </select>
        <Container className={"col-span-2"}>
          <p>Filter Harga</p>
          <form action="" className=" space-y-5">
            <TextField
              label={"Terendah"}
              onChange={handleChange}
              name="lowest"
              value={payload.lowest}
            ></TextField>
            <TextField
              label={"Tertinggi"}
              onChange={handleChange}
              name="highest"
              value={payload.highest}
            ></TextField>
            <Button
              title={"Submit"}
              onClick={(e) => {
                e.preventDefault();
                getProduct();
              }}
            ></Button>
          </form>
        </Container>
      </Container>
    </div>
  );
}

export default Dashboard;
