const CHACHE_NAME = "cache-v2";

// 在一个新的service-worker安装就就会被触发
self.addEventListener("install", (event) => {
  console.log("install: ", event);
  // 打开一个缓存空间
  event.waitUntil(
    caches.open(CHACHE_NAME).then((cache) => {
      // 写入缓存的资源
      cache.addAll(["/", "./index.css"]);
    }),
  );
});

// 激活,代表service-worker事件被正式启动
self.addEventListener("activate", (event) => {
  console.log("activate: ", event);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      // 这里直接使用并行处理
      return Promise.all(
        cacheNames.map((item) => {
          if (item !== CHACHE_NAME) {
            return caches.delete(item);
          }
        }),
      );
    }),
  );
});

self.addEventListener("fetch", (event) => {
  console.log("fetch: ", event);
  // 去cache里面找资源，找到就返回，找不到就利用网络请求去拿
  event.respondWith(
    caches.open(CHACHE_NAME).then((cache) => {
      return cache.match(event.request).then((res) => {
        // 如果res存在，就表示缓存命中了
        if (res) {
          return res;
        }
        return fetch(event.request).then((res) => {
          cache.push(event.request, res.clone());
          return res;
        });
      });
    }),
  );
});
