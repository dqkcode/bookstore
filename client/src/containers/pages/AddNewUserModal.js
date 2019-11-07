import React from "react";
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label
} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import IntlMessages from "../../helpers/IntlMessages";

const AddNewUserModal = ({ modalOpen, toggleModal, categories }) => {
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="pages.add-new-user-title" />
      </ModalHeader>
      <ModalBody>
        <Label>
          <IntlMessages id="pages.user-first-name" />
        </Label>
        <Input />
        <Label>
          <IntlMessages id="pages.user-last-name" />
        </Label>
        <Input />
        <Label>
          <IntlMessages id="pages.user-email" />
        </Label>
        <Input />
        <Label className="mt-4">
          <IntlMessages id="pages.user-role" />
        </Label>
        <Select
          components={{ Input: CustomSelectInput }}
          className="react-select"
          classNamePrefix="react-select"
          name="form-field-name"
          options={categories}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="pages.cancel" />
        </Button>
        <Button color="primary" onClick={toggleModal}>
          <IntlMessages id="pages.submit" />
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
};

export default AddNewUserModal;
