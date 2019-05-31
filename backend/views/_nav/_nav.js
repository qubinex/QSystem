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
    },
    */
    {
      title: true,
      name: 'Main task',
      icon: 'fa fa-tasks',
    },
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'fa fa-dashboard',
    },
    {
      name: 'Attendance',
      url: '/Student/Attendance',
      icon: 'fa fa-table',
    },
    {
      name: 'Replacement register',
      url: '/Student/Replacement',
      icon: 'fa fa-money',
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
    {
      title: true,
      name: 'School',
    },
    {
      name: 'Annoucement',
      url: '/Annoucement',
      icon: 'fa fa-bullhorn',
      children: [
        {
          name: 'Staff annoucement',
          url: '/Annoucement/Staff/Index',
          icon: 'icon-bell',
        },
        {
          name: 'School annoucement',
          url: '/Annoucement/Student/Index',
          icon: 'icon-bell',
        },
        {
          name: 'Mass communication',
          url: '/Annoucement/Mass/Index',
          icon: 'fa fa-bullhorn',
        },
      ],
    },
    {
      name: 'Students',
      url: '/Student',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Registration',
          url: '/Student/registration',
          icon: 'icon-puzzle',
        },
        {
          name: 'Active student',
          url: '/Student/Index',
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
      ],
    },
    /*
    {
      title: true,
      name: 'Theme',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    */
  ],
};
