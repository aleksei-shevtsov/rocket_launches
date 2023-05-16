import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./../redux/hooks";
import { fetchLaunches } from "../redux/rocketLaunches/asyncActions";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useAppDispatch();
  const { launches, status } = useAppSelector((state) => state.rocketLaunches);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      await dispatch(fetchLaunches());
    } catch (error) {
      alert("Error while receiving the data!");
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="container">
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <>
            {status !== "error" && launches.length > 0 ? (
              launches.map((launch: any) => (
                <Link
                  to={`/detail/${launch.id}`}
                  key={launch.id}
                  className="title"
                >
                  {launch.name}
                </Link>
              ))
            ) : (
              <div>Error while receiving the data!</div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Home;
