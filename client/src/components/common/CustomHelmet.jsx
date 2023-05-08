import { Helmet } from "react-helmet-async"

function CustomHelmet({title}) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </>
  );
}

export default CustomHelmet;
