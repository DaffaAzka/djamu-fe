import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./components/layouts/guest_layout.tsx", [
    index("./routes/home/home.tsx"),
    route("/products/:id", "./routes/product/product_detail.tsx"),
  ]),
] satisfies RouteConfig;
