
/****************************************************************************************
 * Fastfox                                                                              *
 * "Non ducor duco"                                                                     *
 * priority: speedy browsing                                                            *
 * version: 119                                                                         *
 * url: https://github.com/yokoffing/Betterfox                                          *
 ***************************************************************************************/

/****************************************************************************
 * SECTION: GENERAL                                                        *
****************************************************************************/

// PREF: initial paint delay
// How long FF will wait before rendering the page (in ms)
// [NOTE] Older PCs may want to use 250-750.
// [NOTE] Dark Reader users may want to use 1000-2000 [3].
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1283302
// [2] https://docs.google.com/document/d/1BvCoZzk2_rNZx3u9ESPoFjSADRI0zIPeJRXFLwWXx_4/edit#heading=h.28ki6m8dg30z
// [3] https://old.reddit.com/r/firefox/comments/o0xl1q/reducing_cpu_usage_of_dark_reader_extension/
// [4] https://reddit.com/r/browsers/s/wvNB7UVCpx
user_pref("nglayout.initialpaint.delay", 5); // DEFAULT; formerly 250
user_pref("nglayout.initialpaint.delay_in_oopif", 5); // DEFAULT

// PREF: page reflow timer
// Rather than wait until a page has completely downloaded to display it to the user,
// web browsers will periodically render what has been received to that point.
// Because reflowing the page every time additional data is received slows down
// total page load time, a timer was added so that the page would not reflow too often.
// This preference specfies whether that timer is active.
// [1] https://kb.mozillazine.org/Content.notify.ontimer
// true = do not reflow pages at an interval any higher than that specified by content.notify.interval (default)
// false = reflow pages whenever new data is received
user_pref("content.notify.ontimer", true); // DEFAULT

// PREF: notification interval (in microseconds) to avoid layout thrashing
// When Firefox is loading a page, it periodically reformats
// or "reflows" the page as it loads. The page displays new elements
// every 0.12 seconds by default. These redraws increase the total page load time.
// The default value provides good incremental display of content
// without causing an increase in page load time.
// [NOTE] Lowering the interval will increase responsiveness
// but also increase the total load time.
// [WARNING] If this value is set below 1/10 of a second, it starts
// to impact page load performance.
// [EXAMPLE] 100000 = .10s = 100 reflows/second
// [1] https://searchfox.org/mozilla-central/rev/c1180ea13e73eb985a49b15c0d90e977a1aa919c/modules/libpref/init/StaticPrefList.yaml#1824-1834
// [2] https://dev.opera.com/articles/efficient-javascript/?page=3#reflow
// [3] https://dev.opera.com/articles/efficient-javascript/?page=3#smoothspeed
user_pref("content.notify.interval", 100000); // (.10s); default=120000 (.12s)

// PREF: new tab preload
// [WARNING] Disabling this may cause a delay when opening a new tab in Firefox.
// [1] https://wiki.mozilla.org/Tiles/Technical_Documentation#Ping
// [2] https://github.com/arkenfox/user.js/issues/1556
user_pref("browser.newtab.preload", true); // DEFAULT

// PREF: disable EcoQoS [WINDOWS]
// Background tab processes use efficiency mode on Windows 11 to limit resource use.
// [WARNING] Leave this alone, unless you're on Desktop and you rely on
// background tabs to have maximum performance.
// [1] https://devblogs.microsoft.com/performance-diagnostics/introducing-ecoqos/
// [2] https://bugzilla.mozilla.org/show_bug.cgi?id=1796525
// [3] https://bugzilla.mozilla.org/show_bug.cgi?id=1800412
// [4] https://reddit.com/r/firefox/comments/107fj69/how_can_i_disable_the_efficiency_mode_on_firefox/
user_pref("dom.ipc.processPriorityManager.backgroundUsesEcoQoS", false);

// PREF: control how tabs are loaded when a session is restored
// true=Tabs are not loaded until they are selected (default)
// false=Tabs begin to load immediately.
//user_pref("browser.sessionstore.restore_on_demand", true); // DEFAULT
    //user_pref("browser.sessionstore.restore_pinned_tabs_on_demand", true);
//user_pref("browser.sessionstore.restore_tabs_lazily", true); // DEFAULT

// PREF: disable preSkeletonUI on startup [WINDOWS]
//user_pref("browser.startup.preXulSkeletonUI", false);

/****************************************************************************
 * SECTION: GFX RENDERING TWEAKS                                            *
****************************************************************************/

// PREF: Webrender tweaks
// [1] https://searchfox.org/mozilla-central/rev/6e6332bbd3dd6926acce3ce6d32664eab4f837e5/modules/libpref/init/StaticPrefList.yaml#6202-6219
// [2] https://hacks.mozilla.org/2017/10/the-whole-web-at-maximum-fps-how-webrender-gets-rid-of-jank/
// [3] https://www.reddit.com/r/firefox/comments/tbphok/is_setting_gfxwebrenderprecacheshaders_to_true/i0bxs2r/
// [4] https://www.reddit.com/r/firefox/comments/z5auzi/comment/ixw65gb?context=3
// [5] https://gist.github.com/RubenKelevra/fd66c2f856d703260ecdf0379c4f59db?permalink_comment_id=4532937#gistcomment-4532937
user_pref("gfx.webrender.all", true); // enables WR + additional features
user_pref("gfx.webrender.precache-shaders", true); // longer initial startup time
user_pref("gfx.webrender.compositor", true); // DEFAULT WINDOWS macOS
user_pref("gfx.webrender.compositor.force-enabled", true); // enforce

// PREF: if your hardware doesn't support Webrender, you can fallback to Webrender's software renderer
// [1] https://www.ghacks.net/2020/12/14/how-to-find-out-if-webrender-is-enabled-in-firefox-and-how-to-enable-it-if-it-is-not/
//user_pref("gfx.webrender.software", true); // Software Webrender uses CPU instead of GPU
//user_pref("gfx.webrender.software.opengl", true); // LINUX

// PREF: NVIDIA RTX Video Super Resolution for video overlay [WINDOWS]
// [NOTE] May not work on Stable release [2].
// This is also a setting in NVIDIA's driver settings, so once this is
// stable, it should default to true.
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1823135
// [2] https://www.reddit.com/r/firefox/comments/17a0noa/nvidia_video_super_resolution_not_working_on/
//user_pref("gfx.webrender.super-resolution.nvidia", true);

// PREF: GPU-accelerated Canvas2D
// Use gpu-canvas instead of to skia-canvas.
// [WARNING] May cause issues on some Windows machines using integrated GPUs [2] [3]
// Add to your overrides if you have a dedicated GPU.
// [NOTE] Higher values will use more memory.
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1741501
// [2] https://github.com/yokoffing/Betterfox/issues/153
// [3] https://github.com/yokoffing/Betterfox/issues/198
user_pref("gfx.canvas.accelerated", true); // DEFAULT macOS LINUX [FF110]; not compatible with WINDOWS integrated GPUs
user_pref("gfx.canvas.accelerated.cache-items", 8192); // default=2048; alt=8192
user_pref("gfx.canvas.accelerated.cache-size", 2048); // default=256; alt=1024
user_pref("gfx.content.skia-font-cache-size", 32); // default=5; Chrome=20
    // [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1239151#c2

// PREF: prefer GPU over CPU
// At best, the prefs do nothing on Linux/macOS.
// At worst, it'll result in crashes if the sandboxing is a WIP.
// [1] https://firefox-source-docs.mozilla.org/dom/ipc/process_model.html#gpu-process
user_pref("layers.gpu-process.enabled", true); // DEFAULT WINDOWS
user_pref("layers.gpu-process.force-enabled", true); // enforce
user_pref("layers.mlgpu.enabled", true); // LINUX
user_pref("media.hardware-video-decoding.enabled", true); // DEFAULT WINDOWS macOS
user_pref("media.hardware-video-decoding.force-enabled", true); // enforce
user_pref("media.gpu-process-decoder", true); // DEFAULT WINDOWS
user_pref("media.ffmpeg.vaapi.enabled", true); // LINUX

// PREF: disable AV1 for hardware decodeable videos
// Firefox sometimes uses AV1 video decoding even to GPUs which do not support it.
// [1] https://www.reddit.com/r/AV1/comments/s5xyph/youtube_av1_codec_have_worse_quality_than_old_vp9
//user_pref("media.av1.enabled", false);

// PREF: hardware and software decoded video overlay [FF116+]
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1829063
// [2] https://phabricator.services.mozilla.com/D175993
user_pref("gfx.webrender.dcomp-video-hw-overlay-win", true); // DEFAULT
user_pref("gfx.webrender.dcomp-video-hw-overlay-win-force-enabled", true); // enforce
//user_pref("gfx.webrender.dcomp-video-sw-overlay-win", true); // DEFAULT
////user_pref("gfx.webrender.dcomp-video-sw-overlay-win-force-enabled", true); // enforce

/****************************************************************************
 * SECTION: DISK CACHE                                                     *
****************************************************************************/

// PREF: disk cache
// [NOTE] If you think it helps performance, then feel free to override this.
// [SETTINGS] See about:cache
// More efficient to keep the browser cache instead of having to
// re-download objects for the websites you visit frequently.
// [1] https://www.janbambas.cz/new-firefox-http-cache-enabled/
//user_pref("browser.cache.disk.enable", true); // DEFAULT

// PREF: disk cache size
// [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=913808,968106,968101
// [2] https://rockridge.hatenablog.com/entry/2014/09/15/165501
// [3] https://www.reddit.com/r/firefox/comments/17oqhw3/firefox_and_ssd_disk_consumption/
//user_pref("browser.cache.disk.smart_size.enabled", false); // force a fixed max cache size on disk
//user_pref("browser.cache.disk.capacity", 512000); // default=256000; size of disk cache; 1024000=1GB, 2048000=2GB
//user_pref("browser.cache.disk.max_entry_size", 51200); // DEFAULT (50 MB); maximum size of an object in disk cache

// PREF: cache memory pool
// Cache v2 provides a memory pool that stores metadata (such as response headers)
// for recently read cache entries [1]. It is managed by a cache thread, and caches with
// metadata in the pool appear to be reused immediately.
// [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=986179
//user_pref("browser.cache.disk.metadata_memory_limit", 500); // default=250 (0.25 MB); limit of recent metadata we keep in memory for faster access

// PREF: number of chunks we preload ahead of read
// Large content such as images will load faster.
// [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=913819,988318
// [2] http://www.janbambas.cz/new-firefox-http-cache-enabled/
//user_pref("browser.cache.disk.preload_chunk_count", 4); // DEFAULT

// PREF: the time period used to re-compute the frecency value of cache entries
// The frequency algorithm is used to select entries, and entries that are recently
// saved or frequently reused are retained. The frecency value determines how
// frequently a page has been accessed and is used by Firefox's cache algorithm.
// The frequency algorithm is used to select entries, and entries that are recently
// saved or frequently reused are retained. The frecency value determines how
// often a page has been accessed and is used by Firefox's cache algorithm.
// When the memory pool becomes full, the oldest data is purged. By default,
// data older than 6 hours is treated as old.
// [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=942835,1012327
// [2] https://bugzilla.mozilla.org/buglist.cgi?bug_id=913808,968101
//user_pref("browser.cache.frecency_half_life_hours", 6); // DEFAULT

// PREF: memory limit (in kB) for new cache data not yet written to disk
// Writes to the cache are buffered and written to disk on background with low priority.
// With a slow persistent storage, these buffers may grow when data is coming
// fast from the network. When the amount of unwritten data is exceeded, new
// writes will simply fail. We have two buckets, one for important data
// (priority) like html, css, fonts and js, and one for other data like images, video, etc.
//user_pref("browser.cache.disk.max_chunks_memory_usage", 40960); // DEFAULT (40 MB)
//user_pref("browser.cache.disk.max_priority_chunks_memory_usage", 40960); // DEFAULT (40 MB)

// PREF: how often to validate document in cache
// [1] https://searchfox.org/mozilla-release/source/modules/libpref/init/StaticPrefList.yaml#1092-1096
// 0 = once-per-session
// 3 = when-appropriate/automatically (default)
//user_pref("browser.cache.check_doc_frequency, 3); // DEFAULT

// PREF: enforce free space checks
// When smartsizing is disabled, we could potentially fill all disk space by
// cache data when the disk capacity is not set correctly. To avoid that, we
// check the free space every time we write some data to the cache. The free
// space is checked against two limits. Once the soft limit is reached we start
// evicting the least useful entries, when we reach the hard limit writing to
// the entry fails.
//user_pref("browser.cache.disk.free_space_soft_limit", 10240); // default=5120 (5 MB)
//user_pref("browser.cache.disk.free_space_hard_limit", 2048); // default=1024 (1 MB)

// PREF: compression level for cached JavaScript bytecode [FF102+]
// [1] https://github.com/yokoffing/Betterfox/issues/247
// 0 = do not compress (default)
// 1 = minimal compression
// 9 = maximal compression
user_pref("browser.cache.jsbc_compression_level", 0);

// PREF: strategy to use for when the bytecode should be encoded and saved [TESTING ONLY]
// -1 makes page load times marginally longer when a page is being loaded for the first time.
// Subsequent reload of websites will be much much faster.
// [1] https://searchfox.org/mozilla-release/source/modules/libpref/init/StaticPrefList.yaml#3461-3488
// [2] https://www.reddit.com/r/firefox/comments/12786yv/improving_performance_in_firefox_android_part_ii/
// -1 = saved as soon as the script is seen for the first time, independently of the size or last access time
// 0 = saved in order to minimize the page-load time (default)
//user_pref("dom.script_loader.bytecode_cache.enabled", true); // DEFAULT
//user_pref("dom.script_loader.bytecode_cache.strategy", 0); // DEFAULT

/****************************************************************************
 * SECTION: MEMORY CACHE                                                   *
****************************************************************************/

// PREF: memory cache
// The "automatic" size selection (default) is based on a decade-old table
// that only contains settings for systems at or below 8GB of system memory [1].
// Waterfox G6 allows it to go above 8GB machines [3].
// Value can be up to the max size of an unsigned 64-bit integer.
// -1=Automatically decide the maximum memory to use to cache decoded images,
// messages, and chrome based on the total amount of RAM
// [1] https://kb.mozillazine.org/Browser.cache.memory.capacity#-1
// [2] https://searchfox.org/mozilla-central/source/netwerk/cache2/CacheObserver.cpp#94-125
// [3] https://github.com/WaterfoxCo/Waterfox/commit/3fed16932c80a2f6b37d126fe10aed66c7f1c214
user_pref("browser.cache.memory.capacity", 8388608); // DEFAULT; 256000=256 MB; 512000=500 MB; 1048576=1GB, 2097152=2GB
user_pref("browser.cache.memory.max_entry_size", 10240); // (10 MB); default=5120 (5 MB)

// PREF: amount of Back/Forward cached pages stored in memory for each tab
// Pages that were recently visited are stored in memory in such a way
// that they don't have to be re-parsed. This improves performance
// when pressing Back and Forward. This pref limits the maximum
// number of pages stored in memory. If you are not using the Back
// and Forward buttons that much, but rather using tabs, then there
// is no reason for Firefox to keep memory for this.
// -1=determine automatically (8 pages)
// [1] https://kb.mozillazine.org/Browser.sessionhistory.max_total_viewers#Possible_values_and_their_effects
//user_pref("browser.sessionhistory.max_total_viewers", 4);

/****************************************************************************
 * SECTION: MEDIA CACHE                                                     *
****************************************************************************/

// PREF: media disk cache
//user_pref("media.cache_size", 512000); // DEFAULT

// PREF: media memory cache
// [1] https://hg.mozilla.org/mozilla-central/file/tip/modules/libpref/init/StaticPrefList.yaml#l9652
// [2] https://github.com/arkenfox/user.js/pull/941
user_pref("media.memory_cache_max_size", 131072); // default=8192; AF=65536; alt=131072
user_pref("media.memory_caches_combined_limit_kb", 1048576); // DEFAULT; alt=1048576
user_pref("media.memory_caches_combined_limit_pc_sysmem", 10); // DEFAULT; alt=10; the percentage of system memory that Firefox can use for media caches

// PREF: Media Source Extensions (MSE) web standard
// Disabling MSE allows videos to fully buffer, but you're limited to 720p.
// [WARNING] Disabling MSE may break certain videos.
// false=Firefox plays the old WebM format
// true=Firefox plays the new WebM format (default)
// [1] https://support.mozilla.org/en-US/questions/1008271
//user_pref("media.mediasource.enabled", true); // DEFAULT

// PREF: adjust video buffering periods when not using MSE (in seconds)
// [NOTE] Does not affect videos over 720p since they use DASH playback [1]
// [1] https://lifehacker.com/preload-entire-youtube-videos-by-disabling-dash-playbac-1186454034
user_pref("media.cache_readahead_limit", 7200); // 120 min; default=60; stop reading ahead when our buffered data is this many seconds ahead of the current playback
user_pref("media.cache_resume_threshold", 3600); // 60 min; default=30; when a network connection is suspended, don't resume it until the amount of buffered data falls below this threshold

/****************************************************************************
 * SECTION: IMAGE CACHE                                                     *
****************************************************************************/

// PREF: image cache
user_pref("image.cache.size", 10485760); // DEFAULT; in MiB; alt=10485760 (cache images up to 10MiB in size)
user_pref("image.mem.decode_bytes_at_a_time", 65536); // default=16384; alt=65536; chunk size for calls to the image decoders

// PREF: set minimum timeout to unmap shared surfaces since they have been last used
// This is only used on 32-bit builds of Firefox where there is meaningful
// virtual address space pressure.
// [1] https://phabricator.services.mozilla.com/D109440
// [2] https://bugzilla.mozilla.org/show_bug.cgi?id=1699224
//user_pref("image.mem.shared.unmap.min_expiration_ms", 120000); // default=60000; minimum timeout to unmap shared surfaces since they have been last used

/****************************************************************************
 * SECTION: NETWORK                                                         *
****************************************************************************/

