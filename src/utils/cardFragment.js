import { getImgA, getImgQ } from "./contentRequests";
import { fontS } from "./texts";
//mode 0 - question is on the front
//mode 1 - question is on the back
export const mainAndImg = (side, mode, item, cl) => {
  let variant = side + mode;
  let note = item.note ? item.note.trim() : "";
  return (
    <>
      <div className={cl["card-" + side]}>
        {variant === "front0" || variant === "back1" ? (
          <>
            {item.imgQ && <img src={getImgQ(item)} alt="" />}
            <h1 style={fontS([item.question, item.imgQ])}>{item.question}</h1>
          </>
        ) : note ? (
          <div className={cl["div-note"]}>
            {item.note && <p className={cl["card-note"]}>{item.note}</p>}
            <div className="d-flex justify-content-center ">
              {item.imgA && <img src={getImgA(item)} alt="" />}
              <h1 style={fontS([item.answer, item.imgA])}>{item.answer}</h1>
            </div>
          </div>
        ) : (
          <>
            {item.imgA && <img src={getImgA(item)} alt="" />}
            <h1 style={fontS([item.answer, item.imgA])}>{item.answer}</h1>
          </>
        )}
      </div>
    </>
  );
};
