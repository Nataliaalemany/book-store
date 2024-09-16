import { SearchByType } from './SearchBy.type';

export type Params = {
  type: SearchByType;
  query: string;
  pageNumber: string;
};
