import { useMemo } from "react";
import {
  filterByCategory,
  getFiltredCollections,
} from "../utils/collectFilter";
import { sortByFieldC } from "../utils/arraysFunc";

const useSortedList = (list, sort) => {
  const sortedList = useMemo(() => {
    return sort
      ? sortByFieldC(list, sort.field, sort.isDec)
      : // sortByFieldC(list, sort < 3 ? "name" : "category", !(sort % 2))
        list;
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
