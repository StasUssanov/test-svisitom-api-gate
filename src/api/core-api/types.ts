import { TCommon } from '../api-client';

type TStatusDto = {
  uuid: String;
  serialNumber?: String;
  name?: String;
  date?: String;
  status?: Boolean;
}

export type TCoreRequest = {
  status?: TStatusDto,
  statuses?: TStatusDto[],
}

export type TCoreResponse = {
  uuid: String;
  serialNumber?: String;
  name?: String;
  date?: String;
  status?: Boolean;
}

export type TCoreStatusResponse = TCommon & {
  data?: TCoreResponse;
}

export type TCoreStatusesResponse = TCommon & {
  data?: TCoreResponse[];
}

