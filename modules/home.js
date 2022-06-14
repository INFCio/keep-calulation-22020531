import d from "../assets/js/NTechDOM.js";
import { header } from "./header.js";
import { loading } from "./loading.js";
import { login } from "./login.js";
import { pages } from "./pages.js";
import { addkeep } from "./addkeep.js";
import { compare, calculation } from "./keep-calculation.js";
let initPages = { ...pages };
const home = d.createElement("div");
const main = d.createElement("main").setAttribute({ class: "main" });
const container = d.createElement("div").setAttribute({ class: "container2" });
const addBtn = d.createElement(
  "svg",
  `<g transform="translate(28.000000, 278.000000)"><path class="st0" d="M4-222.1c-13.2,0-23.9-10.7-23.9-23.9c0-13.2,10.7-23.9,23.9-23.9s23.9,10.7,23.9,23.9     C27.9-232.8,17.2-222.1,4-222.1L4-222.1z M4-267.3c-11.7,0-21.3,9.6-21.3,21.3s9.6,21.3,21.3,21.3s21.3-9.6,21.3-21.3     S15.7-267.3,4-267.3L4-267.3z" id="Fill-38"/><polygon class="st0" id="Fill-39" points="-8.7,-247.4 16.7,-247.4 16.7,-244.6 -8.7,-244.6    "/><polygon class="st0" id="Fill-40" points="2.6,-258.7 5.4,-258.7 5.4,-233.3 2.6,-233.3    "/></g></g>`,
  { class: "addBtn", viewBox: "0 0 64 64" }
);

main.append(loading);

const keeps = (arr) => {
  const children = [];
  const accept = [];
  if (arr[0].length == 0) return { children, accept };
  for (let i = 0; i < arr.length; i++) {
    const card = d.createElement("div").setAttribute({
      class: "card",
      id: "card" + arr[i][2],
    });
    const date = new Date(arr[i][0]);
    card.append(
      d.createElement("div", arr[i][1].replace(/\n/g, "<br>"), {
        class: "keep",
      }),
      d.createElement(
        "div",
        date.toLocaleDateString() + " " + date.toLocaleTimeString(),
        {
          class: "date",
        }
      ),
      d.createElement("div", "Total : " + calculation(arr[i][1]), {
        class: "total",
      })
    );
    children.push(card);
    accept.push(arr[i][2]);
  }
  return { children, accept };
};
home.onload = () => {
  initPages = { ...pages };
  delete initPages.login;
  delete initPages.signup;
  delete initPages.forget;
  let root = "home";
  header._loginData = home._loginData;
  header.addkeepOpen = false;
  if (window.hashchange)
    window.removeEventListener("hashchange", hashchange, false);
  window.hashchange = () => {
    d.render("root", loading);
    if (window.location.hash.toString().replace("#/", "") == "logout") {
      for (let x in initPages) delete initPages[x];
      initPages.login = "login";
      root = "login";
      delete window.localStorage["com.infc.keep-calculation"];
    }
    for (let x in initPages) eval(initPages[x]).init();
    if (
      initPages[window.location.hash.toString().replace("#/", "")] &&
      window.location.hash.toString().replace("#/", "") != "home"
    ) {
      d.render(
        "root",
        eval(initPages[window.location.hash.toString().replace("#/", "")])
      );
    } else {
      setTimeout(() => {
        d.render("root", eval(initPages[root]));
      }, 500);
    }
  };
  window.addEventListener("hashchange", hashchange, false);
  if (
    initPages[window.location.hash.toString().replace("#/", "")] &&
    window.location.hash.toString().replace("#/", "").indexOf("home") < 0
  ) {
    d.render(
      "root",
      eval(initPages[window.location.hash.toString().replace("#/", "")]).init()
    );
    return 0;
  }
  header.onload();
  if (localStorage["com.infc.keep-calculation.keeps"]) {
    let localData = JSON.parse(localStorage["com.infc.keep-calculation.keeps"]);
    const data = [];
    for (let x in localData) {
      data.push(localData[x]);
    }
    main.past = data;
    localData = {};
    const { children, accept } = keeps(data);
    main.setChildren([container.setChildren([...children])]);
    for (let i = 0; i < accept.length; i++) {
      let keep = new Date().getTime() + i;
      localData[keep] = main.past[i];
      document.getElementById("card" + accept[i]).onclick = () => {
        header.addkeep = { keep: keep, data: main.past[i] };
        header.addkeepOpen = true;
        window.location = "#/addkeep";
      };
    }
    localStorage["com.infc.keep-calculation.keeps"] = JSON.stringify(localData);
    document.querySelector(".addBtn").onclick = () => {
      delete header.addkeep;
      window.location = "#/addkeep";
    };
  }
  const sendData = [];
  if (localStorage["com.infc.keep-calculation.keeps"]) {
    const localData = JSON.parse(
      localStorage["com.infc.keep-calculation.keeps"]
    );
    for (let x in localData) {
      if (localData[x].length == 2) sendData.push(localData[x]);
    }
  }
  d.post(
    "https://script.google.com/macros/s/AKfycbxnRgvjrXu66918Av6W--LeRzmg0cizoJadRuSFcQ/exec",
    {
      type: "5",
      data: JSON.stringify({
        id: header._loginData[2],
        deletes: localStorage["com.infc.keep-calculation.deletes"]
          ? Object.values(
              JSON.parse(localStorage["com.infc.keep-calculation.deletes"])
            )
          : [],
        save: sendData,
      }),
    }
  ).then((res) => {
    res = JSON.parse(JSON.parse(res).messege);
    delete localStorage["com.infc.keep-calculation.deletes"];
    if (res.result && !header.addkeepOpen) {
      const { children, accept } = keeps(res.data);
      if (res.data[0][0] == "") res.data = [[]];
      if (!main.past) main.past = [[]];
      if (res.data[0].length) {
        main.setChildren([container]);
        container.setChildren(children.length != 0 ? children : "");
        main.past = [...res.data];
        const localData = {};
        for (let i = 0; i < accept.length; i++) {
          let keep = new Date().getTime() + i;
          localData[keep] = main.past[i];
          document.getElementById("card" + accept[i]).onclick = () => {
            header.addkeep = { keep: keep, data: main.past[i] };
            header.addkeepOpen = true;
            window.location = "#/addkeep";
          };
        }
        localStorage["com.infc.keep-calculation.keeps"] =
          JSON.stringify(localData);
      } else {
        delete main.past;
        delete localStorage["com.infc.keep-calculation.keeps"];
        main.setChildren([container]);
      }
    }
  });
  document.querySelector(".addBtn").onclick = () => {
    delete header.addkeep;
    header.addkeepOpen = true;
    window.location = "#/addkeep";
  };
};
home.append(header, main, addBtn);
export { home };
