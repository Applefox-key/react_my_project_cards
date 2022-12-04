//oneLevCheck = do not check all parents for clicked target
//BaseLevParent - parent level of a basetarget for compare
export const onBlurParentCheck = (e, oneLevCheck = true, BaseLevParent = 1) => {
  if (!e.relatedTarget) return false;

  let base = e.target;
  for (let j = 1; j <= BaseLevParent; j++) base = base.parentNode;

  if (oneLevCheck) return base === e.relatedTarget.parentElement;

  let el = e.relatedTarget;
  for (let i = 0; el.parentNode; i++) {
    if (el.parentNode === base) return true;
    el = el.parentNode;
  }
  return false;
};
export const onBlurCheck = (e, parrent) => {
  if (!e.relatedTarget) return false;

  let fromCP = e.target.closest(parrent);
  let toCP = e.relatedTarget.closest(parrent);
  return fromCP === toCP;
};
