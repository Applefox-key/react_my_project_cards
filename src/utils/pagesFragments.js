export const fragment_SearchingTips = (
  commonSet,
  privateSet,
  setSettingsCommon
) => {
  const isPublic = window.location.pathname.includes("pub");
  const selectedCategory = isPublic
    ? commonSet.selectedCategorypub
    : commonSet.selectedCategorymy;
  const selectedCategoryName = selectedCategory ? selectedCategory.name : "";
  const categoryField = isPublic ? "selectedCategorypub" : "selectedCategorymy";
  let only = privateSet.shared ? "only shared" : "";
  only += privateSet.favorite
    ? only === ""
      ? "only favorite"
      : ", only favorite"
    : "";
  return (
    <>
      <h5>{only}</h5>
      {(selectedCategoryName || commonSet.filter) && (
        <div className="serch_result_box">
          <span className="searchResult">search results for... </span>

          {selectedCategoryName && (
            <>
              <button
                className="btn-x"
                onClick={() => setSettingsCommon(categoryField, "")}>
                ❎ category....
                <span className=" text-primary "> {selectedCategoryName}</span>
              </button>
            </>
          )}
          {commonSet.filter && (
            <>
              <button
                className="btn-x"
                onClick={() => setSettingsCommon("filter", "")}>
                ❎ text....
                <span className=" text-primary ">
                  {" "}
                  {commonSet.filter.toString()}
                </span>
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};
