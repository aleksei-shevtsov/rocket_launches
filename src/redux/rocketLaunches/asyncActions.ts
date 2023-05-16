import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Launch } from "./types";

export const fetchLaunches = createAsyncThunk(
  "rocketLaunches/fetchLaunches",
  async () => {
    try {
      const { data } = await axios.get(
        "https://lldev.thespacedevs.com/2.2.0/launch/?mode=list"
      );
      return data;
    } catch (error) {
      throw new Error("Error while receiving the data!");
    }
  }
);

export const fetchAdditionalInfo = createAsyncThunk(
  "rocketLaunches/fetchAdditionalInfo",
  async (launchId: string) => {
    try {
      const { data } = await axios.get(
        "https://lldev.thespacedevs.com/2.2.0/launch/" +
          launchId +
          "?mode=detailed"
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const clearAdditionalInfo = createAction(
  "rocketLaunches/clearAdditionalInfo"
);
