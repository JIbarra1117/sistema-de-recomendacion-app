import React, { useState } from "react";
import ProductCard from "./Product_Card";
import { obtenerSiProductoEsMarcado } from "../utils/localDataUtil";

const PaginacionProductos = ({ productos }) => {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredProducts = productos.filter((product) =>
    product.modelo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredByPrice = filteredProducts.filter((product) => {
    const precio = parseFloat(product.precio);
    const min = minPrice === "" || parseFloat(minPrice) <= precio;
    const max = maxPrice === "" || parseFloat(maxPrice) >= precio;
    return min && max;
  });

  const currentItems = filteredByPrice.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredByPrice.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getPageNumbers = () => {
    const totalPages = Math.ceil(filteredByPrice.length / itemsPerPage);

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const leftBound = Math.max(1, currentPage - 2);
    const rightBound = Math.min(currentPage + 2, totalPages);

    const result = [];

    if (leftBound > 1) {
      result.push(1, "...");
    }

    for (let i = leftBound; i <= rightBound; i++) {
      result.push(i);
    }

    if (rightBound < totalPages) {
      result.push("...", totalPages);
    }

    return result;
  };
  return (
    <div className="max-w mx-auto">
      <h1 className="flex items-center text-5xl font-extrabold text-white animate-fade animate-ease-in-out p-6">
        Todos los productos
        {filteredByPrice ? (
          <span
            key={filteredByPrice.length}
            className="text-2xl font-semibold me-2 px-2.5 py-0.5 rounded bg-blue-200 text-blue-800 ms-2"
          >
            {filteredByPrice.length}
          </span>
        ) : (
          ""
        )}
      </h1>
      <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* Buscador */}
        <div className="relative flex items-center">
          {" "}
          {/**flex items-center border-t rounded-lg border-gray-200 bg-white py-3 sm:px-11 */}
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            id="search"
            name="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="search"
            className="block w-full h-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border "
            placeholder="Busca tu modelo preferido..."
            required
          />
        </div>

        {/* Filtros de precio */}
        <div className="grid grid-cols-2 gap-4 border-t rounded-lg border-gray-200 bg-white py-3 sm:px-11 p-2">
          {/* Precio mínimo */}
          <div className="items-center grid grid-cols-2">
            <label htmlFor="minPrice" className="mr-2">
              Precio mínimo:
            </label>
            <input
              type="number"
              id="minPrice"
              value={minPrice}
              min={0}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border p-1"
            />
          </div>

          {/* Precio máximo */}
          <div className="items-center grid grid-cols-2">
            <label htmlFor="maxPrice" className="mr-2">
              Precio máximo:
            </label>
            <input
              type="number"
              id="maxPrice"
              value={maxPrice}
              min={0}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border p-1"
            />
          </div>
        </div>
      </div>

      {filteredByPrice.length > 0 ? (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-4 animate-fade animate-ease-in-out"
          key={currentItems[0]?._id}
        >
          {currentItems.map((product) => (
            <div
              key={product?._id}
              className="flex items-center justify-center"
            >
              <div className="max-w-sm w-full">
                {product && (
                  <ProductCard
                    producto={product}
                    estado={obtenerSiProductoEsMarcado(product?._id)}
                    key={product?._id}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div class="bg-gray-900/25 rounded-xl h-96 animate-fade animate-ease-in-out">
          <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
            <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">
              Upps... No encontramos tu modelo " {searchTerm} "
            </h1>
            <p class="mb-8 text-lg font-normal  lg:text-xl sm:px-16 lg:px-48 text-gray-400">
              Intenta buscar otro modelo o ajustar el rango de precios.
            </p>
          </div>
        </div>
      )}
      <div className=" pt-6">
        <div className="flex rounded-lg items-center  border-t border-gray-200 bg-white py-3 sm:px-11">
          <div className="flex flex-1 justify-between sm:hidden">
            <a
              href="#"
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </a>
            <a
              href="#"
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </a>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Se muestran
                <span className="font-medium">
                  <> </>1 <> </>
                </span>
                a
                <span className="font-medium">
                  <> </>
                  {currentItems.length}
                  <> </>
                </span>
                de
                <span className="font-medium">
                  <> </>
                  {productos.length}
                  <> </>
                </span>
                productos
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {getPageNumbers().map((item, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      typeof item === "number" ? paginate(item) : null
                    }
                    className={
                      currentPage === item
                        ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    }
                    disabled={typeof item === "string"}
                  >
                    {item}
                  </button>
                ))}
                <button
                  onClick={nextPage}
                  disabled={
                    currentPage === Math.ceil(productos.length / itemsPerPage)
                  }
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginacionProductos;
