// ...existing code...
import React, { useState } from "react";

type FAQ = {
  id: string;
  question: string;
  answer: string;
  image?: string;
  tags?: string[];
  likes?: number;
  comments?: number;
  timestamp?: string;
};

const initialFaqs: FAQ[] = [
  {
    id: "f1",
    question: "Apa itu Jamu?",
    answer:
      "Jamu adalah minuman tradisional Indonesia yang terbuat dari bahan-bahan alami seperti rempah-rempah dan tanaman herbal.",
    image: "/assets/jamu-assets1.jpeg",
    tags: ["intro", "tradisi"],
    likes: 12,
    comments: 3,
    timestamp: "2 hari lalu",
  },
  {
    id: "f2",
    question: "Bagaimana cara memesan Jamu?",
    answer: "Anda dapat memesan Jamu melalui aplikasi kami atau mengunjungi toko fisik kami.",
    image: "/assets/jamu-assets2.jpg",
    tags: ["order"],
    likes: 8,
    comments: 2,
    timestamp: "1 minggu lalu",
  },
  {
    id: "f3",
    question: "Apakah Jamu aman untuk dikonsumsi?",
    answer:
      "Ya, Jamu terbuat dari bahan alami dan telah melalui proses pengujian untuk memastikan keamanannya.",
    image: "/assets/jamu-assets3.jpg",
    tags: ["safety"],
    likes: 20,
    comments: 5,
    timestamp: "3 hari lalu",
  },
  {
    id: "f4",
    question: "Apa manfaat Jamu?",
    answer:
      "Jamu memiliki berbagai manfaat kesehatan, termasuk meningkatkan daya tahan tubuh dan membantu pencernaan.",
    image: "/assets/jamu-assets4.jpg",
    tags: ["manfaat", "kesehatan"],
    likes: 16,
    comments: 4,
    timestamp: "5 hari lalu",
  },
  {
    id: "f5",
    question: "Bagaimana cara menyimpan Jamu?",
    answer: "Simpan Jamu di tempat yang sejuk dan kering, jauh dari sinar matahari langsung.",
    image: "/assets/jamu-assets4.jpg",
    tags: ["storage"],
    likes: 5,
    comments: 0,
    timestamp: "2 minggu lalu",
  },

  {
    id: "f6",
    question: "Bisakah saya mengajukan keluhan tentang produk?",
    answer:
        "Tentu, Anda dapat mengajukan keluhan melalui formulir di bagian Keluhan & FAQ pada situs kami.",
    image: "/assets/jamu-assets2.jpg",
    tags: ["keluhan"],
    likes: 3,
    comments: 1,
    timestamp: "Baru saja",
    },

  
];

