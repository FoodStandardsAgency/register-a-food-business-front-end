const OnHandleErrorClick = targetName => {
  const targetElement =
    document.getElementsByName(targetName)[0] ||
    document.getElementById(targetName);
  targetElement.scrollIntoView();
};

export default OnHandleErrorClick;
