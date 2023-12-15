/**
 * `Loading` is a functional component that renders a loading spinner.
 *
 * @component
 * @param {object} props - The properties passed to the component.
 * @returns {JSX.Element} A div element with a loading spinner.
 */
export const Loading = (props) => {
    return <div className={"flex content-center"}>
        <span className="loading loading-spinner loading-lg mx-auto"></span>
    </div>;
};