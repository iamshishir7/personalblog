import { createClient } from "contentful";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export const contentful = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });


export const renderOptions = {
    renderNode: {
      [INLINES.EMBEDDED_ENTRY]: (node, children) => {
        // target the contentType of the EMBEDDED_ENTRY to display as you need
        if (node.data.target.sys.contentType.sys.id === "blogPost") {
          return (
            <a href={`/blog/${node.data.target.fields.slug}`}>            {node.data.target.fields.title}
            </a>
          );
        }
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        // target the contentType of the EMBEDDED_ENTRY to display as you need
        if (node.data.target.sys.contentType.sys.id === "codeBlock") {
          return (
            <pre>
              <code>{node.data.target.fields.code}</code>
            </pre>
          );
        }
  
        if (node.data.target.sys.contentType.sys.id === "videoEmbed") {
          return (
            <iframe
              src={node.data.target.fields.embedUrl}
              height="100%"
              width="100%"
  
              title={node.data.target.fields.title}
              allowFullScreen={true}
            />
          );
        }
      },
  
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        // render the EMBEDDED_ASSET as you need
        return (
          <img
            src={`https://${node.data.target.fields.file.url}`}
            height={node.data.target.fields.file.details.image.height}
            width={node.data.target.fields.file.details.image.width}
            alt={node.data.target.fields.description}
            className='image'
          />
        );
      },
  
      [INLINES.HYPERLINK]: node => {
  
        // Only process youtube links
        if (node.data.uri.includes("youtube.com")) {
            // Extract videoId from the URL
            const match = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/.exec(
                node.data.uri
            )
            const videoId =
                match && match[7].length === 11 ? match[7] : null
            return (
                videoId && (
                
                    <iframe
                        className="youtube-video"
                        origin="blog.sisir.dev"
                        style={{aspectRatio:'16 / 9', width: '100%'}}
                        title={`https://youtube.com/embed/${videoId}`}
                        src={`https://youtube.com/embed/${videoId}`}
                        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                
                )
            )
        } else {
          return <a href={node.data.uri} target="_blank" rel="noreferrer">{node.content[0].value}</a>
        }
      },
    },
  };

  export const convertToJSX = (content) => {
    return documentToReactComponents(content, renderOptions)
  }