import d from "../assets/js/NTechDOM.js";
import { header } from "./header.js";
import { calculation } from "./keep-calculation.js";
const addkeep = d.createElement("div");
const main = d.createElement("main").setAttribute({ class: "main" });
const texarea = d.createElement("textarea", "", {
  autofoucs: "",
  spellcheck: "false",
  class: "addKeep",
});
const total = d.createElement("div").setAttribute({
  class: "keepTotal",
});

main.append(texarea, total);
addkeep.onload = () => {
  header.onload();
  let deletes = {};
  if (localStorage["com.infc.keep-calculation.deletes"]) {
    deletes = JSON.parse(localStorage["com.infc.keep-calculation.deletes"]);
  }
  let keeps = {};
  if (localStorage["com.infc.keep-calculation.keeps"]) {
    keeps = JSON.parse(localStorage["com.infc.keep-calculation.keeps"]);
  }
  let keep = new Date().getTime();
  if (header.addkeep) {
    keep = header.addkeep.keep;
    texarea.setChildren([header.addkeep.data[1]]);
    total.setChildren(["Total : " + calculation(header.addkeep.data[1])]);
  }

  document.querySelector(".addKeep").oninput = (e) => {
    document.querySelector(".keepTotal").innerText =
      "Total : " + calculation(e.target.value);
    if (header?.addkeep?.data[2]) {
      deletes[keep] = header.addkeep.data[2];
      localStorage["com.infc.keep-calculation.deletes"] =
        JSON.stringify(deletes);
    }
    delete keeps[keep];
    const data = {};
    data[keep] = [new Date().toString(), e.target.value];
    localStorage["com.infc.keep-calculation.keeps"] = JSON.stringify({
      ...data,
      ...keeps,
    });
  };
};
addkeep.append(header, main);
export { addkeep };
