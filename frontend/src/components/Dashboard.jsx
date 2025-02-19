import { useState, useEffect } from "react";
import { Button, Card } from "reactstrap";
import "../styles.css";
import { PieChart } from "./PieChart";
import { DonutChart } from "./DonutChart";
import { AdvisorService } from "../services/AdvisorService";
import { AdvisorTable } from "./AdvisorTable";
import { AccountsModal } from "./AccountsModal";
import { Chart } from "./Chart";

export const Dashboard = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [advisors, setAdvisors] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedAdvisor, setSelectedAdvisor] = useState([]);

  useEffect(() => {
    const fetchAdvisors = async () => {
      try {
        const advisorData = await AdvisorService.getAdvisors();
        setAdvisors(advisorData);
      } catch (error) {
        console.error("Error fetching advisors:", error);
      }
    };
    fetchAdvisors();
  }, []);

  const handleViewAccounts = async (advisor) => {
    try {
      const accountsData = await AdvisorService.getAdvisorAccounts(advisor.id);
      setAccounts(accountsData);
      setSelectedAdvisor(advisor);
      setModal(true);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
    },
    {
      accessorKey: "name",
      header: "Advisor Name",
      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
    },
    {
      accessorKey: "account_count",
      header: "No. of Accounts",
      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
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
      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
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
          <Card
            className="mb-2"
            body
            style={{
              backgroundColor: "#fff",
              borderColor: "#f5f5f5",
              borderRadius: "20px",
            }}
          >
            <h4 className="fw-bold text-color">Advisor Dashboard</h4>
            <hr className="my-2 ml-3 mr-3 text-color" />

            <div className="row mt-3 justify-content-center">
              <div className="col-md-12">
                <AdvisorTable data={advisors} columns={columns} />
              </div>{" "}
            </div>
            <div className="row mt-3">
              <div className="col-md-4">
                <Card body className="card-pops p-0 m-1">
                  <PieChart advisors={advisors} />
                </Card>
              </div>

              <div className="col-md-4">
                <Card body className="card-pops p-0 m-1">
                  <DonutChart advisors={advisors} />
                </Card>
              </div>
              <div className="col-md-4">
                <Card body className="card-pops p-0 m-1">
                  <Chart advisors={advisors} />
                </Card>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <AccountsModal
        toggle={toggle}
        modal={modal}
        accounts={accounts}
        advisor_name={selectedAdvisor["name"]}
      />
    </>
  );
};
