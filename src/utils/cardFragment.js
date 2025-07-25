import { getImgA, getImgQ } from "./contentRequests";
// import { fontPrint } from "./texts";
//main card content back and front
//mode 0 - question is on the front
//mode 1 - question is on the back
const cardContent = (item, part, cl) => {
  let tx = part === "answer" ? item.answer.trim() : item.question.trim();
  let im = part === "answer" ? item.imgA : item.imgQ;

  return (
    <>
      {im ? (
        <>
          <img
            src={part === "answer" ? getImgA(item) : getImgQ(item)}
            className={tx ? cl["img_float"] : cl["mwh"]}
            alt=""
          />
          {tx && (
            <div className={cl["textContentImg"]}>
              {/* <div className={cl["wh-75"]}> */}
              <p className="cardText">{tx}</p>
            </div>
          )}
        </>
      ) : (
        tx && <p className="cardText">{tx}</p>
      )}
      {}
    </>
  );
};
//main card back and front
export const mainAndImg = (side, mode, item, cl) => {
  let variant = side + mode;
  let note = item.note ? item.note.trim() : "";
  let isFlex =
    variant === "front0" || variant === "back1" ? !item.question : !item.answer;
  let mainDivClass = isFlex ? cl.imgContent : cl.textContent;

  return (
    <>
      <div className={cl["card-" + side]}>
        <div className={mainDivClass}>
          {note && side === "back" ? (
            <div className={cl["div-note"]}>
              {note && (
                <p className={cl["card-note"]} data-title={note}>
                  {note}
                </p>
              )}
              <div className={cl["card-text-sibl"]}>
                {variant === "back1" ? (
                  <>{cardContent(item, "question", cl)}</>
                ) : (
                  <>{cardContent(item, "answer", cl)}</>
                )}
              </div>
            </div>
          ) : variant === "front0" || variant === "back1" ? (
            <>{cardContent(item, "question", cl)}</>
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
export const oneElemVertical = (el, part, children = null) => {
  let im = part === "question" ? el.imgQ : el.imgA;
  let tx = part === "question" ? el.question : el.answer;

  let classMinHeight = im ? " minHeightImg" : "";
  let classJustify = tx ? "" : " justify-content-center";
  const image = im && (
    <img
      src={part === "question" ? getImgQ(el) : getImgA(el)}
      alt=""
      className={tx ? "imgT" : "imgOmly"}
    />
  );

  return (
    <div className={"print_part " + part + classMinHeight + classJustify}>
      <div className={"printContent "}>
        {children}
        {im && (tx ? image : <div className="w100">{image}</div>)}
        {tx && (
          <div className={im ? "print_text" : "print_text w100"}>{tx}</div>
        )}
      </div>{" "}
    </div>
  );
};

export const oneElemHorizontal = (el, part) => {
  let im = part === "question" ? el.imgQ : el.imgA;
  let tx = part === "question" ? el.question : el.answer;
  let note = part === "question" ? "" : el.note;
  const image = im && (
    <img
      src={part === "question" ? getImgQ(el) : getImgA(el)}
      alt=""
      className={tx ? "imgT" : "imgOmly"}
    />
  );
  return (
    // <div className={"print_part " + part + " " + fontPrint([tx, im])}>
    <div className={"print_part " + part}>
      <div className={"printContent"}>
        {im && image}
        {tx && (
          <div className={note ? "print_text " : "print_text"}>
            {tx} {note && <span>{note}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export const onePartLittle = (el, part, cl = "") => {
  let im = part === "question" ? el.imgQ : el.imgA;
  let tx = part === "question" ? el.question : el.answer;
  let classImg = im && tx.length === 0 ? "imgOnly" : "";
  let classDiv = "onePart " + (part === "question" ? " quest " : " answ ") + cl;
  // classDiv += tx.length < 15 ? " text-center" : "";

  return (
    <div className={classDiv}>
      {im && (
        <img
          src={part === "question" ? getImgQ(el) : getImgA(el)}
          className={classImg}
          alt=""
        />
      )}
      {tx}
    </div>
  );
};
