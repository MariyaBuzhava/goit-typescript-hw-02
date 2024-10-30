import c from "./SearchBar.module.css";

import toast from "react-hot-toast";
import { Field, Form, Formik } from "formik";

const SearchBar = ({ onSubmit }) => {
  const initaialValues = {
    query: "",
  };
  const handleSubmit = (values, { resetForm }) => {
    if (values.query.trim() === "") {
      toast.error("Please enter a search query.");
      return;
    }

    onSubmit(values.query);
    resetForm();
  };
  return (
    <div className={c.searchBar}>
      <Formik initialValues={initaialValues} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form>
            <Field
              name="query"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              className={c.input}
            />
            <button type="submit">Search</button>
            {errors.query && touched.query && (
              <div style={{ color: "red" }}>{errors.query}</div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchBar;
