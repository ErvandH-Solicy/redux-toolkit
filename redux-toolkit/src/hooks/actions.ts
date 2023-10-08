import { githubActions } from "./../slices/github.slice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const actions = {
  ...githubActions,
};

export default function useActions() {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
}