// PREF: use bigger packets
// Reduce Firefox's CPU usage by requiring fewer application-to-driver data transfers.
// However, it does not affect the actual packet sizes transmitted over the network.
// [1] https://www.mail-archive.com/support-seamonkey@lists.mozilla.org/msg74561.html
user_pref("network.buffer.cache.size", 262144); // 256 kb; default=32768 (32 kb)
user_pref("network.buffer.cache.count", 128); // default=24

// PREF: increase the absolute number of HTTP connections
// [1] https://kb.mozillazine.org/Network.http.max-connections
// [2] https://kb.mozillazine.org/Network.http.max-persistent-connections-per-server
// [3] https://www.reddit.com/r/firefox/comments/11m2yuh/how_do_i_make_firefox_use_more_of_my_900_megabit/jbfmru6/
user_pref("network.http.max-connections", 2000); // default=900
user_pref("network.http.max-persistent-connections-per-server", 10); // default=6; download connections; anything above 10 is excessive
user_pref("network.http.max-urgent-start-excessive-connections-per-host", 10); // default=3
user_pref("network.http.max-persistent-connections-per-proxy", 64); // default=32
user_pref("network.websocket.max-connections", 2000); // DEFAULT

// PREF: pacing requests [FF23+]
// Controls how many HTTP requests are sent at a time.
// Pacing HTTP requests can have some benefits, such as reducing network congestion,
// improving web page loading speed, and avoiding server overload.
// Pacing requests adds a slight delay between requests to throttle them.
// If you have a fast machine and internet connection, disabling pacing
// may provide a small speed boost when loading pages with lots of requests.
// false=Firefox will send as many requests as possible without pacing
// true=Firefox will pace requests (default)
user_pref("network.http.pacing.requests.enabled", false);
user_pref("network.http.pacing.requests.min-parallelism", 16); // default=6
user_pref("network.http.pacing.requests.burst", 16); // default=10

// PREF: increase DNS cache
// [1] https://developer.mozilla.org/en-US/docs/Web/Performance/Understanding_latency
user_pref("network.dnsCacheEntries", 1000); // default=400

// PREF: adjust DNS expiration time
// [ABOUT] about:networking#dns
// [NOTE] These prefs will be ignored by DNS resolver if using DoH/TRR.
user_pref("network.dnsCacheExpiration", 3600); // keep entries for 1 hour
    //user_pref("network.dnsCacheExpirationGracePeriod", 240); // default=60; cache DNS entries for 4 minutes after they expire

// PREF: the number of threads for DNS
user_pref("network.dns.max_high_priority_threads", 8); // default=5
//user_pref("network.dns.max_any_priority_threads", 3); // DEFAULT

// PREF: increase TLS token caching 
user_pref("network.ssl_tokens_cache_capacity", 10240); // default=2048; more TLS token caching (fast reconnects)

/****************************************************************************
 * SECTION: SPECULATIVE LOADING                                            *
****************************************************************************/

// These are connections that are not explicitly asked for (e.g., clicked on).
// [1] https://developer.mozilla.org/en-US/docs/Web/Performance/Speculative_loading

// [NOTE] FF85+ partitions (isolates) pooled connections, prefetch connections,
// pre-connect connections, speculative connections, TLS session identifiers,
// and other connections. We can take advantage of the speed of pre-connections
// while preserving privacy. Users may relax hardening to maximize their preference.
// For more information, see SecureFox: "PREF: State Paritioning" and "PREF: Network Partitioning".
// [NOTE] To activate and increase network predictions, go to settings in uBlock Origin and uncheck:
// - "Disable pre-fetching (to prevent any connection for blocked network requests)"
// [NOTE] Add prefs to "MY OVERRIDES" section and uncomment to enable them in your user.js.

// PREF: link-mouseover opening connection to linked server
// When accessing content online, devices use sockets as endpoints.
// The global limit on half-open sockets controls how many speculative
// connection attempts can occur at once when starting new connections [3].
// If the user follows through, pages can load faster since some
// work was done in advance. Firefox opens predictive connections
// to sites when hovering over New Tab thumbnails or starting a
// URL Bar search [1] and hyperlinks within a page [2].
// [NOTE] DNS (if enabled), TCP, and SSL handshakes are set up in advance,
// but page contents are not downloaded until a click on the link is registered.
// [1] https://support.mozilla.org/en-US/kb/how-stop-firefox-making-automatic-connections?redirectslug=how-stop-firefox-automatically-making-connections&redirectlocale=en-US#:~:text=Speculative%20pre%2Dconnections
// [2] https://news.slashdot.org/story/15/08/14/2321202/how-to-quash-firefoxs-silent-requests
// [3] https://searchfox.org/mozilla-central/rev/028c68d5f32df54bca4cf96376f79e48dfafdf08/modules/libpref/init/all.js#1280-1282
// [4] https://www.keycdn.com/blog/resource-hints#prefetch
// [5] https://3perf.com/blog/link-rels/#prefetch
user_pref("network.http.speculative-parallel-limit", 10); // DEFAULT

// PREF: DNS prefetching <link rel="dns-prefetch">
// Used for cross-origin connections to provide small performance improvements.
// Disable DNS prefetching to prevent Firefox from proactively resolving
// hostnames for other domains linked on a page. This may eliminate
// unnecessary DNS lookups, but can increase latency when following external links.
// [1] https://bitsup.blogspot.com/2008/11/dns-prefetching-for-firefox.html
// [2] https://css-tricks.com/prefetching-preloading-prebrowsing/#dns-prefetching
// [3] https://www.keycdn.com/blog/resource-hints#2-dns-prefetching
// [4] http://www.mecs-press.org/ijieeb/ijieeb-v7-n5/IJIEEB-V7-N5-2.pdf
user_pref("network.dns.disablePrefetch", false);
user_pref("network.dns.disablePrefetchFromHTTPS", false); // DEFAULT

// PREF: enable <link rel="preconnect"> tag and Link: rel=preconnect response header handling
//user_pref("network.preconnect", true); // DEFAULT

// PREF: preconnect to the autocomplete URL in the address bar
// Firefox preloads URLs that autocomplete when a user types into the address bar.
// Connects to destination server ahead of time, to avoid TCP handshake latency.
// [NOTE] Firefox will perform DNS lookup (if enabled) and TCP and TLS handshake,
// but will not start sending or receiving HTTP data.
// [1] https://www.ghacks.net/2017/07/24/disable-preloading-firefox-autocomplete-urls/
//user_pref("browser.urlbar.speculativeConnect.enabled", false);

// PREF: mousedown speculative connections on bookmarks and history [FF98+]
//user_pref("browser.places.speculativeConnect.enabled", false);

// PREF: network preload <link rel="preload"> [REMOVED]
// Used to load high-priority resources faster on the current page, for strategic
// performance improvements.
// Instructs the browser to immediately fetch and cache high-priority resources
// for the current page to improve performance. The browser downloads resources
// but does not execute scripts or apply stylesheets - it just caches them for
// instant availability later.
// Unlike other pre-connection tags (except modulepreload), this tag is
// mandatory for the browser.
// [1] https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload
// [2] https://w3c.github.io/preload/
// [3] https://3perf.com/blog/link-rels/#preload
// [4] https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf
// [5] https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/#how-can-preload-do-better
// [6] https://www.keycdn.com/blog/resource-hints#preload
// [7] https://github.com/arkenfox/user.js/issues/1098#issue-791949341
// [8] https://yashints.dev/blog/2018/10/06/web-perf-2#preload
// [9] https://web.dev/preload-critical-assets/
// user_pref("network.preload", true); // [REMOVED]

// PREF: network module preload <link rel="modulepreload"> [FF115+]
// High-priority loading of current page JavaScript modules.
// Used to preload high-priority JavaScript modules for strategic performance improvements.
// Module preloading allows developers to fetch JavaScript modules and dependencies
// earlier to accelerate page loads. The browser downloads, parses, and compiles modules
// referenced by links with this attribute in parallel with other resources, rather
// than sequentially waiting to process each. Preloading reduces overall download times.
// Browsers may also automatically preload dependencies without firing extra events.
// Unlike other pre-connection tags (except rel=preload), this tag is mandatory for the browser.
// [1] https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/modulepreload
user_pref("network.modulepreload", true); // DEFAULT

// PREF: link prefetching <link rel="prefetch">
// Pre-populates the HTTP cache by prefetching same-site future navigation
// resources or subresources used on those pages.
// Enabling link prefetching allows Firefox to preload pages tagged as important.
// The browser prefetches links with the prefetch-link tag, fetching resources
// likely needed for the next navigation at low priority. When clicking a link
// or loading a new page, prefetching stops and discards hints. Prefetching
// downloads resources without executing them.
// [NOTE] Since link prefetch uses the HTTP cache, it has a number of issues
// with document prefetches, such as being potentially blocked by Cache-Control headers
// (e.g. cache partitioning).
// [1] https://developer.mozilla.org/en-US/docs/Glossary/Prefetch
// [2] http://www.mecs-press.org/ijieeb/ijieeb-v7-n5/IJIEEB-V7-N5-2.pdf
// [3] https://timkadlec.com/remembers/2020-06-17-prefetching-at-this-age/
// [4] https://3perf.com/blog/link-rels/#prefetch
// [5] https://developer.mozilla.org/docs/Web/HTTP/Link_prefetching_FAQ
user_pref("network.prefetch-next", false);

// PREF: Fetch Priority API [FF119+]
// Indicates whether the `fetchpriority` attribute for elements which support it.
// [1] https://web.dev/articles/fetch-priority
// [2] https://nitropack.io/blog/post/priority-hints
// [2] https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/fetchPriority
// [3] https://developer.mozilla.org/en-US/docs/Web/API/HTMLLinkElement/fetchPriority
//user_pref("network.fetchpriority.enabled", true);

// PREF: early hints [FF120+]
// [1] https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/103
// [2] https://developer.chrome.com/blog/early-hints/
// [3] https://blog.cloudflare.com/early-hints/
// [4] https://blog.cloudflare.com/early-hints-performance/
//user_pref("network.early-hints.enabled", true);

// PREF: `Link: rel=preconnect` in 103 Early Hint response [FF120+]
// Used to warm most critical cross-origin connections to provide
// performance improvements when connecting to them.
// [NOTE] When 0, this is limited by "network.http.speculative-parallel-limit".
//user_pref("network.early-hints.preconnect.enabled", true);
//user_pref("network.early-hints.preconnect.max_connections", 10); // DEFAULT

// PREF: Network Predictor (NP)
// When enabled, it trains and uses Firefox's algorithm to preload page resource
// by tracking past page resources. It uses a local file (history) of needed images,
// scripts, etc. to request them preemptively when navigating.
// [NOTE] By default, it only preconnects, doing DNS, TCP, and SSL handshakes.
// No data sends until clicking. With "network.predictor.enable-prefetch" enabled,
// it also performs prefetches.
// [1] https://wiki.mozilla.org/Privacy/Reviews/Necko
// [2] https://www.ghacks.net/2014/05/11/seer-disable-firefox/
// [3] https://github.com/dillbyrne/random-agent-spoofer/issues/238#issuecomment-110214518
// [4] https://www.igvita.com/posa/high-performance-networking-in-google-chrome/#predictor
user_pref("network.predictor.enabled", false);

// PREF: Network Predictor fetch for resources ahead of time
// Prefetch page resources based on past user behavior.
//user_pref("network.predictor.enable-prefetch", false); // DEFAULT

// PREF: make Network Predictor active when hovering over links
// When hovering over links, Network Predictor uses past resource history to
// preemptively request what will likely be needed instead of waiting for the document.
// Predictive connections automatically open when hovering over links to speed up
// loading, starting some work in advance.
//user_pref("network.predictor.enable-hover-on-ssl", false); // DEFAULT

// PREF: assign Network Predictor confidence levels
// [NOTE] Keep in mind that Network Predictor must LEARN your browsing habits.
// Editing these lower will cause more speculative connections to occur,
// which reduces accuracy over time and has privacy implications.
//user_pref("network.predictor.preresolve-min-confidence", 60); // DEFAULT
//user_pref("network.predictor.preconnect-min-confidence", 90); // DEFAULT
//user_pref("network.predictor.prefetch-min-confidence", 100); // DEFAULT

// PREF: other Network Predictor values
// [NOTE] Keep in mmind that Network Predictor must LEARN your browsing habits.
//user_pref("network.predictor.prefetch-force-valid-for", 10); // DEFAULT; how long prefetched resources are considered valid and usable (in seconds) for the prediction modeling
//user_pref("network.predictor.prefetch-rolling-load-count", 10); // DEFAULT; the maximum number of resources that Firefox will prefetch in memory at one time based on prediction modeling
//user_pref("network.predictor.max-resources-per-entry", 250); // default=100
//user_pref("network.predictor.max-uri-length", 1000); // default=500

/****************************************************************************
 * SECTION: EXPERIMENTAL                                                    *
****************************************************************************/

// PREF: CSS Masonry Layout [NIGHTLY]
// [1] https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Masonry_Layout
user_pref("layout.css.grid-template-masonry-value.enabled", true);

// PREF: Prioritized Task Scheduling API [NIGHTLY]
// [1] https://blog.mozilla.org/performance/2022/06/02/prioritized-task-scheduling-api-is-prototyped-in-nightly/
// [2] https://medium.com/airbnb-engineering/building-a-faster-web-experience-with-the-posttask-scheduler-276b83454e91
user_pref("dom.enable_web_task_scheduling", true);

// PREF: CSS :has() selector [NIGHTLY]
// Needed for some extensions, filters, and customizations.
// [1] https://developer.mozilla.org/en-US/docs/Web/CSS/:has
// [2] https://caniuse.com/css-has
user_pref("layout.css.has-selector.enabled", true);

// PREF: HTML Sanitizer API [NIGHTLY]
// [1] https://developer.mozilla.org/en-US/docs/Web/API/Sanitizer
// [2] https://caniuse.com/mdn-api_sanitizer
user_pref("dom.security.sanitizer.enabled", true);

// PREF: WebGPU [HIGHLY EXPERIMENTAL!]
// [WARNING] Do not enable unless you are a web developer!
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1746245
// [2] https://developer.chrome.com/docs/web-platform/webgpu/
// [3] https://github.com/gpuweb/gpuweb/wiki/Implementation-Status
// [4] https://hacks.mozilla.org/2020/04/experimental-webgpu-in-firefox/
user_pref("dom.webgpu.enabled", true);
user_pref("gfx.webgpu.force-enabled", true); // enforce
// enable WebGPU indirect draws/dispatches:
user_pref("dom.webgpu.indirect-dispatch.enabled", true);

/****************************************************************************
 * SECTION: TAB UNLOAD                                                      *
****************************************************************************/

// PREF: unload tabs on low memory
// [ABOUT] about:unloads
// Firefox will detect if your computer’s memory is running low (less than 200MB)
// and suspend tabs that you have not used in awhile.
// [1] https://support.mozilla.org/en-US/kb/unload-inactive-tabs-save-system-memory-firefox
// [2] https://hacks.mozilla.org/2021/10/tab-unloading-in-firefox-93/
//user_pref("browser.tabs.unloadOnLowMemory", true); // DEFAULT

// PREF: determine when tabs unload [WINDOWS] [LINUX]
// Notify TabUnloader or send the memory pressure if the memory resource
// notification is signaled AND the available commit space is lower than
// this value.
// Set this to some high value, e.g. 2/3 of total memory available in your system:
// 4GB=2640, 8GB=5280, 16GB=10560, 32GB=21120, 64GB=42240
// [1] https://dev.to/msugakov/taking-firefox-memory-usage-under-control-on-linux-4b02
//user_pref("browser.low_commit_space_threshold_mb", 2640); // default=200; WINDOWS LINUX

// PREF: determine when tabs unload [LINUX]
// On Linux, Firefox checks available memory in comparison to total memory,
// and use this percent value (out of 100) to determine if Firefox is in a
// low memory scenario.
// [1] https://dev.to/msugakov/taking-firefox-memory-usage-under-control-on-linux-4b02
//user_pref("browser.low_commit_space_threshold_percent", 33); // default=5; LINUX

// PREF: determine how long (in ms) tabs are inactive before they unload
// 60000=1min; 300000=5min; 600000=10min (default)
//user_pref("browser.tabs.min_inactive_duration_before_unload", 300000); // 5min; default=600000

/****************************************************************************
 * SECTION: PROCESS COUNT                                                  *
****************************************************************************/

// PREF: process count
// [ABOUT] View in about:processes.
// With Firefox Quantum (2017), CPU cores = processCount. However, since the
// introduction of Fission [2], the number of website processes is controlled
// by processCount.webIsolated. Disabling fission.autostart or changing
// fission.webContentIsolationStrategy reverts control back to processCount.
// [1] https://www.reddit.com/r/firefox/comments/r69j52/firefox_content_process_limit_is_gone/
// [2] https://firefox-source-docs.mozilla.org/dom/ipc/process_model.html#web-content-processes 
user_pref("dom.ipc.processCount", 8); // DEFAULT; Shared Web Content
user_pref("dom.ipc.processCount.webIsolated", 4); // default=4; Isolated Web Content

// PREF: use one process for process preallocation cache
user_pref("dom.ipc.processPrelaunch.fission.number", 4); // default=3; Process Preallocation Cache

// PREF: configure process isolation
// [1] https://hg.mozilla.org/mozilla-central/file/tip/dom/ipc/ProcessIsolation.cpp#l53
// [2] https://www.reddit.com/r/firefox/comments/r69j52/firefox_content_process_limit_is_gone/

// OPTION 1: isolate all websites
// Web content is always isolated into its own `webIsolated` content process
// based on site-origin, and will only load in a shared `web` content process
// if site-origin could not be determined.
user_pref("fission.webContentIsolationStrategy", 1); // DEFAULT
user_pref("browser.preferences.defaultPerformanceSettings.enabled", true); // DEFAULT
user_pref("dom.ipc.processCount.webIsolated", 1); // one process per site origin

// OPTION 2: isolate only "high value" websites
// Only isolates web content loaded by sites which are considered "high
// value". A site is considered high value if it has been granted a
// `highValue*` permission by the permission manager, which is done in
// response to certain actions.
//user_pref("fission.webContentIsolationStrategy", 2);
//user_pref("browser.preferences.defaultPerformanceSettings.enabled", false);
    //user_pref("dom.ipc.processCount.webIsolated", 1); // one process per site origin (high value)
    //user_pref("dom.ipc.processCount", 8); // determine by number of CPU cores/processors

