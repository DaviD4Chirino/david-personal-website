import React from "react";
import LabelInput from "../../templates/formInputs/LabelInput";
import InputQuery from "../urlQueryElements/InputQuery.astro";

export default function Filter() {
  return (
    <LabelInput name="search" title="Search">
      <InputQuery
        name="search"
        type="text"
        placeholder="Search Categories, Titles and Tags"
      />
    </LabelInput>
  );
}
