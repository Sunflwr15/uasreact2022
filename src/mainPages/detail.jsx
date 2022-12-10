import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProductProcess, getKategoriProcess } from "../API/dash";

import Button from "../component/Button";
import Container from "../component/Container";
import Filter from "../component/filter";
import { getListProduct } from "../redux/action/dashAction";

function Detail() {
  const auth = useSelector((state) => state.authProcess);
  const navigate = useNavigate();
  const [ListProduct, setListProduct] = useState([]);
  const [ListKategori, setListKategori] = useState([]);
  const [IsFetchProduct, setIsFetchProduct] = useState(true);
  //   const [payload, setPayload] = React.useState({
  //     kategori: "",
  //     keyword: "",
  //     page: 1,
  //     keyword: "",
  //     lowest: 0,
  //     highest: 99999999 * 100,
  //   });
  const getProduct = async () => {
    try {
      setIsFetchProduct(true);
      const response = await getDetailProcess();
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
  }, []);

  return (
    <div className="w-screen h-screen grid grid-cols-10 grid-rows-[8]">
      <Container className={"col-span-10 h-full py-5 grid grid-cols-3"}>
        <div></div>
        <div></div>
        <div className="flex justify-end space-x-5 items-center">
          <div className="h-7 w-7 bg-second rounded-full" />
          <div className="flex flex-col">
            <p>{auth.name}</p>
            <p className="opacity-50">{auth.email}</p>
          </div>{" "}
          <Button
            title={"kembali"}
            onClick={() => {
              navigate("/login", { replace: true });
            }}
          />
        </div>{" "}
      </Container>
      <Container className={"col-span-7 row-span-5 h-[595px] overflow-auto"}>
        {IsFetchProduct ? (
          <p className="animate-pulse">Loading..</p>
        ) : (
          <div className="container grid grid-cols-2 gap-4">
            {ListProduct.map((items, index) => {
              // console.log(items);
              return (
                <div className="hover:scale-[1.03] transition-all ease-in-out">
                  <Container
                    className={
                      "overflow-hidden grid grid-rows-6 px-0 py-0 cursor-pointer transition-all ease-in-out"
                    }
                  >
                    <div className="row-span-6 p-0">
                      <Container
                        className={
                          "h-[200px] border-x-0 border-t-0  border-b-2"
                        }
                      >
                        <img src={items.gambarProduk} alt="" />
                      </Container>
                    </div>
                    <section className="px-5 py-5 space-y-3  w-72">
                      <div className="flex-row flex justify-between">
                        <p className="font-bold truncate text-clip">
                          {items.namaProduk}
                        </p>
                        {/* <p>${items}0.0</p> */}
                      </div>
                      <div className=" ">
                        <p className="text-justify truncate text-ellipsis">
                          {items.deskripsi}
                        </p>
                      </div>
                    </section>
                  </Container>
                </div>
              );
            })}
          </div>
        )}
      </Container>
      <Container
        className={
          "col-span-3 grid grid-cols-2 w-full h-full px-0 py-0 p-0 border-0"
        }
      >
        {ListKategori.map((items, index) => {
          // console.log(items);
          return (
            <Filter
              title={items.kategori}
              onClick={() => {
                setPayload({
                  kategori: {},
                  keyword: "",
                  page: 1,
                  keyword: "",
                  lowest: 0,
                  highest: 99999999 * 100,
                });
              }}
            />
          );
        })}
      </Container>
    </div>
  );
}

export default Detail;
