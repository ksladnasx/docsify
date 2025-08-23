# 创建项目
> 官方自带英文文档：[README](/zh-cn/Nuxt4.md)

```bash
pnpm create nuxt@latest nuxt4-project
```

然后我们按照提示创建即可，默认是自带 typescript 的

# 启动项目

```
cd nuxt4-project
pnpm dev
```

> tip: 如果跑不起来 就看具体报错 并且解决（一般是依赖缺少，下一下就好了）

# 项目配置

## 初始化

1、app/app.vue 删除原来的组件

2、改造 app/app.vue
```vue
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
```
3、添加 app/layouts/default.vue
```vue
<template>
  <div>
    <h1 class="header">header</h1>
    <div class="main" style="min-height: 80vh">
      <slot></slot>
    </div>
    <div class="footer">footer</div>
  </div>
</template>

```
这里还没开始添加样式 后续添加

4、在app目录下新建 pages 文件夹，并添加 index.vue
app/pages/index.vue
```vue
<template>
  <div>Home</div>
</template>
```

这下就可以看到浏览器里显示 Home 了

5、在 pages 文件夹下添加其他页面，比如 about.vue
```vue
<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
```
tip: 尝试切换 路由 /、/about
## 添加 插件（快速开发）

### unocss

```bash
pnpm add -D unocss @unocss/nuxt
```

在 nuxt.config.ts 文件中添加如下代码

```ts
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
  ],
})
```

然后就可以在 项目里试一试 uno.css 了

### nuxt/icon

```bash
npx nuxi module add icon
```

添加一个配置 防止 nuxt icon 请求出错
在 nuxt.config.ts 文件中添加如下代码
```ts
export default defineNuxtConfig({
  icon: {
    localApiEndpoint: '/nuxt-icon',
  },
})

// 使用
// <Icon name="simple-icons:github" size="1rem" />

vscode 插件：Iconify IntelliSense
图标库：https://icones.js.org/
```

### pinia 
```bash
pnpm i pinia @pinia/nuxt
```

1、在 nuxt.config.ts 文件中添加如下代码
```ts
export default defineNuxtConfig({
    modules: ['@pinia/nuxt'],
})
```

2、定义 testStore  测试
app/store/index.ts
```ts
export const useTestStore = defineStore("test", {
  state: () => ({
    count: 0 as number,
  }),
  getters: {
    getCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
```
3、在 app/pages/index.vue 中使用
```vue
<template>
  <div class="text-3xl">
    Home
    <Icon class="mr-3" name="simple-icons:github" size="1rem" />

    <button @click="store.increment">add</button>
    {{ store.count }}
  </div>
</template>

<script setup lang="ts">
import { useTestStore } from "~/store";

const store = useTestStore();
</script>
```

## 完善 nuxt.config.ts 配置
```ts
export default defineNuxtConfig({
  compatibilityDate: "2025-08-2",
  devtools: { enabled: true },
  // 模块
  modules: ["@unocss/nuxt", "@nuxt/icon", "@pinia/nuxt"],
  app: {
    // 设置 seo ，会设置到 html 的 head 里面
    head: {
      title: "Nuxt 4",
      meta: [
        { name: "description", content: "Nuxt 4" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
  icon: {
    localApiEndpoint: "/nuxt-icon",
  },
  ssr: true, // 是否开启 ssr
  devServer: {
    // 服务端口号
    port: 3000,
  },
  css: [], // css 入口文件
  nitro: {
    // 代理，前后端分离有用
    // devProxy: {
    //   "/api": {
    //     target: "http://localhost:3000",
    //     changeOrigin: true,
    //     prependPath: true,
    //   },
    // },
  },
});
```

## 全局写一下样式

在 根目录下 创建 app/assets/index.css 

```css
html {
  font-size: 16px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

body {
  width: 100w;
  height: 100vh;
  overflow: auto;
}

* {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
}
```

在 nuxt.config.ts 中 添加全局样式
```ts
export default defineNuxtConfig({
  css: ["~/assets/index.css"]
})
```

## 优化一下布局

