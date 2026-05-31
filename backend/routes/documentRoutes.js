import express from "express";
import { upload } from "../middleware/upload.js";
import {
  getDocuments,
  uploadDocuments,
  downloadDocument,
  deleteDocument,
} from "../controllers/documentController.js";

const router = express.Router();

router.get("/documents", getDocuments);
router.post("/upload", upload.array("files", 50), uploadDocuments);
router.get("/documents/:id/download", downloadDocument);
router.delete("/documents/:id", deleteDocument);

export default router;
