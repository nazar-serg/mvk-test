import { useBlockProps, RichText } from "@wordpress/block-editor";

const Save = ({ attributes }) => {
    const { title, text, testimonialItems = [], starCount = 5, titleColor, textColor } = attributes;
    const blockProps = useBlockProps.save({
        id: 'testimonial'
    });

    return (
        <div {...blockProps}>
            <div className="testimonial-container">
            <div className="testimonial-custom-block__content">
                <RichText.Content
                    tagName="h2"
                    value={title}
                    className="testimonial-custom-block__title"
                    style={{ color: titleColor }}
                />
                <RichText.Content
                    tagName="p"
                    value={text}
                    className="testimonial-custom-block__text"
                    style={{ color: textColor }}
                />
            </div>
            <div className="testimonial-custom-block__content-testimonial">
                <div className="owl-carousel owl-theme testimonial-carousel">
                    
                        {testimonialItems.map((item, index) => (
                            <div key={index} className="item">
                                <div className="testimonial-item ">
                                    <div className="testimonial-item-image">
                                        {item.image.url && (
                                            <img
                                                src={item.image.url}
                                                alt={item.image.alt || ''}
                                            />
                                        )}
                                    </div>
                                    <div className="testimonial-item-content">
                                        <RichText.Content
                                            tagName="h3"
                                            value={item.name}
                                            className="testimonial-custom-block__name"
                                        />
                                        <RichText.Content
                                            tagName="p"
                                            value={item.profession}
                                            className="testimonial-custom-block__profession"
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
                                        <RichText.Content
                                            tagName="p"
                                            value={item.text}
                                            className="testimonial-custom-block__text"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    
                    
                </div>
            </div>
            </div>
        </div>
    );

};
export default Save;
