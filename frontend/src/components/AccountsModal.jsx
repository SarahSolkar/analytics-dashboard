import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
} from "reactstrap";
import { Holdings } from "./Holdings";
import { MaterialReactTable } from "material-react-table";

export const AccountsModal = (props) => {
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
  return (
    <>
      <Modal isOpen={props.modal} toggle={props.toggle} size="xl">
        <ModalHeader toggle={props.toggle} className="text-color">
          Account Details
          <br />
          <span className="text-muted fs-6">{props.advisor_name}</span>
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
