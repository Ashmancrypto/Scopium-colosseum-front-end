const PostsFeed = ({ posts, isDark = false }) => (
  <div className="space-y-4">
    {posts.map((post) => (
      <article
        key={post.id}
        className={`rounded-2xl border p-5 transition-colors ${
          isDark ? 'border-gray-700 bg-gray-900/90' : 'border-gray-200 bg-white'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className={`h-12 w-12 shrink-0 rounded-full ${isDark ? 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700' : 'bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500'}`} />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>USERNAME</h3>
              <span className={`rounded-full px-2 py-1 text-xs font-semibold uppercase tracking-wide ${isDark ? 'bg-emerald-700/10 text-emerald-400' : 'bg-pink-500/10 text-pink-500'}`}>
                Stream Update
              </span>
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>2h ago</span>
            </div>

            <p className={`mt-3 text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{post.content}</p>

            <div className={`mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide ${isDark ? 'text-emerald-400' : 'text-pink-500'}`}>
              {post.tags.map((tag) => (
                <span key={`${post.id}-${tag}`} className={`rounded-full border px-3 py-1 ${isDark ? 'border-emerald-700/40' : 'border-pink-400/60'}`}>
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-medium uppercase tracking-wide">
              <span className={`flex items-center gap-2 ${isDark ? 'text-emerald-400' : 'text-pink-500'}`}>
                <span className={`inline-block h-3 w-3 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-pink-500'}`} />
                {post.reactions.likes.toLocaleString()} likes
              </span>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{post.reactions.comments} comments</span>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{post.reactions.shares} shares</span>
            </div>
          </div>
        </div>
      </article>
    ))}
  </div>
);

export default PostsFeed;

