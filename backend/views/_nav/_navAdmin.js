module.exports = {
  items: [
    {
      // title: true,
      name: 'Main task',
      icon: 'fa fa-tasks',
      children: [
        {
          name: 'Dashboard',
          url: '/dashboard',
          icon: 'fa fa-dashboard',
        },
        {
          name: 'Student attendance',
          url: '/Student/Attendance',
          icon: 'fa fa-table',
        },
        {
          name: 'Print attendance',
          url: '/Student/Attendance/Print',
          icon: 'fa fa-print',
        },
        {
          name: 'Class payment',
          url: '/Finance/Lesson/Payment',
          icon: 'fa fa-money',
        },
        {
          name: 'Class feedback',
          url: '/base/breadcrumbs',
          icon: 'icon-speedometer',
        },
      ],
    },
    {
      name: 'Students',
      url: '/student',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Active student',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'All student',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Archieve student',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Absent list',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: '',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Registration form',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
      ]
    },
    {
      name: 'Class',
      url: '/Class',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Active class',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Wating list',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Archived class',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
      ]
    },
  ],
};
