/*@flow*/
import * as React from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  TableHeader,
  TableHeaderColumn,
} from "material-ui/Table";

type DataObject = {
  [key: string]: number,
};

type Props = {
  data: Array<DataObject>,
};

const ContentTable = (props: Props) => (
  <Table fixedHeader={true}>
    <TableHeader
      displaySelectAll={false}
      adjustForCheckbox={false}
      enableSelectAll={false}
      style={{ height: "40px", padding: "0px" }}
    >
      <TableRow style={{ height: "20px" }}>
        {Object.keys(props.data[0]).map((key: string) => (
          <TableHeaderColumn key={key} style={{ height: "20px" }}>
            {key}
          </TableHeaderColumn>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody
      displayRowCheckbox={false}
      deselectOnClickaway={true}
      showRowHover={true}
      stripedRows={false}
    >
      {props.data.map((dataObj: DataObject, index: number) => (
        <TableRow
          key={`row-${index}`}
          style={{
            height: "40px",
            padding: "0px",
            cursor: "pointer",
          }}
        >
          {Object.keys(dataObj).map((objKey: string) => (
            <TableRowColumn
              key={`column-${objKey}`}
              style={{ height: "15px", paddingTop: "15px" }}
            >
              {dataObj[objKey]}
            </TableRowColumn>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default ContentTable;