[app/layouts/default.vue](../app/layouts/default.vue)

```vue
<template>
  <div>
    <div class="fixed top-0 left-0 h-60px w-full flex justify-center items-center bg-gray-200">
      <nuxt-link class="mr-2" to="/">Home </nuxt-link>
      <nuxt-link class="mr-2" to="/about">About</nuxt-link>
      <Icon name="simple-icons:github" size="1rem" />
    </div>
    <div class="pt-60px mx-auto max-w-880px">
      <div class="p-[8px] min-h-[100vh]">
        <slot></slot>
      </div>
    </div>
    <div class="h-20vh w-full flex flex-col justify-center items-center bg-[#d4e2ff]">
      Blog
      <div>footer</div>
    </div>
  </div>
</template>
```

## 编写首页

[app/pages/index.vue](../app/pages/index.vue)

```vue
<template>
  <div class="py-3">
    <ul class="w-full">
      <li class="w-full min-h-60px border-2 border-solid border-purple-300 mb-2 p-8 rounded-md" v-for="item in list" :key="item.id">
        <nuxt-link :to="`/posts/${item.id}`">
          <h1 class="mb-2">{{ item.name }}</h1>
        </nuxt-link>
        <p>{{ item.desc }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const list = [
  {
    id: 1,
    name: "Nuxt 4",
    desc: "Nuxt 4 is a good idea",
    content: "Lamb chops are the best 1",
  },
  {
    id: 2,
    name: "Pinia",
    desc: "Pinia is a good idea",
    content: "Lamb chops are the best 2",
  },
  {
    id: 3,
    name: "Unocss",
    desc: "Unocss is a good idea",
    content: "Lamb chops are the best 3",
  },
  {
    id: 4,
    name: "Icon",
    desc: "Icon is a good idea",
    content: "Lamb chops are the best 4",
  },
  {
    id: 5,
    name: "Tailwindcss",
    desc: "Tailwindcss is a good idea",
    content: "Lamb chops are the best 5",
  },
  {
    id: 6,
    name: "Vue",
    desc: "Vue is a good idea",
    content: "Lamb chops are the best 6",
  },
];
</script>
```

## 编写 post 详情页面
app/pages 下创建 posts 文件夹
posts 下创建 [id].vue 文件

[app/pages/posts/[id].vue](../app/pages/posts/[id].vue)

```vue
<template>
  <div>
    post detail
    {{ id }}
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const id = route.params.id;
console.log(id);
</script>
```

## 了解 useFetch 和 $fetch

