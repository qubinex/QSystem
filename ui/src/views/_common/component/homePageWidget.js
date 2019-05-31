import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardFooter } from 'reactstrap';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';

const propTypes = {
  header: PropTypes.string,
  mainText: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.string,
  footer: PropTypes.bool,
  link: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
};

const defaultProps = {
  header: '$1,999.50',
  mainText: 'Income',
  icon: 'fa fa-cogs',
  color: 'primary',
  variant: '1',
  link: '#',
};

function HomePageWidget(props) {
  const { className, cssModule, header, mainText, icon, color, footer, link, children, variant, ...attributes } = props;
  const padding = {
    card: 'p-0', icon: 'p-4', lead: 'pt-3',
  }

  const card = { style: 'clearfix', color: color, icon: icon, classes: '' };
  card.classes = mapToCssModules(classNames(className, card.style, padding.card), cssModule);

  const lead = { style: 'h5 mb-0', color: color, classes: '' };
  lead.classes = classNames(lead.style, 'text-' + card.color, padding.lead);

  const blockIcon = function (icon) {
    const classes = classNames(icon, 'bg-' + card.color, padding.icon, 'font-2xl mr-3 float-left');
    return (<i className={classes}></i>);
  };

  return (
    <Card>
      <a className="font-weight-bold font-xs btn-block text-muted" href={link}>
        <CardBody className={card.classes} {...attributes}>
          {blockIcon(card.icon)}
          <div className={lead.classes}>{header}</div>
          <div className="text-muted text-uppercase font-weight-bold font-xs">{mainText}</div>
        </CardBody>
      </a>
    </Card>
  );
}

HomePageWidget.propTypes = propTypes;
HomePageWidget.defaultProps = defaultProps;

export default HomePageWidget;
