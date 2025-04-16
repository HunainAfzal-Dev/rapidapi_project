"use client"

import axios from "axios";
import { useEffect, useState } from "react";

export default function LinkedinPosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/api/linkdin");
        console.log("API Data:", res.data?.data[0]);
        setPosts(res.data?.data || []);

      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="w-full max-w-5xl space-y-12">
        {posts.map((post, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg space-y-6">
            <div className="flex items-center space-x-4">
              {post.company?.companyLogo?.[0]?.url && (
                <img
                  src={post.company.companyLogo[0].url}
                  alt={`${post.company?.name} Logo`}
                  className="w-16 h-16 rounded-md"
                />
              )}
              <div>
                <h2 className="text-xl font-bold text-gray-800">{post.article?.title}</h2>
                <p className="text-sm text-gray-500">
                  Posted by{" "}
                  <a
                    href={post.company?.url}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {post.company?.name}
                  </a>{" "}
                  • {post.postedAt}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4 text-gray-700">
              <p className="whitespace-pre-line">{post.text}</p>
            </div>

            {/* Reactions */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span>👍 Likes: <strong>{post.likeCount}</strong></span>
              <span>💬 Comments: <strong>{post.commentsCount}</strong></span>
              <span>🔁 Reposts: <strong>{post.repostsCount}</strong></span>
              <span>❤️ Appreciation: <strong>{post.appreciationCount}</strong></span>
              <span>🤝 Empathy: <strong>{post.empathyCount}</strong></span>
              <span>🎯 Interest: <strong>{post.InterestCount}</strong></span>
              <span>👏 Praise: <strong>{post.praiseCount}</strong></span>
              <span>😂 Funny: <strong>{post.funnyCount}</strong></span>
            </div>

            {/* Link to full article */}
            {post.article?.link && (
              <div>
                <a
                  href={post.article.link}
                  className="inline-block mt-4 text-blue-600 font-medium hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read Full Article →
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