// OPTION 3: do not isolate websites
// All web content is loaded into a shared `web` content process. This is
// similar to the non-Fission behavior; however, remote subframes may still
// be used for sites with special isolation behavior, such as extension or
// mozillaweb content processes.
//user_pref("fission.webContentIsolationStrategy", 0);
//user_pref("browser.preferences.defaultPerformanceSettings.enabled", false);
//user_pref("dom.ipc.processCount", 4); // determine by number of CPU cores/processors


user_pref("apz.overscroll.enabled", true); // DEFAULT NON-LINUX
user_pref("general.smoothScroll", true); // DEFAULT
user_pref("general.smoothScroll.msdPhysics.continuousMotionMaxDeltaMS", 12);
user_pref("general.smoothScroll.msdPhysics.enabled", true);
user_pref("general.smoothScroll.msdPhysics.motionBeginSpringConstant", 600);
user_pref("general.smoothScroll.msdPhysics.regularSpringConstant", 650);
user_pref("general.smoothScroll.msdPhysics.slowdownMinDeltaMS", 25);
user_pref("general.smoothScroll.msdPhysics.slowdownMinDeltaRatio", "2.0");
user_pref("general.smoothScroll.msdPhysics.slowdownSpringConstant", 250);
user_pref("general.smoothScroll.currentVelocityWeighting", "1.0");
user_pref("general.smoothScroll.stopDecelerationWeighting", "1.0");
user_pref("mousewheel.default.delta_multiplier_y", 300); // 250-400; adjust this number to your liking

/****************************************************************************
 * SECTION: TRACKING PROTECTION                                             *
****************************************************************************/

// PREF: Enhanced Tracking Protection (ETP)
// Tracking Content blocking will strip cookies and block all resource requests to domains listed in Disconnect.me.
// Firefox deletes all stored site data (incl. cookies, browser storage) if the site is a known tracker and hasn’t
// been interacted with in the last 30 days.
// [ALLOWLIST] https://disconnect.me/trackerprotection/unblocked
// [NOTE] FF86: "Strict" tracking protection enables dFPI.
// [1] https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop
// [2] https://www.reddit.com/r/firefox/comments/l7xetb/network_priority_for_firefoxs_enhanced_tracking/gle2mqn/?web2x&context=3
user_pref("privacy.trackingprotection.enabled", true); // enabled with "Strict"
user_pref("privacy.trackingprotection.pbmode.enabled", true); // DEFAULT
user_pref("browser.contentblocking.customBlockList.preferences.ui.enabled", false); // DEFAULT
user_pref("browser.contentblocking.category", "strict");
user_pref("privacy.trackingprotection.socialtracking.enabled", true); // enabled with "Strict"
user_pref("privacy.socialtracking.block_cookies.enabled", true); // DEFAULT
user_pref("privacy.trackingprotection.cryptomining.enabled", true); // DEFAULT
user_pref("privacy.trackingprotection.fingerprinting.enabled", true); // DEFAULT
user_pref("privacy.trackingprotection.emailtracking.enabled", true); // enabled with "Strict"
user_pref("network.http.referer.disallowCrossSiteRelaxingDefault", true); // DEFAULT
user_pref("network.http.referer.disallowCrossSiteRelaxingDefault.pbmode", true); // DEFAULT
user_pref("network.http.referer.disallowCrossSiteRelaxingDefault.pbmode.top_navigation", true); // DEFAULT
user_pref("network.http.referer.disallowCrossSiteRelaxingDefault.top_navigation", true); // enabled with "Strict"
user_pref("privacy.annotate_channels.strict_list.enabled", true); // enabled with "Strict"
user_pref("privacy.annotate_channels.strict_list.pbmode.enabled", true); // DEFAULT
user_pref("privacy.fingerprintingProtection", true); // [FF114+] [ETP FF119+] enabled with "Strict"
user_pref("privacy.fingerprintingProtection.pbmode", true); // DEFAULT

// PREF: query stripping
// Currently uses a small list [1]
// We set the same query stripping list that Brave and LibreWolf uses [2]
// If using uBlock Origin or AdGuard, use filter lists as well [3]
// Query parameters stripped [5]
// [1] https://www.eyerys.com/articles/news/how-mozilla-firefox-improves-privacy-using-query-parameter-stripping-feature
// [2] https://github.com/brave/brave-core/blob/f337a47cf84211807035581a9f609853752a32fb/browser/net/brave_site_hacks_network_delegate_helper.cc
// [3] https://github.com/yokoffing/filterlists#url-tracking-parameters
// [4] https://bugzilla.mozilla.org/show_bug.cgi?id=1706607
// [5] https://firefox.settings.services.mozilla.com/v1/buckets/main/collections/query-stripping/records
user_pref("privacy.query_stripping.enabled", true); // enabled with "Strict"
user_pref("privacy.query_stripping.enabled.pbmode", true); // enabled with "Strict"
user_pref("privacy.query_stripping.strip_list", ""); // DEFAULT
user_pref("privacy.query_stripping.strip_on_share.enabled", true);

// PREF: allow embedded tweets, Instagram and Reddit posts, and TikTok embeds
// [TEST - reddit embed] https://www.pcgamer.com/amazing-halo-infinite-bugs-are-already-rolling-in/
// [TEST - instagram embed] https://www.ndtv.com/entertainment/bharti-singh-and-husband-haarsh-limbachiyaa-announce-pregnancy-see-trending-post-2646359
// [TEST - tweet embed] https://www.newsweek.com/cryptic-tweet-britney-spears-shows-elton-john-collab-may-date-back-2015-1728036
// [TEST - tiktok embed] https://www.vulture.com/article/snl-adds-four-new-cast-members-for-season-48.html
// [1] https://www.reddit.com/r/firefox/comments/l79nxy/firefox_dev_is_ignoring_social_tracking_preference/gl84ukk
// [2] https://www.reddit.com/r/firefox/comments/pvds9m/reddit_embeds_not_loading/
user_pref("urlclassifier.trackingSkipURLs", "*.reddit.com, *.twitter.com, *.twimg.com, *.tiktok.com"); // MANUAL
user_pref("urlclassifier.features.socialtracking.skipURLs", "*.instagram.com, *.twitter.com, *.twimg.com"); // MANUAL

// PREF: lower the priority of network loads for resources on the tracking protection list [NIGHTLY]
// [1] https://github.com/arkenfox/user.js/issues/102#issuecomment-298413904
//user_pref("privacy.trackingprotection.lower_network_priority", true);

// PREF: Site Isolation (sandboxing) [FF100+]
// [ABOUT] View in about:processes.
// Site Isolation (Fission) builds upon a new security architecture that extends current
// protection mechanisms by separating web content and loading each site
// in its own operating system process. This new security architecture allows
// Firefox to completely separate code originating from different sites and, in turn,
// defend against malicious sites trying to access sensitive information from other sites you are visiting.
// [1] https://hacks.mozilla.org/2021/05/introducing-firefox-new-site-isolation-security-architecture/
// [2] https://hacks.mozilla.org/2022/05/improved-process-isolation-in-firefox-100/
// [3] https://hacks.mozilla.org/2021/12/webassembly-and-back-again-fine-grained-sandboxing-in-firefox-95/
// [4] https://www.reddit.com/r/firefox/comments/r69j52/firefox_content_process_limit_is_gone/
// [5] https://hg.mozilla.org/mozilla-central/file/tip/dom/ipc/ProcessIsolation.cpp#l53
//user_pref("fission.autostart", true); // DEFAULT [DO NOT TOUCH]
//user_pref("fission.webContentIsolationStrategy", 1); // DEFAULT

// PREF: GPU sandboxing [FF110+] [WINDOWS]
// [1] https://www.ghacks.net/2023/01/17/firefox-110-will-launch-with-gpu-sandboxing-on-windows/
// [2] https://techdows.com/2023/02/disable-gpu-sandboxing-firefox.html
// 0=disabled, 1=enabled (default)
//user_pref("security.sandbox.gpu.level", 1); // DEFAULT WINDOWS

// PREF: State Paritioning [Dynamic First-Party Isolation (dFPI), Total Cookie Protection (TCP)]
// Firefox manages client-side state (i.e., data stored in the browser) to mitigate the ability of websites to abuse state
// for cross-site tracking. This effort aims to achieve that by providing what is effectively a "different", isolated storage
// location to every website a user visits.
// dFPI is a more web-compatible version of FPI, which double keys all third-party state by the origin of the top-level
// context. dFPI isolates user's browsing data for each top-level eTLD+1, but is flexible enough to apply web
// compatibility heuristics to address resulting breakage by dynamically modifying a frame's storage principal.
// dFPI isolates most sites while applying heuristics to allow sites through the isolation in certain circumstances for usability.
// [NOTE] dFPI partitions all of the following caches by the top-level site being visited: HTTP cache, image cache,
// favicon cache, HSTS cache, OCSP cache, style sheet cache, font cache, DNS cache, HTTP Authentication cache,
// Alt-Svc cache, and TLS certificate cache.
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1549587
// [2] https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Privacy/State_Partitioning
// [3] https://blog.mozilla.org/security/2021/02/23/total-cookie-protection/
// [4] https://blog.mozilla.org/en/mozilla/firefox-rolls-out-total-cookie-protection-by-default-to-all-users-worldwide/
// [5] https://hacks.mozilla.org/2021/02/introducing-state-partitioning/
// [6] https://github.com/arkenfox/user.js/issues/1281
// [7] https://hacks.mozilla.org/2022/02/improving-the-storage-access-api-in-firefox/
user_pref("network.cookie.cookieBehavior", 5); // DEFAULT FF103+
user_pref("browser.contentblocking.reject-and-isolate-cookies.preferences.ui.enabled", true); // DEFAULT

// PREF: Network Partitioning
// Networking-related APIs are not intended to be used for websites to store data, but they can be abused for
// cross-site tracking. Network APIs and caches are permanently partitioned by the top-level site.
// Network Partitioning (isolation) will allow Firefox to associate resources on a per-website basis rather than together
// in the same pool. This includes cache, favicons, CSS files, images, and even speculative connections. 
// [1] https://www.zdnet.com/article/firefox-to-ship-network-partitioning-as-a-new-anti-tracking-defense/
// [2] https://developer.mozilla.org/en-US/docs/Web/Privacy/State_Partitioning#network_partitioning
// [3] https://blog.mozilla.org/security/2021/01/26/supercookie-protections/
user_pref("privacy.partition.network_state", true); // DEFAULT
user_pref("privacy.partition.serviceWorkers", true); // [DEFAULT: true FF105+]
user_pref("privacy.partition.network_state.ocsp_cache", true); // enabled with "Strict"
user_pref("privacy.partition.bloburl_per_partition_key", true); // [FF118+]
// enable APS (Always Partitioning Storage) [FF104+]
user_pref("privacy.partition.always_partition_third_party_non_cookie_storage", true); // [DEFAULT: true FF109+]
//user_pref("privacy.partition.always_partition_third_party_non_cookie_storage.exempt_sessionstorage", false); // [DEFAULT: false FF109+]

// PREF: Smartblock
// [1] https://support.mozilla.org/en-US/kb/smartblock-enhanced-tracking-protection
// [2] https://www.youtube.com/watch?v=VE8SrClOTgw
// [3] https://searchfox.org/mozilla-central/source/browser/extensions/webcompat/data/shims.js
user_pref("extensions.webcompat.enable_shims", true); // enabled with "Strict"

// PREF: Redirect Tracking Prevention
// All storage is cleared (more or less) daily from origins that are known trackers and that
// haven’t received a top-level user interaction (including scroll) within the last 45 days.
// [1] https://www.ghacks.net/2020/08/06/how-to-enable-redirect-tracking-in-firefox/
// [2] https://www.cookiestatus.com/firefox/#other-first-party-storage
// [3] https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Privacy/Redirect_tracking_protection
// [4] https://www.ghacks.net/2020/03/04/firefox-75-will-purge-site-data-if-associated-with-tracking-cookies/
// [5] https://github.com/arkenfox/user.js/issues/1089
user_pref("privacy.purge_trackers.enabled", true); // DEFAULT

// PREF: SameSite Cookies
// Currently, the absence of the SameSite attribute implies that cookies will be
// attached to any request for a given origin, no matter who initiated that request.
// This behavior is equivalent to setting SameSite=None.
// So the pref allows the lack of attribution, or SameSite=None, only on HTTPS sites
// to prevent CSFRs on plaintext sites.
// [1] https://hacks.mozilla.org/2020/08/changes-to-samesite-cookie-behavior/
// [2] https://caniuse.com/?search=samesite
// [3] https://github.com/arkenfox/user.js/issues/1640#issuecomment-1464093950
// [4] https://support.mozilla.org/en-US/questions/1364032
// [5] https://blog.mozilla.org/security/2018/04/24/same-site-cookies-in-firefox-60/
// [6] https://web.dev/samesite-cookies-explained/
// [7] https://portswigger.net/web-security/csrf/bypassing-samesite-restrictions
// [8] https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
// [TEST] https://samesite-sandbox.glitch.me/
//user_pref("network.cookie.sameSite.laxByDefault", true);
user_pref("network.cookie.sameSite.noneRequiresSecure", true);
//user_pref("network.cookie.sameSite.schemeful", true);

// PREF: Hyperlink Auditing (click tracking)
user_pref("browser.send_pings", false); // DEFAULT

// PREF: Beacon API
// Allows websites to asynchronously transmit small amounts of data to servers
// without impacting page load performance. This allows things like activity tracking
// to be done reliably in the background. Other tracking methods like form submissions
// and XHR requests already allow similar capabilities but hurt performance.
// Disabling the Beacon API wouldn't make the data unavailable - sites could still
// collect it synchronously instead.
// [NOTE] Disabling this API sometimes causes site breakage.
// [TEST] https://vercel.com/
// [1] https://developer.mozilla.org/docs/Web/API/Navigator/sendBeacon
// [2] https://github.com/arkenfox/user.js/issues/1586
//user_pref("beacon.enabled", false);

// PREF: battery status tracking
// [NOTE] Pref remains, but API is depreciated.
// [1] https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API#browser_compatibility
//user_pref("dom.battery.enabled", false);

// PREF: remove temp files opened from non-PB windows with an external application
// [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=302433,1738574
// [2] https://github.com/arkenfox/user.js/issues/1732
user_pref("browser.download.start_downloads_in_tmp_dir", true); // [FF102+]
user_pref("browser.helperApps.deleteTempFileOnExit", true);

// PREF: disable UITour backend
// This way, there is no chance that a remote page can use it.
user_pref("browser.uitour.enabled", false);
    //user_pref("browser.uitour.url", "");

// PREF: disable remote debugging
// [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/16222
//user_pref("devtools.debugger.remote-enabled", false); // DEFAULT

// PREF: Global Privacy Control (GPC) [FF118+]
// A privacy signal that tells the websites that the user
// doesn’t want to be tracked and doesn’t want their data to be sold.
// Honored by many highly ranked sites [3].
// [SETTING] Privacy & Security > Website Privacy Preferences > Tell websites not to sell or share my data
// [TEST] https://global-privacy-control.glitch.me/
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1830623
// [2] https://globalprivacycontrol.org/press-release/20201007.html
// [3] https://github.com/arkenfox/user.js/issues/1542#issuecomment-1279823954
// [4] https://blog.mozilla.org/netpolicy/2021/10/28/implementing-global-privacy-control/
// [5] https://help.duckduckgo.com/duckduckgo-help-pages/privacy/gpc/
// [6] https://brave.com/web-standards-at-brave/4-global-privacy-control/
// [7] https://www.eff.org/gpc-privacy-badger
// [8] https://www.eff.org/issues/do-not-track
user_pref("privacy.globalprivacycontrol.enabled", true);
user_pref("privacy.globalprivacycontrol.functionality.enabled", true);

/****************************************************************************
 * SECTION: OSCP & CERTS / HPKP (HTTP Public Key Pinning)                   *
****************************************************************************/

// Online Certificate Status Protocol (OCSP)
// OCSP leaks your IP and domains you visit to the CA when OCSP Stapling is not available on visited host.
// OCSP is vulnerable to replay attacks when nonce is not configured on the OCSP responder.
// Short-lived certificates are not checked for revocation (security.pki.cert_short_lifetime_in_days, default:10).
// Firefox falls back on plain OCSP when must-staple is not configured on the host certificate.
// [1] https://scotthelme.co.uk/revocation-is-broken/
// [2] https://blog.mozilla.org/security/2013/07/29/ocsp-stapling-in-firefox/
// [3] https://github.com/arkenfox/user.js/issues/1576#issuecomment-1304590235

// PREF: disable OCSP fetching to confirm current validity of certificates
// OCSP (non-stapled) leaks information about the sites you visit to the CA (cert authority).
// It's a trade-off between security (checking) and privacy (leaking info to the CA).
// Unlike Chrome, Firefox’s default settings also query OCSP responders to confirm the validity
// of SSL/TLS certificates. However, because OCSP query failures are so common, Firefox
// (like other browsers) implements a “soft-fail” policy.
// [NOTE] This pref only controls OCSP fetching and does not affect OCSP stapling
// [SETTING] Privacy & Security>Security>Certificates>Query OCSP responder servers...
// [1] https://en.wikipedia.org/wiki/Ocsp
// [2] https://www.ssl.com/blogs/how-do-browsers-handle-revoked-ssl-tls-certificates/#ftoc-heading-3
// 0=disabled, 1=enabled (default), 2=enabled for EV certificates only
user_pref("security.OCSP.enabled", 0);

