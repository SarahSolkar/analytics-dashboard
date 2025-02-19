import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Holdings } from "./Holdings";
import { MaterialReactTable } from "material-react-table";

export const AccountsModal = (props) => {
  const details = [
    {
      accessorKey: "number",
      header: "Account Number",

      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
    },
    {
      accessorKey: "name",
      header: "Account Name",

      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
    },
    {
      accessorKey: "custodian",
      header: "Custodian",

      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
    },
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
      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
    },
    {
      accessorKey: "holdings_count",
      header: "Holding Count",

      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
    },
  ];
  return (
    <>
      <Modal isOpen={props.modal} toggle={props.toggle} size="xl">
        <ModalHeader toggle={props.toggle} className="text-color">
          Account Details - {props.advisor_name}
        </ModalHeader>
        <ModalBody>
          <MaterialReactTable
            columns={details}
            data={props.accounts}
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
          <Button color="danger" onClick={props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
