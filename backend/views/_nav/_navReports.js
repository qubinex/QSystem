module.exports = {
  items: [
    /*
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },*/
    {
      title: true,
      name: 'Reports',
    },
    {
      name: 'Attendance',
      url: '/',
      children: [
        {
          name: 'By student',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'By class',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Monthly summary',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Yearly summary',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
      ]
    },
    {
      name: 'Financial',
      url: '/',
      children: [
        {
          name: 'By student',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'By class',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Monthly conclusion',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
      ]
    },
    {
      name: 'Insights',
      url: '/insighs',
    }
  ],
};
