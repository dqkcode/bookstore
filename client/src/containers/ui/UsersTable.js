import React from "react";
import { Card, CardBody, CardTitle, Button, Row } from "reactstrap";
// import PerfectScrollbar from "react-perfect-scrollbar";
import ReactTable from "react-table";
// import classnames from "classnames";
import IntlMessages from "../../helpers/IntlMessages";
import DataTablePagination from "../../components/DatatablePagination";
import { Colxx } from "../../components/common/CustomBootstrap";



const data = [
  {
    id: 1,
    title: 'Marble Cake',
    img: '/assets/img/marble-cake-thumb.jpg',
    category: 'Cakes',
    createDate: '02.04.2018',
    status: 'ON HOLD',
    statusColor: 'primary',
    description: 'Wedding cake with flowers Macarons and blueberries',
    sales: 1647,
    stock: 62
  },
  {
    id: 2,
    title: 'Fat Rascal',
    category: 'Cupcakes',
    img: '/assets/img/fat-rascal-thumb.jpg',
    createDate: '01.04.2018',
    status: 'PROCESSED',
    statusColor: 'secondary',
    description: 'Cheesecake with chocolate cookies and Cream biscuits',
    sales: 1240,
    stock: 48
  }
]


const dataTableColumns = [
  {
    Header: "Name",
    accessor: "title",
    Cell: props => <p className="list-item-heading">{props.value}</p>
  },
  {
    Header: "Email",
    accessor: "sales",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: "Role",
    accessor: "stock",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: "Action",
    accessor: "category",
    Cell: props => (
      <>
        <Button outline size="xs" className="mr-2" color="primary" onClick={() => clickBtnEdit(props.original)}>Edit</Button>
        <Button outline size="xs" className="mr-2" color="danger" onClick={() => clickBtnRemove()}>Remove</Button>
      </>
    )
  }
];
const clickBtnEdit = (value) => {
  console.log('clickBtnEdit, value = ', value);
}
const clickBtnRemove = () => {
  console.log('remove');
}

export const ReactTableAdvancedCard = props => {
  const {
    toggleModal
  } = props;
  console.log('toggleModal :', toggleModal);
  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle>
        <Row>
          <Colxx xxs="8" className="mb-4">
            <IntlMessages id="table.users" />
          </Colxx>
          <Colxx xxs="4" className="mb-4">
            <Button
              color="primary"
              size="md"
              className="top-right-button float-right"
              onClick={() => toggleModal()}>
              <IntlMessages id="pages.add-new-user-title" />
            </Button>
          </Colxx>
        </Row>
        </CardTitle>
       

        <ReactTable
          data={data}
          columns={dataTableColumns}
          defaultPageSize={5}
          filterable={true}
          showPageJump={true}
          PaginationComponent={DataTablePagination}
          showPageSizeOptions={true}
        />
      </CardBody>
    </Card>
  );
};
