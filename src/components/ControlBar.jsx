import { useState } from "react";
import "./styles/ControlBar.css";

export function ControlBar({ searchParams, setSearchParams, isLoading }) {
  const page = searchParams.get("page");

  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newParams = new URLSearchParams(searchParams);
    newParams.set("searchTerm", searchTerm);
    setSearchParams(newParams);
  }

  return (
    <div className="control-bar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search" title="search"></label>
        <input
          value={searchTerm}
          id="search"
          title="search"
          name="search"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        ></input>

        <button type="submit">Search</button>
      </form>
      <button
        className="control-button"
        disabled={isLoading || page === "1"}
        onClick={() => {
          const newParams = new URLSearchParams(searchParams);
          newParams.set("page", Number(page) - 1);
          setSearchParams(newParams);
        }}
      >
        Prev
      </button>
      <button
        className="control-button"
        disabled={isLoading}
        onClick={() => {
          const page = searchParams.get("page");
          const newParams = new URLSearchParams(searchParams);
          newParams.set("page", Number(page) + 1);
          setSearchParams(newParams);
        }}
      >
        Next
      </button>
    </div>
  );
}
