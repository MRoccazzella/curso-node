import { Router } from "express";
import { ProductController } from "../controlers/productControlers.js";



const router = Router();



router.get("/", ProductController.getAll);

router.get("/:id", ProductController.getById);

router.post("/", ProductController.createProduct);

router.delete("/:id", ProductController.deleteById);

export { router as ProductRouter };