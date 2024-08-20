import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form
        className="d-flex search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        <div className="d-flex">
          <input
            className="form-control me-0 border border-1 border-secondary"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
            style={{
              borderTopLeftRadius: "20px",
              borderBottomLeftRadius: "20px",
            }} // Customizable corner radius
          />
          <button
            className="btn btn-outline-success"
            type="submit"
            style={{
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
            }} // Customizable corner radius
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