// PREF: set OCSP fetch failures to hard-fail
// When a CA cannot be reached to validate a cert, Firefox just continues the connection (=soft-fail)
// Setting this pref to true tells Firefox to instead terminate the connection (=hard-fail)
// It is pointless to soft-fail when an OCSP fetch fails: you cannot confirm a cert is still valid (it
// could have been revoked) and/or you could be under attack (e.g. malicious blocking of OCSP servers)
// [WARNING] Expect breakage:
// security.OCSP.require will make the connection fail when the OCSP responder is unavailable
// security.OCSP.require is known to break browsing on some captive portals
// [1] https://blog.mozilla.org/security/2013/07/29/ocsp-stapling-in-firefox/
// [2] https://www.imperialviolet.org/2014/04/19/revchecking.html
// [3] https://www.ssl.com/blogs/how-do-browsers-handle-revoked-ssl-tls-certificates/#ftoc-heading-3
user_pref("security.OCSP.require", false);
      
// PREF: CRLite
// CRLite covers valid certs, and it doesn't fall back to OCSP in mode 2 [FF84+].
// CRLite is faster and more private than OCSP [2].
// 0 = disabled
// 1 = consult CRLite but only collect telemetry
// 2 = consult CRLite and enforce both "Revoked" and "Not Revoked" results
// 3 = consult CRLite and enforce "Not Revoked" results, but defer to OCSP for "Revoked" [FF99+, default FF100+]
// [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1429800,1670985,1753071
// [2] https://blog.mozilla.org/security/tag/crlite/
user_pref("security.remote_settings.crlite_filters.enabled", true);
user_pref("security.pki.crlite_mode", 2);

// PREF: HTTP Public Key Pinning (HPKP)
// HPKP enhances the security of SSL certificates by associating
// a host with their expected public key. It prevents attackers
// from impersonating the host using fraudulent certificates,
// even if they hold a valid certificate from a trusted certification authority.
// HPKP ensures that the client maintains a secure connection with
// the correct server, thereby reducing the risk of man-in-the-middle (MITM) attacks.
// [NOTE] If you rely on an antivirus to protect your web browsing
// by inspecting ALL your web traffic, then leave at 1.
// [ERROR] MOZILLA_PKIX_ERROR_KEY_PINNING_FAILURE
// By default, pinning enforcement is not applied if a user-installed
// certificate authority (CA) is present. However, this allows user-installed
// CAs to override pins for any site, negating the security benefits of HPKP.
// 0=disabled, 1=allow user MiTM (such as your antivirus) (default), 2=strict
// [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/16206
// [2] https://bugzilla.mozilla.org/show_bug.cgi?id=1168603
// [3] https://github.com/yokoffing/Betterfox/issues/53#issuecomment-1035554783
user_pref("security.cert_pinning.enforcement_level", 2);

// PREF: do not trust installed third-party root certificates [FF120+]
// Disable Enterprise Root Certificates of the operating system. 
// For users trying to get intranet sites on managed networks,
// or who have security software configured to analyze web traffic.
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1848815
//user_pref("security.enterprise_roots.enabled", false);
    //user_pref("security.certerrors.mitm.auto_enable_enterprise_roots", false);

/****************************************************************************
 * SECTION: SSL (Secure Sockets Layer) / TLS (Transport Layer Security)    *
****************************************************************************/

// PREF: display warning on the padlock for "broken security"
// [NOTE] Warning padlock not indicated for subresources on a secure page! [2]
// [1] https://wiki.mozilla.org/Security:Renegotiation
// [2] https://bugzilla.mozilla.org/1353705
user_pref("security.ssl.treat_unsafe_negotiation_as_broken", true);

// PREF: require safe negotiation
// [ERROR] SSL_ERROR_UNSAFE_NEGOTIATION
// [WARNING] Breaks ea.com login (Sep 2023).
// Blocks connections to servers that don't support RFC 5746 [2]
// as they're potentially vulnerable to a MiTM attack [3].
// A server without RFC 5746 can be safe from the attack if it
// disables renegotiations but the problem is that the browser can't
// know that. Setting this pref to true is the only way for the
// browser to ensure there will be no unsafe renegotiations on
// the channel between the browser and the server.
// [STATS] SSL Labs > Renegotiation Support (Feb 2023) reports over 99.3% of top sites have secure renegotiation [4].
// [1] https://wiki.mozilla.org/Security:Renegotiation
// [2] https://datatracker.ietf.org/doc/html/rfc5746
// [3] https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2009-3555
// [4] https://www.ssllabs.com/ssl-pulse/
//user_pref("security.ssl.require_safe_negotiation", true);

// PREF: display advanced information on Insecure Connection warning pages
// [TEST] https://expired.badssl.com/
user_pref("browser.xul.error_pages.expert_bad_cert", true);

// PREF: disable 0-RTT (round-trip time) to improve TLS 1.3 security [FF51+]
// This data is not forward secret, as it is encrypted solely under keys derived using
// the offered PSK. There are no guarantees of non-replay between connections.
// [1] https://github.com/tlswg/tls13-spec/issues/1001
// [2] https://www.rfc-editor.org/rfc/rfc9001.html#name-replay-attacks-with-0-rtt
// [3] https://blog.cloudflare.com/tls-1-3-overview-and-q-and-a/
user_pref("security.tls.enable_0rtt_data", false);

/****************************************************************************
 * SECTION: FINGERPRINT PROTECTION (RFP)                                    *
****************************************************************************/

// PREF: enable FingerPrint Protection (FPP) [WiP]
// [1] https://github.com/arkenfox/user.js/issues/1661
// [2] https://bugzilla.mozilla.org/show_bug.cgi?id=1816064
user_pref("privacy.resistFingerprinting.randomization.daily_reset.enabled", true);
user_pref("privacy.resistFingerprinting.randomization.daily_reset.private.enabled", true);

/****************************************************************************
 * SECTION: RESIST FINGERPRINTING (RFP)                                     *
****************************************************************************/

// PREF: enable advanced fingerprinting protection 
// [WARNING] Leave disabled unless you're okay with all the drawbacks
// [1] https://librewolf.net/docs/faq/#what-are-the-most-common-downsides-of-rfp-resist-fingerprinting
// [2] https://www.reddit.com/r/firefox/comments/wuqpgi/comment/ile3whx/?context=3
user_pref("privacy.resistFingerprinting", true);

// PREF: set new window size rounding max values [FF55+]
// [SETUP-CHROME] sizes round down in hundreds: width to 200s and height to 100s, to fit your screen
// [1] https://bugzilla.mozilla.org/1330882
//user_pref("privacy.window.maxInnerWidth", 1600);
//user_pref("privacy.window.maxInnerHeight", 900);

// PREF: disable showing about:blank as soon as possible during startup [FF60+]
// [1] https://github.com/arkenfox/user.js/issues/1618
// [2] https://bugzilla.mozilla.org/1448423
user_pref("browser.startup.blankWindow", false);

// PREF: disable ICC color management
// Use a color calibrator for best results [WINDOWS]
// Also may help improve font rendering on WINDOWS
// [SETTING] General>Language and Appearance>Fonts and Colors>Colors>Use system colors
// default=false NON-WINDOWS
// [1] https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/3.5/ICC_color_correction_in_Firefox
//user_pref("browser.display.use_system_colors", false);

// PREF: enforce non-native widget theme
// Security: removes/reduces system API calls, e.g. win32k API [1]
// Fingerprinting: provides a uniform look and feel across platforms [2]
// [1] https://bugzilla.mozilla.org/1381938
// [2] https://bugzilla.mozilla.org/1411425
//user_pref("widget.non-native-theme.enabled", true); // DEFAULT

/****************************************************************************
 * SECTION: DISK AVOIDANCE                                                  *
****************************************************************************/

// PREF: prevent media cache from writing to disk in Private Browsing
// [NOTE] MSE (Media Source Extensions) are already stored in-memory in PB
user_pref("browser.privatebrowsing.forceMediaMemoryCache", true);

// PREF: set the minimum interval (in milliseconds) between session save operations,
// when crashing or restarting to install updates
// [NOTE] The value is how often FF checks for state changes.
// Data is only saved when state changes [2].
// [1] https://kb.mozillazine.org/Browser.sessionstore.interval
// [2] https://bugzilla.mozilla.org/1304389
user_pref("browser.sessionstore.interval", 60000); // 1 minute; default=15000 (15s)

// PREF: store extra session data when crashing or restarting to install updates
// Dictates whether sites may save extra session data such as form content,
// scrollbar positions, and POST data.
// 0=everywhere (default), 1=unencrypted sites, 2=nowhere
//user_pref("browser.sessionstore.privacy_level", 2);

// PREF: disable automatic Firefox start and session restore after reboot [WINDOWS]
// [1] https://bugzilla.mozilla.org/603903
//user_pref("toolkit.winRegisterApplicationRestart", false);

// PREF: disable favicons in shortcuts [WINDOWS]
// Fetches and stores favicons for Windows .URL shortcuts created by drag and drop
// [NOTE] .URL shortcut files will be created with a generic icon.
// Favicons are stored as .ico files in profile_dir\shortcutCache.
//user_pref("browser.shell.shortcutFavicons", false);

// PREF: remove temp files opened with an external application
// [1] https://bugzilla.mozilla.org/302433
//user_pref("browser.helperApps.deleteTempFileOnExit", true); // DEFAULT [FF108]

// PREF: disable page thumbnails capturing
// Page thumbnails are only used in chrome/privileged contexts.
//user_pref("browser.pagethumbnails.capturing_disabled", true); // [HIDDEN PREF]

/******************************************************************************
 * SECTION: CLEARING DATA DEFAULTS                           *
******************************************************************************/

// PREF: reset default 'Time range to clear' for 'Clear Recent History'.
// Firefox remembers your last choice. This will reset the value when you start Firefox.
// 0=everything, 1=last hour, 2=last two hours, 3=last four hours,
// 4=today, 5=last five minutes, 6=last twenty-four hours
// The values 5 + 6 are not listed in the dropdown, which will display a
// blank value if they are used, but they do work as advertised.
//user_pref("privacy.sanitize.timeSpan", 0);

// PREF: reset default items to clear with Ctrl-Shift-Del
// This dialog can also be accessed from the menu History>Clear Recent History
// Firefox remembers your last choices. This will reset them when you start Firefox.
// Regardless of what you set privacy.cpd.downloads to, as soon as the dialog
// for "Clear Recent History" is opened, it is synced to the same as 'history'.
//user_pref("privacy.cpd.history", true); // Browsing & Download History [DEFAULT]
//user_pref("privacy.cpd.formdata", true); // Form & Search History [DEFAULT]
//user_pref("privacy.cpd.cache", true); // Cache [DEFAULT]
//user_pref("privacy.cpd.cookies", true); // Cookies [DEFAULT]
//user_pref("privacy.cpd.sessions", false); // Active Logins [DEFAULT]
//user_pref("privacy.cpd.offlineApps", false); // Offline Website Data [DEFAULT]
//user_pref("privacy.cpd.siteSettings", false); // Site Preferences [DEFAULT]

/******************************************************************************
 * SECTION: SHUTDOWN & SANITIZING                           *
******************************************************************************/

// PREF: set History section to show all options
// Settings>Privacy>History>Use custom settings for history
// [INFOGRAPHIC] https://bugzilla.mozilla.org/show_bug.cgi?id=1765533#c1
user_pref("privacy.history.custom", true);

// PREF: clear browsing data on shutdown, while respecting site exceptions
// Set cookies, site data, cache, etc. to clear on shutdown.
// [SETTING] Privacy & Security>History>Custom Settings>Clear history when Firefox closes>Settings
// [NOTE] "sessions": Active Logins: refers to HTTP Basic Authentication [1], not logins via cookies
// [NOTE] "offlineApps": Offline Website Data: localStorage, service worker cache, QuotaManager (IndexedDB, asm-cache)
// Clearing "offlineApps" may affect login items after browser restart [2].
// [1] https://en.wikipedia.org/wiki/Basic_access_authentication
// [2] https://github.com/arkenfox/user.js/issues/1291
//user_pref("privacy.sanitize.sanitizeOnShutdown", true);

// Uncomment individual prefs to disable clearing on shutdown:
// [NOTE] If "history" is true, downloads will also be cleared.
// [NOTE] Even if "downloads" pref is enabled, downloads won't be cleared unless "history" is set to true!
//user_pref("privacy.clearOnShutdown.history", true); // [DEFAULT]
    //user_pref("privacy.clearOnShutdown.downloads", true);
//user_pref("privacy.clearOnShutdown.formdata", true); // [DEFAULT]
//user_pref("privacy.clearOnShutdown.sessions", true); // [DEFAULT]
//user_pref("privacy.clearOnShutdown.offlineApps", true);
//user_pref("privacy.clearOnShutdown.siteSettings", false); // [DEFAULT]

// PREF: configure site exceptions
// [NOTE] Currently, there is no way to add sites via about:config
// [SETTING] to manage site exceptions: Options>Privacy & Security>Cookies & Site Data>Manage Exceptions
// or when on the website in question: Ctrl+I>Permissions>Cookies>Allow 
// For cross-domain logins, add exceptions for both sites:
// e.g. https://www.youtube.com (site) + https://accounts.google.com (single sign on)
// [WARNING] Be selective with what cookies you keep, as they also disable partitioning [1]
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1767271

/******************************************************************************
 * SECTION: SEARCH / URL BAR                                                 *
******************************************************************************/

// PREF: trim certain parts of the URL
// Makes the domain name more prominent by graying out other parts of the URL.
// [1] https://udn.realityripple.com/docs/Mozilla/Preferences/Preference_reference/browser.urlbar.trimURLs
// [2] https://winaero.com/firefox-75-strips-https-and-www-from-address-bar-results/
user_pref("browser.urlbar.trimURLs", true); // DEFAULT

// PREF: trim HTTPS from the URL bar [FF119+]
// Firefox will hide https:// from the address bar, but not subdomains like www.
// It saves some space. Betterfox already uses HTTPS-by-Default and insecure sites
// get a padlock with a red stripe. Copying the URL still copies the scheme,
// so it's not like we need to see https. It's not a privacy issue, so you can add to your overrides.
// [TEST] http://www.http2demo.io/
// [1] https://www.ghacks.net/2023/09/19/firefox-119-will-launch-with-an-important-address-bar-change/
user_pref("browser.urlbar.trimHttps", true);

// PREF: display "Not Secure" text on HTTP sites
// Needed with HTTPS-First Policy; not needed with HTTPS-Only Mode.
user_pref("security.insecure_connection_text.enabled", true);
user_pref("security.insecure_connection_text.pbmode.enabled", true);

// PREF: do not show search terms in URL bar [FF110+] [FF113+]
// Show search query instead of URL on search results pages.
// [SETTING] Search>Search Bar>Use the address bar for search and navigation>Show search terms instead of URL...
user_pref("browser.urlbar.showSearchTerms.enabled", false);

// PREF: enable seperate search engine for Private Windows
// [SETTINGS] Preferences>Search>Default Search Engine>"Use this search engine in Private Windows"
user_pref("browser.search.separatePrivateDefault.ui.enabled", true);
// [SETTINGS] "Choose a different default search engine for Private Windows only"
user_pref("browser.search.separatePrivateDefault", true); // DEFAULT
// enable prompt for searching in a Private Window when using normal browsing window URL bar
// [1] https://www.reddit.com/r/firefox/comments/yg8jyh/different_private_search_option_gone_firefox_106/
//user_pref("browser.search.separatePrivateDefault.urlbarResult.enabled", true); // HIDDEN

// PREF: enable option to add custom search engine
// [SETTINGS] Settings -> Search -> Search Shortcuts -> Add
// [EXAMPLE] https://search.brave.com/search?q=%s
// [EXAMPLE] https://lite.duckduckgo.com/lite/?q=%s
// [1] https://reddit.com/r/firefox/comments/xkzswb/adding_firefox_search_engine_manually/
user_pref("browser.urlbar.update2.engineAliasRefresh", true); // HIDDEN

// PREF: disable urlbar live search engine suggestions (Google, Bing, etc.)
// [WARNING] Search engines keylog every character you type from the URL bar.
user_pref("browser.search.suggest.enabled", false);
user_pref("browser.search.suggest.enabled.private", false); // DEFAULT

// PREF: disable Firefox Suggest
// [1] https://github.com/arkenfox/user.js/issues/1257
user_pref("browser.urlbar.quicksuggest.enabled", false); // controls whether the UI is shown
user_pref("browser.urlbar.suggest.quicksuggest.sponsored", false);
user_pref("browser.urlbar.suggest.quicksuggest.nonsponsored", false);
// hide Firefox Suggest label in URL dropdown box
user_pref("browser.urlbar.groupLabels.enabled", false);

// PREF: disable search and form history
// Be aware that autocomplete form data can be read by third parties [1][2].
// Form data can easily be stolen by third parties.
// [SETTING] Privacy & Security>History>Custom Settings>Remember search and form history
// [1] https://blog.mindedsecurity.com/2011/10/autocompleteagain.html
// [2] https://bugzilla.mozilla.org/381681
user_pref("browser.formfill.enable", false);

// PREF: URL bar domain guessing
// Domain guessing intercepts DNS "hostname not found errors" and resends a
// request (e.g. by adding www or .com). This is inconsistent use (e.g. FQDNs), does not work
// via Proxy Servers (different error), is a flawed use of DNS (TLDs: why treat .com
// as the 411 for DNS errors?), privacy issues (why connect to sites you didn't
// intend to), can leak sensitive data (e.g. query strings: e.g. Princeton attack),
// and is a security risk (e.g. common typos & malicious sites set up to exploit this).
//user_pref("browser.fixup.alternate.enabled", false); // [DEFAULT FF104+]

// PREF: disable location bar autofill
// https://support.mozilla.org/en-US/kb/address-bar-autocomplete-firefox#w_url-autocomplete
user_pref("browser.urlbar.autoFill", false);

// PREF: enforce Punycode for Internationalized Domain Names to eliminate possible spoofing
// Firefox has some protections, but it is better to be safe than sorry.
// [!] Might be undesirable for non-latin alphabet users since legitimate IDN's are also punycoded.
// [EXAMPLE] https://www.techspot.com/news/100555-malvertising-attack-uses-punycode-character-spread-malware-through.html
// [TEST] https://www.xn--80ak6aa92e.com/ (www.apple.com)
// [1] https://wiki.mozilla.org/IDN_Display_Algorithm
// [2] https://en.wikipedia.org/wiki/IDN_homograph_attack
// [3] CVE-2017-5383: https://www.mozilla.org/security/advisories/mfsa2017-02/
// [4] https://www.xudongz.com/blog/2017/idn-phishing/
user_pref("network.IDN_show_punycode", true);

