import React, { useContext } from "react";

import { useState } from "react";
import { Badge, Drawer, AutoComplete } from "antd";
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  Heart,
  X,
  ChevronDown,
} from "lucide-react";
import { options } from "../lib/constants/SearchOptions";
import SearchContext from "../lib/context/SearchContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [dropDownValue, setDropDownValue] = useState("");
  const { setSearchValue } = useContext(SearchContext);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const handleSearch = () => {
    setSearchValue(dropDownValue);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="px-4 py-4 flex items-center justify-between">
        <button
          className="sm:hidden flex items-center"
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>

        <div className="text-xl font-bold">
          <a href="/">BRAND</a>
        </div>

        <nav className="hidden sm:flex items-center space-x-6 mx-4">
          <a href="#" className=" font-medium">
            Women
          </a>
          <a href="#" className=" font-medium">
            Men
          </a>
          <a href="#" className="font-medium">
            New Arrivals
          </a>
          <a href="#" className="font-medium">
            Sale
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <button
            className="hidden sm:block"
            onClick={toggleSearch}
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          <a href="/account" className="hidden sm:block" aria-label="Account">
            <User size={20} />
          </a>
          <a href="/wishlist" className="hidden sm:block" aria-label="Wishlist">
            <Heart size={20} />
          </a>
          <a href="/cart" className="relative" aria-label="Cart">
            <Badge count={3} size="small">
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
              <Search />
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
              <AutoComplete
                style={{ width: 200, textAlign: "start" }}
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
                <Search />
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              <div className=" pb-2">
                <a className="font-medium ">Women</a>
              </div>
              <div className=" pb-2">
                <a className="font-medium ">Men</a>
              </div>
              <div className="pb-2">
                <a href="#" className="font-medium">
                  New Arrivals
                </a>
              </div>
              <div>
                <a href="#" className="font-medium">
                  Sale
                </a>
              </div>
            </div>
          </div>
          <div className="mt-auto border-t">
            <div className="p-4 flex flex-col space-y-2">
              <a href="#" className="flex items-center gap-2">
                <User size={18} />
                <span>My Account</span>
              </a>
              <a href="#" className="flex items-center gap-2">
                <Heart size={18} />
                <span>Wishlist</span>
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
