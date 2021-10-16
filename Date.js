exports.getDate = () => {
  const day = new Date();
  options = {
    day: "numeric",
    weekday: "long",
    month: "long",
    year: "numeric",
  };
  let setDate = day.toLocaleDateString("en-US", options);
  return setDate;
}
exports.getDay = () => {
    const day = new Date();
    options = {
      weekday: "long"
    };
    let setDay = day.toLocaleDateString("en-US", options);
    return setDay;
  }
