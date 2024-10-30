// import c from './Loader.module.css'

import { DNA } from "react-loader-spinner";

const Loader = () => {
  return (
    <div>
      <DNA
        visible={true}
        height="100"
        width="100"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

export default Loader;
