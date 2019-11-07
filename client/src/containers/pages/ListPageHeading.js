import React, { Component } from "react";
import {
  Row,
  Button,
} from "reactstrap";
import { injectIntl } from "react-intl";

import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";


class ListPageHeading extends Component {
  constructor(props) {
    super();
    this.state = {
      dropdownSplitOpen: false,
      displayOptionsIsOpen: false
    };
  }

  toggleDisplayOptions = () => {
    this.setState(prevState => ({
      displayOptionsIsOpen: !prevState.displayOptionsIsOpen
    }));
  };
  toggleSplit = () => {
    this.setState(prevState => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen
    }));
  }

  render() {
    const {
      toggleModal
    } = this.props;

    return (
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <div className="text-zero top-right-button-container">
              <Button
                color="primary"
                size="lg"
                className="top-right-button"
                onClick={() => toggleModal()}>
                <IntlMessages id="pages.add-new-user-title" />
              </Button>
              {"  "}
            </div>
          </div>
        </Colxx>
      </Row>
    );
  }
}

export default injectIntl(ListPageHeading);
