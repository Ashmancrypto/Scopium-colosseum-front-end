const PostsFeed = ({ posts = [], isDark = false, isLoading = false, displayName = 'Streamer' }) => {
  const formatRelativeTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) return '';
    const diffMs = Date.now() - date.getTime();
    const minutes = Math.floor(diffMs / 60000);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const getIconPath = (fileName) => encodeURI(`/images/icons/${fileName}`);

  if (isLoading) {
    return (
      <div
        className={`rounded-2xl border p-8 text-center text-sm font-medium transition-colors ${
          isDark ? 'border-gray-700 bg-gray-900/90 text-gray-300' : 'border-gray-200 bg-white text-gray-600'
        }`}
      >
        Loading posts…
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div
        className={`rounded-2xl border p-8 text-center text-sm font-medium transition-colors ${
          isDark ? 'border-gray-700 bg-gray-900/90 text-gray-300' : 'border-gray-200 bg-white text-gray-600'
        }`}
      >
        No posts yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => {
        const tags = Array.isArray(post.tags) ? post.tags : [];
        const reactions = post.reactions ?? {};
        const likes = Number(reactions.likes) || 0;
        const comments = Number(reactions.comments) || 0;
        const shares = Number(reactions.shares) || 0;
        const createdAt = post.publishedAt || post.cdate || post.createdAt;

        return (
          <article
            key={post._id ?? post.id}
            className={`rounded-2xl border p-5 transition-colors ${
              isDark ? 'border-gray-700 bg-gray-900/90' : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`h-12 w-12 shrink-0 rounded-full ${isDark ? 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700' : 'bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500'}`} />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{displayName}</h3>
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold uppercase tracking-wide ${isDark ? 'bg-emerald-700/10 text-emerald-400' : 'bg-pink-500/10 text-pink-500'}`}>
                    {post.status === 'draft' ? 'Draft' : 'Stream Update'}
                  </span>
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{formatRelativeTime(createdAt)}</span>
                </div>

                {post.content ? (
                  <p className={`mt-3 text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{post.content}</p>
                ) : null}

                {post.mediaUrl ? (
                  <div className={`mt-4 overflow-hidden rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <img 
                      src={post.mediaUrl} 
                      alt="post media" 
                      className="h-auto w-full object-cover"
                      onError={(e) => {
                        e.target.src = '/images/sample/sample1.png';
                      }}
                    />
                  </div>
                ) : null}

                <div className="mt-5 flex flex-wrap items-center gap-6 text-xs font-medium uppercase tracking-wide">
                  <span className={`flex items-center gap-1.5 ${isDark ? 'text-emerald-400' : 'text-pink-500'}`}>
                    <img 
                      src={getIconPath('like.png')} 
                      alt="likes" 
                      className="h-4 w-4"
                      loading="lazy"
                    />
                    {likes.toLocaleString()} LIKES
                  </span>
                  <span className={`flex items-center gap-1.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <img 
                      src={getIconPath('comment.png')} 
                      alt="comments" 
                      className="h-4 w-4"
                      loading="lazy"
                    />
                    {comments} COMMENTS
                  </span>
                  <span className={`flex items-center gap-1.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <img 
                      src={getIconPath('share.png')} 
                      alt="shares" 
                      className="h-4 w-4"
                      loading="lazy"
                    />
                    {shares} SHARES
                  </span>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default PostsFeed;

