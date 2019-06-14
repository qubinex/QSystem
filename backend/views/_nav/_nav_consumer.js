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
      name: 'Main',
      url: '/Main',
      icon: 'fa fa-table',
    },
    {
      name: 'Merchant reward',
      url: '/Rewards',
      icon: 'fa fa-table',
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
