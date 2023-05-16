import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchAdditionalInfo } from "../redux/rocketLaunches/asyncActions";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useAppSelector } from "../redux/hooks";

function Detail() {
  const { id } = useParams();
  const { additionalInfo } = useAppSelector((state) => state.rocketLaunches);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(fetchAdditionalInfo(id!));
    } catch (error) {
      alert("Error while receiving the data!");
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="container">
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <>
          {additionalInfo && (
            <>
              <h2 className="header-details">Details</h2>
              <div className="container-detail">
                {additionalInfo.image ? (
                  <div className="image">
                    <img src={additionalInfo.image} alt="Launch image" />
                  </div>
                ) : null}
                <div>
                  <b>Name:</b> {additionalInfo.name}
                </div>
                <div>
                  <b>Mission:</b> {additionalInfo.mission.description}
                </div>
                <div>
                  <b>Mission type:</b> {additionalInfo.mission.type}
                </div>
                <div>
                  <b>Status:</b> {additionalInfo.status.name}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Detail;