/******************************************************************************
 * SECTION: HTTPS-FIRST POLICY                          *
******************************************************************************/

// PREF: HTTPS-First Policy
// Firefox attempts to make all connections to websites secure,
// and falls back to insecure connections only when a website
// does not support it. Unlike HTTPS-Only Mode, Firefox
// will NOT ask for your permission before connecting to a website
// that doesn’t support secure connections.
// As of August 2023, Google estimates that 5-10% of traffic
// has remained on HTTP, allowing attackers to eavesdrop
// on or change that data [6].
// [NOTE] HTTPS-Only Mode needs to be disabled for HTTPS First to work.
// [TEST] http://example.com [upgrade]
// [TEST] http://httpforever.com/ [no upgrade]
// [1] https://blog.mozilla.org/security/2021/08/10/firefox-91-introduces-https-by-default-in-private-browsing/
// [2] https://brave.com/privacy-updates/22-https-by-default/
// [3] https://github.com/brave/adblock-lists/blob/master/brave-lists/https-upgrade-exceptions-list.txt
// [4] https://web.dev/why-https-matters/
// [5] https://www.cloudflare.com/learning/ssl/why-use-https/
// [6] https://blog.chromium.org/2023/08/towards-https-by-default.html
user_pref("dom.security.https_first", true);
user_pref("dom.security.https_first_pbm", true); // DEFAULT

/******************************************************************************
 * SECTION: HTTPS-ONLY MODE                              *
******************************************************************************/

// Firefox displays a warning page if HTTPS is not supported
// by a server. Options to use HTTP are then provided.
// [NOTE] When "https_only_mode" (all windows) is true,
// "https_only_mode_pbm" (private windows only) is ignored.
// As of August 2023, Google estimates that 5-10% of traffic
// has remained on HTTP, allowing attackers to eavesdrop
// on or change that data [5].
// [SETTING] to add site exceptions: Padlock>HTTPS-Only mode>On/Off/Off temporarily
// [SETTING] Privacy & Security>HTTPS-Only Mode
// [TEST] http://example.com [upgrade]
// [TEST] http://httpforever.com/ [no upgrade]
// [1] https://bugzilla.mozilla.org/1613063
// [2] https://blog.mozilla.org/security/2020/11/17/firefox-83-introduces-https-only-mode/
// [3] https://web.dev/why-https-matters/
// [4] https://www.cloudflare.com/learning/ssl/why-use-https/
// [5] https://blog.chromium.org/2023/08/towards-https-by-default.html

// PREF: enable HTTPS-only Mode
user_pref("dom.security.https_only_mode_pbm", true); // Private Browsing windows only
user_pref("dom.security.https_only_mode", true); // Normal + Private Browsing windows

// PREF: offer suggestion for HTTPS site when available
// [1] https://twitter.com/leli_gibts_scho/status/1371463866606059528
// [TEST] http://speedofanimals.com/
user_pref("dom.security.https_only_mode_error_page_user_suggestions", true);

// PREF: HTTP background requests in HTTPS-only Mode
// When attempting to upgrade, if the server doesn't respond within 3 seconds[=default time],
// Firefox sends HTTP requests in order to check if the server supports HTTPS or not.
// This is done to avoid waiting for a timeout which takes 90 seconds.
// Firefox only sends top level domain when falling back to http.
// [WARNING] Disabling causes long timeouts when no path to HTTPS is present.
// [NOTE] Use "Manage Exceptions" for sites known for no HTTPS.
// [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1642387,1660945
// [2] https://blog.mozilla.org/attack-and-defense/2021/03/10/insights-into-https-only-mode/
user_pref("dom.security.https_only_mode_send_http_background_request", true); // DEFAULT
user_pref("dom.security.https_only_fire_http_request_background_timer_ms", 3000); // DEFAULT

// PREF: disable HTTPS-Only mode for local resources
user_pref("dom.security.https_only_mode.upgrade_local", false); // DEFAULT

/******************************************************************************
 * SECTION: DNS-over-HTTPS                                                    *
******************************************************************************/

// PREF: DNS-over-HTTPS (DoH) implementation
// [NOTE] Mode 3 has site exceptions with a nice UI on the error page.
// [SETTINGS] Privacy & Security > DNS over HTTPS > Enable secure DNS using:
// [NOTE] Mode 3 has site-exceptions with a nice UI on the error page.
// [1] https://hacks.mozilla.org/2018/05/a-cartoon-intro-to-dns-over-https/
// [2] https://support.mozilla.org/en-US/kb/dns-over-https#w_protection-levels-explained
// 0= Default Protection: Firefox decides when to use secure DNS (default)
// 2= Increased Protection: use DoH and fall back to native DNS if necessary
// 3= Max Protection: only use DoH; do not fall back to native DNS
// 5= Off: disable DoH
user_pref("network.trr.mode", 3); // DEFAULT

// PREF: lower max attempts to use DoH
// If DNS requests take too long, FF will fallback to your default DNS much quicker.
//user_pref("network.trr.max-fails", 5); // default=15

// PREF: display fallback warning page [FF115+]
// Show a warning checkbox UI in modes 0 or 2 above.
//user_pref("network.trr_ui.show_fallback_warning_option", false); // DEFAULT
//user_pref("network.trr.display_fallback_warning", false); // DEFAULT

// PREF: DoH resolver
// [1] https://github.com/uBlockOrigin/uBlock-issues/issues/1710
//user_pref("network.trr.uri", "https://xxxx/dns-query");
    //user_pref("network.trr.custom_uri", "https://xxxx/dns-query");

// PREF: set DoH bootstrap address [FF89+]
// Firefox uses the system DNS to initially resolve the IP address of your DoH server.
// When set to a valid, working value that matches your "network.trr.uri" Firefox
// won't use the system DNS. If the IP doesn't match then DoH won't work
//user_pref("network.trr.bootstrapAddr", "10.0.0.1"); // [HIDDEN PREF]

// PREF: adjust providers
user_pref("network.trr.resolvers", '[{ "name": "Cloudflare", "url": "https://mozilla.cloudflare-dns.com/dns-query" },{ "name": "SecureDNS", "url": "https://doh.securedns.eu/dns-query" },{ "name": "AppliedPrivacy", "url": "https://doh.appliedprivacy.net/query" },{ "name": "Digitale Gesellschaft (CH)", "url": "https://dns.digitale-gesellschaft.ch/dns-query" }, { "name": "Quad9", "url": "https://dns.quad9.net/dns-query" }]');

// PREF: EDNS Client Subnet (ECS)
// [WARNING] In some circumstances, enabling ECS may result
// in suboptimal routing between CDN origins and end users [2].
// [NOTE] You will also need to enable this with your
// DoH provider most likely.
// [1] https://en.wikipedia.org/wiki/EDNS_Client_Subnet
// [2] https://www.quad9.net/support/faq/#edns
// [3] https://datatracker.ietf.org/doc/html/rfc7871
//user_pref("network.trr.disable-ECS", true); // DEFAULT

// PREF: DNS Rebind Protection
// false=do not allow RFC 1918 private addresses in TRR responses (default)
// true=allow RFC 1918 private addresses in TRR responses
// [1] https://docs.controld.com/docs/dns-rebind-option
user_pref("network.trr.allow-rfc1918", false); // DEFAULT

// PREF: assorted options
user_pref("network.trr.confirmationNS", "skip"); // skip undesired DOH test connection
user_pref("network.trr.skip-AAAA-when-not-supported", true); // DEFAULT; If Firefox detects that your system does not have IPv6 connectivity, it will not request IPv6 addresses from the DoH server
user_pref("network.trr.clear-cache-on-pref-change", true); // DEFAULT; DNS+TRR cache will be cleared when a relevant TRR pref changes
user_pref("network.trr.wait-for-portal", false); // DEFAULT; set this to true to tell Firefox to wait for the captive portal detection before TRR is used

// PREF: DOH exlcusions
//user_pref("network.trr.excluded-domains", ""); // DEFAULT; comma-separated list of domain names to be resolved using the native resolver instead of TRR. This pref can be used to make /etc/hosts works with DNS over HTTPS in Firefox.
user_pref("network.trr.builtin-excluded-domains", "localhost,local"); // DEFAULT; comma-separated list of domain names to be resolved using the native resolver instead of TRR

// PREF: Oblivious HTTP (OHTTP) (DoOH)
// [Oct 2023] Cloudflare are the only ones running an OHTTP server and resolver,
// but there needs to be a relay, and it's not the cheapest thing to run.
// [1] https://blog.cloudflare.com/stronger-than-a-promise-proving-oblivious-http-privacy-properties/
// [2] https://www.ietf.org/archive/id/draft-thomson-http-oblivious-01.html
// [3] https://old.reddit.com/r/dnscrypt/comments/11ukt43/what_is_dns_over_oblivious_http_targetrelay/ji1nl0m/?context=3
//user_pref("network.trr.mode", 2);
//user_pref("network.trr.ohttp.config_uri", "https://dooh.cloudflare-dns.com/.well-known/doohconfig");
//user_pref("network.trr.ohttp.uri", "https://dooh.cloudflare-dns.com/dns-query");
//user_pref("network.trr.ohttp.relay_uri", ""); // custom
//user_pref("network.trr.use_ohttp", true);

// PREF: Encrypted Client Hello (ECH) [FF118]
// [NOTE] HTTP is already isolated with network partitioning.
// [TEST] https://www.cloudflare.com/ssl/encrypted-sni
// [1] https://support.mozilla.org/en-US/kb/understand-encrypted-client-hello
// [2] https://blog.mozilla.org/en/products/firefox/encrypted-hello/
// [3] https://support.mozilla.org/en-US/kb/faq-encrypted-client-hello#w_can-i-use-ech-alongside-other-security-tools-like-vpnsre
// [4] https://wiki.mozilla.org/Security/Encrypted_Client_Hello#Preferences
//user_pref("network.dns.echconfig.enabled", true); // use ECH for TLS Connections
//user_pref("network.dns.http3_echconfig.enabled", true); // use ECH for QUIC connections
//user_pref("network.dns.echconfig.fallback_to_origin_when_all_failed", false); // fallback to non-ECH without an authenticated downgrade signal

/******************************************************************************
 * SECTION: PROXY / SOCKS / IPv6                           *
******************************************************************************/

// PREF: disable IPv6
// If you are not masking your IP, then this won't make much difference.
// And some VPNs now cover IPv6.
// [TEST] https://ipleak.org/
// [1] https://www.internetsociety.org/tag/ipv6-security/ (Myths 2,4,5,6)
//user_pref("network.dns.disableIPv6", true);

// PREF: set the proxy server to do any DNS lookups when using SOCKS
// e.g. in Tor, this stops your local DNS server from knowing your Tor destination
// as a remote Tor node will handle the DNS request.
// [1] https://trac.torproject.org/projects/tor/wiki/doc/TorifyHOWTO/WebBrowsers
// [SETTING] Settings>Network Settings>Proxy DNS when using SOCKS v5
//user_pref("network.proxy.socks_remote_dns", true);

// PREF: disable using UNC (Uniform Naming Convention) paths [FF61+]
// [SETUP-CHROME] Can break extensions for profiles on network shares.
// [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/26424
//user_pref("network.file.disable_unc_paths", true); // [HIDDEN PREF]

// PREF: disable GIO as a potential proxy bypass vector
// Gvfs/GIO has a set of supported protocols like obex, network,
// archive, computer, dav, cdda, gphoto2, trash, etc.
// From FF87-117, by default only sftp was accepted.
// [1] https://bugzilla.mozilla.org/1433507
// [2] https://en.wikipedia.org/wiki/GVfs
// [3] https://en.wikipedia.org/wiki/GIO_(software)
//user_pref("network.gio.supported-protocols", ""); // [HIDDEN PREF] [DEFAULT FF118+]

// PREF: disable check for proxies
//user_pref("network.notify.checkForProxies", false);

/******************************************************************************
 * SECTION: PASSWORDS                                                        *
******************************************************************************/

// PREF: disable password manager
// [NOTE] This does not clear any passwords already saved.
// [SETTING] Privacy & Security>Logins and Passwords>Ask to save logins and passwords for websites
user_pref("signon.rememberSignons", false);
user_pref("signon.rememberSignons.visibilityToggle", false); // DEFAULT
user_pref("signon.schemeUpgrades", false); // DEFAULT
user_pref("signon.showAutoCompleteFooter", false); // DEFAULT
user_pref("signon.autologin.proxy", false); // DEFAULT

// PREF: disable auto-filling username & password form fields
// Can leak in cross-site forms and be spoofed.
// [NOTE] Username and password is still available when you enter the field.
// [SETTING] Privacy & Security>Logins and Passwords>Autofill logins and passwords
//user_pref("signon.autofillForms", false);
//user_pref("signon.autofillForms.autocompleteOff", true); // DEFAULT

// PREF: disable formless login capture for Password Manager [FF51+]
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1166947
user_pref("signon.formlessCapture.enabled", false);

// PREF: disable capturing credentials in private browsing
user_pref("signon.privateBrowsingCapture.enabled", false);

// PREF: disable autofilling saved passwords on HTTP pages
// [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1217152,1319119
//user_pref("signon.autofillForms.http", false); // DEFAULT

// PREF: disable Firefox built-in password generator
// Create passwords with random characters and numbers.
// [NOTE] Doesn't work with Lockwise disabled!
// [1] https://wiki.mozilla.org/Toolkit:Password_Manager/Password_Generation
user_pref("signon.generation.enabled", false);

// PREF: disable Firefox Lockwise (about:logins)
// [NOTE] No usernames or passwords are sent to third-party sites.
// [1] https://lockwise.firefox.com/
// [2] https://support.mozilla.org/en-US/kb/firefox-lockwise-managing-account-data
// user_pref("signon.management.page.breach-alerts.enabled", false); 
    //user_pref("signon.management.page.breachAlertUrl", "");
// user_pref("browser.contentblocking.report.lockwise.enabled", false);
    //user_pref("browser.contentblocking.report.lockwise.how_it_works.url", "");

// PREF: disable websites autocomplete
// Don't let sites dictate use of saved logins and passwords.
//user_pref("signon.storeWhenAutocompleteOff", false);

// PREF: limit (or disable) HTTP authentication credentials dialogs triggered by sub-resources [FF41+]
// Hardens against potential credentials phishing.
// 0=don't allow sub-resources to open HTTP authentication credentials dialogs
// 1=don't allow cross-origin sub-resources to open HTTP authentication credentials dialogs
// 2=allow sub-resources to open HTTP authentication credentials dialogs (default)
// [1] https://www.fxsitecompat.com/en-CA/docs/2015/http-auth-dialog-can-no-longer-be-triggered-by-cross-origin-resources/
user_pref("network.auth.subresource-http-auth-allow", 1);

// PREF: prevent password truncation when submitting form data
// [1] https://www.ghacks.net/2020/05/18/firefox-77-wont-truncate-text-exceeding-max-length-to-address-password-pasting-issues/
user_pref("editor.truncate_user_pastes", false);

// PREF: reveal password icon
//user_pref("layout.forms.reveal-password-context-menu.enabled", true); // right-click menu option; DEFAULT [FF112]
// [DO NOT TOUCH] Icons will double-up if the website implements it natively.
//user_pref("layout.forms.reveal-password-button.enabled", true); // always show icon in password fields

/****************************************************************************
 * SECTION: ADDRESS + CREDIT CARD MANAGER                                   *
****************************************************************************/

// PREF: disable form autofill
// [NOTE] stored data is not secure (uses a JSON file)
// [1] https://wiki.mozilla.org/Firefox/Features/Form_Autofill
// [2] https://www.ghacks.net/2017/05/24/firefoxs-new-form-autofill-is-awesome
user_pref("extensions.formautofill.addresses.enabled", false);
user_pref("extensions.formautofill.creditCards.enabled", false);

/******************************************************************************
 * SECTION: MIXED CONTENT + CROSS-SITE                                       *
******************************************************************************/

// [TEST] https://mixed-script.badssl.com/

// PREF: disable automatic authentication on Microsoft sites [WINDOWS]
// [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1695693,1719301
//user_pref("network.http.windows-sso.enabled", false);

// PREF: block insecure active content (scripts) on HTTPS pages
// [1] https://trac.torproject.org/projects/tor/ticket/21323
//user_pref("security.mixed_content.block_active_content", true); // DEFAULT

// PREF: block insecure passive content (images) on HTTPS pages
// Using HTTPS First Policy, Firefox will still make a HTTP connection
// if it can't find a secure connection, so this isn't redundant.
// There's the small chance that someone does a MITM on the images
// and deploys a malicious image. (They're rare, but possible).
// [NOTE] You can remove if using HTTPS-Only Mode.
user_pref("security.mixed_content.block_display_content", true);

// PREF: upgrade passive content to use HTTPS on secure pages
// [NOTE] You can remove if using HTTPS-Only Mode.
user_pref("security.mixed_content.upgrade_display_content", true);
// [FF119+]:
//user_pref("security.mixed_content.upgrade_display_content.audio", true); // DEFAULT
user_pref("security.mixed_content.upgrade_display_content.image", true);
//user_pref("security.mixed_content.upgrade_display_content.video", true); // DEFAULT

// PREF: block insecure downloads from secure sites
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1660952
//user_pref("dom.block_download_insecure", true); // DEFAULT

// PREF: allow PDFs to load javascript
// https://www.reddit.com/r/uBlockOrigin/comments/mulc86/firefox_88_now_supports_javascript_in_pdf_files/
user_pref("pdfjs.enableScripting", false);

// PREF: limit allowed extension directories
// The pref value represents the sum: e.g. 5 would be profile and application directories.
// [WARNING] Breaks usage of files which are installed outside allowed directories.
// [1] https://archive.is/DYjAM
// 1=profile, 2=user, 4=application, 8=system, 16=temporary, 31=all
//user_pref("extensions.enabledScopes", 5); // [HIDDEN PREF] DEFAULT
  // user_pref("extensions.autoDisableScopes", 15); // [DEFAULT: 15]

