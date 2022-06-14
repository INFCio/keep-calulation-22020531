import d from "../assets/js/NTechDOM.js";

const header = d.createElement("header").setAttribute({ class: "header" });
const title = d
  .createElement("h1")
  .setAttribute({ style: ["margin: 0; margin-left: 10px;"] });
const logo = d.createElement(
  "div",
  d.createElement("img").setAttribute({
    class: "logo",
    onclick: "window.location='#/logout'",
    src: "./signout.svg",
    alt: "Logout",
  })
);

header.append(title, logo);

header.onload = () => {
  title.setChildren(header._loginData[1]);
};
export { header };
