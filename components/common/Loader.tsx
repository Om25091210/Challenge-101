import React from "react";

import { useLottie } from "lottie-react";
import * as loaderData2 from "../../animations/loading2.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loaderData2,
};

interface Props {}

export const Loader = (props: Props) => {

  const { View } = useLottie(options, style);

  return View;
  
};
