import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./components/layouts/guest_layout.tsx", [
    index("./routes/home/home.tsx"),
    route("/categories", "./routes/categories/categories.tsx"),
    route("/about", "./routes/home/sections/about.tsx"),
    route("/contact", "./routes/home/sections/contact.tsx"),
    route("/gallery", "./routes/home/sections/carousel.tsx"),
    route("/categories/:categoryId/products", "./routes/product/products.tsx"),
    route("/products/:id", "./routes/product/product_detail.tsx"),
  ]),

  // Admin Routes
  layout("./components/layouts/admin_layout.tsx", [
    route("/admin", "./routes/admin/dashboard.tsx"),
    route("/admin/categories", "./routes/admin/categories.tsx"),
    route("/admin/products", "./routes/admin/products.tsx"),
  ]),

  // Auth Routes (no layout)
  route("/login", "./routes/admin/login.tsx"),
] satisfies RouteConfig;
