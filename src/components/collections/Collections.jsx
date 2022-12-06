import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CollectionsMenu from "./CollectionsMenu";
import PublicCollections from "./publicC/PublicCollections";
import CollectionEditModal from "./usersC/CollectionEditModal";
import UsersCollections from "./usersC/UsersCollections";

const Collections = () => {
  console.log("load");
  console.log(window.location);

  console.log(window.location.pathname.includes("pub"));

  const router = useNavigate();

  const [selectedCategory, setselectedCategory] = useState("");
  const [filter, setFilter] = useState("");
  const [isNew, setIsNew] = useState(false);

  const [viewmode, setViewmode] = useState(
    window.location.hash === "#1" ? "1" : "0"
  );
  const viewmodeChange = () => {
    let newVal = 1 - viewmode;
    setViewmode(newVal);
    router(window.location.pathname + "#" + newVal);
  };

  useEffect(() => {
    setViewmode(window.location.hash === "#1" ? "1" : "0");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(viewmode);

  return (
    <div>
      {isNew && (
        <CollectionEditModal
          isEdit={isNew}
          setIsEdit={setIsNew}
          isNew={isNew}
          onHide={() => {
            setIsNew(false);
            router(`/collections/my#${viewmode}`);
          }}
        />
      )}
      <CollectionsMenu
        viewmodeChange={viewmodeChange}
        isPublic={window.location.pathname.includes("pub")}
        isNew={isNew}
        setIsNew={setIsNew}
        selectedCategory={selectedCategory}
        filter={filter}
        setFilter={setFilter}
        setselectedCategory={setselectedCategory}
      />
      {(selectedCategory || filter) && (
        <div className="fs-4 mt-2 fst-italic">
          Search results for {selectedCategory && " category..."}
          <span className="text-primary">{selectedCategory.name}</span>
          {filter && " text..."}
          <span className="text-primary">{filter.toString()}</span>
        </div>
      )}
      <div>
        {!window.location.pathname.includes("pub") ? (
          <UsersCollections
            selectedCategory={selectedCategory}
            filter={filter}
            viewmode={viewmode}
            isNew={isNew}
          />
        ) : (
          <PublicCollections
            selectedCategory={selectedCategory}
            filter={filter}
            viewmode={viewmode}
          />
        )}
      </div>
    </div>
  );
};

export default Collections;