[$fetch](https://nuxt.com/docs/4.x/getting-started/data-fetching#fetch)
[useFetch](https://nuxt.com/docs/4.x/getting-started/data-fetching#usefetch)

useFetch 和 $fetch 都是 Nuxt 提供的用于数据获取的 API
它们之间的主要区别是：useFetch 是在服务端执行，$fetch 在服务端执行一次、客户端执行一次

一般来说，我们推荐使用 useFetch，因为 useFetch 是在服务端执行，更安全。

通常我们会使用组合方式使用他们，使用 useAsyncData 和他们组合
[useasyncdata](https://nuxt.com/docs/getting-started/data-fetching#useasyncdata)

例子：
```ts
<script setup lang="ts">
const { data: discounts, status } = await useAsyncData('cart-discount', async () => {
  const [coupons, offers] = await Promise.all([
    $fetch('/api/test'),
  ])

  return { coupons, offers }
})
</script>
```

对 useFetch 和 $fetch 二次封装感兴趣的 可以去github上找一些nuxt3的项目看看

**封装 request **

我的封装，封装的比较简单 主要是对一些请求进行前置处理和错误拦截
```ts
export interface IHttpOptions {
  method: any;
  url: string;
  params?: any;
  data?: any;
  options?: any;
}

export interface IApiResponse<T extends any> {
  data: T;
  code: number;
  message?: string;
}

export async function http<T = any>(options: IHttpOptions): Promise<IApiResponse<T>> {
  const { url, method, params, data, options: config = {} } = options;
  const baseURL = import.meta.env.VITE_API_BASE;

  const { data: res }: any = await useFetch(baseURL + url, {
    method: method,
    onRequest: ({ options }) => {
      options.body = data;
      options.query = params;
      options.timeout = 10000;
      Object.assign(options, config);
    },
    onResponse: async ({ response }) => {
      console.log("response=", response._data);
      const res = response._data as IApiResponse<T>;
      const code = Number(res.code);
      if (code !== Number(import.meta.env.VITE_API_SUCCESS_CODE)) {
        throw createError({
          statusCode: response?._data.code,
          statusMessage: response?._data.message,
        });
      }

      return response;
    },
    onRequestError({ request, options, error }) {
      // 处理请求错误
      console.warn("request error", error);
    },
    onResponseError({ request, response, options }) {
      // 处理响应错误
      // console.warn('response error', response);
      throw createError({ statusCode: response.status, statusMessage: response.statusText });
    },
  });

  return res;
}

export async function $http<T = any>(options: IHttpOptions): Promise<IApiResponse<T>> {
  const { url, method, params, data, options: config = {} } = options;
  const baseURL = import.meta.env.VITE_API_BASE;

  const res = (await $fetch(baseURL + url, {
    method: method,
    onRequest: ({ options }) => {
      options.body = data;
      options.query = params;
      options.timeout = 10000;
      Object.assign(options, config);
    },
    onResponse: ({ response }) => {},
    onRequestError: (error) => {
      console.error(error);
    },
    onResponseError: (error) => {
      console.error(error);
    },
  })) as IApiResponse<T>;

  return res;
}
```

这里面用到的 VITE_API_BASE、VITE_API_SUCCESS_CODE 是写在 .env 配置文件里的，需要以VITE_ 开头，后续就可以从 import.meta.env 里获取

.env 
./.env
```
VITE_API_BASE=http://localhost:3000

VITE_API_SUCCESS_CODE=200
```

## 编写简单的 api

[server](https://nuxt.com/docs/4.x/guide/directory-structure/server)
app 下创建 server 文件夹 
server 下 新建 data.ts
```ts
export const list = [
  {
    id: 1,
    name: "Nuxt 4",
    desc: "Nuxt 4 is a good idea",
    content: "Lamb chops are the best 1",
  },
  {
    id: 2,
    name: "Pinia",
    desc: "Pinia is a good idea",
    content: "Lamb chops are the best 2",
  },
  {
    id: 3,
    name: "Unocss",
    desc: "Unocss is a good idea",
    content: "Lamb chops are the best 3",
  },
  {
    id: 4,
    name: "Icon",
    desc: "Icon is a good idea",
    content: "Lamb chops are the best 4",
  },
  {
    id: 5,
    name: "Tailwindcss",
    desc: "Tailwindcss is a good idea",
    content: "Lamb chops are the best 5",
  },
  {
    id: 6,
    name: "Vue",
    desc: "Vue is a good idea",
    content: "Lamb chops are the best 6",
  },
];
```

serer 下新建 api/posts/list.ts
```ts
import { list } from "../../data";

export default defineEventHandler((event) => {
  return list;
});
```

## 首页 ssr 渲染
pages/index.vue
```vue
<template>
  <div class="py-3">
    <ul class="w-full">
      <li class="w-full min-h-60px border-2 border-solid border-purple-300 mb-2 p-8 rounded-md" v-for="item in data" :key="item.id">
        <nuxt-link :to="`/posts/${item.id}`">
          <h1 class="mb-2">{{ item.name }}</h1>
        </nuxt-link>
        <p>{{ item.desc }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const { data } = await useFetch("/api/posts/list");
</script>
```

## 首页 csr 渲染
pages/index.vue
```vue
<template>
  <div class="py-3">
    <ul class="w-full">
      <li class="w-full min-h-60px border-2 border-solid border-purple-300 mb-2 p-8 rounded-md" v-for="item in data" :key="item.id">
        <nuxt-link :to="`/posts/${item.id}`">
          <h1 class="mb-2">{{ item.name }}</h1>
        </nuxt-link>
        <p>{{ item.desc }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const data = ref<any>([]);
async function getPosts() {
  const res = await fetch("/api/posts/list");
  return res.json();
}

onMounted(async () => {
  data.value = await getPosts();
});
</script>
```

区别就在请求数据时机，ssr 是在服务端加载数据和渲染，csr 是在客户端渲染完成再加载数据

## 实在是需要客户端渲染怎么办 
使用 ClientOnly 组件包裹需要渲染的内容

## 编写 post 详情接口
创建 api/posts/[id].ts 文件
```ts
import { list } from "../../data";

export default defineEventHandler((event) => {
  const { id } = event.context.params || {};
  const post = list.find((item) => item.id === Number(id)) || null;
  return post;
});
```

## 修改 post 详情页面

[pages/posts/[id].vue](../pages/posts/[id].vue)
```vue
<template>
  <div class="p-8" v-if="data">
    <h1>{{ data.name }}</h1>
    <p>{{ data.desc }}</p>
    <p>{{ data.content }}</p>
    <button @click="() => $router.push('/')">返回</button>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

type Post = {
  id: number;
  name: string;
  desc: string;
  content: string;
};

const { data } = await useFetch<Post>(`/api/posts/${route.params.id}`);
</script>
```

## 实现文章分页

先编写一个根据函数，规范我们的返回值
api/data.ts
```ts
export const result = (data: any) => {
  return {
    code: 200,
    message: "",
    data,
  };
};
```

api/post/list.ts
```ts
import { list, result } from "../../data";
import { getQuery } from "#imports";

export default defineEventHandler(async (event) => {
  const { page = 1, size = 5 } = getQuery<{
    page?: number;
    size?: number;
  }>(event);

  const offset = (page - 1) * size;
  const limit = size;
  const data = {
    currentPage: Number(page),
    pageSize: Number(size),
    list: list.slice(offset, offset + limit),
    total: list.length,
  };

  return result(data);
});
```

## 首页增加分页逻辑
[app/pages/index.vue](../app/pages/index.vue)
```vue
<template>
  <div class="py-3">
    <ul class="w-full">
      <li class="w-full min-h-40px border-2 border-solid border-purple-300 mb-2 p-4 rounded-md" v-for="item in data.data.list" :key="item.id">
        <nuxt-link :to="`/posts/${item.id}`">
          <h1 class="mb-3">{{ item.name }}</h1>
        </nuxt-link>
        <p>{{ item.desc }}</p>
      </li>
    </ul>
    <div class="flex justify-between">
      <div>
        <span v-if="page > 1" @click="prev" class="cursor-pointer inline-block px-6 py-3 rounded-full font-bold border-2 border-solid border-purple-300 duration-300 hover:border-purple-700 hover:text-blue">prev</span>
      </div>
      <div>
        <span v-if="page < total / 5" @click="next" class="cursor-pointer inline-block px-6 py-3 rounded-full font-bold border-2 border-solid border-purple-300 duration-300 hover:border-purple-700 hover:text-blue"> next</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const page = ref(1);
const size = ref(5);
const total = ref(6);
const { data, refresh } = await useFetch<any>(`http://localhost:3000/api/posts/list?page=${page.value}&size=${size.value}`);

function next() {
  page.value += 1;
  refresh();
}

function prev() {
  page.value -= 1;
  refresh();
}
</script>
```

> tip 虽然我们增加了一个分页的逻辑，但是我们无法实时的获取到正确的文章列表，因为 useFetch 传入的url和参数并没有更新，也就是使用了之前的参数

解决方式： 
1、useAsyncData + $fetch
2、watch 监听page变化，使用 $fetch 实时请求

## 首页最后优化的结果
[ap/pages/index.vue](../app/pages/index.vue)
```vue
<template>
  <div class="py-3">
    <ul class="w-full">
      <li class="w-full min-h-40px border-2 border-solid border-purple-300 mb-2 p-4 rounded-md" v-for="item in list" :key="item.id">
        <nuxt-link :to="`/posts/${item.id}`">
          <h1 class="mb-3">{{ item.name }}</h1>
        </nuxt-link>
        <p>{{ item.desc }}</p>
      </li>
    </ul>
    <div class="flex justify-between">
      <div>
        <span v-if="page > 1" @click="prev" class="cursor-pointer inline-block px-6 py-3 rounded-full font-bold border-2 border-solid border-purple-300 duration-300 hover:border-purple-700 hover:text-blue">prev</span>
      </div>
      <div>
        <span v-if="hasMore" @click="next" class="cursor-pointer inline-block px-6 py-3 rounded-full font-bold border-2 border-solid border-purple-300 duration-300 hover:border-purple-700 hover:text-blue"> next</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAsyncData } from "#app";
import { $http } from "~/request/index";
const page = ref(1);
const size = ref(5);

const { data } = await useAsyncData(
  "posts",
  async () => {
    const res = await $http({
      url: `/api/posts/list`,
      method: "GET",
      params: {
        page: page.value,
        size: size.value,
      },
    });
    return res.data;
  },
  {
    watch: [page],
  }
);

const list = computed(() => data.value.list);
const hasMore = computed(() => {
  const total = data.value.total;
  return total > page.value * size.value;
});

function next() {
  page.value += 1;
}

function prev() {
  page.value -= 1;
}
</script>
```

## 详情页面改造

规范我们的返回值
api/post/[id].ts
```ts
import { list, result } from "../../data";

export default defineEventHandler((event) => {
  const { id } = event.context.params || {};
  const post = list.find((item) => item.id === Number(id)) || null;
  return result(post);
});
```

重新对接

```vue
<template>
  <div class="p-8" v-if="data">
    <h1>{{ data.name }}</h1>
    <p>{{ data.desc }}</p>
    <p>{{ data.content }}</p>
    <button @click="() => $router.push('/')">返回</button>
  </div>
</template>

<script setup lang="ts">
import { $http } from "~/request";

const route = useRoute();

type Post = {
  id: number;
  name: string;
  desc: string;
  content: string;
};

const { data } = await $http<Post>({
  method: "get",
  url: `/api/posts/${route.params.id}`,
});
</script>
```

## seo 配置

### nuxt.config.ts 配置 app
```ts
export default defineNuxtConfig({
   app: {
    // 设置 seo ，会设置到 html 的 head 里面
    head: {
      title: "Nuxt 4",
      meta: [
        { name: "description", content: "Nuxt 4" },
        { name: "keywords", content: "Nuxt 4" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
})
```

### sitemap.xml

```bash
npx nuxi@latest module add sitemap
```

编写我们的站点信息
api/__sitemap__/url.ts
```ts
// server/api/__sitemap__/urls.ts
import type { SitemapUrlInput } from "#sitemap/types";
import { list } from "../../data";

export default defineSitemapEventHandler(() => {
  return list.map((v) => {
    return {
      loc: `/posts/${v.id}`,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.8,
      _sitemap: "pages",
    };
  }) satisfies SitemapUrlInput[];
});
```

配置到 nuxt.config.ts 里

```ts
export default defineNuxtConfig({
  site: {
    url: "http://localhost:3000",
    name: "localhost",
  },
  sitemap: {
    sources: ["/api/__sitemap__/urls"],
    exclude: ["/login/**"],
    cacheMaxAgeSeconds: 6 * 60 * 60,
    autoLastmod: true,
    // 添加更多配置
    defaults: {
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date(),
    },
    // 确保sitemap可以被搜索引擎访问
    xslColumns: [
      { label: "URL", width: "50%" },
      { label: "Last Modified", select: "sitemap:lastmod", width: "25%" },
      { label: "Priority", select: "sitemap:priority", width: "12.5%" },
      { label: "Change Frequency", select: "sitemap:changefreq", width: "12.5%" },
    ],
  }
})
```

[官方文档](https://nuxtseo.com/docs/sitemap/guides/dynamic-urls)

最后打开 http://localhost:3000/sitemap.xml 就可以看到 sitemap 了