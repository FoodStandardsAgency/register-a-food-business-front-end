const OnHandleErrorClick = (targetName) => {
  if (targetName === "establishment_opening_status") {
    let targetTradingDate =
      document.getElementsByName(targetName)[0] ||
      document.getElementById(targetName) ||
      document.getElementById("establishment_opening_date");
    targetTradingDate.scrollIntoView();
    targetTradingDate.focus({ preventScroll: true });
  } else {
    let targetElement =
      document.getElementsByName(targetName)[0] ||
      document.getElementById(targetName);
    targetElement.scrollIntoView();
    targetElement.focus({ preventScroll: true });
  }
};

export default OnHandleErrorClick;
