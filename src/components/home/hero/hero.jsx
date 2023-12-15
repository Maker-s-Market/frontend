/**
 * Hero component displays a hero section with a background image.
 *
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} The Hero component.
 */
export const Hero = (props) => {
    return <div className="hero h-48"
                style={{backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)'}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
        </div>
    </div>;
};