// PREF: disable bypassing 3rd party extension install prompts
// [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1659530,1681331
user_pref("extensions.postDownloadThirdPartyPrompt", false);

// PREF: disable middle click on new tab button opening URLs or searches using clipboard [FF115+]
// Enable if you're using LINUX.
//user_pref("browser.tabs.searchclipboardfor.middleclick", false); // DEFAULT WINDOWS macOS

// PREF: enforce TLS 1.0 and 1.1 downgrades as session only
//user_pref("security.tls.version.enable-deprecated", false); // DEFAULT

// PREF: enable (limited but sufficient) window.opener protection
// Makes rel=noopener implicit for target=_blank in anchor and area elements when no rel attribute is set.
// [1] https://jakearchibald.com/2016/performance-benefits-of-rel-noopener/
//user_pref("dom.targetBlankNoOpener.enabled", true); // DEFAULT

// PREF: enable "window.name" protection
// If a new page from another domain is loaded into a tab, then window.name is set to an empty string. The original
// string is restored if the tab reverts back to the original page. This change prevents some cross-site attacks.
//user_pref("privacy.window.name.update.enabled", true); // DEFAULT

/******************************************************************************
 * SECTION: HEADERS / REFERERS                                               *
******************************************************************************/

// PREF: default referrer policy (used unless overriden by the site)
// 0=no-referrer, 1=same-origin, 2=strict-origin-when-cross-origin (default),
// 3=no-referrer-when-downgrade
// [1] https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy#examples
// [2] https://plausible.io/blog/referrer-policy
//user_pref("network.http.referer.defaultPolicy", 2); // DEFAULT
//user_pref("network.http.referer.defaultPolicy.pbmode", 2); // DEFAULT

// PREF: default Referrer Policy for trackers (used unless overriden by the site)
// Applied to third-party trackers when the default
// cookie policy is set to reject third-party trackers.
// 0=no-referrer, 1=same-origin, 2=strict-origin-when-cross-origin (default),
// 3=no-referrer-when-downgrade
// [1] https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy#examples
//user_pref("network.http.referer.defaultPolicy.trackers", 1);
//user_pref("network.http.referer.defaultPolicy.trackers.pbmode", 1);

// PREF: HTTP Referrer Header
// [NOTE] Only cross-origin referers need control.
// See network.http.referer.XOriginPolicy.
// This may cause breakage where third party images and videos
// may not load, and with authentication on sites such as banks.
// 0 = Never send
// 1 = Send only when clicking on links and similar elements
// 2 = Send on all requests (default)
//user_pref("network.http.sendRefererHeader", 2); // DEFAULT

// PREF: control when to send a cross-origin referer
// Controls whether or not to send a referrer across different sites.
// This includes images, links, and embedded social media on pages.
// This may cause breakage where third party images and videos
// may not load, and with authentication on sites such as banks.
// [NOTE] Most navigational "tracking" is harmless (i.e., the same for everyone)
// and effectively blocking cross-site referers just breaks a lot of sites.
// 0=always send referrer (default)
// 1=send across subdomains [from a.example.com to b.example.com] (breaks Instagram embeds, Bing login, MangaPill, and some streaming sites)
// 2=full host name must match [from c.example.com to c.example.com] (breaks Vimeo, iCloud, Instagram, Amazon book previews, and more)
// [TEST] https://www.jeffersonscher.com/res/jstest.php
// [1] https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy#examples
// [2] https://web.dev/referrer-best-practices/
//user_pref("network.http.referer.XOriginPolicy", 0); // DEFAULT

// PREF: control the amount of cross-origin information to send
// Controls how much referrer to send across origins (different domains).
// 0=send full URI (default), 1=scheme+host+port+path, 2=scheme+host+port
// [1] https://blog.mozilla.org/security/2021/03/22/firefox-87-trims-http-referrers-by-default-to-protect-user-privacy/
// [2] https://web.dev/referrer-best-practices/
// [3] https://www.reddit.com/r/waterfox/comments/16px8yq/comment/k29r6bu/?context=3
user_pref("network.http.referer.XOriginTrimmingPolicy", 2);

/******************************************************************************
 * SECTION: CONTAINERS                                                       *
******************************************************************************/

// PREF: enable Container Tabs and its UI setting [FF50+]
// [NOTE] No longer a privacy benefit due to Firefox upgrades (see State Partitioning and Network Partitioning)
// Useful if you want to login to the same site under different accounts
// You also may want to download Multi-Account Containers for extra options (2)
// [SETTING] General>Tabs>Enable Container Tabs
// [1] https://wiki.mozilla.org/Security/Contextual_Identity_Project/Containers
// [2] https://addons.mozilla.org/en-US/firefox/addon/multi-account-containers/
user_pref("privacy.userContext.ui.enabled", true);
//user_pref("privacy.userContext.enabled", true);

// PREF: set behavior on "+ Tab" button to display container menu on left click [FF74+]
// [NOTE] The menu is always shown on long press and right click.
// [SETTING] General>Tabs>Enable Container Tabs>Settings>Select a container for each new tab ***/
//user_pref("privacy.userContext.newTabContainerOnLeftClick.enabled", true);

/******************************************************************************
 * SECTION: WEBRTC                                                           *
******************************************************************************/

// PREF: disable WebRTC (Web Real-Time Communication)
// Firefox desktop uses mDNS hostname obfuscation and the private IP is never exposed until
// required in TRUSTED scenarios; i.e. after you grant device (microphone or camera) access.
// [TEST] https://browserleaks.com/webrtc
// [1] https://groups.google.com/g/discuss-webrtc/c/6stQXi72BEU/m/2FwZd24UAQAJ
// [2] https://datatracker.ietf.org/doc/html/draft-ietf-mmusic-mdns-ice-candidates#section-3.1.1
//user_pref("media.peerconnection.enabled", false);

// PREF: enable WebRTC Global Mute Toggles [NIGHTLY]
//user_pref("privacy.webrtc.globalMuteToggles", true);

// PREF: force WebRTC inside the proxy [FF70+]
user_pref("media.peerconnection.ice.proxy_only_if_behind_proxy", true);

// PREF: force a single network interface for ICE candidates generation [FF42+]
// When using a system-wide proxy, it uses the proxy interface.
// [1] https://developer.mozilla.org/en-US/docs/Web/API/RTCIceCandidate
// [2] https://wiki.mozilla.org/Media/WebRTC/Privacy
user_pref("media.peerconnection.ice.default_address_only", true);

// PREF: force exclusion of private IPs from ICE candidates [FF51+]
// [SETUP-HARDEN] This will protect your private IP even in TRUSTED scenarios after you
// grant device access, but often results in breakage on video-conferencing platforms.
//user_pref("media.peerconnection.ice.no_host", true);

/******************************************************************************
 * SECTION: PLUGINS                                                          *
******************************************************************************/

// PREF: disable GMP (Gecko Media Plugins)
// [1] https://wiki.mozilla.org/GeckoMediaPlugins
//user_pref("media.gmp-provider.enabled", false);

// PREF: disable widevine CDM (Content Decryption Module)
// [NOTE] This is covered by the EME master switch.
//user_pref("media.gmp-widevinecdm.enabled", false);

// PREF: disable all DRM content (EME: Encryption Media Extension)
// EME is a JavaScript API for playing DRMed (not free) video content in HTML.
// A DRM component called a Content Decryption Module (CDM) decrypts,
// decodes, and displays the video.
// e.g. Netflix, Amazon Prime, Hulu, HBO, Disney+, Showtime, Starz, DirectTV
// DRM is a propriety and closed source, but disabling is overkill.
// [SETTING] General>DRM Content>Play DRM-controlled content
// [TEST] https://bitmovin.com/demos/drm
// [1] https://www.eff.org/deeplinks/2017/10/drms-dead-canary-how-we-just-lost-web-what-we-learned-it-and-what-we-need-do-next
// [2] https://www.reddit.com/r/firefox/comments/10gvplf/comment/j55htc7
//user_pref("media.eme.enabled", false);
    // Optionally, hide the setting which also disables the DRM prompt:
    //user_pref("browser.eme.ui.enabled", false);

/******************************************************************************
 * SECTION: VARIOUS                                                          *
******************************************************************************/

// PREF: enable FTP protocol
// Firefox redirects any attempt to load a FTP resource.
// to the default search engine if the FTP protocol is disabled.
// [1] https://www.ghacks.net/2018/02/20/firefox-60-with-new-preference-to-disable-ftp/
//user_pref("network.ftp.enabled", true);

// PREF: decode URLs in other languages
// [WARNING] Causes unintended consequences when copy+paste links with underscores.
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1320061
//user_pref("browser.urlbar.decodeURLsOnCopy", false); // DEFAULT

// PREF: number of usages of the web console
// If this is less than 5, then pasting code into the web console is disabled.
//user_pref("devtools.selfxss.count", 5);

/******************************************************************************
 * SECTION: SAFE BROWSING (SB)                                               *
******************************************************************************/

// A full url is never sent to Google, only a part-hash of the prefix,
// hidden with noise of other real part-hashes. Firefox takes measures such as
// stripping out identifying parameters, and since SBv4 (FF57+), doesn't even use cookies.
// (Turn on browser.safebrowsing.debug to monitor this activity)
// [1] https://feeding.cloud.geek.nz/posts/how-safe-browsing-works-in-firefox/
// [2] https://wiki.mozilla.org/Security/Safe_Browsing
// [3] https://support.mozilla.org/kb/how-does-phishing-and-malware-protection-work
// [4] https://educatedguesswork.org/posts/safe-browsing-privacy/
// [5] https://www.google.com/chrome/privacy/whitepaper.html#malware
// [6] https://security.googleblog.com/2022/08/how-hash-based-safe-browsing-works-in.html

// PREF: Safe Browsing
// [WARNING] Be sure to have alternate security measures if you disable SB! Adblockers do not count!
// [SETTING] Privacy & Security>Security>... Block dangerous and deceptive content
// [ALTERNATIVE] Enable local checks only: https://github.com/yokoffing/Betterfox/issues/87
// [1] https://support.mozilla.org/en-US/kb/how-does-phishing-and-malware-protection-work#w_what-information-is-sent-to-mozilla-or-its-partners-when-phishing-and-malware-protection-is-enabled
// [2] https://wiki.mozilla.org/Security/Safe_Browsing
// [3] https://developers.google.com/safe-browsing/v4
// [4] https://github.com/privacyguides/privacyguides.org/discussions/423#discussioncomment-1752006
// [5] https://github.com/privacyguides/privacyguides.org/discussions/423#discussioncomment-1767546
// [6] https://wiki.mozilla.org/Security/Safe_Browsing
// [7] https://ashkansoltani.org/2012/02/25/cookies-from-nowhere (outdated)
// [8] https://blog.cryptographyengineering.com/2019/10/13/dear-apple-safe-browsing-might-not-be-that-safe/ (outdated)
// [9] https://the8-bit.com/apple-proxies-google-safe-browsing-privacy/
// [10] https://github.com/brave/brave-browser/wiki/Deviations-from-Chromium-(features-we-disable-or-remove)#services-we-proxy-through-brave-servers
//user_pref("browser.safebrowsing.malware.enabled", false); // all checks happen locally
//user_pref("browser.safebrowsing.phishing.enabled", false); // all checks happen locally
//user_pref("browser.safebrowsing.blockedURIs.enabled", false); // all checks happen locally
    //user_pref("browser.safebrowsing.provider.google4.gethashURL", "");
    //user_pref("browser.safebrowsing.provider.google4.updateURL", "");
    //user_pref("browser.safebrowsing.provider.google.gethashURL", "");
    //user_pref("browser.safebrowsing.provider.google.updateURL", "");

// PREF: disable SB checks for downloads
// This is the master switch for the safebrowsing.downloads prefs (both local lookups + remote).
// [NOTE] Still enable this for checks to happen locally.
// [SETTING] Privacy & Security>Security>... "Block dangerous downloads"
//user_pref("browser.safebrowsing.downloads.enabled", false); // all checks happen locally
      
// PREF: disable SB checks for downloads (remote)
// To verify the safety of certain executable files, Firefox may submit some information about the
// file, including the name, origin, size and a cryptographic hash of the contents, to the Google
// Safe Browsing service which helps Firefox determine whether or not the file should be blocked.
// [NOTE] If you do not understand the consequences, override this.
user_pref("browser.safebrowsing.downloads.remote.enabled", false);
      //user_pref("browser.safebrowsing.downloads.remote.url", "");
// disable SB checks for unwanted software
// [SETTING] Privacy & Security>Security>... "Warn you about unwanted and uncommon software"
        //user_pref("browser.safebrowsing.downloads.remote.block_potentially_unwanted", false);
        //user_pref("browser.safebrowsing.downloads.remote.block_uncommon", false);

// PREF: allow user to "ignore this warning" on SB warnings
// If clicked, it bypasses the block for that session. This is a means for admins to enforce SB.
// Report false positives to [2]
// [TEST] see https://github.com/arkenfox/user.js/wiki/Appendix-A-Test-Sites#-mozilla
// [1] https://bugzilla.mozilla.org/1226490
// [2] https://safebrowsing.google.com/safebrowsing/report_general/
//user_pref("browser.safebrowsing.allowOverride", true); // DEFAULT

/******************************************************************************
 * SECTION: MOZILLA                                                   *
******************************************************************************/

// PREF: prevent accessibility services from accessing your browser [RESTART]
// Accessibility Service may negatively impact Firefox browsing performance.
// Disable it if you’re not using any type of physical impairment assistive software.
// [1] https://support.mozilla.org/kb/accessibility-services
// [2] https://www.ghacks.net/2021/08/25/firefox-tip-turn-off-accessibility-services-to-improve-performance/
// [3] https://www.reddit.com/r/firefox/comments/p8g5zd/why_does_disabling_accessibility_services_improve
// [4] https://winaero.com/firefox-has-accessibility-service-memory-leak-you-should-disable-it/
// [5] https://www.ghacks.net/2022/12/26/firefoxs-accessibility-performance-is-getting-a-huge-boost/
//user_pref("accessibility.force_disabled", 1);
    //user_pref("devtools.accessibility.enabled", false);

// PREF: disable Firefox Sync
// [ALTERNATIVE] Use xBrowserSync [1]
// [1] https://addons.mozilla.org/en-US/firefox/addon/xbs
// [2] https://github.com/arkenfox/user.js/issues/1175
user_pref("identity.fxaccounts.enabled", false);

// PREF: disable Firefox View [FF106+]
// [1] https://support.mozilla.org/en-US/kb/how-set-tab-pickup-firefox-view#w_what-is-firefox-view
user_pref("browser.tabs.firefox-view", false);
//user_pref("browser.tabs.firefox-view-next", false); // [FF119+]

// PREF: disable the Firefox View tour from popping up
//user_pref("browser.firefox-view.feature-tour", "{\"screen\":\"\",\"complete\":true}");

// PREF: disable Push Notifications API [FF44+]
// Push is an API that allows websites to send you (subscribed) messages even when the site
// isn't loaded, by pushing messages to your userAgentID through Mozilla's Push Server.
// You shouldn't need to disable this.
// [WHY] Push requires subscription.
// [NOTE] To remove all subscriptions, reset "dom.push.userAgentID"
// [1] https://support.mozilla.org/en-US/kb/push-notifications-firefox
// [2] https://developer.mozilla.org/en-US/docs/Web/API/Push_API
// [3] https://www.reddit.com/r/firefox/comments/fbyzd4/the_most_private_browser_isnot_firefox/
//user_pref("dom.push.enabled", false);
    //user_pref("dom.push.userAgentID", "");

// PREF: default permission for Web Notifications
// To add site exceptions: Page Info>Permissions>Receive Notifications
// To manage site exceptions: Options>Privacy & Security>Permissions>Notifications>Settings
// 0=always ask (default), 1=allow, 2=block
user_pref("permissions.default.desktop-notification", 2);
   
// PREF: default permission for Location Requests
// 0=always ask (default), 1=allow, 2=block
user_pref("permissions.default.geo", 2);

// PREF: use Mozilla geolocation service instead of Google when geolocation is enabled
user_pref("geo.provider.network.url", "https://location.services.mozilla.com/v1/geolocate?key=%MOZILLA_API_KEY%");

// PREF: disable using the OS's geolocation service
//user_pref("geo.provider.ms-windows-location", false); // [WINDOWS]
//user_pref("geo.provider.use_corelocation", false); // [MAC]
//user_pref("geo.provider.use_gpsd", false); // [LINUX] broken on Linux?
//user_pref("geo.provider.use_geoclue", false); // [FF102+] [LINUX]

// PREF: logging geolocation to the console
//user_pref("geo.provider.network.logging.enabled", true);

// PREF: disable region updates
// [1] https://firefox-source-docs.mozilla.org/toolkit/modules/toolkit_modules/Region.html
//user_pref("browser.region.update.enabled", false);
    //user_pref("browser.region.network.url", "");

// PREF: enforce Firefox blocklist for extensions + no hiding tabs
// This includes updates for "revoked certificates".
// [1] https://blog.mozilla.org/security/2015/03/03/revoking-intermediate-certificates-introducing-onecrl/
// [2] https://trac.torproject.org/projects/tor/ticket/16931
//user_pref("extensions.blocklist.enabled", true); // DEFAULT

// PREF: disable auto-INSTALLING Firefox updates [NON-WINDOWS]
// [NOTE] In FF65+ on Windows this SETTING (below) is now stored in a file and the pref was removed.
// [SETTING] General>Firefox Updates>Check for updates but let you choose to install them
//user_pref("app.update.auto", false);

// PREF: disable automatic extension updates
//user_pref("extensions.update.enabled", false);

// PREF: disable search engine updates (e.g. OpenSearch)
// [NOTE] This does not affect Mozilla's built-in or Web Extension search engines.
//user_pref("browser.search.update", false);

// PREF: remove special permissions for certain mozilla domains
// default = resource://app/defaults/permissions
//user_pref("permissions.manager.defaultsUrl", "");

// PREF: remove webchannel whitelist
user_pref("webchannel.allowObject.urlWhitelist", "");

