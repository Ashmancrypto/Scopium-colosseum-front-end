const getCardClasses = (isDark) =>
  isDark
    ? 'border-gray-700/80 bg-gray-900/80 shadow-[0_10px_40px_-25px_rgba(236,72,153,0.6)]'
    : 'border-gray-200 bg-white shadow-[0_20px_60px_-30px_rgba(30,41,59,0.35)]';

const getMetaAccentClass = (isDark) => (isDark ? 'text-white' : 'text-gray-900');

const getTrendColor = (trend, isDark) => {
  switch (trend) {
    case 'up':
      return isDark ? 'text-emerald-400' : 'text-emerald-500';
    case 'down':
      return isDark ? 'text-rose-400' : 'text-rose-500';
    default:
      return isDark ? 'text-gray-300' : 'text-gray-600';
  }
};

const TokensFeed = ({ tokens = [], isDark = false }) => {
  if (!tokens.length) {
    return (
      <div
        className={`rounded-2xl border p-10 text-center transition-colors ${
          isDark ? 'border-gray-700 bg-gray-900/90 text-gray-300' : 'border-gray-200 bg-white text-gray-600'
        }`}
      >
        <p className="text-sm font-medium">No tokens created yet. Launch a token to showcase it here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {tokens.map((token) => (
        <article
          key={token.id}
          className={`rounded-3xl border px-6 py-6 transition-colors duration-300 ${getCardClasses(isDark)}`}
        >
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {token.icon ? (
                <img
                  src={token.icon}
                  alt={token.name}
                  className="h-14 w-14 rounded-2xl border border-white object-cover shadow-lg"
                />
              ) : (
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-semibold text-white ${isDark ? 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700' : 'bg-gradient-to-br from-pink-400 via-fuchsia-500 to-purple-600'}`}>
                  {token.symbol?.slice(0, 2) ?? 'TK'}
                </div>
              )}

              <div className="space-y-1">
                <h3
                  className={`text-lg font-semibold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}
                >
                  {token.name}
                </h3>
                {token.symbol ? (
                  <p className={`text-sm uppercase tracking-wide ${isDark ? 'text-emerald-300' : 'text-pink-500'}`}>
                    {token.symbol}
                  </p>
                ) : null}
              </div>
            </div>

            <div
              className={`flex flex-wrap items-center gap-6 text-xs font-medium sm:text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {token.volume ? (
                <span className="inline-flex items-center gap-1">
                  Volume
                  <span className={`font-semibold ${getMetaAccentClass(isDark)}`}>{token.volume}</span>
                </span>
              ) : null}
              {token.age ? (
                <span className="inline-flex items-center gap-1">
                  Age
                  <span className={`font-semibold ${getMetaAccentClass(isDark)}`}>{token.age}</span>
                </span>
              ) : null}
              {token.holders ? (
                <span className="inline-flex items-center gap-1">
                  Holders
                  <span className={`font-semibold ${getMetaAccentClass(isDark)}`}>{token.holders}</span>
                </span>
              ) : null}
            </div>
          </div>

          <div
            className={`mt-6 overflow-hidden rounded-2xl border ${
              isDark ? 'border-gray-700 bg-gray-950/60' : 'border-gray-100 bg-gray-100/60'
            }`}
          >
            {token.chart ? (
              <img
                src={token.chart}
                alt={`${token.name} chart`}
                className="h-[220px] w-full object-cover md:h-[240px]"
              />
            ) : (
              <div className="flex h-48 items-center justify-center text-sm font-medium opacity-70">
                Chart preview coming soon
              </div>
            )}
          </div>

          {token.stats?.length ? (
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {token.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
                  <p
                    className={`text-[13px] font-medium uppercase tracking-wide ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {stat.label}
                  </p>
                  <p className={`text-sm font-semibold ${getTrendColor(stat.trend, isDark)}`}>{stat.value}</p>
                </div>
              ))}
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
};

export default TokensFeed;

