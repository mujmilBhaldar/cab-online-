import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Carousel from "react-bootstrap/Carousel";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
interface IImageSliderProps {}

const ImageSlider: React.FunctionComponent<IImageSliderProps> = (props) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Carousel>
          <Carousel.Item style={{ height: "75vh" }}>
            <img
              className="d-block w-100 h-100"
              src="assets/images/slider/5.webp"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item style={{ height: "75vh" }}>
            <img
              className="d-block w-100 h-100"
              src="assets/images/slider/6.webp"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item style={{ height: "75vh" }}>
            <img
              className="d-block w-100 h-100"
              src="assets/images/slider/4.webp"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </Grid>
    </Grid>
  );
};

export default ImageSlider;

// npm i react-bootstrap
