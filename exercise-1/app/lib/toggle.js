export const toggle = () => {
  function listener(e) {
    e.preventDefault();
    let toggleClasses = this.previousSibling.previousSibling.classList;
    if (toggleClasses.contains("off")) {
      // switch on
      this.innerHTML = "close";
      toggleClasses.remove("off");
    } else {
      // switch off
      this.innerHTML = "more info";

      toggleClasses.add("off");
    }
  }
  let buttons = document.querySelectorAll("button");
  buttons.forEach((node) => {
    node.addEventListener("click", listener);
  });
};
