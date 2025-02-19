import React from "react";
import { MaterialReactTable } from "material-react-table";

export const AdvisorTable = (props) => {
  return (
    <>
      <MaterialReactTable
        columns={props.columns}
        data={props.data}
        enableSorting
        enablePagination
        enableColumnActions={false}
        enableDensityToggle={false}
        enableFullScreenToggle={false}
        enableHiding={false}
        enableColumnFilters={false}
        paginationDisplayMode="pages"
        initialState={{
          density: "compact",
          pagination: {
            pageIndex: 0,
            pageSize: 5,
          },
        }}
        muiPaginationProps={{
          rowsPerPageOptions: [5],
        }}
      />{" "}
    </>
  );
};
