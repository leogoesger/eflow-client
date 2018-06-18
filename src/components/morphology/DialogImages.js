// @flow
/* eslint react/prop-types: 0 */
import * as React from "react";
import FlatButton from "material-ui/FlatButton";
import { Colors } from "../../styles";

type GeoClass = {
  name: string,
  description: string,
  archetypes: { [key: string]: any },
  medianAttributes: { [key: string]: number },
  geoSites: Array<any>,
};

type GeoSite = {
  identity: string,
  imageUrl: string,
};

type Images = Array<string>;

type Props = {
  geoClass: ?GeoClass,
  updateCurrentSite: Function,
};

type States = {
  number: number,
};

class DialogImages extends React.PureComponent<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      number: 0,
    };
  }

  componentDidMount() {
    if (!this.props.geoClass) {
      return null;
    }
    this.props.updateCurrentSite({
      ...this.props.geoClass.geoSites[this.state.number],
      geoClass: this.props.geoClass.name,
    });
  }

  getImages(geoSites: Array<GeoSite>): Images {
    return geoSites.map(site => site.imageUrl);
  }

  render() {
    const { geoClass } = this.props;
    if (!geoClass) {
      return null;
    }

    return (
      <div>
        <img
          src={this.getImages(geoClass.geoSites)[this.state.number]}
          alt="Site Image"
          style={{ width: "100%" }}
        />
        <div
          style={{
            width: "96%",
            display: "flex",
            justifyContent: "space-between",
            margin: "6px auto 8px auto",
          }}
        >
          <FlatButton
            label="Prev"
            labelStyle={{ fontSize: "12px", color: Colors.gold }}
            onClick={() =>
              this.setState(
                {
                  number:
                    this.state.number === 0
                      ? geoClass.geoSites.length - 1
                      : this.state.number - 1,
                },
                () =>
                  this.props.updateCurrentSite({
                    ...geoClass.geoSites[this.state.number],
                    geoClass: geoClass.name,
                  })
              )
            }
          />
          <FlatButton
            label="Next"
            labelStyle={{ fontSize: "12px", color: Colors.gold }}
            onClick={() =>
              this.setState(
                {
                  number:
                    this.state.number === geoClass.geoSites.length - 1
                      ? 0
                      : this.state.number + 1,
                },
                () =>
                  this.props.updateCurrentSite({
                    ...geoClass.geoSites[this.state.number],
                    geoClass: geoClass.name,
                  })
              )
            }
          />
        </div>
      </div>
    );
  }
}
export default DialogImages;
