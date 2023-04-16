import { getImgA, getImgQ } from "./contentRequests";
import { fontPrint, fontS } from "./texts";
//main card content back and front
//mode 0 - question is on the front
//mode 1 - question is on the back
const cardContent = (item, part, cl) => {
  let tx = part === "answer" ? item.answer : item.question;
  let im = part === "answer" ? item.imgA : item.imgQ;

  return (
    <>
      {im && (
        <img
          src={part === "answer" ? getImgA(item) : getImgQ(item)}
          className={tx ? cl["img_float"] : cl["mwh-100"]}
          alt=""
        />
      )}
      {tx && <h1 className={fontS([tx, im])}>{tx}</h1>}
    </>
  );
};
//main card back and front
export const mainAndImg = (side, mode, item, cl) => {
  let variant = side + mode;
  let note = item.note ? item.note.trim() : "";
  let isFlex =
    variant === "front0" || variant === "back1" ? !item.question : !item.answer;
  let mainDivClass = isFlex
    ? "d-flex justify-content-center w-100 h-100"
    : "mw-100 mh-100";

  return (
    <>
      <div className={cl["card-" + side]}>
        <div className={mainDivClass}>
          {variant === "front0" || variant === "back1" ? (
            <>{cardContent(item, "question", cl)}</>
          ) : note ? (
            <div className={cl["div-note"]}>
              {item.note && <p className={cl["card-note"]}>{item.note}</p>}
              <div className="d-flex justify-content-center ">
                <>{cardContent(item, "answer", cl)}</>
              </div>
            </div>
          ) : (
            <>{cardContent(item, "answer", cl)}</>
          )}
        </div>
      </div>
    </>
  );
};

//____________________________________________PRINTING CARD
//printing card little fragment
export const oneElemVertical = (el, part) => {
  let im = part === "question" ? el.imgQ : el.imgA;
  let tx = part === "question" ? el.question : el.answer;
  let classMinHeight = im ? " minHeightImg" : "";
  let classJustify = tx ? "" : " justify-content-center";
  return (
    <div className={"print_part " + part + classMinHeight + classJustify}>
      <div className="mw-100 mh-100">
        {im && (
          <img src={part === "question" ? getImgQ(el) : getImgA(el)} alt="" />
        )}
        {tx}
      </div>
    </div>
  );
};

export const oneElemHorizontal = (el, part) => {
  let im = part === "question" ? el.imgQ : el.imgA;
  let tx = part === "question" ? el.question : el.answer;
  return (
    <div className={"print_part " + part + " " + fontPrint([tx, im])}>
      <div className="mw-100 mh-100 z-index2">
        {im && (
          <img src={part === "question" ? getImgQ(el) : getImgA(el)} alt="" />
        )}
        {tx}
      </div>
    </div>
  );
};
// //printing card vertical
// export const cardVertical = (el, i, ref, params, drugDropProp, del) => (
//   <div
//     key={el.id}
//     id={el.id}
//     ref={ref}
//     className="vertical_card"
//     {...drugDropProp(i)}>
//     <button onClick={() => del(el)}>❌</button>
//     <>{oneElemVertical(el, "question")}</>
//     <>{oneElemVertical(el, "answer")}</>
//     <div className="print-name">
//       {params.name} <span>{i + 1}</span>
//     </div>
//   </div>
// );
// //printing card horizontal
// export const cardHorizontal = (el, i, ref, drugDropProp, del) => (
//   <div
//     key={el.id}
//     id={el.id}
//     ref={ref}
//     className="horizontal_card"
//     {...drugDropProp(i)}>
//     <>{oneElemHorizontal(el, "question")}</>
//     <>{oneElemHorizontal(el, "answer")}</>
//     <button onClick={() => del(el)}>❌</button>
//   </div>
// );
// //printing card horizontal column
// export const cardHorizontalPart = (el, i, ref, drugDropProp, del, part) => (
//   <div
//     key={el.id}
//     id={el.id}
//     ref={ref}
//     className="horizontal_card me-4"
//     {...drugDropProp(i)}>
//     <>{oneElemHorizontal(el, part)}</>
//     <button onClick={() => del(el)}>❌</button>
//   </div>
// );
