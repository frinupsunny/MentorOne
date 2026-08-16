import { useMemo, useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiFileText,
  FiDownload,
  FiEye,
  FiFolder,
  FiClock,
  FiCheckCircle,
  FiX,
  FiUploadCloud,
} from "react-icons/fi";

const initialDocuments = [
  {
    id: 1,
    name: "Mentoring Guidelines 2026",
    category: "Guidelines",
    description:
      "University guidelines and procedures for the mentoring programme.",
    uploadedBy: "Coordinator",
    date: "14 Aug 2026",
    size: "2.4 MB",
    type: "PDF",
    status: "Active",
  },
  {
    id: 2,
    name: "Mentor Meeting Template",
    category: "Templates",
    description:
      "Standard template for recording mentor-mentee meeting details.",
    uploadedBy: "Coordinator",
    date: "12 Aug 2026",
    size: "820 KB",
    type: "DOCX",
    status: "Active",
  },
  {
    id: 3,
    name: "Monthly Mentoring Report",
    category: "Reports",
    description:
      "Monthly mentoring activity and session report.",
    uploadedBy: "Dr. Meena S",
    date: "10 Aug 2026",
    size: "1.8 MB",
    type: "PDF",
    status: "Active",
  },
  {
    id: 4,
    name: "Student Feedback Form",
    category: "Forms",
    description:
      "Feedback form used to collect mentee feedback after mentoring sessions.",
    uploadedBy: "Coordinator",
    date: "08 Aug 2026",
    size: "540 KB",
    type: "DOCX",
    status: "Active",
  },
  {
    id: 5,
    name: "Mentor Assignment Guidelines",
    category: "Guidelines",
    description:
      "Reference document for assigning mentees to mentors.",
    uploadedBy: "Coordinator",
    date: "05 Aug 2026",
    size: "1.2 MB",
    type: "PDF",
    status: "Active",
  },
  {
    id: 6,
    name: "Session Review Template",
    category: "Templates",
    description:
      "Template for documenting mentoring session outcomes and remarks.",
    uploadedBy: "Dr. Meena S",
    date: "02 Aug 2026",
    size: "460 KB",
    type: "DOCX",
    status: "Active",
  },
];

