export const formatErrorMessages = (errMsg) => {
  const errMsgArray = errMsg.split(".");
  let finalMsg = "";
  errMsgArray.forEach((msg) => {
    finalMsg += `${msg}.\n`;
  });
  console.log(finalMsg);
  return finalMsg.slice(0, finalMsg.length - 2);
};
