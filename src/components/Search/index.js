import React, { useRef, useState, useEffect } from "react";
import { Input, Row, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const SearchBar = ({ onSearch, value }) => {
  const { Option } = Select;

  const typingTimeoutRef = useRef(null);
  const [searchKey, setSearchKey] = useState("");
  const handleChange = (e) => {
    setSearchKey(e);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    if (e === "") {
      onSearch(e);
      return;
    }
    typingTimeoutRef.current = setTimeout(() => onSearch(e), 1000);
  };
  useEffect(() => {
    setSearchKey(value);
  }, [value]);
  return (
    <Row style={{ justifyContent: "center" }}>
      <Input
        className="search-cocktail"
        addonBefore={<SearchOutlined />}
        placeholder="input search text"
        value={searchKey}
        allowClear
        onChange={(e)=>handleChange(e.target.value)}
      />
    </Row>
  );
};

export default SearchBar;
