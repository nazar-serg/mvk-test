import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck, ColorPalette } from "@wordpress/block-editor";
import { PanelBody, Button, TextControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

const Edit = ({ attributes, setAttributes }) => {
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

    const blockProps = useBlockProps({
        style: {
            backgroundImage: backgroundImage.url ? `url(${backgroundImage.url})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '500px',
            position: 'relative'
        }
    });

    const onSelectImage = (media) => {
        setAttributes({
            backgroundImage: {
                id: media.id,
                url: media.url,
                alt: media.alt
            }
        });
    };

    const onRemoveImage = () => {
        setAttributes({
            backgroundImage: {
                id: null,
                url: '',
                alt: ''
            }
        });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__("Background Settings", "custom-blocks-collection")} initialOpen={true}>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={onSelectImage}
                            allowedTypes={['image']}
                            value={backgroundImage.id}
                            render={({ open }) => (
                                <Button
                                    onClick={open}
                                    variant="primary"
                                    style={{ width: '100%', marginBottom: '10px' }}
                                >
                                    {backgroundImage.url ? __('Replace Background Image', 'custom-blocks-collection') :
                                     __('Select Background Image', 'custom-blocks-collection')}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                    {backgroundImage.url && (
                        <Button
                            onClick={onRemoveImage}
                            variant="secondary"
                            isDestructive
                            style={{ width: '100%', marginBottom: '10px' }}
                        >
                            {__('Remove Background Image', 'custom-blocks-collection')}
                        </Button>
                    )}
                </PanelBody>

                <PanelBody title={__("Button Settings", "custom-blocks-collection")} initialOpen={false}>
                    <TextControl
                        label={__("Primary Button Text", "custom-blocks-collection")}
                        value={primaryButtonText}
                        onChange={(value) => setAttributes({ primaryButtonText: value })}
                    />
                    <TextControl
                        label={__("Primary Button Target (CSS Selector)", "custom-blocks-collection")}
                        value={primaryButtonTarget}
                        onChange={(value) => setAttributes({ primaryButtonTarget: value })}
                        help={__("Example: #contact, #form, .contact-section", "custom-blocks-collection")}
                    />
                    <TextControl
                        label={__("Secondary Button Text", "custom-blocks-collection")}
                        value={secondaryButtonText}
                        onChange={(value) => setAttributes({ secondaryButtonText: value })}
                    />
                    <TextControl
                        label={__("Secondary Button Target (CSS Selector)", "custom-blocks-collection")}
                        value={secondaryButtonTarget}
                        onChange={(value) => setAttributes({ secondaryButtonTarget: value })}
                        help={__("Example: #services, .services-section", "custom-blocks-collection")}
                    />
                </PanelBody>

                <PanelBody title={__("Color Settings", "custom-blocks-collection")} initialOpen={false}>
                    <div style={{ marginBottom: '20px' }}>
                        <h4>{__("Title Color", "custom-blocks-collection")}</h4>
                        <ColorPalette
                            value={titleColor}
                            onChange={(color) => setAttributes({ titleColor: color })}
                            colors={[
                                { name: 'White', color: '#ffffff' },
                                { name: 'Black', color: '#000000' },
                                { name: 'Dark Gray', color: '#333333' },
                                { name: 'Primary', color: '#0073aa' },
                            ]}
                        />
                    </div>
                    <div>
                        <h4>{__("Text Color", "custom-blocks-collection")}</h4>
                        <ColorPalette
                            value={textColor}
                            onChange={(color) => setAttributes({ textColor: color })}
                            colors={[
                                { name: 'White', color: '#ffffff' },
                                { name: 'Light Gray', color: '#666666' },
                                { name: 'Dark Gray', color: '#333333' },
                                { name: 'Black', color: '#000000' },
                            ]}
                        />
                    </div>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="hero-overlay"></div>
                <div className="hero-container">
                    <div className="hero-content">
                        <RichText
                            tagName="p"
                            value={subtitle}
                            onChange={(value) => setAttributes({ subtitle: value })}
                            className="hero-subtitle"
                            placeholder={__("Quality cleaning at a fair price.", "custom-blocks-collection")}
                            style={{ color: textColor }}
                        />
                        
                        <RichText
                            tagName="h1"
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                            className="hero-title"
                            placeholder={__("Specialized, efficient, and thorough cleaning services", "custom-blocks-collection")}
                            style={{ color: titleColor }}
                        />
                        
                        <RichText
                            tagName="p"
                            value={text}
                            onChange={(value) => setAttributes({ text: value })}
                            className="hero-text"
                            placeholder={__("We provide Performing cleaning tasks using the least amount of time, energy, and money.", "custom-blocks-collection")}
                            style={{ color: textColor }}
                        />
                        
                        <div className="hero-buttons">
                            <div className="hero-button primary">
                                {primaryButtonText}
                            </div>
                            <div className="hero-button secondary">
                                {secondaryButtonText}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Edit;
