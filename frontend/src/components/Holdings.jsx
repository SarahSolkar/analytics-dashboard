import React, { useState, useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Badge } from "reactstrap";
export const Holdings = (props) => {
  const [holdings, setHoldings] = useState([]);
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/accounts/${props.accountNumber}/holdings`)
      .then((response) => response.json())
      .then((data) => setHoldings(data));
  }, []);
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Advisor Name",
        Cell: ({ cell }) => <strong>{cell.getValue()}</strong>,
      },
      {
        accessorKey: "account_count",
        header: "Accounts",
        Cell: ({ cell }) => (
          <Badge color="info" pill>
            {cell.getValue()}
          </Badge>
        ),
      },
      {
        accessorKey: "total_assets",
        header: "Total Assets",
        Cell: ({ cell }) => (
          <span className="text-success">
            $
            {cell.getValue().toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        ),
      },
      {
        accessorKey: "custodians",
        header: "Custodians",
        Cell: ({ cell }) => (
          <div>
            {cell.getValue().map((custodian, index) => (
              <Badge key={custodian.repId} color="secondary" className="me-1">
                {custodian.name}
              </Badge>
            ))}
          </div>
        ),
      },
    ],
    []
  );
  return (
    <>
      <MaterialReactTable
        data={holdings}
        columns={[
          {
            accessorKey: "ticker",
            header: "Ticker",
            Cell: ({ cell }) => <code>{cell.getValue()}</code>,
          },
          {
            accessorKey: "name",
            header: "Holding Name",
          },
          {
            accessorKey: "units",
            header: "Units",
            Cell: ({ cell }) => (
              <Badge color="dark" className="text-light">
                {cell.getValue().toLocaleString()}
              </Badge>
            ),
          },
          {
            accessorKey: "unitPrice",
            header: "Unit Price",
            Cell: ({ cell }) => (
              <span className="text-secondary">
                $
                {cell.getValue().toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            ),
          },
          {
            accessorKey: "value",
            header: "Value",
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
        ]}
        enableColumnFilters={false}
        enableColumnActions={false}
        enablePagination={false}
        enableSorting={false}
        enableBottomToolbar={false}
        enableTopToolbar={false}
        muiTableBodyRowProps={{ hover: true }}
        initialState={{ density: "compact" }}
      />
    </>
  );
};
