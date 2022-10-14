import * as React from "react";
import BookingForm from "./BookingForm";
import ImageSlider from "./ImageSlider";

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <>
      <ImageSlider />

      <BookingForm />
      <h2>Home Component</h2>
    </>
  );
};

export default Home;
