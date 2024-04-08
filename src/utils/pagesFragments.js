export const fragment_SearchingTips = (
  commonSet,
  privateSet,
  setSettingsCommon,
  setSettingsPrivat
) => {
  const isPublic = window.location.pathname.includes("pub");
  const selectedCategory = isPublic
    ? commonSet.selectedCategorypub
    : commonSet.selectedCategorymy;
  const selectedCategoryName = selectedCategory ? selectedCategory.name : "";
  const categoryField = isPublic ? "selectedCategorypub" : "selectedCategorymy";

  const isSh = !isPublic && privateSet.shared;
  const isFav = !isPublic && privateSet.favorite;

  return (
    <>
      {/* {only && <h5>{only}</h5>} */}
      {(selectedCategoryName ||
        commonSet.filter ||
        isSh ||
        isFav ||
        commonSet.byCategory) && (
        <div className="search_result_box">
          <span className="searchResult">results for... </span>

          {commonSet.byCategory && (
            <button
              className="btn-x"
              onClick={() => setSettingsCommon("byCategory")}>
              show
              <span> by categories</span>
            </button>
          )}
          {isSh && !commonSet.byCategory && (
            <button
              className="btn-x"
              onClick={() => setSettingsPrivat("shared")}>
              only
              <span> shared</span>
            </button>
          )}
          {isFav && !commonSet.byCategory && (
            <button
              className="btn-x"
              onClick={() => setSettingsPrivat("favorite")}>
              only
              <span> favorite</span>
            </button>
          )}
          {selectedCategoryName && !commonSet.byCategory && (
            <button
              className="btn-x"
              onClick={() => setSettingsCommon(categoryField, "")}>
              category....
              <span> {selectedCategoryName}</span>
            </button>
          )}

          {commonSet.filter && (
            <button
              className="btn-x"
              onClick={() => setSettingsCommon("filter", "")}>
              text....
              <span> {commonSet.filter.toString()}</span>
            </button>
          )}
        </div>
      )}
    </>
  );
};
// ❎
