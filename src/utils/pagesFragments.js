export const fragment_SearchingTips = ({
  selectedCategorypub,
  selectedCategorymy,
  filter,
  byCategory,
  setSettingsCommon,
}) => {
  const isPublic = window.location.pathname.includes("pub");
  const selectedCategory = isPublic ? selectedCategorypub : selectedCategorymy;
  const selectedCategoryName = selectedCategory ? selectedCategory.name : "";
  const categoryField = isPublic ? "selectedCategorypub" : "selectedCategorymy";

  return (
    <>
      <h2 className="text-end contrastColor">
        {(isPublic ? "PUBLIC " : "MY ") +
          (byCategory ? "CATEGORIES" : "COLLECTIONS")}
      </h2>

      {(selectedCategoryName || filter) && (
        <div className="fs-2 mt-2 fst-italic contrastColor">
          <span>- Search results for</span>

          {selectedCategoryName && (
            <>
              <button
                className="btn-x  ms-3 fs-2 mt-2 fst-italic"
                onClick={() => setSettingsCommon(categoryField, "")}>
                ❎ category....
                <span className=" text-primary "> {selectedCategoryName}</span>
              </button>
            </>
          )}
          {filter && (
            <>
              <button
                className="btn-x  ms-3 fs-2 mt-2 fst-italic"
                onClick={() => setSettingsCommon("filter", "")}>
                ❎ text....
                <span className=" text-primary "> {filter.toString()}</span>
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};
