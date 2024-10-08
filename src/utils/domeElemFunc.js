//oneLevCheck = check closest parents for clicked target

export const onBlurCheck = (e, parrent) => {
  if (!e.relatedTarget) return false;

  let fromCP = e.target.closest(parrent);
  let toCP = e.relatedTarget.closest(parrent);
  return fromCP === toCP;
};
