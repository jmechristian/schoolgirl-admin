/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'light-grey': '#fff0f0',
        'brand-red': '#ee2938',
        'sweet-green': '#39b99b',
        'warm-brown': '#be4e2e',
        khaki: '#eae6e0',
        mint: '#c3ece8',
        'neutral-brown': '#d68752',
        salmon: '#d66250',
      },
      fontFamily: {
        brown: 'Brown',
        'brown-bold': 'Brown-Bold',
        'brown-light': 'Brown-Light',
        canela: 'Canela-Light',
        'sweet-bold': 'SweetSansPro-Bold',
        sweet: 'SweetSansPro-Regular',
        scarlet: 'ScarletWhaleys',
      },
      backgroundImage: {
        'hero-one':
          "url('https://res.cloudinary.com/designadg/image/upload/v1675644535/SGS/hero_1_fdhick.webp')",
        'hero-two':
          "url('https://res.cloudinary.com/designadg/image/upload/v1676239775/SGS/hero_2_krjfjc.webp')",
        'hero-three':
          "url('https://res.cloudinary.com/designadg/image/upload/v1676249813/SGS/hero_3_kwdtr1.webp')",
        'hero-goodvibes':
          "url('https://res.cloudinary.com/designadg/image/upload/v1676753279/SGS/hero_4_goodvibes_luwhf6.webp')",
        'hero-makeover':
          "url('https://res.cloudinary.com/designadg/image/upload/v1676757103/SGS/hero_5_makeover_gpwpqu.webp')",
        'hero-shop-safari':
          "url('https://res.cloudinary.com/designadg/image/upload/v1677174350/SGS/shop_safari_smwl7q.webp')",
        'hero-sgs-design':
          "url('https://res.cloudinary.com/designadg/image/upload/v1677720975/SGS/sgs_design_hero_osocbk.webp')",
        'hero-shop-picks':
          "url('https://res.cloudinary.com/designadg/image/upload/v1677773911/SGS/shop_picks_hero_po4lyh.webp')",
        'hero-shop-new':
          "url('https://res.cloudinary.com/designadg/image/upload/q_82/v1678046698/SGS/shop_whatsnew_hero_kanmsq.webp')",
        'visit-meet':
          "url('https://res.cloudinary.com/designadg/image/upload/v1678054623/SGS/visit_item_1_lh1r6x.webp')",
        'visit-outlet':
          "url('https://res.cloudinary.com/designadg/image/upload/v1678054623/SGS/visit_item_2_tbh2ij.webp')",
        'visit-events':
          "url('https://res.cloudinary.com/designadg/image/upload/v1678064481/SGS/visit-events-hero_pwwyx2.webp')",
        'blog-goodvibes':
          "url('https://res.cloudinary.com/designadg/image/upload/v1678234707/SGS/blog-goodvibes_lwto3p.webp')",
        'blog-helping':
          "url('https://res.cloudinary.com/designadg/image/upload/v1678235051/SGS/helping-hero_sujen8.webp')",
        'blog-style':
          "url('https://res.cloudinary.com/designadg/image/upload/v1678236862/SGS/blog-style_sfjiaz.webp')",
        'hero-giving':
          "url('https://res.cloudinary.com/designadg/image/upload/v1678661150/SGS/giving_hero_d18a2f.webp')",
        'hero-giving-scholarship':
          "url('https://res.cloudinary.com/designadg/image/upload/v1678663959/SGS/giving_scholarship_hero_ypqftf.webp')",
        'hero-giving-stylist':
          "url('https://res.cloudinary.com/designadg/image/upload/v1678664455/SGS/giving_stylist_hero_w5cqxa.webp')",
        'hero-mel':
          "url('https://res.cloudinary.com/designadg/image/upload/v1678820898/SGS/about-mel_kwy0n9.webp')",
        'hero-al':
          "url('https://res.cloudinary.com/designadg/image/upload/v1678820898/SGS/about-al_j1fb9q.webp')",
        'hero-raissa':
          "url('https://res.cloudinary.com/designadg/image/upload/v1678820898/SGS/about_raissa_oeapsg.webp')",
        'hero-elisa':
          "url('https://res.cloudinary.com/designadg/image/upload/v1678820898/SGS/about_elisa_tgeohm.webp')",
        'hero-about-dreamteam':
          "url('https://res.cloudinary.com/designadg/image/upload/v1678820898/SGS/about-dream-team_u5ghpw.webp')",
        'polka-light':
          "url('https://res.cloudinary.com/designadg/image/upload/v1678825221/SGS/polka-light_rao2fh.webp')",
        blog: "url('https://res.cloudinary.com/designadg/image/upload/v1678234099/SGS/blog-hero_f0kqya.webp')",
        polka:
          "url('https://res.cloudinary.com/designadg/image/upload/v1678053756/SGS/polka_bg_nodgrs.webp')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};
