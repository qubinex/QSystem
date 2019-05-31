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
      name: 'Employee',
      url: '/Employee',
      icon: 'fa fa-users',
      children: [
        {
          name: 'Staff annoucement',
          url: '/Annoucement/Staff/Index',
          icon: 'icon-bell',
        },
        {
          name: 'Employee list',
          url: '/Employee/List',
          icon: 'icon-puzzle',
        },
        {
          name: 'Timesheet clocking',
          url: '/Employee/Timesheet/New',
          icon: 'icon-puzzle',
        },
        {
          name: 'Timesheet history',
          url: '/Employee/Timesheet/History',
          icon: 'icon-puzzle',
        },
        {
          name: 'Timesheet approval',
          url: '/Employee/Timesheet/Approval',
          icon: 'icon-puzzle',
        },
        {
          name: 'Payroll Update',
          url: '/Employee/Payroll/Update',
          icon: 'icon-puzzle',
        },
        {
          name: 'Payroll history',
          url: '/Employee/Payroll/History',
          icon: 'icon-puzzle',
        },
      ]
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
