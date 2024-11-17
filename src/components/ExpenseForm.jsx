import React, { useState } from "react";
import InputField from "./InputField";

export default function FormTable({ setExpenses }) {
  // const [isDisabled, setIsDisabled]= useState(true)
  const [error, setError] = useState({});
  const [expObj, setExpObj] = useState({
    title: "",
    category: "",
    amount: "",
  });

  const validationConfig = {
    title: [
      {
        required: "true",
        message: "Title is Required",
      },
      {
        minlength: 5,
        message: "Title should be of atleast 5 Characters",
      },
    ],
    category: [
      {
        required: "true",
        message: "Catogry is Required",
      },
    ],
    amount: [
      {
        required: "true",
        message: "Amount is Required",
      },
    ],
  };
  const validate = (formData) => {
    let errObj = {};
    // console.log(formData)
    Object.entries(formData).map(([key, value]) => {
      // console.log(key)
      // console.log(validationConfig[key]);
      validationConfig[key].some((rule) => {
        if (rule.required && !value) {
          errObj[key] = rule.message;
          return true;
        }
        if (rule.minlength && value.length < 5) {
          errObj[key] = rule.message;
          return true;
        }
      });
    });
    // setError(errObj);
    return errObj;
  };

  // console.log(errObj)

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setExpObj((prevState) => ({ ...prevState, [name]: value }));
    // console.log(expObj);
    setError({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateResult = validate(expObj);
    setError(validateResult)
    // console.log(error)
    if (Object.keys(validateResult).length) return;
    setExpObj({
      title: expObj.title,
      category: expObj.category,
      amount: expObj.amount,
    });
    setExpenses((prevState) => [
      ...prevState,
      { ...expObj, id: crypto.randomUUID() },
    ]);
    setExpObj({
      title: "",
      category: "",
      amount: "",
    });
    // setError(expObj)
  };

  return (
    <div>
      <form className="expense-form" onSubmit={handleSubmit}>
        <InputField
          title={"Title"}
          id={"title"}
          expObj={expObj.title}
          handleChange={handleChange}
          error={error.title}
        />
        {/* <div className="input-container">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            value={expObj.title}
            onChange={handleChange}
          />
          <p className="errorPara">{error.title}</p>
        </div> */}
        <div className="input-container">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            value={expObj.category}
            // onChange={(e) => {
            //   setExpObj((prevState) => ({
            //     ...prevState,
            //     category: e.target.value,
            //   }));
            // }}
            onChange={handleChange}
          >
            <option value="" hidden>
              Select Catogry
            </option>
            <option value="grocery">Grocery</option>
            <option value="clothes">Clothes</option>
            <option value="bills">Bills</option>
            <option value="education">Education</option>
            <option value="medicine">Medicine</option>
          </select>
          <p className="errorPara">{error.category}</p>
        </div>
        <InputField
          title={"Amount"}
          id={"amount"}
          expObj={expObj.amount}
          handleChange={handleChange}
          error={error.amount}
        />
        {/* <div className="input-container">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            name="amount"
            type="number"
            value={expObj.amount}
            // onChange={(e) => {
            //   setExpObj((prevState) => ({
            //     ...prevState,
            //     amount: e.target.value,
            //   }));
            // }}
            onChange={handleChange}
          />
          <p className="errorPara">{error.amount}</p>
        </div> */}
        <button>Add</button>
      </form>
    </div>
  );
}
