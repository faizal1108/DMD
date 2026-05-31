import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Document from "../models/Document.js";
import Notification from "../models/Notification.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find().sort({ uploadDate: -1 });
    res.json({ success: true, data: documents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const uploadDocuments = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const isBulk = req.files.length > 3;
    const io = req.app.get("io");

    const savedDocs = await Promise.all(
      req.files.map(async (file) => {
        const doc = new Document({
          filename: file.filename,
          originalName: file.originalname,
          size: file.size,
          fileType: file.mimetype,
          uploadDate: new Date(),
          status: "completed",
          path: file.path,
        });
        return await doc.save();
      })
    );

    const notifMessage =
      savedDocs.length === 1
        ? `"${savedDocs[0].originalName}" uploaded successfully`
        : `${savedDocs.length} files uploaded successfully`;

    const notification = await Notification.create({
      message: notifMessage,
      type: "success",
      timestamp: new Date(),
      read: false,
      metadata: { fileCount: savedDocs.length, isBulk },
    });

    if (io) {
      io.emit("upload-complete", {
        count: savedDocs.length,
        documents: savedDocs,
        notification,
        isBulk,
      });
      io.emit("new-notification", notification);
    }

    res.status(201).json({
      success: true,
      data: savedDocs,
      isBulk,
      notification,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const downloadDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ success: false, message: "Document not found" });
    }

    if (!fs.existsSync(doc.path)) {
      return res.status(404).json({ success: false, message: "File not found on disk" });
    }

    res.download(doc.path, doc.originalName);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ success: false, message: "Document not found" });
    }

    if (fs.existsSync(doc.path)) {
      fs.unlinkSync(doc.path);
    }

    await Document.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