// PREF: disable mozAddonManager Web API [FF57+]
// [NOTE] To allow extensions to work on AMO, you also need extensions.webextensions.restrictedDomains.
// [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1384330,1406795,1415644,1453988
//user_pref("privacy.resistFingerprinting.block_mozAddonManager", true); // [HIDDEN PREF FF57-108]

// PREF: disable webextension restrictions on Mozilla domains
// [NOTE] May only work with PREF: privacy.resistfingerprinting enabled and/or DEV/NIGHTLY-only?
// [1] https://www.reddit.com/r/firefox/comments/n1lpaf/make_addons_work_on_mozilla_sites/gwdy235/?context=3
// [2] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1384330,1406795,1415644,1453988
//user_pref("extensions.webextensions.restrictedDomains", "");

// PREF: do not require signing for extensions [ESR/DEV/NIGHTLY ONLY]
// [1] https://support.mozilla.org/en-US/kb/add-on-signing-in-firefox#w_what-are-my-options-if-i-want-to-use-an-unsigned-add-on-advanced-users
//user_pref("xpinstall.signatures.required", false);

// PREF: disable Quarantined Domains [FF115+]
// Users may see a notification when running add-ons that are not monitored by Mozilla when they visit certain sites.
// The notification informs them that “some extensions are not allowed” and were blocked from running on that site.
// There's no details as to which sites are affected.
// [1] https://support.mozilla.org/en-US/kb/quarantined-domains
// [2] https://www.ghacks.net/2023/07/04/firefox-115-new-esr-base-and-some-add-ons-may-be-blocked-from-running-on-certain-sites/
//user_pref("extensions.quarantinedDomains.enabled", false);

/******************************************************************************
 * SECTION: TELEMETRY                                                   *
******************************************************************************/

// PREF: disable new data submission [FF41+]
// If disabled, no policy is shown or upload takes place, ever.
// [1] https://bugzilla.mozilla.org/1195552
user_pref("datareporting.policy.dataSubmissionEnabled", false);

// PREF: disable Health Reports
// [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to send technical data.
user_pref("datareporting.healthreport.uploadEnabled", false);

// PREF: disable telemetry
// - If "unified" is false then "enabled" controls the telemetry module
// - If "unified" is true then "enabled" only controls whether to record extended data
// [NOTE] "toolkit.telemetry.enabled" is now LOCKED to reflect prerelease (true) or release builds (false) [2]
// [1] https://firefox-source-docs.mozilla.org/toolkit/components/telemetry/telemetry/internals/preferences.html
// [2] https://medium.com/georg-fritzsche/data-preference-changes-in-firefox-58-2d5df9c428b5 ***/
user_pref("toolkit.telemetry.unified", false);
user_pref("toolkit.telemetry.enabled", false); // see [NOTE]
user_pref("toolkit.telemetry.server", "data:,");
user_pref("toolkit.telemetry.archive.enabled", false);
user_pref("toolkit.telemetry.newProfilePing.enabled", false);
user_pref("toolkit.telemetry.shutdownPingSender.enabled", false);
user_pref("toolkit.telemetry.updatePing.enabled", false);
user_pref("toolkit.telemetry.bhrPing.enabled", false); // [FF57+] Background Hang Reporter
user_pref("toolkit.telemetry.firstShutdownPing.enabled", false);
user_pref("toolkit.telemetry.dap_enabled", false); // DEFAULT [FF108]

// PREF: disable Telemetry Coverage
// [1] https://blog.mozilla.org/data/2018/08/20/effectively-measuring-search-in-firefox/
user_pref("toolkit.telemetry.coverage.opt-out", true); // [HIDDEN PREF]
user_pref("toolkit.coverage.opt-out", true); // [FF64+] [HIDDEN PREF]
user_pref("toolkit.coverage.endpoint.base", "");

// PREF: disable PingCentre telemetry (used in several System Add-ons) [FF57+]
// Currently blocked by 'datareporting.healthreport.uploadEnabled'
user_pref("browser.ping-centre.telemetry", false);

// PREF: disable Firefox Home (Activity Stream) telemetry 
user_pref("browser.newtabpage.activity-stream.feeds.telemetry", false);
user_pref("browser.newtabpage.activity-stream.telemetry", false);

/******************************************************************************
 * SECTION: EXPERIMENTS                                                      *
******************************************************************************/

// PREF: disable Studies
// [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to install and run studies
user_pref("app.shield.optoutstudies.enabled", false);

// PREF: disable Normandy/Shield [FF60+]
// Shield is an telemetry system (including Heartbeat) that can also push and test "recipes".
// [1] https://mozilla.github.io/normandy/
user_pref("app.normandy.enabled", false);
user_pref("app.normandy.api_url", "");

/******************************************************************************
 * SECTION: CRASH REPORTS                                                    *
******************************************************************************/

// PREF: disable crash reports
user_pref("breakpad.reportURL", "");
user_pref("browser.tabs.crashReporting.sendReport", false);
    //user_pref("browser.crashReports.unsubmittedCheck.enabled", false); // DEFAULT

// PREF: enforce no submission of backlogged crash reports
// [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to send backlogged crash reports
user_pref("browser.crashReports.unsubmittedCheck.autoSubmit2", false);

/******************************************************************************
 * SECTION: DETECTION                                                        *
******************************************************************************/

// PREF: disable Captive Portal detection
// [1] https://www.eff.org/deeplinks/2017/08/how-captive-portals-interfere-wireless-security-and-privacy
// [2] https://wiki.mozilla.org/Necko/CaptivePortal
user_pref("captivedetect.canonicalURL", "");
user_pref("network.captive-portal-service.enabled", false);

// PREF: disable Network Connectivity checks
// [WARNING] Do NOT use for mobile devices. May NOT be able to use Firefox on public wifi (hotels, coffee shops, etc).
// [1] https://bugzilla.mozilla.org/1460537
user_pref("network.connectivity-service.enabled", false);

// PREF: software that continually reports what default browser you are using [WINDOWS]
// [WARNING] Breaks "Make Default..." button in Preferences to set Firefox as the default browser [2].
// [1] https://techdows.com/2020/04/what-is-firefox-default-browser-agent-and-how-to-disable-it.html
// [2] https://github.com/yokoffing/Betterfox/issues/166
//user_pref("default-browser-agent.enabled", false);

// PREF: "report extensions for abuse"
//user_pref("extensions.abuseReport.enabled", false);

// PREF: check bundled omni JARs for corruption
// [1] https://github.com/ghostery/user-agent-desktop/issues/141
// [2] https://github.com/arkenfox/user.js/issues/791
//user_pref("corroborator.enabled", false);

// PREF: assorted telemetry
// [NOTE] Shouldn't be needed for user.js, but browser forks
// may want to disable these prefs.
//user_pref("doh-rollout.disable-heuristics", true); // ensure DoH doesn't get enabled automatically
//user_pref("dom.security.unexpected_system_load_telemetry_enabled", false);
//user_pref("messaging-system.rsexperimentloader.enabled", false);
//user_pref("network.trr.confirmation_telemetry_enabled", false);
//user_pref("security.app_menu.recordEventTelemetry", false);
//user_pref("security.certerrors.mitm.priming.enabled", false);
//user_pref("security.certerrors.recordEventTelemetry", false);
//user_pref("security.protectionspopup.recordEventTelemetry", false);
//user_pref("signon.recipes.remoteRecipes.enabled", false);
//user_pref("security.identitypopup.recordEventTelemetry", false); // ESR only; removed FF116+ [1]
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1837979
//user_pref("privacy.trackingprotection.emailtracking.data_collection.enabled", false);

/****************************************************************************
 * SECTION: MOZILLA UI                                                      *
****************************************************************************/

// PREF: Mozilla VPN
// [1] https://github.com/yokoffing/Betterfox/issues/169
user_pref("browser.privatebrowsing.vpnpromourl", "");
    //user_pref("browser.vpn_promo.enabled", false);

// PREF: disable about:addons' Recommendations pane (uses Google Analytics)
user_pref("extensions.getAddons.showPane", false); // HIDDEN

// PREF: disable recommendations in about:addons' Extensions and Themes panes
user_pref("extensions.htmlaboutaddons.recommendations.enabled", false);

// PREF: Personalized Extension Recommendations in about:addons and AMO
// [NOTE] This pref has no effect when Health Reports are disabled.
// [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to make personalized extension recommendations
user_pref("browser.discovery.enabled", false);

// PREF: disable Fakespot integration [FF116+]
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1840156#c0
// [2] https://github.com/arkenfox/user.js/issues/1730
// [3] https://www.fakespot.com/
// [4] https://www.ghacks.net/2023/10/12/firefox-will-soon-tell-you-if-product-reviews-are-reliable/
//user_pref("browser.shopping.experience2023.enabled", false); // [DEFAULT: false]

// PREF: disable Firefox from asking to set as the default browser
// [1] https://github.com/yokoffing/Betterfox/issues/166
user_pref("browser.shell.checkDefaultBrowser", false);

// PREF: disable Extension Recommendations (CFR: "Contextual Feature Recommender")
// [1] https://support.mozilla.org/en-US/kb/extension-recommendations
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.addons", false);
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.features", false);

// PREF: hide "More from Mozilla" in Settings
user_pref("browser.preferences.moreFromMozilla", false);

// PREF: only show List All Tabs icon when needed
// true=always show tab overflow dropdown (FF106+ default)
// false=only display tab dropdown when there are too many tabs
// [1] https://www.ghacks.net/2022/10/19/how-to-hide-firefoxs-list-all-tabs-icon/
user_pref("browser.tabs.tabmanager.enabled", false);

// PREF: tab and about:config warnings
//user_pref("browser.tabs.warnOnClose", false); // DEFAULT [FF94+]
//user_pref("browser.tabs.warnOnCloseOtherTabs", true); // DEFAULT
//user_pref("browser.tabs.warnOnOpen", true); // DEFAULT
user_pref("browser.aboutConfig.showWarning", false);

// PREF: disable welcome notices
//user_pref("browser.startup.homepage_override.mstone", "ignore"); // What's New page after updates; master switch
user_pref("browser.aboutwelcome.enabled", false); // disable Intro screens
    //user_pref("startup.homepage_welcome_url", "");
    //user_pref("startup.homepage_welcome_url.additional", "");
    //user_pref("startup.homepage_override_url", ""); // What's New page after updates

// PREF: disable "What's New" toolbar icon [FF69+]
//user_pref("browser.messaging-system.whatsNewPanel.enabled", false);

/****************************************************************************
 * SECTION: THEME ADJUSTMENTS                                              *
****************************************************************************/

// PREF: enable Firefox to use userChome, userContent, etc.
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);

// PREF: add compact mode back to options
user_pref("browser.compactmode.show", true);

// PREF: remove focus indicator for links
// [1] https://www.askvg.com/firefox-tip-restore-classic-dotted-outline-focus-indicator-for-links/
user_pref("browser.display.focus_ring_on_anything", true); 
user_pref("browser.display.focus_ring_style", 0);
user_pref("browser.display.focus_ring_width", 0);

// PREF: preferred color scheme for websites
// [SETTING] General>Language and Appearance>Website appearance
// By default, color scheme matches the theme of your browser toolbar (3).
// Set this pref to choose Dark on sites that support it (0) or Light (1).
// Before FF95, the pref was 2, which determined site color based on OS theme.
// Dark (0), Light (1), System (2), Browser (3) [DEFAULT FF95+]
// [1] https://www.reddit.com/r/firefox/comments/rfj6yc/how_to_stop_firefoxs_dark_theme_from_overriding/hoe82i5/?context=3
user_pref("layout.css.prefers-color-scheme.content-override", 2);

// PREF: disable always using dark theme for private browsing windows [FF106+]
//user_pref("browser.theme.dark-private-windows", false);

// PREF: prevent private windows being separate from normal windows in taskbar [WINDOWS] [FF106+]
user_pref("browser.privateWindowSeparation.enabled", false);

// PREF: reduce the size of the "private window" indicator in tab bar [FF106+]
//user_pref("browser.privatebrowsing.enable-new-indicator", false); // REMOVED [FF119+]

/****************************************************************************
 * SECTION: COOKIE BANNER HANDLING                                         *
****************************************************************************/

// PREF: Cookie Banner handling
// [NOTE] Feature still enforces Total Cookie Protection to limit 3rd-party cookie tracking [1]
// [1] https://github.com/mozilla/cookie-banner-rules-list/issues/33#issuecomment-1318460084
// [2] https://phabricator.services.mozilla.com/D153642
// [3] https://winaero.com/make-firefox-automatically-click-on-reject-all-in-cookie-banner-consent/
// [4] https://docs.google.com/spreadsheets/d/1Nb4gVlGadyxix4i4FBDnOeT_eJp2Zcv69o-KfHtK-aA/edit#gid=0
// 2: reject banners if it is a one-click option; otherwise, fall back to the accept button to remove banner
// 1: reject banners if it is a one-click option; otherwise, keep banners on screen
// 0: disable all cookie banner handling
user_pref("cookiebanners.service.mode", 1);
user_pref("cookiebanners.service.mode.privateBrowsing", 1);

// PREF: Cookie Banner global rules
// Global rules that can handle a list of cookie banner libraries and providers on any site.
// This is used for click rules that can handle common Consent Management Providers (CMP).
user_pref("cookiebanners.service.enableGlobalRules", true);

/****************************************************************************
 * SECTION: TRANSLATIONS                                                   *
****************************************************************************/

// PREF: Firefox Translations [FF118+]
// Automated translation of web content is done locally in Firefox, so that
// the text being translated does not leave your machine.
// [ABOUT] Visit about:translations to translate your own text as well.
// [1] https://blog.mozilla.org/en/mozilla/local-translation-add-on-project-bergamot/
// [2] https://blog.nightly.mozilla.org/2023/06/01/firefox-translations-and-other-innovations-these-weeks-in-firefox-issue-139/
// [3] https://www.ghacks.net/2023/08/02/mozilla-firefox-117-beta-brings-an-automatic-language-translator-for-websites-and-it-works-offline/
user_pref("browser.translations.enable", false); // DEFAULT
user_pref("browser.translations.autoTranslate", false);

/****************************************************************************
 * SECTION: FULLSCREEN NOTICE                                               *
****************************************************************************/

// PREF: remove fullscreen delay
user_pref("full-screen-api.transition-duration.enter", "0 0"); // default=200 200
user_pref("full-screen-api.transition-duration.leave", "0 0"); // default=200 200

// PREF: disable fullscreen notice
user_pref("full-screen-api.warning.delay", -1); // default=500
user_pref("full-screen-api.warning.timeout", 0); // default=3000

/****************************************************************************
 * SECTION: FONT APPEARANCE                                                 *
****************************************************************************/

// PREF: smoother font
// [1] https://reddit.com/r/firefox/comments/wvs04y/windows_11_firefox_v104_font_rendering_different/?context=3
user_pref("gfx.webrender.quality.force-subpixel-aa-where-possible", true);

// PREF: use DirectWrite everywhere like Chrome [WINDOWS]
// [1] https://kb.mozillazine.org/Thunderbird_6.0,_etc.#Font_rendering_and_performance_issues
// [2] https://reddit.com/r/firefox/comments/wvs04y/comment/ilklzy1/?context=3
//user_pref("gfx.font_rendering.cleartype_params.rendering_mode", 5);
//user_pref("gfx.font_rendering.cleartype_params.cleartype_level", 100);
//user_pref("gfx.font_rendering.cleartype_params.force_gdi_classic_for_families", "");
//user_pref("gfx.font_rendering.cleartype_params.force_gdi_classic_max_size", 6);
//user_pref("gfx.font_rendering.directwrite.use_gdi_table_loading", false);
// Some users find these helpful:
    //user_pref("gfx.font_rendering.cleartype_params.gamma", 1750);
    //user_pref("gfx.font_rendering.cleartype_params.enhanced_contrast", 100);
    //user_pref("gfx.font_rendering.cleartype_params.pixel_structure", 1);

// PREF: use macOS Appearance Panel text smoothing setting when rendering text [macOS]
//user_pref("gfx.use_text_smoothing_setting", true);

/****************************************************************************
 * SECTION: URL BAR                                                         *
****************************************************************************/

// PREF: minimize URL bar suggestions (bookmarks, history, open tabs)
// Dropdown options in the URL bar:
//user_pref("browser.urlbar.suggest.bookmark", true); // DEFAULT
user_pref("browser.urlbar.suggest.engines", false);
user_pref("browser.urlbar.suggest.history", false);
user_pref("browser.urlbar.suggest.openpage", false);
user_pref("browser.urlbar.suggest.searches", false);
//user_pref("browser.urlbar.suggest.weather", true); // DEFAULT [FF108]
    //user_pref("browser.urlbar.weather.ignoreVPN", false); // DEFAULT
//user_pref("browser.urlbar.quickactions.enabled", false); // NIGHTLY
//user_pref("browser.urlbar.shortcuts.quickactions", false); // NIGHTLY
user_pref("browser.urlbar.suggest.calculator", true);
user_pref("browser.urlbar.unitConversion.enabled", true);

// PREF: disable dropdown suggestions with empty query
user_pref("browser.urlbar.suggest.topsites", false);

// PREF: disable urlbar trending search suggestions [FF118+]
// [SETTING] Search>Search Suggestions>Show trending search suggestions (FF119)
user_pref("browser.urlbar.trending.featureGate", false);
user_pref("browser.urlbar.suggest.trending", false);

// PREF: disable urlbar suggestions
//user_pref("browser.urlbar.addons.featureGate", false); // [FF115+]
//user_pref("browser.urlbar.mdn.featureGate", false); // [FF117+] [HIDDEN PREF]
//user_pref("browser.urlbar.pocket.featureGate", false); // [FF116+] [DEFAULT: false]
//user_pref("browser.urlbar.weather.featureGate", false); // [FF108+] [DEFAULT: false]

// PREF: disable urlbar clipboard suggestions [FF118+]
//user_pref("browser.urlbar.clipboard.featureGate", false); // [DEFAULT: false]

