export default defineAppConfig({
  email: 'o.goudmane@gmail.com',

  navDelay: 1000,
  loaderDelay: 2000,

  socialMedia: [
    {
      name: 'GitHub',
      icon: 'icon-park-outline:github-one',
      url: 'https://github.com/goudmane',
    },
    {
      name: 'Linkedin',
      icon: 'icon-park-outline:instagram-one',
      url: 'https://www.linkedin.com/in/o-goudmane',
    },
  ],

  navLinks: [
    {
      name: 'about',
      url: '/#about',
    },
    {
      name: 'exp',
      url: '/#jobs',
    },
    {
      name: 'work',
      url: '/#projects',
    },
    {
      name: 'contact',
      url: '/#contact',
    },
  ],

  colors: {
    green: '#64ffda',
    navy: '#0a192f',
    darkNavy: '#020c1b',
  },
});
