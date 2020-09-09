import React from "react";
import HeaderLayout from "components/HeaderLayout/HeaderLayout";
import FooterLayout from "components/FooterLayout/FooterLayout";

const HomePage: React.FC = () => (
  <>
    <HeaderLayout />
    <div>
      <h1>Hello nextjs</h1>
    </div>
    <FooterLayout />
  </>
);

export default HomePage;
