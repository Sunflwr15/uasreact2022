import React from "react";
import Container from "../component/Container";

function Dashboard() {
  return (
    <div className="w-screen h-screen grid grid-cols-10 grid-rows-[8]">
      <Container className={"col-span-10 h-full"}></Container>
      <Container className={"col-span-7 row-span-5 h-[595px] overflow-auto"}>
        <div className="container grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((items, index) => {
            return (
              <div className="hover:scale-[1.03] transition-all ease-in-out">
                <Container
                  className={
                    "grid grid-rows-6 p-0 py-0 cursor-pointer  transition-all ease-in-out"
                  }
                >
                  <div className="row-span-6 p-0">
                    <Container
                      className={"h-[200px] border-x-0 border-t-0  border-b-2"}
                    ></Container>
                  </div>
                  <section className="px-5 py-5 space-y-3">
                    <div className="flex-row flex justify-between">
                      <p className="font-bold"> Title {items}</p>
                      <p>${items}0.0</p>
                    </div>
                    <div className="">
                      <p className="text-justify ">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Tenetur id, officiis odit accusantium obcaecati iste
                      </p>
                    </div>
                  </section>
                </Container>
              </div>
            );
          })}
        </div>
      </Container>
      <Container
        className={"col-span-3 grid grid-rows-[9] row-span-6 h-full p-0"}
      >
        <Container
          className={
            "grid grid-cols-3 row-span-1 justify-between p-0 py-0 w-full border-x-0"
          }
        >
          <div className="col-span-1 justify-center items-center flex">
            <p className="text-md font-bold">Filter</p>
          </div>
          <Container className="col-span-2 py-5 border-y-0 flex justify-center items-center">
            <p>Harga</p>
          </Container>
        </Container>
      </Container>
    </div>
  );
}

export default Dashboard;
