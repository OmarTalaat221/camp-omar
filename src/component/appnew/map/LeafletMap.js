import React, { Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import {
  FeatureGroup,
  LayerGroup,
  MapContainer,
  Popup,
  Rectangle,
  SVGOverlay,
  TileLayer,
} from "react-leaflet";


const LeafletMap = (props) => {
  const positionIndia = [20.5937, 78.9629];
  const boundsIndia = [
    [21.5937, 80.9629],
    [22.5937, 70.9629],
  ];
  const centerAustralia = [-25.2744, 130.7751];
  const rectangleAustralia = [
    [-23.2744, 132.7751],
    [-30.2744, 144.7751],
  ];
  const purpleOptions = { color: "purple" };

  const positionUSA = [51.505, -0.09];
  
  return (
    <Fragment>
      <Breadcrumb parent="Apps / Map" title="Leaflet Map" />
      <Container fluid={true}>
        <Row>
          <Col xl="6" md="12">
            <Card>
              <CardHeader>
                <h5>Basic</h5>
              </CardHeader>
              <CardBody>
                <div className="map-js-height">
                  <div id="gmap-simple" className="map-block">
                    <MapContainer
                      className="jvector-map-height"
                      style={{
                        height: 350,
                        width: "100%",
                      }}
                      center={[50, 10]}
                      zoom={1}
                      maxZoom={10}
                      attributionControl={true}
                      zoomControl={true}
                      doubleClickZoom={true}
                      scrollWheelZoom={true}
                      dragging={true}
                      animate={true}
                      easeLinearity={0.35}
                    >
                      <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
                    </MapContainer>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xl="6" md="12">
            <Card>
              <CardHeader>
                <h5>Animated</h5>
              </CardHeader>
              <CardBody>
                <div className="map-js-height">
                  <div id="gmap-simple" className="map-block border">
                 
                  <MapContainer
                            className="jvector-map-height"
                            style={{ height: 350, width: "100%" }}
                            zoom={13}
                            center={positionUSA}
                            attributionControl={true}
                            zoomControl={true}
                            doubleClickZoom={true}
                            scrollWheelZoom={true}
                            dragging={true}
                            animate={true}
                            easeLinearity={0.35}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                           
                        </MapContainer>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xl="6" md="12">
            <Card>
              <CardHeader>
                <h5>Custome Name</h5>
              </CardHeader>
              <CardBody>
                <div className="map-js-height">
                  <div id="gmap-simple" className="map-block border">
                    <MapContainer
                      className="jvector-map-height"
                      style={{ height: 350, width: "100%" }}
                      zoom={5}
                      center={positionIndia}
                      zoomControl={true}
                      doubleClickZoom={true}
                      scrollWheelZoom={true}
                      dragging={true}
                      animate={true}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <SVGOverlay
                        attributes={{ stroke: "blue" }}
                        bounds={boundsIndia}
                      >
                        <rect
                          x="0"
                          y="0"
                          width="100%"
                          height="100%"
                          fill="white"
                        />
                        <circle r="5" cx="10" cy="10" fill="skyblue" />
                        <text x="50%" y="50%" stroke="blue">
                          text
                        </text>
                      </SVGOverlay>
                    </MapContainer>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="6" md="12">
            <Card>
              <CardHeader>
                <h5>Polygons</h5>
              </CardHeader>
              <CardBody>
                <div className="map-js-height">
                  <div id="gmap-simple" className="map-block border">
                    <MapContainer
                      className="jvector-map-height"
                      style={{ height: 350, width: "100%" }}
                      zoom={4}
                      center={centerAustralia}
                      zoomControl={true}
                      doubleClickZoom={true}
                      scrollWheelZoom={true}
                      dragging={true}
                      animate={true}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <LayerGroup>
                        <LayerGroup></LayerGroup>
                      </LayerGroup>
                      <FeatureGroup pathOptions={purpleOptions}>
                        <Popup>Popup in FeatureGroup</Popup>
                        <Rectangle bounds={rectangleAustralia} />
                      </FeatureGroup>
                    </MapContainer>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default LeafletMap;
