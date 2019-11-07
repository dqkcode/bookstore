import React, { Component, Fragment } from "react";
import { Row, Button } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { ReactTableAdvancedCard } from "../../../containers/ui/UsersTable";
import AddNewUserModal from '../../../containers/pages/AddNewUserModal';
// import ListPageHeading from '../../../containers/pages/ListPageHeading'
// import IntlMessages from "../../../helpers/IntlMessages";

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require('mousetrap');
    this.state = {
      categories: [
        { label: "Cakes", value: "Cakes", key: 0 },
        { label: "Cupcakes", value: "Cupcakes", key: 1 },
        { label: "Desserts", value: "Desserts", key: 2 }
      ],
      modalOpen: false
    }

  }
  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };
  render() {
    const {
      modalOpen,
      categories
    } = this.state;
    return (
      <Fragment>
        <AddNewUserModal
          modalOpen={modalOpen}
          toggleModal={this.toggleModal}
          categories={categories}
        />
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="menu.users" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="8" className="mb-4">
            <ReactTableAdvancedCard
              toggleModal={this.toggleModal}
            />
          </Colxx>
          <Colxx xxs="4" className="mb-4">
          </Colxx>
        </Row>
      </Fragment>
    )
  }
}
