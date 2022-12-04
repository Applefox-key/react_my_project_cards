import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ToggleBtnGroup from "../UI/ToggleBtnGroup";
import CollectionsMenu from "./CollectionsMenu";
import PublicCollections from "./publicC/PublicCollections";
import CollectionEditModal from "./usersC/CollectionEditModal";
import UsersCollections from "./usersC/UsersCollections";

const Collections = () => {
  const router = useNavigate();
  const page = useParams();

  const [isPublic, setisPublic] = useState(page.tab === "pub");
  const [isNew, setIsNew] = useState(false);
  const [filter, setFilter] = useState("");
  const [selectedCategory, setselectedCategory] = useState("");
  const [viewmode, setViewmode] = useState(
    window.location.hash === "#2" ? "2" : "1"
  );
  const viewmodeChange = (event) => {
    setViewmode(event.target.value);
    router(`/collections/${isPublic ? "pub#" : "my#"}${event.target.value}`);
  };
  const TabChange = (event) => {
    setisPublic(event.target.value === "2");
    router(
      `/collections/${event.target.value === "2" ? "pub#" : "my#"}${viewmode}`
    );
  };

  useEffect(() => {
    setViewmode(window.location.hash === "#2" ? "2" : "1");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
      <div className="d-flex">
        <ToggleBtnGroup
          checked={isPublic ? 2 : 1}
          className="w-100"
          // value={isPublic ? "2" : "1"}
          name="isPubl"
          size="lg"
          arr={["MY COLLECTIONS", "PUBLIC COLLECTIONS"]}
          onChange={TabChange}
        />
      </div>

      <CollectionsMenu
        viewmodeChange={viewmodeChange}
        isPublic={isPublic}
        isNew={isNew}
        setIsNew={setIsNew}
        selectedCategory={selectedCategory}
        filter={filter}
        setFilter={setFilter}
        setselectedCategory={setselectedCategory}
      />
      <div>
        {!isPublic ? (
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
