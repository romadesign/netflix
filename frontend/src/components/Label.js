const Label = ({ className, children, ...props }) => (
    <label
        className={`${className} block font-medium text-sm text-gray-700 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 `}
        {...props}>
        {children}
    </label>
)

export default Label
