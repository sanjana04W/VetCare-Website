"use client";

import React, { useState, useEffect } from "react";
import { 
  getAllTips, 
  createTip, 
  updateTip, 
  deleteTip 
} from "@/lib/firebase/firestore";
import { PetCareTip } from "@/lib/types";
import { 
  BookOpen, 
  Plus, 
  Edit2, 
  Trash2, 
  Search, 
  X, 
  CheckCircle2, 
  Clock, 
  Eye, 
  EyeOff 
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AdminTipsPage() {
  const [tips, setTips] = useState<PetCareTip[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTip, setEditingTip] = useState<PetCareTip | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<PetCareTip["category"]>("Health & Wellness");
  const [coverImage, setCoverImage] = useState("");
  const [authorName, setAuthorName] = useState("Dr. Sarah Jenkins, DVM");
  const [authorRole, setAuthorRole] = useState("Veterinary Clinical Lead");
  const [readTime, setReadTime] = useState("4 min read");
  const [published, setPublished] = useState(true);
  const [tags, setTags] = useState("Preventative, Health, Wellness");

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await getAllTips(false);
      setTips(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingTip(null);
    setTitle("");
    setSlug("");
    setExcerpt("");
    setContent("");
    setCategory("Health & Wellness");
    setCoverImage("https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800");
    setAuthorName("Dr. Sarah Jenkins, DVM");
    setAuthorRole("Veterinary Clinical Lead");
    setReadTime("4 min read");
    setPublished(true);
    setTags("Health, Care, Nutrition");
    setIsModalOpen(true);
  };

  const openEditModal = (tip: PetCareTip) => {
    setEditingTip(tip);
    setTitle(tip.title);
    setSlug(tip.slug);
    setExcerpt(tip.excerpt);
    setContent(tip.content);
    setCategory(tip.category);
    setCoverImage(tip.coverImage);
    setAuthorName(tip.authorName);
    setAuthorRole(tip.authorRole);
    setReadTime(tip.readTime);
    setPublished(tip.published);
    setTags(tip.tags.join(", "));
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingTip) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "")
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArr = tags.split(",").map(t => t.trim()).filter(Boolean);

    if (editingTip) {
      await updateTip(editingTip.id, {
        title,
        slug,
        excerpt,
        content,
        category,
        coverImage,
        authorName,
        authorRole,
        readTime,
        published,
        tags: tagsArr,
      });
    } else {
      await createTip({
        title,
        slug: slug || `article-${Date.now()}`,
        excerpt,
        content,
        category,
        coverImage,
        authorName,
        authorRole,
        readTime,
        published,
        tags: tagsArr,
      });
    }

    setIsModalOpen(false);
    loadData();
  };

  const handleTogglePublish = async (tip: PetCareTip) => {
    await updateTip(tip.id, { published: !tip.published });
    loadData();
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete article: "${title}"?`)) {
      await deleteTip(id);
      loadData();
    }
  };

  const filtered = tips.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase()) ||
    t.authorName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Pet Care Knowledge CMS</h2>
          <p className="text-xs text-slate-500">
            Publish educational veterinary guides, manage categories, and control draft visibility.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Filter and Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles by title, author, or category..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
            />
          </div>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            {filtered.length} Total Articles
          </span>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-slate-400 text-xs">Loading articles...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">No articles found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-4">Article</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Author</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((tip) => (
                  <tr key={tip.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={tip.coverImage} alt={tip.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-xs line-clamp-1">{tip.title}</p>
                          <span className="text-[10px] text-slate-400 font-mono">/{tip.slug}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[10px]">
                        {tip.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-700">
                      <p className="font-semibold">{tip.authorName}</p>
                      <span className="text-[10px] text-slate-400">{tip.readTime}</span>
                    </td>

                    <td className="px-6 py-4 text-slate-500">
                      {formatDate(tip.createdAt)}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleTogglePublish(tip)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition ${
                          tip.published
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {tip.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{tip.published ? "Published" : "Draft"}</span>
                      </button>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(tip)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-brand-600 hover:bg-brand-50 transition"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(tip.id, tip.title)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col">
            <div className="bg-brand-700 text-white p-6 flex items-center justify-between">
              <h3 className="font-bold text-lg">
                {editingTip ? "Edit Knowledge Article" : "Create New Pet Care Article"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. 10 Critical Signs Your Dog Needs Urgent Triage"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-500 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="Nutrition">Nutrition</option>
                    <option value="Health & Wellness">Health & Wellness</option>
                    <option value="Training & Behavior">Training & Behavior</option>
                    <option value="Vaccinations">Vaccinations</option>
                    <option value="Emergency Care">Emergency Care</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Article Excerpt (Summary)</label>
                <textarea
                  rows={2}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Full Article Body (Markdown supported)</label>
                <textarea
                  rows={6}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your clinical guide here. Markdown headers (###), bullet points (-), and numbered steps (1.) are supported..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-500 font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Cover Image URL</label>
                  <input
                    type="url"
                    required
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Author Full Name</label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Estimated Read Time</label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="e.g. 5 min read"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="e.g. Canine, Dental, Prevention"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="published_checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
                />
                <label htmlFor="published_checkbox" className="font-semibold text-slate-800">
                  Publish article immediately to public website
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition"
                >
                  {editingTip ? "Update Article" : "Save & Publish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
