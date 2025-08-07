import { useBlockProps, RichText } from "@wordpress/block-editor";

const Save = ({ attributes }) => {
    const {
        title,
        subtitle,
        text,
        backgroundImage,
        primaryButtonText,
        primaryButtonTarget,
        secondaryButtonText,
        secondaryButtonTarget,
        titleColor,
        textColor
    } = attributes;

    const blockProps = useBlockProps.save({
        style: {
            backgroundImage: backgroundImage.url ? `url(${backgroundImage.url})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        },
        id: 'hero'
    });

    return (
        <div {...blockProps}>
            <div className="hero-overlay"></div>
            <div className="hero-container">
                <div className="hero-content">
                    <RichText.Content
                        tagName="p"
                        value={subtitle}
                        className="hero-subtitle"
                        style={{ color: textColor }}
                    />
                    
                    <RichText.Content
                        tagName="h1"
                        value={title}
                        className="hero-title"
                        style={{ color: titleColor }}
                    />
                    
                    <RichText.Content
                        tagName="p"
                        value={text}
                        className="hero-text"
                        style={{ color: textColor }}
                    />
                    
                    <div className="hero-buttons">
                        <button 
                            className="hero-button primary"
                            data-target={primaryButtonTarget}
                        >
                            {primaryButtonText}
                        </button>
                        <button 
                            className="hero-button secondary"
                            data-target={secondaryButtonTarget}
                        >
                            {secondaryButtonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Save;
