import React, { useContext } from "react";

import { useState } from "react";
import { Badge, Drawer, AutoComplete } from "antd";
import { ShoppingCart, User, Search, Menu } from "lucide-react";
import { options } from "../lib/constants/SearchOptions";
import SearchContext from "../lib/context/SearchContext";
import AuthContext from "../lib/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTotalItems } from "../lib/store/cartSlice";

const Header = ({ showNav = true, showSearch = true }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [dropDownValue, setDropDownValue] = useState("");
  const { setSearchValue } = useContext(SearchContext);
  const { setIsAuthenticated } = useContext(AuthContext);
  const totalItems = useSelector(selectTotalItems);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const categoryMap = {
    Women: "women's clothing",
    Men: "men's clothing",
    electronics: "electronics",
    jewelery: "jewelery",
  };

  const handleCategoryClick = (category) => {
    const searchValue = categoryMap[category];
    setSearchValue(searchValue);
    setDropDownValue(category);
    setSearchVisible(false);
    setMobileMenuOpen(false);
  };

  const handleSearch = () => {
    setSearchValue(dropDownValue);
    setSearchVisible(false);
    setMobileMenuOpen(false);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userAuthToken");
    setIsAuthenticated(false);
    navigate("/signin");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="px-4 py-4 flex items-center justify-between">
        <button
          className="sm:hidden flex items-center cursor-pointer"
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>

        <div className="text-xl font-bold">
          <a href="/">BRAND</a>
        </div>
        {showNav && (
          <nav className="hidden sm:flex items-center space-x-6 mx-4">
            {["Women", "Men", "electronics", "jewelery"].map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="cursor-pointer font-medium capitalize hover:underline"
              >
                {category}
              </button>
            ))}
          </nav>
        )}
        <div className="flex items-center space-x-4">
          <button
            className="hidden sm:block"
            onClick={toggleSearch}
            aria-label="Search"
          >
            {showSearch && <Search size={20} />}
          </button>
          <div className="relative group">
            <a href="/account" className="hidden sm:block" aria-label="Account">
              <User size={20} />
            </a>

            <div className="absolute right-0 mt-2 w-40 rounded-xl bg-white shadow-lg border border-gray-200 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="flex flex-col p-4 space-y-2 text-sm text-gray-700">
                <a
                  href="/account"
                  className="px-3 py-2 rounded-md hover:bg-gray-100 transition"
                >
                  My Account
                </a>
                <button
                  onClick={handleLogout}
                  className="text-left px-3 py-2 rounded-md hover:bg-red-100 transition text-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          <a href="/cart" className="relative" aria-label="Cart">
            <Badge count={totalItems} size="small">
              <ShoppingCart size={20} />
            </Badge>
          </a>
        </div>
      </div>

      {searchVisible && (
        <div className="px-4 py-3 border-t">
          <div className="relative flex items-center gap-2">
            <AutoComplete
              style={{ width: 500, textAlign: "start" }}
              options={options}
              placeholder="Search for clothing"
              value={dropDownValue}
              onChange={(value) => setDropDownValue(value)}
              filterOption={(inputValue, option) =>
                option &&
                option.value &&
                option.value.toUpperCase().includes(inputValue.toUpperCase())
              }
            />
            <button type="button" onClick={handleSearch}>
              <a href="#products">
                <Search />
              </a>
            </button>
          </div>
        </div>
      )}

      <Drawer
        title="Menu"
        placement="left"
        onClose={toggleMobileMenu}
        open={mobileMenuOpen}
        width={280}
        bodyStyle={{ padding: 0 }}
      >
        <div className="flex flex-col h-full">
          <div className="p-4">
            <div className="flex justify-center items-center gap-2 mb-5">
              {showSearch && (
                <>
                  <AutoComplete
                    style={{ width: 200, textAlign: "start" }}
                    options={options}
                    placeholder="Search for clothing"
                    value={dropDownValue}
                    onChange={(value) => setDropDownValue(value)}
                    filterOption={(inputValue, option) =>
                      option &&
                      option.value &&
                      option.value
                        .toUpperCase()
                        .includes(inputValue.toUpperCase())
                    }
                  />

                  <button type="button" onClick={handleSearch}>
                    <Search />
                  </button>
                </>
              )}
            </div>

            <div className="flex flex-col space-y-4">
              {["Women", "Men", "electronics", "jewelery"].map((category) => (
                <div className="pb-2" key={category}>
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className="cursor-pointer font-medium capitalize"
                  >
                    {category}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-auto border-t">
            <div className="p-4 flex flex-col space-y-2">
              <a href="#" className="flex items-center gap-2">
                <User size={18} />
                <span>My Account</span>
              </a>
              <a href="#" className="flex items-center gap-2">
                <ShoppingCart size={18} />
                <span>Cart (3)</span>
              </a>
            </div>
          </div>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;
