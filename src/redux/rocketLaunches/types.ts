export enum Status {
  LOADING = "loading",
  ERROR = "error",
  SUCCESS = "success",
}

export interface ILaunchesSliceState {
  launches: Launch[];
  additionalInfo: null | Launch;
  status: Status;
}

export interface ILaunch {
  id: string;
}

export type LaunchesList = {
  count: number;
  next: string;
  previous: null;
  results: Array<Launch>;
};

export type Launch = {
  id: string;
  image: string;
  name: string;
  mission: {
    description: string;
    type: string;
  };
  status: {
    name: string;
  };
};
