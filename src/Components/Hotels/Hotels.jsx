import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/UseFetch";

function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");

  const rooms = JSON.parse(searchParams.get("options"))?.room;
  const { data, isLoading } = useFetch(
    "http://localhost:5000/hotels",
    `name_like=${destination || ""}&accommodates_gte=${rooms || 1}`
  );
  if (isLoading) <p>is loading...</p>;
  return <div>{data.length}</div>;
}

export default Hotels;
