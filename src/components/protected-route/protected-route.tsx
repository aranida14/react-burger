import React from 'react';
import { useSelector } from '../../services/hooks';
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../loader/loader";

type TProtectedProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
}

const Protected = ({ onlyUnAuth = false, component }: TProtectedProps) => {
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
  const user = useSelector((store) => store.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Loader />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: TProtectedProps) => (
  <Protected onlyUnAuth={true} component={component} />
);
