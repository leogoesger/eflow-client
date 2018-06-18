// @flow
import * as React from "react";

type GeoClass = {
  name: string,
  description: string,
  archetypes: { [key: string]: any },
  medianAttributes: { [key: string]: number },
  geoSites: Array<any>,
};

const DialogAttributes = ({ geoClass }: { geoClass: ?GeoClass }) => {
  if (!geoClass) {
    return null;
  }
  return (
    <div style={{ width: "300px", margin: "0 auto", padding: "16px" }}>
      <h1
        style={{
          fontWeight: "800",
          marginBottom: "10px",
          fontSize: "18px",
        }}
      >
        Median Attribute Table
      </h1>

      <table style={{ width: "100%" }}>
        <tbody>
          {Object.keys(geoClass.medianAttributes).map(key => (
            <tr key={key} style={{ height: "30px" }}>
              <td
                style={{
                  borderBottom: "1px solid #bdbdbd",
                  paddingTop: "10px",
                }}
              >
                {key}
              </td>
              <td
                style={{
                  borderBottom: "1px solid #bdbdbd",
                  paddingTop: "10px",
                }}
              >
                {geoClass.medianAttributes[key]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DialogAttributes;
