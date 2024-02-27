import React from "react";
import { Img } from "../Img";
import { Text } from "../Text";

const ERestroHomeRowlinkedin = (props) => {
  return (
    <>
      <div className={props.className}>
        <Img className="h-6 w-6" src="images/img_linkedin.svg" alt="linkedin" />
        <div className="flex flex-col items-start justify-center w-auto">
          <Text
            className="text-sm text-teal-900 w-7"
            size="txtQuicksandSemiBold14Teal900"
          >
            {props?.useraddress}
          </Text>
          <Text
            className="text-teal-900_9f text-xs w-[177px]"
            size="txtQuicksandMedium12Teal9009f"
          >
            {props?.useraddress1}
          </Text>
        </div>
      </div>
    </>
  );
};

ERestroHomeRowlinkedin.defaultProps = {
  useraddress: "Bhuj",
  useraddress1: "123 Main Street, Anytown, 12345",
};

export default ERestroHomeRowlinkedin;
