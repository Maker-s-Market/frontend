/**
 * `ErrorMessage` is a functional component that renders an error message.
 *
 * @component
 * @param {object} props - The properties passed to the component.
 * @returns {JSX.Element} A div element with the text "Something went wrong loading the data. Please try again later.".
 */
export const ErrorMessage = (props) => {
  return <div>
    Something went wrong loading the data. Please try again later.
  </div>;
};