import { useMemo } from "react";
import {
  filterByCategory,
  getFiltredCollections,
} from "../utils/collectFilter";

const useSortedList = (list, sort) => {
  const sortedList = useMemo(() => {
    return sort
      ? [...list].sort((a, b) => a[sort].localeCompare(b[sort]))
      : list;
  }, [sort, list]);

  return sortedList;
};

const useCategoryFilter = (list, category) => {
  const filtred = useMemo(() => {
    return filterByCategory(list, category);
  }, [list, category]);

  return filtred;
};
export const useTextFilter = (list, textFilter) => {
  const filtred = useMemo(() => {
    if (textFilter) return getFiltredCollections(list, textFilter);
    else return list;
  }, [list, textFilter]);
  return filtred;
};

export const useCollectSelection = (list, category, filter = "", sort = "") => {
  const filtredByCategory = useCategoryFilter(list, category);
  const filtredByTextFiler = useTextFilter(filtredByCategory, filter);
  const sortedFilrderList = useSortedList(filtredByTextFiler, sort);
  return sortedFilrderList;
};
