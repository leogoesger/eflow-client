// @flow
import * as React from "react";

type GeoClass = {
  name: string,
  description: string,
  archetypes: { [key: string]: any },
  medianAttributes: { [key: string]: number },
  geoSites: Array<any>,
};

const DialogArchetypes = ({ geoClass }: { geoClass: ?GeoClass }) => {
  if (!geoClass) {
    return null;
  }
  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "20px",
        }}
      >
        <div>
          <h1 style={{ marginBottom: "4px" }}>Synthetic Archetypes</h1>
          <img
            src={geoClass.archetypes.syntheticArchetype.imageUrl}
            alt="syntheticArchetype"
            style={{ width: "240px", height: "240px" }}
          />
        </div>
        <div>
          <h1 style={{ marginBottom: "4px" }}>Cross Section</h1>
          <img
            src={geoClass.archetypes.crossSection.imageUrl}
            alt="crossSection"
            style={{ width: "240px", height: "240px" }}
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <h1 style={{ marginBottom: "4px" }}>Planform</h1>
          <img
            src={geoClass.archetypes.planform.imageUrl}
            alt="planForm"
            style={{ width: "240px", height: "240px" }}
          />
        </div>
        <div>
          <h1 style={{ marginBottom: "4px" }}>Long Profile</h1>
          <img
            src={geoClass.archetypes.longProfile.imageUrl}
            alt="longProfile"
            style={{ width: "240px", height: "240px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default DialogArchetypes;
