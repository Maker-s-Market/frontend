/**
 * `FormError` is a functional component that renders an error message in a form.
 *
 * @component
 * @param {object} props - The properties passed to the component.
 * @returns {JSX.Element} A label element with the text passed as children.
 */
export const FormError = (props) => {
    return <label className={"text-sm text-red-500 p-0"}>
        {props.children}
    </label>;
};