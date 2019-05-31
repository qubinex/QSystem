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
      name: 'Main task',
    },
    {
      name: 'General',
      url: '',
      icon: 'icon-speedometer',
    },
    {
      name: 'School settings',
      url: '/Class',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Profile',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Branch/venue',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Terms',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Employees',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
      ]
    },
    {
      name: 'Financial setting',
      url: '/Class',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Package',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tax',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Mass communication',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
      ]
    },
    {
      name: 'Tax',
      url: '',
      icon: 'icon-speedometer',
    },
    {
      name: 'Class feedback',
      url: '',
      icon: 'icon-speedometer',
    },
    {
      title: true,
      name: 'School',
    },
    {
      name: 'Annoucement',
      url: '/Class',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Staff annoucement',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'School annoucement',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Mass communication',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
      ]
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
    {
      title: true,
      name: 'School setting',
    },
    {
      name: 'Academy plan',
      url: '/Class',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Skill & Levels',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Class & Schedule',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
      ]
    },
    {
      name: 'Employee',
      url: '/Employee',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Employee List',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Employee portal',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Timesheet approval',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'New timesheet',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Timesheet report',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
      ]
    },
    {
      title: true,
      name: 'Pool',
    },
    {
      title: true,
      name: 'Reports/ Insights',
    },
    {
      title: true,
      name: 'Theme',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Colors',
      url: '/theme/colors',
      icon: 'icon-drop',
    },
    {
      name: 'Typography',
      url: '/theme/typography',
      icon: 'icon-pencil',
    },
    {
      title: true,
      name: 'Components',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Base',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Breadcrumbs',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Cards',
          url: '/base/cards',
          icon: 'icon-puzzle',
        },
        {
          name: 'Carousels',
          url: '/base/carousels',
          icon: 'icon-puzzle',
        },
        {
          name: 'Collapses',
          url: '/base/collapses',
          icon: 'icon-puzzle',
        },
        {
          name: 'Dropdowns',
          url: '/base/dropdowns',
          icon: 'icon-puzzle',
        },
        {
          name: 'Forms',
          url: '/base/forms',
          icon: 'icon-puzzle',
        },
        {
          name: 'Jumbotrons',
          url: '/base/jumbotrons',
          icon: 'icon-puzzle',
        },
        {
          name: 'List groups',
          url: '/base/list-groups',
          icon: 'icon-puzzle',
        },
        {
          name: 'Navs',
          url: '/base/navs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Paginations',
          url: '/base/paginations',
          icon: 'icon-puzzle',
        },
        {
          name: 'Popovers',
          url: '/base/popovers',
          icon: 'icon-puzzle',
        },
        {
          name: 'Progress Bar',
          url: '/base/progress-bar',
          icon: 'icon-puzzle',
        },
        {
          name: 'Switches',
          url: '/base/switches',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tables',
          url: '/base/tables',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tabs',
          url: '/base/tabs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tooltips',
          url: '/base/tooltips',
          icon: 'icon-puzzle',
        },
      ],
    },
    {
      name: 'Buttons',
      url: '/buttons',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Buttons',
          url: '/buttons/buttons',
          icon: 'icon-cursor',
        },
        {
          name: 'Button dropdowns',
          url: '/buttons/button-dropdowns',
          icon: 'icon-cursor',
        },
        {
          name: 'Button groups',
          url: '/buttons/button-groups',
          icon: 'icon-cursor',
        },
        {
          name: 'Brand Buttons',
          url: '/buttons/brand-buttons',
          icon: 'icon-cursor',
        },
      ],
    },
    {
      name: 'Charts',
      url: '/charts',
      icon: 'icon-pie-chart',
    },
    {
      name: 'Icons',
      url: '/icons',
      icon: 'icon-star',
      children: [
        {
          name: 'CoreUI Icons',
          url: '/icons/coreui-icons',
          icon: 'icon-star',
          badge: {
            variant: 'info',
            text: 'NEW',
          },
        },
        {
          name: 'Flags',
          url: '/icons/flags',
          icon: 'icon-star',
        },
        {
          name: 'Font Awesome',
          url: '/icons/font-awesome',
          icon: 'icon-star',
          badge: {
            variant: 'secondary',
            text: '4.7',
          },
        },
        {
          name: 'Simple Line Icons',
          url: '/icons/simple-line-icons',
          icon: 'icon-star',
        },
      ],
    },
    {
      name: 'Notifications',
      url: '/notifications',
      icon: 'icon-bell',
      children: [
        {
          name: 'Alerts',
          url: '/notifications/alerts',
          icon: 'icon-bell',
        },
        {
          name: 'Badges',
          url: '/notifications/badges',
          icon: 'icon-bell',
        },
        {
          name: 'Modals',
          url: '/notifications/modals',
          icon: 'icon-bell',
        },
      ],
    },
    {
      name: 'Widgets',
      url: '/widgets',
      icon: 'icon-calculator',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
  ],
};
