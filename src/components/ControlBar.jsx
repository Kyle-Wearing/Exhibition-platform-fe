import "./styles/ControlBar.css";

export function ControlBar({ searchParams, setSearchParams, isLoading }) {
  const page = searchParams.get("page");
  return (
    <div className="control-bar">
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