// PREF: disable tab-to-search [FF85+]
// Alternatively, you can exclude on a per-engine basis by unchecking them in Options>Search
// [SETTING] Privacy & Security>Address Bar>When using the address bar, suggest>Search engines
//user_pref("browser.urlbar.suggest.engines", false);

// PREF: Adaptive History Autofill
// [1] https://docs.google.com/document/u/1/d/e/2PACX-1vRBLr_2dxus-aYhZRUkW9Q3B1K0uC-a0qQyE3kQDTU3pcNpDHb36-Pfo9fbETk89e7Jz4nkrqwRhi4j/pub
//user_pref("browser.urlbar.autoFill", true); // [DEFAULT]
//user_pref("browser.urlbar.autoFill.adaptiveHistory.enabled", false);

// PREF: adjust the amount of Address bar / URL bar dropdown results
// This value controls the total number of entries to appear in the location bar dropdown.
// [NOTE] Items (bookmarks/history/openpages) with a high "frequency"/"bonus" will always
// be displayed (no we do not know how these are calculated or what the threshold is),
// and this does not affect the search by search engine suggestion.
// disable=0
//user_pref("browser.urlbar.maxRichResults", 5); // default=10

/****************************************************************************
 * SECTION: AUTOPLAY                                                        *
****************************************************************************/

// PREF: do not autoplay media audio
// [NOTE] You can set exceptions under site permissions
// [SETTING] Privacy & Security>Permissions>Autoplay>Settings>Default for all websites
// 0=Allow all, 1=Block non-muted media (default), 5=Block all
//user_pref("media.autoplay.default", 1); // DEFAULT
//user_pref("media.block-autoplay-until-in-foreground", true); // DEFAULT

// PREF: disable autoplay of HTML5 media if you interacted with the site [FF78+]
// 0=sticky (default), 1=transient, 2=user
// Firefox's Autoplay Policy Documentation (PDF) is linked below via SUMO
// [NOTE] If you have trouble with some video sites (e.g. YouTube), then add an exception (see previous PREF)
// [1] https://support.mozilla.org/questions/1293231
//user_pref("media.autoplay.blocking_policy", 2);

/****************************************************************************
 * SECTION: NEW TAB PAGE                                                    *
****************************************************************************/

// PREF: open windows/tabs from last session
// 0=blank, 1=home, 2=last visited page, 3=resume previous session
// [NOTE] Session Restore is cleared with history and not used in Private Browsing mode
// [SETTING] General>Startup>Restore previous session
//user_pref("browser.startup.page", 3);

// PREF: set HOME+NEWWINDOW page to blank tab
// about:home=Activity Stream, custom URL, about:blank
// [SETTING] Home>New Windows and Tabs>Homepage and new windows
// [Custom URLs] Set two or more websites in Home Page Field – delimited by |
// [1] https://support.mozilla.org/en-US/questions/1271888#answer-1262899
//user_pref("browser.startup.homepage", "about:blank");

// PREF: set NEWTAB page to blank tab
// true=Firefox Home, false=blank page
// [SETTING] Home>New Windows and Tabs>New tabs
//user_pref("browser.newtabpage.enabled", false);

// PREF: Pinned Shortcuts on New Tab
// [SETTINGS] Home>Firefox Home Content
// [1] https://github.com/arkenfox/user.js/issues/1556
//user_pref("browser.newtabpage.activity-stream.discoverystream.enabled", false);
//user_pref("browser.newtabpage.activity-stream.showSearch", true); // NTP Web Search [DEFAULT]
user_pref("browser.newtabpage.activity-stream.feeds.topsites", false); // Shortcuts
      //user_pref("browser.newtabpage.activity-stream.showSponsoredTopSites", false); // Sponsored shortcuts [FF83+]
user_pref("browser.newtabpage.activity-stream.feeds.section.topstories", false); // Recommended by Pocket
      //user_pref("browser.newtabpage.activity-stream.showSponsored", false); // Sponsored Stories [FF58+]  
//user_pref("browser.newtabpage.activity-stream.feeds.section.highlights", false); // Recent Activity [DEFAULT]
      //user_pref("browser.newtabpage.activity-stream.section.highlights.includeBookmarks", false);
      //user_pref("browser.newtabpage.activity-stream.section.highlights.includeDownloads", false);
      //user_pref("browser.newtabpage.activity-stream.section.highlights.includePocket", false);
      //user_pref("browser.newtabpage.activity-stream.section.highlights.includeVisited", false);
//user_pref("browser.newtabpage.activity-stream.feeds.snippets", false); // [DEFAULT]

// PREF: clear default topsites
// [NOTE] This does not block you from adding your own.
//user_pref("browser.newtabpage.activity-stream.default.sites", "");

// PREF: keep search in the search box; prevent from jumping to address bar
// [1] https://www.reddit.com/r/firefox/comments/oxwvbo/firefox_start_page_search_options/
//user_pref("browser.newtabpage.activity-stream.improvesearch.handoffToAwesomebar", false);
      
// PREF: Firefox logo to always show
//user_pref("browser.newtabpage.activity-stream.logowordmark.alwaysVisible", true); // DEFAULT

// PREF: Bookmarks Toolbar visibility
// always, never, or newtab
//user_pref("browser.toolbars.bookmarks.visibility", "newtab"); // DEFAULT

/******************************************************************************
 * SECTION: POCKET                                                            *
******************************************************************************/

// PREF: Disable built-in Pocket extension
user_pref("extensions.pocket.enabled", false);
      //user_pref("extensions.pocket.api"," ");
      //user_pref("extensions.pocket.oAuthConsumerKey", " ");
      //user_pref("extensions.pocket.site", " ");
      //user_pref("extensions.pocket.showHome", false);

/******************************************************************************
 * SECTION: DOWNLOADS                                 *
******************************************************************************/

// PREF: autohide the downloads button
//user_pref("browser.download.autohideButton", true); // DEFAULT

// PREF: choose download location
// [SETTING] To set your default "downloads": General>Downloads>Save files to...
// 0=desktop, 1=downloads (default), 2=last used
//user_pref("browser.download.folderList", 1); // DEFAULT

// PREF: always ask where to download
// Enforce user interaction for greater security.
// [SETTING] General>Files and Applications>Downloads>Always ask you where to save files
// [DIALOGUE] "Ask whether to open or save files"
// true=direct download (default)
// false=the user is asked what to do
// [1] https://github.com/yokoffing/Betterfox/issues/216
user_pref("browser.download.useDownloadDir", false);
    //user_pref("browser.download.dir", "C:\Users\<YOUR_USERNAME>\AppData\Local\Temp"); // [WINDOWS]

// PREF: always ask how to handle new mimetypes
// Enforce user interaction for greater security.
// [SETTING] General>Files and Applications>Applications>What should Firefox do with other files?>Ask whether to open or save files
user_pref("browser.download.always_ask_before_handling_new_types", true);

// PREF: disable downloads panel opening on every download
// Controls whether to open the downloads panel every time a download begins.
// [NOTE] The first download ever ran in a new profile will still open the panel.
//user_pref("browser.download.alwaysOpenPanel", false);

// PREF: disable adding downloads to the system's "recent documents" list 
user_pref("browser.download.manager.addToRecentDocs", false);

/****************************************************************************
 * SECTION: PDF                                                             *
****************************************************************************/

// PREF: enforce Firefox's built-in PDF reader
// This setting controls if the option "Display in Firefox" is available in the setting below
// and by effect controls whether PDFs are handled in-browser or externally ("Ask" or "Open With").
// [1] https://mozilla.github.io/pdf.js/
//user_pref("pdfjs.disabled", false); // DEFAULT

// PREF: allow viewing of PDFs even if the response HTTP headers
// include Content-Disposition:attachment. 
//user_pref("browser.helperApps.showOpenOptionForPdfJS", true); // DEFAULT

// PREF: open PDFs inline (FF103+)
user_pref("browser.download.open_pdf_attachments_inline", true);

// PREF: PDF sidebar on load
// 2=table of contents (if not available, will default to 1)
// 1=view pages
// 0=disabled
// -1=remember previous state (default)
//user_pref("pdfjs.sidebarViewOnLoad", 2);

// PREF: default zoom for PDFs [HIDDEN]
// [NOTE] "page-width" not needed if using sidebar on load
//user_pref("pdfjs.defaultZoomValue", page-width);

/****************************************************************************
 * SECTION: TAB BEHAVIOR                                                    *
****************************************************************************/

// PREF: search query opens in a new tab (instead of the current tab)
//user_pref("browser.search.openintab", true); // SEARCH BOX
//user_pref("browser.urlbar.openintab", true); // URL BAR

// PREF: control behavior of links that would normally open in a new window
// [NOTE] You can still right-click a link and open in a new window
// 3 (default) = in a new tab; pop-up windows are treated like regular tabs
// 2 = in a new window
// 1 = in the current tab
//user_pref("browser.link.open_newwindow", 3); // DEFAULT

// PREF: determine the behavior of pages opened by JavaScript (like popups)
// 2 (default) = catch new windows opened by JavaScript that do not have
// specific values set (how large the window should be, whether it
// should have a status bar, etc.) 
// 1 = let all windows opened by JavaScript open in new windows
// 0 = force all new windows opened by JavaScript into tabs
// [NOTE] Most advertising popups also open in new windows with values set
// [1] https://kb.mozillazine.org/About:config_entries
//user_pref("browser.link.open_newwindow.restriction", 0);

// PREF: override <browser.link.open_newwindow> for external links
// Set if a different destination for external links is needed
// 3=Open in a new tab in the current window
// 2=Open in a new window
// 1=Open in the current tab/window
// -1=no overrides (default)
//user_pref("browser.link.open_newwindow.override.external", -1); // DEFAULT

// PREF: focus behavior for new tabs from links
// Determine whether a link opens in the foreground or background on left-click
// [SETTINGS] Settings>General>Tabs>"When you open a link, image or media in a new tab, switch to it immediately"
// true(default) = opens new tabs by left-click in the background, leaving focus on the current tab
// false = opens new tabs by left-click in the foreground, putting focus on the new tab
// [NOTE] CTRL+SHIFT+CLICK will open new tabs in foreground (default); switching PREF to false will reverse this behavior
// [1] https://kb.mozillazine.org/About:config_entries
//user_pref("browser.tabs.loadInBackground", true); // DEFAULT

// PREF: determines whether pages normally meant to open in a new window (such as
// target="_blank" or from an external program), but that have instead been loaded in a new tab
// This pref takes effect when Firefox has diverted a new window to a new tab instead, then:
// true = loads the new tab in the background, leaving focus on the current tab
// false(default) = loads the new tab in the foreground, taking the focus from the current tab
// [NOTE] Setting this preference to true will still bring the browser to the front when opening links from outside the browser
// [1] https://kb.mozillazine.org/About:config_entries
//user_pref("browser.tabs.loadDivertedInBackground", false); // DEFAULT

// PREF: force bookmarks to open in a new tab, not the current tab
//user_pref("browser.tabs.loadBookmarksInTabs", true);
    //user_pref("browser.tabs.loadBookmarksInBackground", true); // load bookmarks in background

// PREF: leave Bookmarks Menu open when selecting a site
user_pref("browser.bookmarks.openInTabClosesMenu", false);

// PREF: restore "View image info" on right-click
user_pref("browser.menu.showViewImageInfo", true);

// PREF: show all matches in Findbar
user_pref("findbar.highlightAll", true);

// PREF: force disable finding text on page without prompting
// [NOTE] Not as powerful as using Ctrl+F.
// [SETTINGS] General>Browsing>"Search for text when you start typing"
// [1] https://github.com/yokoffing/Betterfox/issues/212
//user_pref("accessibility.typeaheadfind", false); // enforce DEFAULT

// PREF: disable middle mouse click opening links from clipboard
// It's been default in Linux since at least FF102.
// [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/10089
//user_pref("middlemouse.contentLoadURL", false);

// PREF: Prevent scripts from moving and resizing open windows
//user_pref("dom.disable_window_move_resize", true);

// PREF: insert new tabs after groups like it
// true(default) = open new tabs to the right of the parent tab
// false = new tabs are opened at the far right of the tab bar
//user_pref("browser.tabs.insertRelatedAfterCurrent", true); // DEFAULT

// PREF: insert new tabs immediately after the current tab
//user_pref("browser.tabs.insertAfterCurrent", true);

// PREF: leave the browser window open even after you close the last tab
//user_pref("browser.tabs.closeWindowWithLastTab", false);

// PREF: stop websites from reloading pages automatically
// [WARNING] Breaks some sites.
// [1] https://www.ghacks.net/2018/08/19/stop-websites-from-reloading-pages-automatically/
//user_pref("accessibility.blockautorefresh", true);
//user_pref("browser.meta_refresh_when_inactive.disabled", true);

// PREF: do not select the space next to a word when selecting a word
user_pref("layout.word_select.eat_space_to_next_word", false);

// PREF: controls if a double-click word selection also deletes one adjacent whitespace
// This mimics native behavior on macOS.
//user_pref("editor.word_select.delete_space_after_doubleclick_selection", true);

// PREF: do not hide the pointer while typing [LINUX]
//user_pref("widget.gtk.hide-pointer-while-typing.enabled", false);

// PREF: limit events that can cause a pop-up
// Firefox provides an option to provide exceptions for sites, remembered in your Site Settings.
// (default) "change click dblclick auxclick mouseup pointerup notificationclick reset submit touchend contextmenu"
// (alternate) user_pref("dom.popup_allowed_events", "click dblclick mousedown pointerdown");
//user_pref("dom.popup_allowed_events", "click dblclick");
//user_pref("dom.disable_open_during_load", true); // DEFAULT
//user_pref("privacy.popups.showBrowserMessage", true); // DEFAULT

/****************************************************************************
 * SECTION: UNCATEGORIZED                                                   *
****************************************************************************/

// PREF: disable backspace action
// 0=previous page, 1=scroll up, 2=do nothing
//user_pref("browser.backspace_action", 2); // DEFAULT

// PREF: disable Reader mode
// [TIP] Use about:reader?url=%s as a keyword to open links automatically in reader mode [1].
// Firefox will not have to parse webpage for Reader when navigating.
// Extremely minimal performance impact, if you disable.
// [1] https://www.reddit.com/r/firefox/comments/621sr2/i_found_out_how_to_automatically_open_a_url_in/ 
//user_pref("reader.parse-on-load.enabled", false);

// PREF: disable ALT key toggling the menu bar
//user_pref("ui.key.menuAccessKeyFocuses", false);
    //user_pref("ui.key.menuAccessKey", 18); // DEFAULT

// PREF: cycle through tabs in recently used order
// [SETTING] Ctrl+Tab cycles through tabs in recently used order
//user_pref("browser.ctrlTab.sortByRecentlyUsed", true);

// PREF: Spell-check
// 0=none, 1-multi-line, 2=multi-line & single-line
user_pref("layout.spellcheckDefault", 0); // DEFAULT

// PREF: Spell Checker underline styles [HIDDEN]
// [1] https://kb.mozillazine.org/Ui.SpellCheckerUnderlineStyle#Possible_values_and_their_effects
//user_pref("ui.SpellCheckerUnderlineStyle", 1);

// PREF: limit the number of bookmark backups Firefox keeps
//user_pref("browser.bookmarks.max_backups", 1); // default=15

// PREF: zoom only text on webpage, not other elements
//user_pref("browser.zoom.full", false);

// PREF: allow for more granular control of zoom levels
// Especially useful if you want to set your default zoom to a custom level.
//user_pref("toolkit.zoomManager.zoomValues", ".3,.5,.67,.8,.9,.95,1,1.1,1.2,1.3,1.4,1.5,1.6,1.7,2,2.4,3");

// PREF: restore zooming behavior [macOS] [FF109+]
// On macOS, Ctrl or Cmd + trackpad or mouse wheel now scrolls the page instead of zooming.
// This avoids accidental zooming and matches Safari's and Chrome's behavior.
// The prefs below restores the previous zooming behavior
//user_pref("mousewheel.with_control.action", 3);
//user_pref("mousewheel.with_meta.action", 3);

// PREF: hide image placeholders
//user_pref("browser.display.show_image_placeholders", false);

// PREF: wrap long lines of text when using source / debugger
//user_pref("view_source.wrap_long_lines", true);
//user_pref("devtools.debugger.ui.editor-wrapping", true);

// PREF: enable ASRouter Devtools at about:newtab#devtools (useful if you're making your own CSS theme)
// [1] https://firefox-source-docs.mozilla.org/browser/components/newtab/content-src/asrouter/docs/debugging-docs.html
//user_pref("browser.newtabpage.activity-stream.asrouter.devtoolsEnabled", true);
// show user agent styles in the inspector
//user_pref("devtools.inspector.showUserAgentStyles", true);
// show native anonymous content (like scrollbars or tooltips) and user agent shadow roots (like the components of an <input> element) in the inspector
//user_pref("devtools.inspector.showAllAnonymousContent", true);

// PREF: print preview
//user_pref("print.tab_modal.enabled", true); // DEFAULT

// PREF: adjust the minimum tab width
// Can be overridden by userChrome.css
//user_pref("browser.tabs.tabMinWidth", 120); // default=76

// PREF: remove underlined characters from various settings
//user_pref("ui.key.menuAccessKey", 0);

// PREF: disable websites overriding Firefox's keyboard shortcuts [FF58+]
// 0=ask (default), 1=allow, 2=block
// [SETTING] to add site exceptions: Ctrl+I>Permissions>Override Keyboard Shortcuts ***/
//user_pref("permissions.default.shortcuts", 2);

// PREF: JPEG XL image format [NIGHTLY]
// May not affect anything on ESR/Stable channel [2].
// [TEST] https://jpegxl.io/tutorials/firefox/#firefoxjpegxltutorial
// [1] https://cloudinary.com/blog/the-case-for-jpeg-xl
// [2] https://bugzilla.mozilla.org/show_bug.cgi?id=1539075#c51
//user_pref("image.jxl.enabled", true);

// PREF: enable CSS moz document rules
// Still needed for Stylus?
// [1] https://reddit.com/r/FirefoxCSS/comments/8x2q97/reenabling_mozdocument_rules_in_firefox_61/
//user_pref("layout.css.moz-document.content.enabled", true);