const KeluhanSection: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFaqs);
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [complaint, setComplaint] = useState("");

  const allTags = Array.from(
    new Set(faqs.flatMap((f) => f.tags ?? []))
  ).sort();

  const toggleFAQ = (id: string) => {
    setActiveIndex((prev) => (prev === id ? null : id));
  };

  const handleKeyToggle = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFAQ(id);
    }
  };

  const filtered = faqs.filter((f) => {
    const q = query.trim().toLowerCase();
    if (filterTag && !(f.tags ?? []).includes(filterTag)) return false;
    if (!q) return true;
    return (
      f.question.toLowerCase().includes(q) ||
      f.answer.toLowerCase().includes(q) ||
      (f.tags ?? []).some((t) => t.includes(q))
    );
  });

  const submitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaint.trim()) return;
    const newItem: FAQ = {
      id: `u-${Date.now()}`,
      question: complaint.trim().slice(0, 80) + (complaint.length > 80 ? "…" : ""),
      answer: complaint.trim(),
      tags: ["keluhan"],
      likes: 0,
      comments: 0,
      timestamp: "Baru saja",
    };
    setFaqs((s) => [newItem, ...s]);
    setComplaint("");
    setActiveIndex(newItem.id);
    alert("Keluhan terkirim — terima kasih!");
  };

  const like = (id: string) => {
    setFaqs((s) => s.map((f) => (f.id === id ? { ...f, likes: (f.likes ?? 0) + 1 } : f)));
  };

  return (
    <section className="bg-gradient-to-b from-[#f9f9f9] to-[#f0f0f0] py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-[#2D1C0F] mb-2">Keluhan & FAQ — Interaktif</h2>
          <p className="text-gray-600">Tanyakan atau lihat pengalaman pengguna lain tentang Jamu kami</p>
        </div>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <form onSubmit={submitComplaint} className="col-span-1 md:col-span-2 bg-white p-4 rounded-lg shadow">
            <label className="text-sm text-gray-600">Laporkan keluhan atau pertanyaan</label>
            <textarea
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              placeholder="Tuliskan keluhan atau pertanyaan Anda..."
              className="w-full mt-2 p-3 border rounded focus:outline-none focus:ring"
              rows={3}
            />
            <div className="flex items-center justify-between mt-3">
              <div className="text-sm text-gray-500">Anda juga bisa menyertakan foto saat mengirimkan (opsional).</div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-[#f87108] text-white px-4 py-2 rounded hover:brightness-95"
                >
                  Kirim
                </button>
              </div>
            </div>
          </form>

          <div className="bg-white p-4 rounded-lg shadow">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari pertanyaan atau tag..."
              className="w-full p-2 border rounded focus:outline-none"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => setFilterTag(null)}
                className={`text-sm px-2 py-1 rounded ${filterTag === null ? "bg-[#f87108] text-white" : "bg-gray-100"}`}
              >
                Semua
              </button>
              {allTags.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterTag((prev) => (prev === t ? null : t))}
                  className={`text-sm px-2 py-1 rounded ${filterTag === t ? "bg-[#f87108] text-white" : "bg-gray-100"}`}
                >
                  #{t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((faq) => {
            const open = activeIndex === faq.id;
            return (
              <article
                key={faq.id}
                tabIndex={0}
                role="button"
                aria-expanded={open}
                onKeyDown={(e) => handleKeyToggle(e, faq.id)}
                onClick={() => toggleFAQ(faq.id)}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-[1.02] transition"
              >
                <div className="relative h-44 bg-gray-100">
                  {faq.image ? (
                    <img src={faq.image} alt={faq.question} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">🌿</div>
                  )}
                  <div className="absolute top-3 left-3 bg-black/40 text-white text-xs px-2 py-1 rounded">{faq.timestamp}</div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-[#2D1C0F]">{faq.question}</h3>
                    <div className="text-orange-500 font-bold transform transition-transform duration-300">
                      <span className={`${open ? "rotate-180 inline-block" : "inline-block"}`}>▼</span>
                    </div>
                  </div>

                  <div
                    className={`mt-3 text-gray-700 text-sm leading-relaxed overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0"}`}
                  >
                    <div className="pb-2">{faq.answer}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        {(faq.tags ?? []).map((t) => (
                          <span key={t} className="bg-gray-100 px-2 py-1 rounded text-xs">#{t}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => { e.stopPropagation(); like(faq.id); }}
                          className="text-sm text-[#f87108] font-semibold"
                          aria-label="like"
                        >
                          ❤️ {faq.likes ?? 0}
                        </button>
                        <div className="text-sm text-gray-500">💬 {faq.comments ?? 0}</div>
                      </div>
                    </div>
                  </div>

                  {!open && (
                    <div className="mt-3 text-gray-500 text-sm">Klik kartu untuk melihat detail & berinteraksi</div>
                  )}
                </div>
              </article>
            );
          })}

          {filtered.length === 0 && (
            <div className="col-span-full bg-white p-6 rounded shadow text-center text-gray-500">
              Tidak ada hasil. Coba kata kunci lain atau kirim keluhan Anda.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default KeluhanSection;