function Documents() {
  const [documents, setDocuments] =
    useState(initialDocuments);

  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [selectedDocument, setSelectedDocument] =
    useState(null);

  const [showUpload, setShowUpload] =
    useState(false);

  const [message, setMessage] = useState("");

  const [uploadForm, setUploadForm] = useState({
    name: "",
    category: "Guidelines",
    description: "",
    type: "PDF",
  });

  /* =================================
     FILTER DOCUMENTS
  ================================= */

  const filteredDocuments = useMemo(() => {
    return documents.filter((document) => {
      const searchMatch =
        document.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        document.description
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        document.category
          .toLowerCase()
          .includes(search.toLowerCase());

      const categoryMatch =
        categoryFilter === "All" ||
        document.category === categoryFilter;

      return searchMatch && categoryMatch;
    });
  }, [documents, search, categoryFilter]);

  /* =================================
     COUNTS
  ================================= */

  const totalDocuments = documents.length;

  const activeDocuments = documents.filter(
    (document) => document.status === "Active"
  ).length;

  const guidelinesCount = documents.filter(
    (document) => document.category === "Guidelines"
  ).length;

  const templatesCount = documents.filter(
    (document) => document.category === "Templates"
  ).length;

  /* =================================
     UPLOAD
  ================================= */

  const handleUpload = (e) => {
    e.preventDefault();

    if (!uploadForm.name.trim()) {
      setMessage("Please enter a document name.");
      return;
    }

    const newDocument = {
      id: Date.now(),
      name: uploadForm.name,
      category: uploadForm.category,
      description:
        uploadForm.description ||
        "New mentoring document.",
      uploadedBy: "Dr. Meena S",
      date: "16 Aug 2026",
      size: "New",
      type: uploadForm.type,
      status: "Active",
    };

    setDocuments((current) => [
      newDocument,
      ...current,
    ]);

    setUploadForm({
      name: "",
      category: "Guidelines",
      description: "",
      type: "PDF",
    });

    setShowUpload(false);

    setMessage(
      "Document added successfully."
    );
  };

  /* =================================
     DOWNLOAD
  ================================= */

  const handleDownload = (document) => {
    const content = `
MentorOne Document

Document: ${document.name}
Category: ${document.category}
Type: ${document.type}
Uploaded By: ${document.uploadedBy}
Date: ${document.date}

Description:
${document.description}
`;

    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = window.document.createElement(
      "a"
    );

    link.href = url;

    link.download = `${document.name}.txt`;

    window.document.body.appendChild(link);

    link.click();

    window.document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setMessage(
      `"${document.name}" download started.`
    );
  };

  /* =================================
     CATEGORY ICON
  ================================= */

  const getCategoryIcon = (category) => {
    if (category === "Guidelines") {
      return (
        <FiFolder className="text-indigo-400" />
      );
    }

    if (category === "Templates") {
      return (
        <FiFileText className="text-purple-400" />
      );
    }

    if (category === "Reports") {
      return (
        <FiFileText className="text-amber-400" />
      );
    }

    return (
      <FiFileText className="text-emerald-400" />
    );
  };

  return (
    <div className="p-5 sm:p-6 lg:p-7">

      {/* =================================
          HEADER
      ================================= */}

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-2xl font-semibold text-white">
            Documents
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Manage mentoring guidelines, forms, templates and reports
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowUpload(true)}
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2.5 text-xs font-medium text-white shadow-lg shadow-indigo-500/20 transition hover:from-indigo-400 hover:to-purple-500"
        >
          <FiUploadCloud />

          Add Document
        </button>

      </div>

      {/* =================================
          MESSAGE
      ================================= */}

      {message && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-emerald-400">

          <FiCheckCircle />

          <p className="text-xs">
            {message}
          </p>

          <button
            type="button"
            onClick={() => setMessage("")}
            className="ml-auto"
          >
            <FiX />
          </button>

        </div>
      )}

      {/* =================================
          SUMMARY CARDS
      ================================= */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <SummaryCard
          label="Total Documents"
          value={totalDocuments}
          description="Available resources"
          icon={<FiFileText />}
          iconClass="bg-indigo-500/10 text-indigo-400"
        />

        <SummaryCard
          label="Guidelines"
          value={guidelinesCount}
          description="Mentoring policies"
          icon={<FiFolder />}
          iconClass="bg-purple-500/10 text-purple-400"
        />

        <SummaryCard
          label="Templates"
          value={templatesCount}
          description="Reusable templates"
          icon={<FiFileText />}
          iconClass="bg-amber-500/10 text-amber-400"
        />

        <SummaryCard
          label="Active Documents"
          value={activeDocuments}
          description="Currently available"
          icon={<FiCheckCircle />}
          iconClass="bg-emerald-500/10 text-emerald-400"
        />

      </div>

      {/* =================================
          DOCUMENT LIST
      ================================= */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70">

        {/* HEADER */}

        <div className="border-b border-slate-800 px-5 py-4">

          <div className="flex flex-col gap-4">

            <div>

              <h2 className="text-base font-semibold text-white">
                Document Library
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Resources available to the mentoring community
              </p>

            </div>

            <div className="flex flex-col gap-3 md:flex-row">

              {/* SEARCH */}

              <div className="relative flex-1">

                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search documents..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/50 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-indigo-500"
                />

              </div>

              {/* FILTER */}

              <div className="relative">

                <FiFilter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />

                <select
                  value={categoryFilter}
                  onChange={(e) =>
                    setCategoryFilter(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/50 py-3 pl-9 pr-8 text-xs text-white outline-none focus:border-indigo-500 md:w-52"
                >

                  <option value="All">
                    All Categories
                  </option>

                  <option value="Guidelines">
                    Guidelines
                  </option>

                  <option value="Templates">
                    Templates
                  </option>

                  <option value="Reports">
                    Reports
                  </option>

                  <option value="Forms">
                    Forms
                  </option>

                </select>

              </div>

            </div>

          </div>

        </div>

        {/* =================================
            DOCUMENT ITEMS
        ================================= */}

        {filteredDocuments.length > 0 ? (

          <div className="divide-y divide-slate-800">

            {filteredDocuments.map((document) => (

              <div
                key={document.id}
                className="p-5 transition hover:bg-slate-800/20"
              >

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                  {/* DOCUMENT INFO */}

                  <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-800/70">
                      {getCategoryIcon(
                        document.category
                      )}
                    </div>

                    <div>

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="text-sm font-medium text-white">
                          {document.name}
                        </h3>

                        <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-[9px] font-medium text-indigo-400">
                          {document.type}
                        </span>

                      </div>

                      <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">
                        {document.description}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] text-slate-600">

                        <span>
                          {document.category}
                        </span>

                        <span>•</span>

                        <span>
                          Uploaded by{" "}
                          {document.uploadedBy}
                        </span>

                        <span>•</span>

                        <span>
                          {document.date}
                        </span>

                        <span>•</span>

                        <span>
                          {document.size}
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* ACTIONS */}

                  <div className="flex items-center gap-2 lg:shrink-0">

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-400">

                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                      {document.status}

                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedDocument(
                          document
                        )
                      }
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 px-3 py-2 text-[10px] font-medium text-slate-400 transition hover:border-slate-700 hover:text-white"
                    >
                      <FiEye />

                      View
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDownload(
                          document
                        )
                      }
                      className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-3 py-2 text-[10px] font-medium text-indigo-400 transition hover:bg-indigo-500/20"
                    >
                      <FiDownload />

                      Download
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="px-5 py-16 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800/60 text-slate-600">

              <FiFileText className="text-2xl" />

            </div>

            <h3 className="mt-4 text-sm font-medium text-white">
              No documents found
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Try changing your search or category filter.
            </p>

          </div>

        )}

      </div>

      {/* =================================
          VIEW DOCUMENT MODAL
      ================================= */}

      {selectedDocument && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-[#0D1220] shadow-2xl">

            <div className="flex items-start justify-between border-b border-slate-800 px-5 py-4">

              <div>

                <h2 className="text-base font-semibold text-white">
                  Document Details
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Resource information
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedDocument(
                    null
                  )
                }
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-white"
              >
                <FiX />
              </button>

            </div>

            <div className="space-y-5 p-5">

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                  <FiFileText className="text-xl" />
                </div>

                <div>

                  <h3 className="text-sm font-semibold text-white">
                    {selectedDocument.name}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {selectedDocument.type} ·{" "}
                    {selectedDocument.size}
                  </p>

                </div>

              </div>

              <div className="grid grid-cols-2 gap-3">

                <DetailItem
                  label="Category"
                  value={
                    selectedDocument.category
                  }
                />

                <DetailItem
                  label="Status"
                  value={
                    selectedDocument.status
                  }
                />

                <DetailItem
                  label="Uploaded By"
                  value={
                    selectedDocument.uploadedBy
                  }
                />

                <DetailItem
                  label="Date"
                  value={
                    selectedDocument.date
                  }
                />

              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/30 p-4">

                <p className="mb-2 text-[10px] text-slate-600">
                  Description
                </p>

                <p className="text-sm leading-6 text-slate-300">
                  {selectedDocument.description}
                </p>

              </div>

              <div className="flex justify-end gap-2 border-t border-slate-800 pt-5">

                <button
                  type="button"
                  onClick={() =>
                    setSelectedDocument(
                      null
                    )
                  }
                  className="rounded-xl border border-slate-800 px-4 py-2.5 text-xs font-medium text-slate-400 transition hover:border-slate-700 hover:text-white"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDownload(
                      selectedDocument
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2.5 text-xs font-medium text-white"
                >
                  <FiDownload />

                  Download
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* =================================
          ADD DOCUMENT MODAL
      ================================= */}

      {showUpload && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-[#0D1220] shadow-2xl">

            <div className="flex items-start justify-between border-b border-slate-800 px-5 py-4">

              <div>

                <h2 className="text-base font-semibold text-white">
                  Add Document
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Add a resource to the document library
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowUpload(false)
                }
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-white"
              >
                <FiX />
              </button>

            </div>

            <form
              onSubmit={handleUpload}
              className="space-y-4 p-5"
            >

              {/* NAME */}

              <div>

                <label className="mb-2 block text-[11px] font-medium text-slate-500">
                  Document Name
                </label>

                <input
                  type="text"
                  value={uploadForm.name}
                  onChange={(e) =>
                    setUploadForm({
                      ...uploadForm,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter document name"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
                />

              </div>

              {/* CATEGORY */}

              <div>

                <label className="mb-2 block text-[11px] font-medium text-slate-500">
                  Category
                </label>

                <select
                  value={uploadForm.category}
                  onChange={(e) =>
                    setUploadForm({
                      ...uploadForm,
                      category:
                        e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                >

                  <option value="Guidelines">
                    Guidelines
                  </option>

                  <option value="Templates">
                    Templates
                  </option>

                  <option value="Reports">
                    Reports
                  </option>

                  <option value="Forms">
                    Forms
                  </option>

                </select>

              </div>

              {/* TYPE */}

              <div>

                <label className="mb-2 block text-[11px] font-medium text-slate-500">
                  File Type
                </label>

                <select
                  value={uploadForm.type}
                  onChange={(e) =>
                    setUploadForm({
                      ...uploadForm,
                      type: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
                >

                  <option value="PDF">
                    PDF
                  </option>

                  <option value="DOCX">
                    DOCX
                  </option>

                  <option value="XLSX">
                    XLSX
                  </option>

                  <option value="PPTX">
                    PPTX
                  </option>

                </select>

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="mb-2 block text-[11px] font-medium text-slate-500">
                  Description
                </label>

                <textarea
                  value={
                    uploadForm.description
                  }
                  onChange={(e) =>
                    setUploadForm({
                      ...uploadForm,
                      description:
                        e.target.value,
                    })
                  }
                  rows={3}
                  placeholder="Brief description..."
                  className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
                />

              </div>

              {/* ACTIONS */}

              <div className="flex justify-end gap-2 border-t border-slate-800 pt-5">

                <button
                  type="button"
                  onClick={() =>
                    setShowUpload(false)
                  }
                  className="rounded-xl border border-slate-800 px-4 py-2.5 text-xs font-medium text-slate-400 transition hover:border-slate-700 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2.5 text-xs font-medium text-white shadow-lg shadow-indigo-500/20"
                >
                  <FiUploadCloud />

                  Add Document
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

/* =================================
   SUMMARY CARD
================================= */

function SummaryCard({
  label,
  value,
  description,
  icon,
  iconClass,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs font-medium text-slate-500">
            {label}
          </p>

          <p className="mt-2 text-2xl font-semibold text-white">
            {value}
          </p>

          <p className="mt-1 text-[11px] text-slate-600">
            {description}
          </p>

        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

/* =================================
   DETAIL ITEM
================================= */

function DetailItem({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/30 p-3">

      <p className="text-[10px] text-slate-600">
        {label}
      </p>

      <p className="mt-1 text-xs font-medium text-slate-300">
        {value}
      </p>

    </div>
  );
}

export default Documents;