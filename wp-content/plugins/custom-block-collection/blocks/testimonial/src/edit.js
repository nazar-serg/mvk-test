import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck, ColorPalette } from "@wordpress/block-editor";
import { PanelBody, Button, RangeControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

const Edit = ( { attributes, setAttributes } ) => {
    const { testimonialItems = [], title, text, starCount = 5, titleColor, textColor } = attributes;
    const blockProps = useBlockProps();

    const addTestimonialItem = () => {
        const newItems = [ ...testimonialItems, { name: '', profession: '', text: '', image: {} }];
        setAttributes({ testimonialItems: newItems});
    };

    const removeTestimonialItem = (index) => {
        const newItems = testimonialItems.filter((_, i) => i !== index);
        setAttributes({ testimonialItems: newItems});
    };

    const updateTestimonialItem = (index, field, value) => {
        const newItems = [...testimonialItems];
        newItems[index][field] = value;
        setAttributes({ testimonialItems: newItems});
    };

    const onSelectImage = (media, index) => {
        const newItems = [...testimonialItems];
        newItems[index].image = {
            id: media.id,
            url: media.url,
            alt: media.alt
        };
        setAttributes( {testimonialItems: newItems} );
    }

    const onRemoveImage = (index) => {
        const newItems = [...testimonialItems];
        newItems[index].image = {};
        setAttributes({ testimonialItems: newItems });
    }

    return (
        <>
        <InspectorControls>
            <PanelBody title={__("Color Settings", "custom-blocks-collection")} initialOpen={false}>
                <div style={{ marginBottom: '20px' }}>
                    <h4>{__("Title Color", "custom-blocks-collection")}</h4>
                    <ColorPalette
                        value={titleColor}
                        onChange={(color) => setAttributes( { titleColor: color })}
                        colors={[
                            { name: 'Default', color: '#333333' },
                            { name: 'Primary', color: '#0073aa' },
                            { name: 'Danger', color: '#dc3232' },
                            { name: 'Dark', color: '#1e1e1e' },
                        ]}
                    />
                </div>

                <div>
                    <h4>{__("Text Color", "custom-blocks-collection")}</h4>
                    <ColorPalette
                        value={textColor}
                        onChange={(color) => setAttributes( { textColor: color })}
                        colors={[
                            { name: 'Default', color: '#333333' },
                            { name: 'Primary', color: '#0073aa' },
                            { name: 'Danger', color: '#dc3232' },
                            { name: 'Dark', color: '#1e1e1e' },
                        ]}
                    />
                </div>
            </PanelBody>
            <PanelBody title={__('Star Settings', 'custom-blocks-collection')}>
                <RangeControl
                    label={__('Star Rating', 'custom-blocks-collection')}
                    value={starCount}
                    onChange={(value) => setAttributes({ starCount: value })}
                    min={1}
                    max={5}
                />
                <Button
                    isPrimary
                    onClick={addTestimonialItem}
                >
                    {__('Add Testimonial Item', 'custom-blocks-collection')}
                </Button>
            </PanelBody>
        </InspectorControls>
        <div {...blockProps}>
            <RichText
                tagName="h2"
                value={title}
                onChange={(value) => setAttributes({title: value})}
                className="testimonial-custom-block__title"
                placeholder={__("Title", "custom-blocks-collection")}
            />
            <RichText
                tagName="p"
                value={text}
                onChange={(value) => setAttributes({text: value})}
                className="testimonial-custom-block__text"
                placeholder={__("Text", "custom-blocks-collection")}
            />
            {testimonialItems.map((item, index) => (
                <div key={index} className="testimonial-item-edit">
                    <div className="testimonial-item-controls">
                        <Button
                        isDestructive
                        isSmall
                        onClick={() => removeTestimonialItem(index)}
                        >
                        {__('Remove Item', 'custom-blocks-collection')}
                        </Button>

                    </div>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(media) => onSelectImage(media, index)}
                            allowedTypes={['image']}
                            value={item.image.id}
                            render={({ open }) => (
                                <Button
                                    onClick={open}
                                    variant="primary"
                                    style={{ width: '100%', marginBottom: '10px'}}
                                >
                                    {item.image.url ? __('Replace Image', 'custom-blocks-collection') :
                                     __('Select Image', 'custom-blocks-collection')}

                                </Button>
                            )}
                    />
                    </MediaUploadCheck>
                    {item.image.url ? (
                        <>
                        <Button
                            onClick={() => onRemoveImage(index)}
                            variant="secondary"
                            isDestructive
                            style={{width: '100%', marginBottom: '10px'}}
                         >
                            {__('Remove Image', 'custom-blocks-collection')}
                         </Button>
                        <img src={item.image.url} alt={item.image.alt || ''}
                        style={{width: '170px', height: '224px', objectFit: 'cover', marginBottom: '10px'}} />
                    </>
                    ) : (
                        <div className="testimonial-placeholder">
                            <p>{__('No Image Selected', 'custom-blocks-collection')}</p>
                        </div>
                    )}
                    
                    <RichText
                        tagName="h3"
                        value={item.name}
                        onChange={(value) => updateTestimonialItem(index, 'name', value)}
                        className="testimonial-custom-block__name"
                        placeholder={__('Name', 'custom-blocks-collection')}
                    />

                    <RichText
                        tagName="p"
                        value={item.profession}
                        onChange={(value) =>updateTestimonialItem(index, 'profession', value)}
                        className="testimonial-custom-block__profession"
                        placeholder={__('Profession', 'custom-blocks-collection')}
                    />

                    <div className="testimonial-custom-block__stars">
                        {Array.from({ length: starCount }, (_, starIndex) => (
                            <span key={starIndex} className="star-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                                </svg>
                            </span>
                        ))}
                    </div>

                    <RichText
                        tagName="p"
                        value={item.text}
                        onChange={(value) => updateTestimonialItem(index, 'text', value)}
                        className="testimonial-custom-block__text"
                        placeholder={__('Testimonial Text', 'custom-blocks-collection')}
                    />

                </div>

            ))}

            <Button
                isPrimary
                onClick={addTestimonialItem}
            >
                {__('Add Testimonial Item', 'custom-blocks-collection')}
            </Button>

        </div>
        </>
    );
};
export default Edit;
