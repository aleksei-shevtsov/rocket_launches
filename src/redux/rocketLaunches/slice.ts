import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchLaunches,
  fetchAdditionalInfo,
  clearAdditionalInfo,
} from "./asyncActions";
import { Status, ILaunchesSliceState, LaunchesList, Launch } from "./types";

const initialState: ILaunchesSliceState = {
  launches: [],
  additionalInfo: null,
  status: Status.LOADING,
};

const rocketLaunches = createSlice({
  name: "rocketLaunches",
  initialState,
  reducers: {
    setLaunches(state, action: PayloadAction<LaunchesList>) {
      state.launches = action.payload.results;
    },
    setAdditionalInfo(state, action: PayloadAction<any>) {
      state.additionalInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLaunches.pending, (state) => {
      state.status = Status.LOADING;
      state.launches = [];
    });
    builder.addCase(
      fetchLaunches.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = Status.SUCCESS;
        state.launches = [
          ...action.payload.results.map((result: Launch) => {
            return { ...result };
          }),
        ];
      }
    );
    builder.addCase(fetchLaunches.rejected, (state) => {
      state.status = Status.ERROR;
      state.launches = [];
    });
    builder.addCase(fetchAdditionalInfo.pending, (state) => {
      state.additionalInfo = null;
    });
    builder.addCase(
      fetchAdditionalInfo.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.additionalInfo = action.payload;
      }
    );
    builder.addCase(fetchAdditionalInfo.rejected, (state) => {
      state.additionalInfo = null;
    });
  },
});

export const { setLaunches, setAdditionalInfo } = rocketLaunches.actions;

export default rocketLaunches.reducer;
