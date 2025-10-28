import React, { Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { Draggable, GeoJson, GeoJsonFeature, Map, Marker } from "pigeon-maps";
import { useState } from "react";

const MapJsContain = () => {
  const [anchor, setAnchor] = useState([50.879, 4.6997]);
  const geoJsonFeatureSample = {
    type: "Feature",
    geometry: { type: "Point", coordinates: [2.0, 48.5] },
    properties: { prop0: "value0" },
  };
  return (
    <Fragment>
      <Breadcrumb parent="Apps / Map" title="Pigeon Maps" />
      <Container fluid={true}>
        <Row>
          <Col xl="6">
            <Card>
              <CardHeader>
                <h5>Basic Demo</h5>
              </CardHeader>
              <CardBody>
                <div className="map-js-height" id="map1">
                  <Map height={300} defaultCenter={[45.879, 4.6997]} defaultZoom={11}></Map>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="6" md="12">
            <Card>
              <CardHeader>
                <h5>Draggable Markers</h5>
              </CardHeader>
              <CardBody>
                <div className="map-js-height">
                  <Map height={300} defaultCenter={[50.879, 4.6997]} defaultZoom={11}>
                    <Draggable offset={[60, 87]} anchor={anchor} onDragEnd={setAnchor}>
                      <Marker width={50} anchor={[50.879, 4.6997]} />
                    </Draggable>
                  </Map>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="6" md="12">
            <Card>
              <CardHeader>
                <h5>Geo JsonMaps</h5>
              </CardHeader>
              <CardBody>
                <div className="map-js-height">
                  <Map height={300} defaultCenter={[50.879, 4.6997]} defaultZoom={4} width={693.5}>
                    <GeoJson
                      svgAttributes={{
                        fill: "#d4e6ec99",
                        strokeWidth: "1",
                        stroke: "white",
                        r: "20",
                      }}>
                      <GeoJsonFeature feature={geoJsonFeatureSample} />
                    </GeoJson>
                  </Map>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="6" md="12">
            <Card>
              <CardHeader>
                <h5>Marker Map</h5>
              </CardHeader>
              <CardBody>
                <div className="map-js-height">
                  <Map height={300} defaultCenter={[50.879, 4.6997]} defaultZoom={11}>
                    <Marker width={50} anchor={[50.879, 4.6997]} />
                  </Map>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default MapJsContain;
