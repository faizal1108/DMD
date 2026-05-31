import React, { createContext, useContext, useState, useCallback } from "react";
import { fetchDocuments } from "../services/api";

const DocumentContext = createContext(null);

export const DocumentProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadDocuments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchDocuments();
      setDocuments(res.data.data);
    } catch (err) {
      console.error("Failed to load documents:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addDocuments = (newDocs) => {
    setDocuments((prev) => [...newDocs, ...prev]);
  };

  const removeDocument = (id) => {
    setDocuments((prev) => prev.filter((d) => d._id !== id));
  };

  return (
    <DocumentContext.Provider
      value={{ documents, loading, loadDocuments, addDocuments, removeDocument }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocuments = () => {
  const ctx = useContext(DocumentContext);
  if (!ctx) throw new Error("useDocuments must be used within DocumentProvider");
  return ctx;
};
