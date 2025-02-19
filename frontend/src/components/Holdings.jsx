import React, { useState, useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Badge } from "reactstrap";
import { AdvisorService } from "../services/AdvisorService";

export const Holdings = (props) => {
  const [holdings, setHoldings] = useState([]);
  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const holdingData = await AdvisorService.getHoldings(
          props.accountNumber
        );
        setHoldings(holdingData);
      } catch (error) {
        console.error("Error fetching advisors:", error);
      }
    };
    fetchHoldings();
  }, []);
  const columns = useMemo(
    () => [
      {
        accessorKey: "ticker",
        header: "Ticker",
        Cell: ({ cell }) => <code className="fw-bold">{cell.getValue()}</code>,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "name",
        header: "Holding Name",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "units",
        header: "Units",
        Cell: ({ cell }) => (
          <Badge color="dark" className="text-light">
            {cell.getValue().toLocaleString()}
          </Badge>
        ),
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
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
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
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
    ],
    []
  );
  return (
    <>
      <MaterialReactTable
        data={holdings}
        columns={columns}
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
