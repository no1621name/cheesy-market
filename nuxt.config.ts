import eslintPlugin from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';

export default {
  srcDir: './src',
  ssr: true,
  app: {
    head: {
      title: 'Сыроварение',
    },
  },
  modules: [
    '@nuxt/image-edge',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
  ],
  image: {
    cloudinary: {
      baseURL: process.env.NUXT_PUBLIC_CLOUDINARY_URL,
    },
  },
  googleFonts: {
    families: {
      Roboto: true
    },
    prefetch: true
  },
  css: [
    '@/assets/styles/global.scss',
    '@coreui/coreui/dist/css/coreui.min.css',
    'bootstrap/dist/css/bootstrap.min.css',
    'swiper/css',
    'swiper/css/pagination',
    'swiper/css/navigation',
  ],
  typescript: {
    strict: true,
    typeCheck: true,
  },
  vite: {
    plugins: [
      eslintPlugin(),
      svgLoader(),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/_variables.scss"; @import "@/assets/styles/_mixins.scss";',
        }
      }
    }
  },
  runtimeConfig: {
    baseApiUrl: '',
    apiKey: '',
    public: {
      cloudinaryUrl: '',
    }
  },
  alias: {
    '@/': '<srcDir>'
  },
};
