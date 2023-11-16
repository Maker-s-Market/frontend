export const FormError = (props) => {
    return <label className={"text-sm text-red-500 p-0"}>
        {props.children}
    </label>;
};