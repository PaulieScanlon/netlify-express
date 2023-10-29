import { jsxs, jsx } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import { Routes, Route } from "react-router-dom";
const Page$1 = ({ data }) => {
  return /* @__PURE__ */ jsxs("main", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Index" }),
    /* @__PURE__ */ jsx("pre", { children: JSON.stringify(data, null, 2) })
  ] });
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page$1
}, Symbol.toStringTag, { value: "Module" }));
const Page = ({ data }) => {
  return /* @__PURE__ */ jsxs("main", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Page 2" }),
    /* @__PURE__ */ jsx("pre", { children: JSON.stringify(data, null, 2) })
  ] });
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page
}, Symbol.toStringTag, { value: "Module" }));
const pages = /* @__PURE__ */ Object.assign({ "./pages/index/page.jsx": __vite_glob_0_0, "./pages/page-2/page.jsx": __vite_glob_0_1 });
const routes = Object.keys(pages).map((path) => {
  const dir = path.split("/")[2];
  return {
    path: dir === "index" ? "/" : dir,
    element: pages[path].default
  };
});
const Router = ({ data }) => {
  if (typeof window !== "undefined") {
    data = window.__data__;
  }
  return /* @__PURE__ */ jsx(Routes, { children: routes.map((route, index) => {
    const { path, element: Component } = route;
    return /* @__PURE__ */ jsx(Route, { path, element: /* @__PURE__ */ jsx(Component, { data: { data } }) }, index);
  }) });
};
const render = (url, data) => {
  return renderToString(
    /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(Router, { data }) })
  );
};
export {
  render
};
