import { Deposit } from "../interface/Deposit";
import { ApproveAccount } from "../../modules/main-view/pages/ApproveAccount";
import { LoanRequest } from "../../modules/main-view/pages/LoanRequest";
import DepositDetailView from "../../modules/main-view/pages/deposit/DepositDetailView";
import React from "react";
import { Interface } from "readline";
import { DataDetailViewProps } from "../interface/DataDetailView";

export const screenMap: Record<
  string,
  (data?: DataDetailViewProps) => React.ReactNode
> = {
  "approve-account": () => <ApproveAccount />,
  "loan-request": () => <LoanRequest />,
  deposit: (props) => <DepositDetailView {...props} />,
};
