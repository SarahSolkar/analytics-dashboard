import { useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  Button,
  Card,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import "../styles.css";
import { PieChart } from "./PieChart";
import { Holdings } from "./Holdings";
import { DonutChart } from "./DonutChart";
export const Advisors = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [advisors, setAdvisors] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const [selectedAdvisor, setSelectedAdvisor] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/advisors")
      .then((response) => response.json())
      .then((data) => setAdvisors(data));
  }, []);
  const handleViewAccounts = (advisor) => {
    fetch(`http://127.0.0.1:5000/api/advisor/${advisor.id}/accounts`)
      .then((res) => res.json())
      .then((data) => {
        setAccounts(data);
        setSelectedAdvisor(advisor);
        setModal(true);
      });
  };

  const details = [
    { accessorKey: "number", header: "Account Number" },
    { accessorKey: "name", header: "Account Name" },
    { accessorKey: "custodian", header: "Custodian" },
    {
      accessorKey: "totalValue",
      header: "Total Value",
      Cell: ({ cell }) => (
        <span className="text-success fw-bold">
          $
          {cell.getValue().toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      ),
    },
    { accessorKey: "holdings_count", header: "Holding Count" },
  ];

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Advisor Name",
    },
    {
      accessorKey: "total_assets",
      header: "Total Account Value",
      Cell: ({ cell }) => (
        <span className="text-primary fw-bold">
          $
          {cell.getValue().toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      ),
    },
    {
      accessorKey: "actions",
      header: "Accounts",
      enableSorting: false,
      Cell: ({ row }) => (
        <Button
          color="primary"
          onClick={() => handleViewAccounts(row.original)}
        >
          View
        </Button>
      ),
    },
  ];
  console.log(accounts);
  return (
    <>
      <div
        className="row justify-content-center"
        style={{
          backgroundColor: "#EFEFEF",
          minHeight: "calc(100vh - 90px)",
        }}
      >
        <div className="col-md-11 mt-2">
          <Card className="mb-3"
            body
            style={{
              backgroundColor: "#fff",
              borderColor: "#f5f5f5",
              borderRadius: "20px",
            }}
          >
            <h3>Advisor Dashboard</h3>
            <hr className="my-2 ml-3 mr-3" />

            <div className="row mt-5 justify-content-center">
              <div className="col-md-4">
                <Card
                  body
                  className="card-pops p-0"
                  style={{
                    backgroundColor: "#fff",
                    borderColor: "#f5f5f5",
                    borderRadius: "10px",
                  }}
                >
                  <PieChart advisors={advisors} />
                </Card>
              </div>{" "}
              <div className="col-md-8">
                <MaterialReactTable
                  columns={columns}
                  data={advisors}
                  enableSorting
                  enablePagination
                  enableColumnActions={false}
                  enableDensityToggle={false}
                  enableFullScreenToggle={false}
                  enableHiding={false}
                  enableColumnFilters={false}
                  paginationDisplayMode="pages"
                />{" "}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <DonutChart advisors={advisors} />
              </div>
              <div className="col-md-6">
                <PieChart advisors={advisors} />
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle} size="xl">
        <ModalHeader toggle={toggle}>Account Details</ModalHeader>
        <ModalBody>
          <MaterialReactTable
            columns={details}
            data={accounts}
            enableSorting
            enablePagination={false}
            enableDensityToggle={false}
            enableExpandAll={false}
            enableExpanding={true}
            renderDetailPanel={({ row: accountRow }) => (
              <Holdings accountNumber={accountRow.original.number} />
            )}
            enableColumnActions={false}
            enableFullScreenToggle={false}
            muiTableBodyRowProps={{ hover: true }}
            enableColumnFilters={false}
            enableHiding={false}
            enableBottomToolbar={false}
            initialState={{ density: "compact" }}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
